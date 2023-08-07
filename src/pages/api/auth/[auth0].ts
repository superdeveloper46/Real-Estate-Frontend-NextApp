import { getSession, handleAuth, handleLogin } from '@auth0/nextjs-auth0';
import { ManagementClient } from 'auth0';

const managementClient = new ManagementClient({
  clientId: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
  clientSecret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET,
  domain: process.env.AUTH0_ISSUER_BASE_URL!.replace('https://', ''),
});

export default handleAuth({
  async login(req, res) {
    try {
      await handleLogin(req, res, {
        authorizationParams: {
          scope: 'openid profile email offline_access',
          useRefreshTokens: true,
        },
      });
    } catch (error: any) {
      res.status(error.status || 400).end(error.message);
    }
  },
  async profile(req, res) {
    try {
      const session = await getSession(req, res);

      if (!session) {
        res.status(401).end('Unauthorized');
        return;
      }

      const user = await managementClient.getUser({
        id: session.user.sub,
      });

      res.status(200).json({
        sub: session.user.sub,
        name: user.name,
        email: user.email,
        msas: user.app_metadata?.msas ?? [],
      });
    } catch (error: any) {
      res.status(error.status || 500).end(error.message);
    }
  },
  token: async (req, res) => {
    const session = await getSession(req, res);

    res.status(200).json({ token: session?.idToken ?? null });
  },
  register: async (req, res) => {
    await handleLogin(req, res, {
      authorizationParams: {
        screen_hint: 'signup',
      },
    });
  },
});

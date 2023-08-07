import type { UserProfile } from '@auth0/nextjs-auth0/client';
import type { PropsWithChildren } from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import type { User } from '@/models/user';

interface UserContext {
  user: User | null;
  isLoading: boolean;
}

const context = createContext<UserContext>({
  user: null,
  isLoading: true,
});

export const useUser = () => useContext(context);

export const usePurchasedMsas = () => useUser().user?.msas ?? [];

const getProfile = (): Promise<User> =>
  fetch('/api/auth/profile')
    .then((response) => response.json())
    .then((rawUser: UserProfile) => ({
      id: rawUser.sub!,
      name: rawUser.name!,
      email: rawUser.email!,
      msas: (rawUser.msas as string[] | undefined) ?? [],
    }));

const UserProvider = ({ children }: PropsWithChildren<{}>) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getProfile().then(setUser);
  }, []);

  const contextValue = useMemo(
    (): UserContext => ({
      user,
      isLoading: user === null,
    }),
    [user]
  );

  return <context.Provider value={contextValue}>{children}</context.Provider>;
};

export default UserProvider;

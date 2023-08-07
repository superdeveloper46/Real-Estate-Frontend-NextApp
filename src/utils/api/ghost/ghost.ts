export const getPostsData = async (limit: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_GHOST_API_URL}/content/posts/?key=${process.env.NEXT_PUBLIC_GHOST_CONTENT_API_KEY}&limit=${limit}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    }
  )
    .then((res) => {
      return res.json();
    })
    .catch(() => {
      return null;
    });
  return response;
};

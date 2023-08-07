import React, { useEffect, useState } from 'react';

import Post from '@/components/Ghost/Post/Post.component';
import Main from '@/layouts/Main/Main.layout';
import Meta from '@/layouts/Meta/Meta.layout';
import { getPostsData } from '@/utils/api/ghost/ghost';
import { AppConfig } from '@/utils/AppConfig';

const EMPTY_POSTS = { meta: {}, posts: [] };

type ItemType = {
  [key: string]: any;
};

type PostsProps = {
  meta: ItemType;
  posts: Array<ItemType>;
};

const ResearchPage = () => {
  const [posts, setPosts] = useState<PostsProps>(EMPTY_POSTS);
  useEffect(() => {
    const getPostsDataFunc = async () => {
      let postData;
      try {
        postData = await getPostsData(15);
        setPosts(postData);
      } catch (exception) {
        setPosts(EMPTY_POSTS);
      }
    };

    getPostsDataFunc();
  }, []);
  return (
    <Main
      meta={
        <Meta title={AppConfig.title} description={AppConfig.description} />
      }
    >
      <section className='mt-8 w-full'>
        {posts?.posts.map((post: any, index) => (
          <Post
            key={index}
            title={post.title}
            content={post.excerpt}
            imageUrl={post.feature_image}
          />
        ))}
      </section>
    </Main>
  );
};

export default ResearchPage;

import React from 'react';

type PostProps = {
  title: string;
  content: string;
  imageUrl: string;
};

const Post = (props: PostProps) => {
  return (
    <div className='my-8 grid grid-cols-12'>
      <div className='col-span-3'>
        <img
          className='aspect-[16/9] h-full object-cover'
          src={props.imageUrl}
          alt='Post Image'
        />
      </div>
      <div className='col-span-9 space-y-4 border-y border-r border-gray-300 p-6 font-inter'>
        <div className=' text-xl font-bold'>{props.title}</div>
        <div>{props.content}</div>
      </div>
    </div>
  );
};

export default Post;

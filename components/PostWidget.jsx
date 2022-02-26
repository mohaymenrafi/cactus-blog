import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getRecentPosts, getSimilarPosts } from '../services';

export default function PostWidget({ categories, slug }) {
  const [relatedPosts, setRelatedPosts] = useState([]);
  useEffect(() => {
    if (slug) {
      getSimilarPosts(slug, categories).then((res) => setRelatedPosts(res));
    } else {
      getRecentPosts().then((res) => setRelatedPosts(res));
    }
  }, [slug]);
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {slug ? 'Related Posts' : 'Recent Posts'}
      </h3>
      {relatedPosts?.map((post) => (
        <div key={post.id} className="flex items-center w-full mb-4 ">
          <div className="w-16 flex-none">
            <Image
              width="60px"
              height="40px"
              src={post.featuredImage.url}
              alt={post.title}
              className="align-middle rounded-full"
            />
          </div>
          <div className="flex-grow ml-4">
            <p className="text-gray-600 text-xs">
              {moment(post.createdAt).format('MMM DD,YYYY')}
            </p>
            <p className="text-sm">
              <Link href={`/post/${post.slug}`}>{post.title}</Link>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

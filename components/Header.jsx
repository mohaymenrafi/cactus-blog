import Link from 'next/link';
import React from 'react';

const cat = [
  { name: 'react', slug: 'react' },
  { name: 'web-dev', slug: 'web-dev' },
];

export default function Header() {
  return (
    <div className="container mx-auto px-1o mb-8">
      <div className="border-b w-full inline-block border-blue-400 py-8">
        <div className="md:float-left block">
          <Link href="/">
            <span className="cursor-pointer font-bold text-4xl text-white">
              Cactus
            </span>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          {cat.map((item) => (
            <Link key={item.slug} href={`/category/${item.slug}`}>
              <span className="md:float-right mt-2 align-middle text-white uppercase ml-4">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

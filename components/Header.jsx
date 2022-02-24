import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getCategories } from '../services';

export default function Header() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories().then((res) => setCategories(res));
  }, []);
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
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/category/${cat.slug}`}>
              <span className="md:float-right mt-2 align-middle text-white uppercase ml-4 cursor-pointer">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

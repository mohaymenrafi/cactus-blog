import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getCategories } from '../services';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories().then((res) => setCategories(res));
  }, []);
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8 pb-12">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Categories</h3>
      {categories?.map((cat) => (
        <Link href={`/category/${cat.slug}`} key={cat.id}>
          <span className="block cursor-pointer pb-3 mb-3">{cat.name}</span>
        </Link>
      ))}
    </div>
  );
}

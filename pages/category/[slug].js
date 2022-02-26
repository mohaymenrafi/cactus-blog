import { Categories, PostCard } from '../../components';
import { getCategories, getPostsByCategory } from '../../services';

export async function getStaticProps({ params }) {
  const posts = await getPostsByCategory(params.slug);
  return {
    props: { posts },
  };
}

export async function getStaticPaths() {
  const categories = await getCategories();
  const postUrl = categories.map(({ slug }) => ({ params: { slug } }));
  return {
    paths: postUrl,
    fallback: true,
  };
}

export default function CategoryPage({ posts }) {
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post, index) => (
            <PostCard key={index} post={post.node} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}

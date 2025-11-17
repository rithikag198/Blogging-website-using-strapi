import { notFound } from 'next/navigation';
import Link from 'next/link';
import BlogCard from '@/components/BlogCard';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const slugOrId = resolvedParams.slug;
  
  try {
    // First try to get category by slug
    let categoryResponse = await fetch(`http://localhost:1337/api/categories?filters[slug][$eq]=${slugOrId}`, {
      cache: 'no-store',
    });
    
    let categoryData = await categoryResponse.json();
    
    // If not found by slug, try by ID using filter
    if (categoryData.data.length === 0 && !isNaN(Number(slugOrId))) {
      categoryResponse = await fetch(`http://localhost:1337/api/categories?filters[id][$eq]=${slugOrId}`, {
        cache: 'no-store',
      });
      categoryData = await categoryResponse.json();
    }
    
    const category = categoryData.data[0];
    
    // For now, show a message that category filtering isn't available yet
    const postsData = { data: [] };

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="mb-8">
            <Link 
              href="/categories" 
              className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Categories
            </Link>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {category.name}
            </h1>
            
            {category.description && (
              <p className="text-gray-600 text-lg">{category.description}</p>
            )}
          </div>

          {postsData.data.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No posts found in this category yet.
              </p>
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-6">
                {postsData.data.length} {postsData.data.length === 1 ? 'post' : 'posts'} in this category.
              </p>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-1">
                {postsData.data.map((post: any) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}

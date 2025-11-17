import { notFound } from 'next/navigation';
import Link from 'next/link';
import BlogCard from '@/components/BlogCard';

interface TagPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function TagPage({ params }: TagPageProps) {
  const resolvedParams = await params;
  const slugOrId = resolvedParams.slug;
  
  try {
    // First try to get tag by slug
    let tagResponse = await fetch(`http://localhost:1337/api/tags?filters[slug][$eq]=${slugOrId}`, {
      cache: 'no-store',
    });
    
    let tagData = await tagResponse.json();
    
    // If not found by slug, try by ID using filter
    if (tagData.data.length === 0 && !isNaN(Number(slugOrId))) {
      tagResponse = await fetch(`http://localhost:1337/api/tags?filters[id][$eq]=${slugOrId}`, {
        cache: 'no-store',
      });
      tagData = await tagResponse.json();
    }
    
    const tag = tagData.data[0];
    
    // For now, show a message that tag filtering isn't available yet
    const postsData = { data: [] };

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="mb-8">
            <Link 
              href="/tags" 
              className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Tags
            </Link>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              #{tag.name}
            </h1>
            
            {tag.description && (
              <p className="text-gray-600 text-lg">{tag.description}</p>
            )}
          </div>

          {postsData.data.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No posts found with this tag yet.
              </p>
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-6">
                {postsData.data.length} {postsData.data.length === 1 ? 'post' : 'posts'} tagged with #{tag.name}.
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

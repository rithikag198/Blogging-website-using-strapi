import { getBlogPosts } from '@/lib/api';
import Link from 'next/link';
import SocialShare from '@/components/SocialShare';
import Header from '@/components/Header';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const calculateReadingTime = (content: any[]): number => {
  if (!content || !Array.isArray(content)) return 1;
  
  const text = content
    .filter(item => item.type === 'paragraph' && item.children)
    .map(item => item.children.map((child: any) => child.text).join(''))
    .join(' ');
  
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  try {
    const postId = resolvedParams.slug;
    
    // Get all posts and find the specific one
    const response = await fetch('http://localhost:1337/api/blog-posts?populate=featured_image', {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      console.error('API Error:', response.status, response.statusText);
      notFound();
    }
    
    const allPosts = await response.json();
    const post = allPosts.data.find((p: any) => p.id.toString() === postId);
    
    if (!post) {
      notFound();
    }
    
    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    };

    const renderContent = (content: any[]) => {
      if (!content || content.length === 0) {
        return <p className="text-gray-600">No content available.</p>;
      }
      
      return content.map((item, index) => {
        switch (item.type) {
          case 'paragraph':
            return (
              <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                {item.children?.map((child: any, childIndex: number) => {
                  if (child.type === 'text') {
                    return child.text;
                  }
                  if (child.type === 'link') {
                    return (
                      <a key={childIndex} href={child.url} className="text-blue-600 hover:underline">
                        {child.children?.[0]?.text || ''}
                      </a>
                    );
                  }
                  return null;
                })}
              </p>
            );
          case 'heading':
            const level = item.level || 2;
            if (level === 1) {
              return (
                <h1 key={index} className="mb-4 font-bold text-gray-900">
                  {item.children?.[0]?.text || ''}
                </h1>
              );
            } else if (level === 2) {
              return (
                <h2 key={index} className="mb-4 font-bold text-gray-900">
                  {item.children?.[0]?.text || ''}
                </h2>
              );
            } else if (level === 3) {
              return (
                <h3 key={index} className="mb-4 font-bold text-gray-900">
                  {item.children?.[0]?.text || ''}
                </h3>
              );
            } else {
              return (
                <h4 key={index} className="mb-4 font-bold text-gray-900">
                  {item.children?.[0]?.text || ''}
                </h4>
              );
            }
          case 'list':
            return (
              <ul key={index} className="list-disc list-inside mb-4 text-gray-700">
                {item.children?.map((listItem: any, itemIndex: number) => (
                  <li key={itemIndex} className="mb-2">
                    {listItem.children?.[0]?.text || ''}
                  </li>
                ))}
              </ul>
            );
          default:
            return null;
        }
      });
    };

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
            {/* Featured Image */}
            <div className="relative h-64 md:h-96 overflow-hidden">
              <img
                src={
                  post.featured_image?.url 
                    ? `http://localhost:1337${post.featured_image.url}`
                    : `https://picsum.photos/seed/${post.title.replace(/\s+/g, '-').toLowerCase()}/1200/600.jpg`
                }
                alt={post.featured_image?.alternativeText || post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            
            <div className="p-8">
              {/* Post Header */}
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {post.title}
                </h1>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {post.author ? post.author.charAt(0).toUpperCase() : 'A'}
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-900 dark:text-white">{post.author}</p>
                      <time className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(post.publishedAt)}
                      </time>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{calculateReadingTime(post.content)} min read</span>
                  </div>
                </div>
              </div>
              <div className="prose prose-lg max-w-none">
                {renderContent(post.content)}
              </div>
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <SocialShare post={post} />
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in BlogPostPage:', error);
    notFound();
  }
}
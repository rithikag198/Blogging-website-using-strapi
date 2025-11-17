import Link from 'next/link';
import { BlogPost } from '@/lib/api';
import { calculateReadingTime } from '@/lib/readingTime';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const extractTextFromContent = (content: any[]): string => {
    if (!content || !Array.isArray(content)) return '';
    return content
      .filter(item => item.type === 'paragraph' && item.children)
      .map(item => item.children.map((child: any) => child.text).join(''))
      .join(' ')
      .substring(0, 150) + '...';
  };

  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
      {/* Featured Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={
            post.featured_image?.url 
              ? `http://localhost:1337${post.featured_image.url}`
              : `https://picsum.photos/seed/${post.title.replace(/\s+/g, '-').toLowerCase()}/800/400.jpg`
          }
          alt={post.featured_image?.alternativeText || post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>
      
      <div className="p-8">
        {/* Post Meta */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            {/* Author Avatar */}
            <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-semibold">
              {post.author ? post.author.charAt(0).toUpperCase() : 'A'}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{post.author}</p>
              <time className="text-xs text-gray-500 dark:text-gray-400">
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
        
        {/* Post Title */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
          <Link 
            href={`/blog/${post.id}`}
            className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
          >
            {post.title}
          </Link>
        </h2>
        
        {/* Post Excerpt */}
        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-lg">
          {extractTextFromContent(post.content)}
        </p>

        {/* Read More Link */}
        <Link 
          href={`/blog/${post.id}`}
          className="inline-flex items-center text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-semibold text-lg group"
        >
          Read article
          <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </article>
  );
}

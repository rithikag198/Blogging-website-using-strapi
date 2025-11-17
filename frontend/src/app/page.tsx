import { getBlogPosts, ContentChild } from '@/lib/api';
import BlogCard from '@/components/BlogCard';
import Sidebar from '@/components/Sidebar';
import Newsletter from '@/components/Newsletter';
import Image from 'next/image';

export default async function Home() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Welcome to
              <span className="block text-orange-100">Orange Flex Blog</span>
            </h1>
            <p className="text-xl sm:text-2xl mb-10 text-orange-50 max-w-3xl mx-auto leading-relaxed">
              Discover the latest insights on mobile technology, digital innovation, and modern lifestyle trends that shape our connected world.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              <button className="bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold hover:bg-orange-50 transition-all transform hover:scale-105 shadow-lg">
                Explore Articles
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-orange-600 transition-all transform hover:scale-105">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Articles
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Hand-picked stories that inspire, educate, and transform your perspective
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <main className="lg:col-span-3">
            {posts.data.length > 0 ? (
              <div className="space-y-8">
                {/* Featured Post - Larger */}
                {posts.data[0] && (
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                    {posts.data[0].featured_image && (
                      <div className="relative h-64 sm:h-80 overflow-hidden">
                        <Image
                          src={`http://localhost:1337${posts.data[0].featured_image.url}`}
                          alt={posts.data[0].featured_image.alternativeText || posts.data[0].title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <div className="absolute bottom-6 left-6 right-6">
                          <span className="inline-block px-3 py-1 bg-orange-600 text-white text-sm font-semibold rounded-full mb-3">
                            Featured
                          </span>
                          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                            {posts.data[0].title}
                          </h3>
                        </div>
                      </div>
                    )}
                    <div className="p-6 sm:p-8">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {posts.data[0].author ? posts.data[0].author.charAt(0).toUpperCase() : 'A'}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{posts.data[0].author}</p>
                            <time className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(posts.data[0].publishedAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </time>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        {posts.data[0].content?.filter(item => item.type === 'paragraph' && item.children)
                          .map(item => item.children!.map((child: ContentChild) => child.text).join(''))
                          .join(' ')
                          .substring(0, 200) + '...'}
                      </p>
                      <a
                        href={`/blog/${posts.data[0].id}`}
                        className="inline-flex items-center text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-semibold text-lg group"
                      >
                        Read Full Article
                        <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                )}

                {/* Regular Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {posts.data.slice(1).map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No articles yet</h3>
                <p className="text-gray-600 dark:text-gray-300">Check back soon for fresh content!</p>
              </div>
            )}
          </main>

          <aside className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              <Sidebar />
              <Newsletter />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

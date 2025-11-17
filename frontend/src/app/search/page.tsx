'use client';

import { useState, useEffect } from 'react';
import { getBlogPosts } from '@/lib/api';
import BlogCard from '@/components/BlogCard';
import Header from '@/components/Header';
import { BlogPost } from '@/lib/api';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getBlogPosts();
        setPosts(response.data);
        setFilteredPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  }, [searchTerm, posts]);

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      <Header />
      <div className='max-w-4xl mx-auto px-4 py-8'>
        <div className='mb-8'>
          <h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>
            Search Blog Posts
          </h1>
          <input
            type='text'
            placeholder='Search by title...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full px-4 py-3 text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg'
          />
        </div>

        {loading ? (
          <div className='text-center py-12'>
            <p className='text-gray-600 dark:text-gray-400'>Loading posts...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className='text-center py-12'>
            <p className='text-gray-600 dark:text-gray-400'>
              {searchTerm ? 'No posts found' : 'No posts available'}
            </p>
          </div>
        ) : (
          <div className='space-y-8'>
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { BlogPost } from '@/lib/api';

interface SocialShareProps {
  post: BlogPost;
}

export default function SocialShare({ post }: SocialShareProps) {
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const title = post.title;
  
  const shareLinks = [
    {
      name: 'Twitter',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      icon: '🐦',
      color: 'bg-blue-400 hover:bg-blue-500',
    },
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      icon: '📘',
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      icon: '💼',
      color: 'bg-blue-700 hover:bg-blue-800',
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Share this post</h3>
      <div className="flex space-x-4">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${link.color} text-white px-3 py-1 rounded-full text-sm transition-colors`}
            title={link.name}
          >
            {link.icon}
          </a>
        ))}
      </div>
    </div>
  );
}

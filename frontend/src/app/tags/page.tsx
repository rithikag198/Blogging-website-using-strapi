import { getTags } from '@/lib/api';
import Link from 'next/link';

export default async function TagsPage() {
  const { data: tags } = await getTags();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <Link 
              href="/" 
              className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Tags
            </h1>
            
            {tags.length === 0 ? (
              <p className="text-gray-500">No tags available yet.</p>
            ) : (
              <div className="flex flex-wrap gap-3">
                {tags.map((tag) => (
                  <Link
                    key={tag.id}
                    href={`/tag/${tag.slug}`}
                    className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                  >
                    #{tag.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { getCategories } from '@/lib/api';
import Link from 'next/link';

export default async function CategoriesPage() {
  const { data: categories } = await getCategories();

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
              Categories
            </h1>
            
            {categories.length === 0 ? (
              <p className="text-gray-500">No categories available yet.</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className="block p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-gray-600">{category.description}</p>
                    )}
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

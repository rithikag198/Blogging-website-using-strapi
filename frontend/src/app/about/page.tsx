import Link from 'next/link';

export default function AboutPage() {
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
              About This Blog
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="mb-4 text-gray-700 leading-relaxed">
                Welcome to my blog! This is a modern blogging platform built with cutting-edge web technologies.
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Technology Stack</h2>
              <p className="mb-4 text-gray-700 leading-relaxed">
                This blog is powered by a modern full-stack architecture:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li className="mb-2"><strong>Strapi</strong> - Headless CMS for content management</li>
                <li className="mb-2"><strong>Next.js</strong> - React framework for the frontend</li>
                <li className="mb-2"><strong>Tailwind CSS</strong> - Utility-first CSS framework</li>
                <li className="mb-2"><strong>TypeScript</strong> - Type-safe JavaScript</li>
              </ul>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Features</h2>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li className="mb-2">Clean, responsive design</li>
                <li className="mb-2">Fast loading times</li>
                <li className="mb-2">SEO-friendly URLs</li>
                <li className="mb-2">Easy content management</li>
                <li className="mb-2">Modern web standards</li>
              </ul>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Get Started</h2>
              <p className="mb-4 text-gray-700 leading-relaxed">
                This blog serves as a demonstration of modern web development practices. It showcases how to build a complete blogging platform from scratch using industry-standard tools and frameworks.
              </p>
              
              <div className="mt-12 pt-8 border-t border-gray-200">
                <p className="text-gray-600">
                  Built with ❤️ using modern web technologies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

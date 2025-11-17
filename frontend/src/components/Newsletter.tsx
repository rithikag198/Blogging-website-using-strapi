'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    setIsLoading(false);
    setEmail('');
  };

  if (isSubmitted) {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
        <div className="text-green-600 text-2xl mb-2">✅</div>
        <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
          Successfully Subscribed!
        </h3>
        <p className="text-green-700 dark:text-green-300">
          Thank you for subscribing to our newsletter!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl p-6">
      <h3 className="text-xl font-bold mb-3">Stay Updated</h3>
      <p className="text-white/90 mb-6 text-sm">
        Get the latest articles and insights delivered to your inbox
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-white text-orange-600 font-semibold py-3 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Subscribing...' : 'Subscribe Now'}
        </button>
      </form>
      
      <p className="text-xs text-white/70 mt-4">
        Join 10,000+ subscribers. No spam, unsubscribe anytime.
      </p>
    </div>
  );
}

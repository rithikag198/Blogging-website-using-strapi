const STRAPI_URL = 'http://localhost:1337';

export interface BlogPost {
  id: number;
  documentId: string;
  title: string;
  content: any[];
  author: string;
  published_date: string;
  slug?: string;
  excerpt?: string;
  featured_image?: {
    url: string;
    name: string;
    alternativeText?: string;
  };
  seo_title?: string;
  seo_description?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  categories?: Category[];
  tags?: Tag[];
}

export interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Tag {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ApiResponse {
  data: BlogPost[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export async function getBlogPosts(): Promise<ApiResponse> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/blog-posts?populate=featured_image`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Failed to fetch blog posts:', response.status);
      return { data: [], meta: { pagination: { page: 1, pageSize: 10, pageCount: 0, total: 0 } } };
    }

    return response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    // Return empty data on network errors
    return { 
      data: [], 
      meta: { 
        pagination: { page: 1, pageSize: 10, pageCount: 0, total: 0 } 
      } 
    };
  }
}

export async function getCategories(): Promise<{ data: Category[] }> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/categories`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('API Error:', response.status, response.statusText);
      return { data: [] };
    }

    return response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    return { data: [] };
  }
}

export async function getTags(): Promise<{ data: Tag[] }> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/tags`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('API Error:', response.status, response.statusText);
      return { data: [] };
    }

    return response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    return { data: [] };
  }
}

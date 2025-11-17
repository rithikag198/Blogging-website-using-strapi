export function calculateReadingTime(content: any[]): string {
  if (!content || !Array.isArray(content)) {
    return '1 min read';
  }

  // Extract text from content
  const text = content
    .filter(item => item.type === 'paragraph' && item.children)
    .map(item => item.children.map((child: any) => child.text).join(' '))
    .join(' ');

  // Calculate reading time (average 200 words per minute)
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);

  return `${minutes} min read`;
}

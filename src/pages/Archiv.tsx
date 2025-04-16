import React, { useState } from 'react';
import PostSummary from '../components/PostSummary';
import type { Post } from '../types';

// Placeholder data - replace with actual data fetching
const POSTS_PER_PAGE = 10;
const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1000";

const INITIAL_POSTS: Post[] = Array.from({ length: 20 }, (_, i) => ({
  id: `${i + 1}`,
  title: `Archivierter Beitrag ${i + 1}`,
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  image: PLACEHOLDER_IMAGE,
  createdAt: new Date(2024, 0, i + 1).toISOString(),
})).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

export default function Archiv() {
  const [visiblePosts, setVisiblePosts] = useState(POSTS_PER_PAGE);
  const [posts] = useState<Post[]>(INITIAL_POSTS);

  const loadMorePosts = () => {
    setVisiblePosts(prev => prev + POSTS_PER_PAGE);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Archiv</h1>
      
      <div className="space-y-12">
        {posts.slice(0, visiblePosts).map((post) => (
          <PostSummary
            key={post.id}
            post={post}
            isReversed={false}
          />
        ))}
      </div>

      {/* Load More Button */}
      {visiblePosts < posts.length && (
        <div className="text-center mt-8">
          <button
            onClick={loadMorePosts}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Weitere Beiträge laden
          </button>
        </div>
      )}
    </div>
  );
}
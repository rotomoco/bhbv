import React, { useState, useEffect, useRef } from 'react';
import PostSummary from '../components/PostSummary';
import type { Post } from '../types';
import IMAGES from '../images/images.js';
import { supabase } from '../lib/supabase';

const POSTS_PER_PAGE = 5;

export default function Home() {
  const [visiblePosts, setVisiblePosts] = useState(POSTS_PER_PAGE);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchPosts();

    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrolled = window.scrollY;
      const rate = scrolled * 0.5;
      heroRef.current.style.transform = `translate3d(0, ${rate}px, 0)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Fehler beim Laden der Beiträge');
    } finally {
      setIsLoading(false);
    }
  };

  const loadMorePosts = () => {
    setVisiblePosts(prev => prev + POSTS_PER_PAGE);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Beiträge werden geladen...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Hero/Slider Section with Parallax */}
      <div className="relative h-[60vh] overflow-hidden">
        <div
          ref={heroRef}
          className="absolute inset-0 w-full h-[120%] bg-gray-200 flex items-center justify-center transform"
          style={{
            backgroundImage: `url(${IMAGES.homebg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <div className="relative text-white text-center px-4 transform hover-scale">
            <h1 className="text-5xl font-bold mb-4">Willkommen beim BHBV</h1>
            <p className="text-xl">Baerler Heimat- und Bürgerverein e.V.</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Posts Section */}
        <div className="space-y-12">
          {posts.slice(0, visiblePosts).map((post, index) => (
            <PostSummary
              key={post.id}
              post={{
                ...post,
                createdAt: post.created_at // Map created_at to createdAt for PostSummary
              }}
              isReversed={index % 2 === 1}
            />
          ))}
        </div>

        {/* Load More Button */}
        {visiblePosts < posts.length && (
          <div className="text-center mt-12">
            <button
              onClick={loadMorePosts}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg transition-all duration-300 button-hover transform hover:scale-105 hover:bg-blue-700"
            >
              Weitere Beiträge laden
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
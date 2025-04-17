import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { ArrowRight, Image as ImageIcon } from 'lucide-react';
import type { Post } from '../types';

interface PostSummaryProps {
  post: Post & { createdAt: string }; // Accept both database fields and component-specific fields
  isReversed?: boolean;
}

export default function PostSummary({ post, isReversed }: PostSummaryProps) {
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!articleRef.current) return;
      
      const rect = articleRef.current.getBoundingClientRect();
      const scrollPosition = window.innerHeight - rect.top;
      
      if (scrollPosition > 0) {
        const translateY = Math.min(scrollPosition / 10, 20);
        articleRef.current.style.transform = `translateY(${translateY}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <article 
      ref={articleRef}
      className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 mb-12 opacity-0 animate-fade-in card-hover`}
      style={{
        animation: 'fadeIn 0.6s ease-out forwards',
      }}
    >
      <div className="md:w-1/2 image-hover rounded-lg overflow-hidden">
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-96 object-cover rounded-lg shadow-md transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-64 bg-gray-200 rounded-lg shadow-md flex items-center justify-center hover-scale">
            <div className="text-gray-600 text-center px-4">
              <ImageIcon size={48} className="mx-auto mb-2 text-gray-400" />
              <p>
                <span className="block text-lg font-semibold mb-2">Beitragsbild</span>
                <span className="block">1000 x 600 Pixel</span>
                <span className="block text-sm mt-2">Format: JPG, PNG oder WebP</span>
              </p>
            </div>
          </div>
        )}
      </div>
      
      <div className="md:w-1/2 flex flex-col">
        <time className="text-lg font-bold text-gray-800 mb-2">
          {format(new Date(post.createdAt), 'dd. MMMM yyyy', { locale: de })}
        </time>
        <h2 className="text-2xl font-bold mb-4 text-hover">{post.title}</h2>
        <p className="text-gray-600 mb-6 line-clamp-3">{post.content}</p>
        <Link
          to={`/post/${post.id}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors button-hover group"
        >
          Weiterlesen
          <ArrowRight size={20} className="ml-2 transform transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
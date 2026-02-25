import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight, Share2, Clock } from 'lucide-react';
import Badge from './ui/Badge';

interface BlogDetailModalProps {
  post: {
    _id: string;
    title: string;
    category: string;
    readTime: string;
    excerpt: string;
    date: string;
    image: string;
    content?: string;
  };
  isOpen: boolean;
  onClose: () => void;
  currentIndex: number;
  totalPosts: number;
  onPrevious: () => void;
  onNext: () => void;
}

const BlogDetailModal: React.FC<BlogDetailModalProps> = ({
  post,
  isOpen,
  onClose,
  currentIndex,
  totalPosts,
  onPrevious,
  onNext,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      console.log('Blog modal opened:', post?.title);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, post]);

  if (!isOpen || !mounted || !post) {
    return null;
  }

  // Helper to get the first image URL from a string that may contain multiple URLs (one per line)
  const getFirstImageUrl = (image: string): string | null => {
    if (!image) return null;
    const urls = image.split('\n').map(url => url.trim()).filter(url => url);
    const firstUrl = urls.find(url => url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/'));
    return firstUrl || null;
  };

  const firstImageUrl = post.image ? getFirstImageUrl(post.image) : null;
  const isGradient = post.image && post.image.startsWith('gradient-');

  const getGradientClass = (gradient: string) => {
    const gradients = {
      'gradient-1': 'from-accent to-accent2',
      'gradient-2': 'from-blue-500 to-purple-600',
      'gradient-3': 'from-green-500 to-teal-600',
      'gradient-4': 'from-orange-500 to-red-600',
      'gradient-5': 'from-purple-500 to-pink-600',
      'gradient-6': 'from-yellow-500 to-orange-600',
    };
    return gradients[gradient as keyof typeof gradients] || 'from-accent to-accent2';
  };

  // Split content by double newlines to create paragraphs
  const contentParagraphs = post.content 
    ? post.content.split('\n\n').filter(p => p.trim())
    : [post.excerpt];

  const modalContent = (
    <div 
      className="fixed inset-0 z-[9999] flex items-start justify-center bg-black/80 backdrop-blur-sm overflow-y-auto p-2 lg:p-4"
      onClick={onClose}
      style={{ zIndex: 9999 }}
    >
      <div 
        className="relative w-full max-w-4xl bg-card border border-border rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl my-4 lg:my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 lg:top-4 lg:right-4 z-10 w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
        >
          <X size={18} className="lg:w-5 lg:h-5" />
        </button>

        {/* Blog Image */}
        <div className="relative w-full h-48 sm:h-64 lg:h-96 overflow-hidden">
          {firstImageUrl ? (
            <img 
              src={firstImageUrl} 
              alt={post.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.className = `relative w-full h-96 overflow-hidden bg-gradient-to-br ${getGradientClass(post.image || 'gradient-1')} flex items-center justify-center`;
                  parent.innerHTML = '<div class="text-white/80 text-2xl font-bold">' + post.title + '</div>';
                }
              }}
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${isGradient ? getGradientClass(post.image) : 'from-accent to-accent2'} flex items-center justify-center`}>
              <div className="text-white/80 text-2xl font-bold text-center px-8">{post.title}</div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <Badge variant="accent">{post.category}</Badge>
          </div>

          {/* Navigation Overlay */}
          <div className="absolute bottom-2 sm:bottom-4 left-0 right-0 px-3 sm:px-6">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 lg:gap-3">
                <button 
                  onClick={(e) => { e.stopPropagation(); onPrevious(); }}
                  className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors backdrop-blur-sm"
                >
                  <ChevronLeft size={16} className="lg:w-5 lg:h-5" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); onNext(); }}
                  className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors backdrop-blur-sm"
                >
                  <ChevronRight size={16} className="lg:w-5 lg:h-5" />
                </button>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-white/90 text-xs lg:text-sm font-medium cursor-pointer hover:text-white transition-colors">
                <Share2 size={14} className="lg:w-4 lg:h-4" />
                <span>share</span>
              </div>
              <div className="flex items-center gap-1.5 lg:gap-2">
                <div className="flex gap-1 lg:gap-1.5">
                  {Array.from({ length: totalPosts }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 lg:h-2 rounded-full transition-all ${
                        i === currentIndex ? 'bg-white w-4 lg:w-6' : 'bg-white/40 w-1.5 lg:w-2'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-white/90 text-xs lg:text-sm font-medium ml-2 lg:ml-3">
                  {String(currentIndex + 1).padStart(2, '0')}/{String(totalPosts).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Content */}
        <div className="p-4 sm:p-6 lg:p-8 xl:p-12">
          {/* Date */}
          <div className="text-muted text-xs sm:text-sm mb-3 lg:mb-4">{post.date}</div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text mb-4 lg:mb-6 leading-tight">{post.title}</h1>

          {/* Read Time */}
          <div className="flex items-center gap-2 text-muted mb-4 lg:mb-8 text-sm">
            <Clock size={14} className="lg:w-4 lg:h-4" />
            <span>{post.readTime}</span>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            {contentParagraphs.map((paragraph, index) => (
              <p key={index} className="text-text/90 leading-relaxed mb-4 lg:mb-6 text-sm sm:text-base">
                {paragraph.trim()}
              </p>
            ))}
          </div>

          {/* Leave a Reply Section */}
          <div className="mt-8 lg:mt-12 pt-6 lg:pt-8 border-t border-border">
            <h3 className="text-xl lg:text-2xl font-bold text-text mb-4 lg:mb-6">Leave a Reply</h3>
            <form className="space-y-3 lg:space-y-4">
              <div className="grid sm:grid-cols-2 gap-3 lg:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-text mb-1 lg:mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-3 lg:px-4 py-2 bg-panel border border-border rounded-lg text-text text-sm focus:outline-none focus:border-accent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-text mb-1 lg:mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 lg:px-4 py-2 bg-panel border border-border rounded-lg text-text text-sm focus:outline-none focus:border-accent"
                    placeholder="Your email"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-text mb-1 lg:mb-2">Website</label>
                <input
                  type="url"
                  className="w-full px-3 lg:px-4 py-2 bg-panel border border-border rounded-lg text-text text-sm focus:outline-none focus:border-accent"
                  placeholder="Your website (optional)"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-text mb-1 lg:mb-2">Comment</label>
                <textarea
                  rows={4}
                  className="w-full px-3 lg:px-4 py-2 bg-panel border border-border rounded-lg text-text text-sm focus:outline-none focus:border-accent resize-none"
                  placeholder="Your comment"
                />
              </div>
              <button
                type="submit"
                className="bg-accent hover:bg-accent2 text-white px-6 lg:px-8 py-2.5 lg:py-3 rounded-lg font-medium text-sm lg:text-base transition-all duration-200 w-full sm:w-auto"
              >
                SUBMIT NOW
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default BlogDetailModal;


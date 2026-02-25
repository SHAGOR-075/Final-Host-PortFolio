import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight, Share2, ThumbsUp, ArrowRight } from 'lucide-react';
import Button from './ui/Button';
import Badge from './ui/Badge';

interface WorkDetailModalProps {
  project: {
    _id: string;
    title: string;
    category: string;
    image: string;
    likes: number;
    link: string;
    description?: string;
  };
  isOpen: boolean;
  onClose: () => void;
  currentIndex: number;
  totalProjects: number;
  onPrevious: () => void;
  onNext: () => void;
}

const WorkDetailModal: React.FC<WorkDetailModalProps> = ({
  project,
  isOpen,
  onClose,
  currentIndex,
  totalProjects,
  onPrevious,
  onNext,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(project.likes);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in overflow-y-auto p-2 lg:p-4"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-7xl bg-card border border-border rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl max-h-[95vh] lg:max-h-[90vh] flex flex-col lg:flex-row my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 lg:top-4 lg:right-4 z-10 w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
        >
          <X size={18} className="lg:w-5 lg:h-5" />
        </button>

        {/* Left Section - Project Image */}
        <div className="lg:w-1/2 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] relative overflow-hidden p-4 lg:p-8 xl:p-12 flex items-center justify-center min-h-[300px] lg:min-h-[600px]">
          {/* Gradient Glows */}
          <div className="absolute top-0 left-0 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

          {/* Project Image Container */}
          <div className="relative w-full h-full max-w-2xl rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl border border-white/10 z-10">
            {(() => {
              // Helper to get the first image URL from a string that may contain multiple URLs (one per line)
              const getFirstImageUrl = (image: string): string | null => {
                if (!image) return null;
                const urls = image.split('\n').map(url => url.trim()).filter(url => url);
                const firstUrl = urls.find(url => url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/'));
                return firstUrl || null;
              };

              const firstImageUrl = project.image ? getFirstImageUrl(project.image) : null;
              
              return firstImageUrl ? (
                <img 
                  src={firstImageUrl} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to gradient if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.className = 'relative w-full h-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border border-white/10 z-10 bg-gradient-to-br from-accent/20 to-accent2/20 flex items-center justify-center';
                      parent.innerHTML = '<div class="text-white/50 text-lg">Image not available</div>';
                    }
                  }}
                />
              ) : (
                <div className={`w-full h-full bg-gradient-to-br ${
                  project.image === 'gradient-1' ? 'from-accent to-accent2' :
                  project.image === 'gradient-2' ? 'from-blue-500 to-purple-600' :
                  project.image === 'gradient-3' ? 'from-green-500 to-teal-600' :
                  project.image === 'gradient-4' ? 'from-orange-500 to-red-600' :
                  project.image === 'gradient-5' ? 'from-purple-500 to-pink-600' :
                  project.image === 'gradient-6' ? 'from-yellow-500 to-orange-600' :
                  'from-accent to-accent2'
                } flex items-center justify-center`}>
                  <div className="text-white/80 text-2xl font-bold">{project.title}</div>
                </div>
              );
            })()}

            {/* Bottom Navigation Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-3 lg:p-6">
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
                    {Array.from({ length: totalProjects }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 lg:h-2 rounded-full transition-all ${
                          i === currentIndex ? 'bg-white w-4 lg:w-6' : 'bg-white/40 w-1.5 lg:w-2'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-white/90 text-xs lg:text-sm font-medium ml-2 lg:ml-3">
                    {String(currentIndex + 1).padStart(2, '0')}/{String(totalProjects).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Project Details */}
        <div className="lg:w-1/2 bg-card p-4 sm:p-6 lg:p-8 xl:p-12 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Category Badge */}
            <div className="mb-4 lg:mb-8">
              <Badge variant="secondary" className="text-muted text-xs">
                Featured - {project.category}
              </Badge>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-text mb-4 lg:mb-8 leading-tight">
              {project.title}.
            </h2>

            {/* Description */}
            {project.description ? (
              <div className="space-y-3 lg:space-y-5 text-muted mb-4 lg:mb-8 text-sm leading-relaxed">
                {project.description.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            ) : (
              <div className="space-y-3 lg:space-y-5 text-muted mb-4 lg:mb-8 text-sm leading-relaxed">
                <p>
                  No description available for this project. Please contact the administrator for more information.
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 mt-4 lg:mt-8">
            <button
              onClick={handleLike}
              className={`flex items-center justify-center gap-2 px-4 lg:px-6 py-2.5 lg:py-3.5 rounded-lg font-semibold text-xs lg:text-sm transition-all duration-200 ${
                isLiked
                  ? 'bg-accent text-white hover:bg-accent2 shadow-lg'
                  : 'bg-card2 text-text border border-border hover:bg-card hover:border-accent/30'
              }`}
            >
              <ThumbsUp size={16} className="lg:w-[18px] lg:h-[18px]" />
              <span className="whitespace-nowrap">LIKE THIS ({likeCount})</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-4 lg:px-6 py-2.5 lg:py-3.5 rounded-lg font-semibold text-xs lg:text-sm bg-accent text-white hover:bg-accent2 transition-all duration-200 hover:shadow-accent">
              <span className="whitespace-nowrap">VIEW PROJECT</span>
              <ArrowRight size={16} className="lg:w-[18px] lg:h-[18px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default WorkDetailModal;


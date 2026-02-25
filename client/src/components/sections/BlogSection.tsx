import React, { useState, useEffect } from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import BlogDetailModal from '../BlogDetailModal';
import { blogAPI } from '../../lib/api';

interface BlogPost {
  _id: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  date: string;
  image: string;
  content?: string;
}

const BlogSection = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await blogAPI.getAll();
        setBlogPosts(data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Helper to get the first image URL from a string that may contain multiple URLs (one per line)
  const getFirstImageUrl = (image: string): string | null => {
    if (!image) return null;
    const urls = image.split('\n').map(url => url.trim()).filter(url => url);
    const firstUrl = urls.find(url => url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/'));
    return firstUrl || null;
  };

  const isImageUrl = (image: string) => {
    if (!image) return false;
    // Check if it's a gradient
    if (image.startsWith('gradient-')) return false;
    // Check if any line is a URL
    const urls = image.split('\n').map(url => url.trim()).filter(url => url);
    return urls.some(url => url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/'));
  };

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

  const handlePostClick = (postId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    console.log('Blog post clicked:', postId, 'Posts:', blogPosts.length);
    setSelectedPost(postId);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  const handlePrevious = () => {
    if (selectedPost !== null) {
      const currentIndex = blogPosts.findIndex(p => p._id === selectedPost);
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : blogPosts.length - 1;
      setSelectedPost(blogPosts[prevIndex]._id);
    }
  };

  const handleNext = () => {
    if (selectedPost !== null) {
      const currentIndex = blogPosts.findIndex(p => p._id === selectedPost);
      const nextIndex = currentIndex < blogPosts.length - 1 ? currentIndex + 1 : 0;
      setSelectedPost(blogPosts[nextIndex]._id);
    }
  };

  const selectedPostData = selectedPost 
    ? blogPosts.find(p => p._id === selectedPost) 
    : null;

  const currentIndex = selectedPost 
    ? blogPosts.findIndex(p => p._id === selectedPost) 
    : 0;

  return (
    <>
      <div className="space-y-8 animate-slide-up">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-text mb-4">Latest Blog Posts</h2>
          <p className="text-muted">Thoughts, insights, and tutorials on development</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted">Loading blog posts...</p>
          </div>
        ) : blogPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted">No blog posts available</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => {
              const firstImageUrl = getFirstImageUrl(post.image);
              return (
                <Card 
                  key={post._id} 
                  className="p-0 overflow-hidden card-hover group cursor-pointer"
                  onClick={(e) => handlePostClick(post._id, e)}
                >
                  {/* Blog Image */}
                  <div className={`aspect-video relative overflow-hidden ${!isImageUrl(post.image) ? `bg-gradient-to-br ${getGradientClass(post.image)}` : 'bg-card'}`}>
                    {firstImageUrl ? (
                      <img 
                        src={firstImageUrl} 
                        alt={post.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to gradient if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement?.classList.add(`bg-gradient-to-br`, getGradientClass('gradient-1'));
                        }}
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-200"></div>
                    <div className="absolute top-4 left-4">
                      <Badge variant="accent">{post.category}</Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-2 text-white/80 text-sm">
                        <Clock size={14} />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Blog Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-text mb-2 group-hover:text-accent transition-colors duration-200">
                      {post.title}
                    </h3>
                    <p className="text-muted text-sm mb-4 leading-relaxed">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted">{post.date}</span>
                      <div className="flex items-center gap-1 text-accent group-hover:gap-2 transition-all duration-200">
                        <span className="text-sm">Read More</span>
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        <div className="text-center">
          <Button variant="secondary">See More Posts</Button>
        </div>
      </div>

      {/* Blog Detail Modal */}
      {selectedPostData && selectedPost !== null && (
        <BlogDetailModal
          post={selectedPostData}
          isOpen={true}
          onClose={handleCloseModal}
          currentIndex={currentIndex}
          totalPosts={blogPosts.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      )}
    </>
  );
};

export default BlogSection;

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Save } from 'lucide-react';
import { blogAPI } from '../lib/api';

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

const BlogManagement = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await blogAPI.getAll();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      alert('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState<Omit<BlogPost, '_id'>>({
    title: '',
    category: '',
    readTime: '',
    excerpt: '',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    image: 'gradient-1',
    content: '',
  });

  const handleAdd = () => {
    setEditingPost(null);
    setFormData({
      title: '',
      category: '',
      readTime: '',
      excerpt: '',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      image: 'gradient-1',
      content: '',
    });
    setIsModalOpen(true);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      category: post.category,
      readTime: post.readTime,
      excerpt: post.excerpt,
      date: post.date,
      image: post.image,
      content: post.content || '',
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      try {
        await blogAPI.delete(id);
        await fetchPosts();
      } catch (error: any) {
        alert(error.message || 'Failed to delete blog post');
      }
    }
  };

  const handleSave = async () => {
    try {
      if (editingPost) {
        await blogAPI.update(editingPost._id, formData);
      } else {
        await blogAPI.create(formData);
      }
      await fetchPosts();
      setIsModalOpen(false);
    } catch (error: any) {
      alert(error.message || 'Failed to save blog post');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-text">Blog Management</h1>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-accent hover:bg-accent2 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
        >
          <Plus size={20} />
          Add Blog Post
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted">Loading blog posts...</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-card border border-border rounded-lg p-6 flex items-center gap-4"
            >
              {post.image && (post.image.startsWith('http://') || post.image.startsWith('https://') || post.image.startsWith('/')) ? (
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-24 h-24 object-cover rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : (
                <div className={`w-24 h-24 rounded-lg bg-gradient-to-br ${
                  post.image === 'gradient-1' ? 'from-accent to-accent2' :
                  post.image === 'gradient-2' ? 'from-blue-500 to-purple-600' :
                  post.image === 'gradient-3' ? 'from-green-500 to-teal-600' :
                  post.image === 'gradient-4' ? 'from-orange-500 to-red-600' :
                  post.image === 'gradient-5' ? 'from-purple-500 to-pink-600' :
                  post.image === 'gradient-6' ? 'from-yellow-500 to-orange-600' :
                  'from-accent to-accent2'
                }`} />
              )}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-text mb-2">{post.title}</h3>
                <p className="text-muted text-sm mb-1">{post.category} • {post.readTime}</p>
                <p className="text-muted text-sm">{post.excerpt.substring(0, 100)}...</p>
              </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleEdit(post)}
                className="p-2 bg-panel hover:bg-card2 rounded-lg text-text transition-colors"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={() => handleDelete(post._id)}
                className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-text">
                {editingPost ? 'Edit Blog Post' : 'Add Blog Post'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-muted hover:text-text transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 bg-panel border border-border rounded-lg text-text focus:outline-none focus:border-accent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 bg-panel border border-border rounded-lg text-text focus:outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">Read Time</label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    className="w-full px-4 py-2 bg-panel border border-border rounded-lg text-text focus:outline-none focus:border-accent"
                    placeholder="5 min read"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">Excerpt</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 bg-panel border border-border rounded-lg text-text focus:outline-none focus:border-accent resize-none"
                  placeholder="Short summary of the blog post"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">Content</label>
                <textarea
                  value={formData.content || ''}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={10}
                  className="w-full px-4 py-2 bg-panel border border-border rounded-lg text-text focus:outline-none focus:border-accent resize-none"
                  placeholder="Full blog post content. Use double line breaks to separate paragraphs."
                />
                <p className="text-xs text-muted mt-1">
                  This is the full content that will be displayed in the blog detail page. Use double line breaks (press Enter twice) to create paragraphs.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Date</label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2 bg-panel border border-border rounded-lg text-text focus:outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">Image URL or Gradient</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-4 py-2 bg-panel border border-border rounded-lg text-text focus:outline-none focus:border-accent"
                    placeholder="Enter image URL or select gradient below"
                  />
                  <div className="mt-2">
                    <label className="block text-xs text-muted mb-1">Quick Select Gradient:</label>
                    <select
                      onChange={(e) => {
                        if (e.target.value) {
                          setFormData({ ...formData, image: e.target.value });
                        }
                      }}
                      className="w-full px-3 py-1.5 bg-panel border border-border rounded-lg text-text text-sm focus:outline-none focus:border-accent"
                    >
                      <option value="">Select a gradient...</option>
                      <option value="gradient-1">Gradient 1</option>
                      <option value="gradient-2">Gradient 2</option>
                      <option value="gradient-3">Gradient 3</option>
                      <option value="gradient-4">Gradient 4</option>
                      <option value="gradient-5">Gradient 5</option>
                      <option value="gradient-6">Gradient 6</option>
                    </select>
                  </div>
                </div>
                {formData.image && (
                  <div className="mt-3">
                    <label className="block text-xs text-muted mb-2">Preview:</label>
                    <div className="aspect-video rounded-lg overflow-hidden border border-border">
                      {formData.image && (formData.image.startsWith('http://') || formData.image.startsWith('https://') || formData.image.startsWith('/')) ? (
                        <img 
                          src={formData.image} 
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-accent to-accent2"></div>';
                          }}
                        />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${
                          formData.image === 'gradient-1' ? 'from-accent to-accent2' :
                          formData.image === 'gradient-2' ? 'from-blue-500 to-purple-600' :
                          formData.image === 'gradient-3' ? 'from-green-500 to-teal-600' :
                          formData.image === 'gradient-4' ? 'from-orange-500 to-red-600' :
                          formData.image === 'gradient-5' ? 'from-purple-500 to-pink-600' :
                          formData.image === 'gradient-6' ? 'from-yellow-500 to-orange-600' :
                          'from-accent to-accent2'
                        }`} />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-2 bg-accent hover:bg-accent2 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200"
              >
                <Save size={18} />
                Save
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-3 bg-panel hover:bg-card2 text-text rounded-lg font-medium transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManagement;


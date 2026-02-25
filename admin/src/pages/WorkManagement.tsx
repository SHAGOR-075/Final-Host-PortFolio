import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Save } from 'lucide-react';
import { workAPI } from '../lib/api';

interface WorkItem {
  _id: string;
  title: string;
  category: string;
  image: string;
  likes: number;
  link: string;
  description?: string;
  role?: string;
  tools?: string[];
  features?: string[];
  liveDemoUrl?: string;
  sourceCodeUrl?: string;
}

const WorkManagement = () => {
  const [works, setWorks] = useState<WorkItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorks();
  }, []);

  const fetchWorks = async () => {
    try {
      setLoading(true);
      const data = await workAPI.getAll();
      setWorks(data);
    } catch (error) {
      console.error('Error fetching works:', error);
      alert('Failed to load works');
    } finally {
      setLoading(false);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWork, setEditingWork] = useState<WorkItem | null>(null);
  const [formData, setFormData] = useState<Omit<WorkItem, '_id'>>({
    title: '',
    category: '',
    image: 'gradient-1',
    likes: 0,
    link: '',
    description: '',
    role: '',
    tools: [],
    features: [],
    liveDemoUrl: '',
    sourceCodeUrl: '',
  });
  const [toolsText, setToolsText] = useState('');
  const [featuresText, setFeaturesText] = useState('');

  const handleAdd = () => {
    setEditingWork(null);
    setFormData({
      title: '',
      category: '',
      image: '',
      likes: 0,
      link: '',
      description: '',
      role: '',
      tools: [],
      features: [],
      liveDemoUrl: '',
      sourceCodeUrl: '',
    });
    setToolsText('');
    setFeaturesText('');
    setIsModalOpen(true);
  };

  const handleEdit = (work: WorkItem) => {
    setEditingWork(work);
    setFormData({
      title: work.title,
      category: work.category,
      image: work.image,
      likes: work.likes,
      link: work.link,
      description: work.description || '',
      role: work.role || '',
      tools: work.tools || [],
      features: work.features || [],
      liveDemoUrl: work.liveDemoUrl || '',
      sourceCodeUrl: work.sourceCodeUrl || '',
    });
    setToolsText((work.tools || []).join(', '));
    setFeaturesText((work.features || []).join('\n'));
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this work item?')) {
      try {
        await workAPI.delete(id);
        await fetchWorks();
      } catch (error: any) {
        alert(error.message || 'Failed to delete work item');
      }
    }
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...formData,
        tools: toolsText
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
        features: featuresText
          .split('\n')
          .map((f) => f.trim())
          .filter(Boolean),
      };

      if (editingWork) {
        await workAPI.update(editingWork._id, payload);
      } else {
        await workAPI.create(payload);
      }
      await fetchWorks();
      setIsModalOpen(false);
    } catch (error: any) {
      alert(error.message || 'Failed to save work item');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-text">Work Management</h1>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-accent hover:bg-accent2 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
        >
          <Plus size={20} />
          Add Work
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted">Loading works...</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {works.map((work) => {
            // Helper to get the first image URL from a string that may contain multiple URLs (one per line)
            const getFirstImageUrl = (image: string): string | null => {
              if (!image) return null;
              const urls = image.split('\n').map(url => url.trim()).filter(url => url);
              const firstUrl = urls.find(url => url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/'));
              return firstUrl || null;
            };

            const firstImageUrl = work.image ? getFirstImageUrl(work.image) : null;
            const isGradient = work.image && work.image.startsWith('gradient-');

            return (
              <div
                key={work._id}
                className="bg-card border border-border rounded-lg p-6 flex items-center gap-4"
              >
                {firstImageUrl ? (
                  <img 
                    src={firstImageUrl} 
                    alt={work.title}
                    className="w-24 h-24 object-cover rounded-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className={`w-24 h-24 rounded-lg bg-gradient-to-br ${
                    isGradient && work.image === 'gradient-1' ? 'from-accent to-accent2' :
                    isGradient && work.image === 'gradient-2' ? 'from-blue-500 to-purple-600' :
                    isGradient && work.image === 'gradient-3' ? 'from-green-500 to-teal-600' :
                    isGradient && work.image === 'gradient-4' ? 'from-orange-500 to-red-600' :
                    isGradient && work.image === 'gradient-5' ? 'from-purple-500 to-pink-600' :
                    isGradient && work.image === 'gradient-6' ? 'from-yellow-500 to-orange-600' :
                    'from-accent to-accent2'
                  }`} />
                )}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-text mb-2">{work.title}</h3>
                <p className="text-muted">{work.category}</p>
              </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleEdit(work)}
                    className="p-2 bg-panel hover:bg-card2 rounded-lg text-text transition-colors"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(work._id)}
                    className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-border">
              <h2 className="text-2xl font-bold text-text">
                {editingWork ? 'Edit Work' : 'Add Work'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-muted hover:text-text transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-1 p-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 bg-panel border border-border rounded-lg text-text focus:outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 bg-panel border border-border rounded-lg text-text focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-text mb-2">
                  Role (e.g. Full Stack Developer)
                </label>
                <input
                  type="text"
                  value={formData.role || ''}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-2 bg-panel border border-border rounded-lg text-text focus:outline-none focus:border-accent"
                  placeholder="Full Stack Developer"
                />
              </div>

              {/* Image Section */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-text mb-2">Enter Image URL(s)</label>
                <textarea
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 bg-panel border border-border rounded-lg text-text focus:outline-none focus:border-accent resize-none"
                  placeholder="Enter one or more image URLs, one per line:&#10;https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                />
                <p className="text-xs text-muted mt-1">
                  Enter multiple image URLs, one per line. The first image will be used as the main image.
                </p>

                {/* Preview */}
                {formData.image && (() => {
                  const imageUrls = formData.image
                    .split('\n')
                    .map(url => url.trim())
                    .filter(url => url && (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')));
                  
                  return imageUrls.length > 0 ? (
                    <div className="mt-3">
                      <label className="block text-xs text-muted mb-2">Preview ({imageUrls.length} image{imageUrls.length > 1 ? 's' : ''}):</label>
                      <div className="grid grid-cols-2 gap-2">
                        {imageUrls.map((url, index) => (
                          <div key={index} className="aspect-video rounded-lg overflow-hidden border border-border bg-panel">
                            <img 
                              src={url} 
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                                const parent = (e.target as HTMLImageElement).parentElement;
                                if (parent) {
                                  parent.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-accent/20 to-accent2/20 flex items-center justify-center text-white/50 text-xs">Failed to load</div>';
                                }
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null;
                })()}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Likes</label>
                  <input
                    type="number"
                    value={formData.likes}
                    onChange={(e) => setFormData({ ...formData, likes: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 bg-panel border border-border rounded-lg text-text focus:outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">Link</label>
                  <input
                    type="text"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    className="w-full px-4 py-2 bg-panel border border-border rounded-lg text-text focus:outline-none focus:border-accent"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Live Demo URL</label>
                  <input
                    type="text"
                    value={formData.liveDemoUrl || ''}
                    onChange={(e) => setFormData({ ...formData, liveDemoUrl: e.target.value })}
                    className="w-full px-4 py-2 bg-panel border border-border rounded-lg text-text focus:outline-none focus:border-accent"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Source Code URL</label>
                  <input
                    type="text"
                    value={formData.sourceCodeUrl || ''}
                    onChange={(e) => setFormData({ ...formData, sourceCodeUrl: e.target.value })}
                    className="w-full px-4 py-2 bg-panel border border-border rounded-lg text-text focus:outline-none focus:border-accent"
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Tools (comma separated)
                  </label>
                  <textarea
                    rows={3}
                    value={toolsText}
                    onChange={(e) => setToolsText(e.target.value)}
                    className="w-full px-4 py-2 bg-panel border border-border rounded-lg text-text focus:outline-none focus:border-accent resize-none text-sm"
                    placeholder="Next.js, Supabase, React, Tailwind CSS"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Features (one per line)
                  </label>
                  <textarea
                    rows={3}
                    value={featuresText}
                    onChange={(e) => setFeaturesText(e.target.value)}
                    className="w-full px-4 py-2 bg-panel border border-border rounded-lg text-text focus:outline-none focus:border-accent resize-none text-sm"
                    placeholder={`Real-time Updates\nPrivate & Safe Messaging\nPush Notifications`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">Description</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 bg-panel border border-border rounded-lg text-text focus:outline-none focus:border-accent resize-none"
                  placeholder="Enter project description..."
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex gap-3 p-6 border-t border-border">
              <button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-2 bg-accent hover:bg-accent2 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200"
              >
                <Save size={18} />
                Save
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-3 bg-panel hover:bg-card2 text-text rounded-lg font-medium transition-all duration-200"
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

export default WorkManagement;


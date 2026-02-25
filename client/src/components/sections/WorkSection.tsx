import React, { useState, useEffect } from 'react';
import { ExternalLink, Code2 } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import WorkDetailModal from '../WorkDetailModal';
import { workAPI } from '../../lib/api';

interface Project {
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

const WorkSection = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await workAPI.getAll();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
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

  const handleProjectClick = (projectId: string) => {
    setSelectedProject(projectId);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const handlePrevious = () => {
    if (selectedProject !== null) {
      const currentIndex = projects.findIndex(p => p._id === selectedProject);
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : projects.length - 1;
      setSelectedProject(projects[prevIndex]._id);
    }
  };

  const handleNext = () => {
    if (selectedProject !== null) {
      const currentIndex = projects.findIndex(p => p._id === selectedProject);
      const nextIndex = currentIndex < projects.length - 1 ? currentIndex + 1 : 0;
      setSelectedProject(projects[nextIndex]._id);
    }
  };

  const selectedProjectData = selectedProject 
    ? projects.find(p => p._id === selectedProject) 
    : null;

  const currentIndex = selectedProject 
    ? projects.findIndex(p => p._id === selectedProject) 
    : 0;

  return (
  <>
    <div className="space-y-8 animate-slide-up">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-text mb-2">My Work</h2>
        <p className="text-muted">Selected projects showcasing my full-stack skills</p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted">Loading projects...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted">No projects available</p>
        </div>
      ) : (
        <div className="space-y-6">
          {projects.map((project) => {
            const firstImageUrl = getFirstImageUrl(project.image);
            const liveUrl = project.liveDemoUrl || project.link || '';
            const sourceUrl = project.sourceCodeUrl || '';
            const tools = project.tools || [];
            const features = project.features || [];

            return (
              <Card
                key={project._id}
                className="overflow-hidden bg-panel border border-border rounded-2xl"
              >
                <div className="border-b border-border px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <p className="text-sm text-muted font-medium">{project.title}</p>
                  <span className="text-xs px-2 py-1 rounded-full bg-card2 text-muted border border-border">
                    {project.category}
                  </span>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 px-6 py-6">
                  {/* Left: screenshot */}
                  <div
                    className="lg:w-1/2 cursor-pointer"
                    onClick={() => handleProjectClick(project._id)}
                  >
                    <div className="rounded-xl border border-border bg-black overflow-hidden">
                      <div className="aspect-video bg-card">
                        {firstImageUrl ? (
                          <img
                            src={firstImageUrl}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className={`w-full h-full bg-gradient-to-br ${getGradientClass(project.image)}`} />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: code-style details */}
                  <div className="lg:w-1/2">
                    <div className="bg-black/70 border border-border rounded-xl px-5 py-4 font-mono text-sm text-muted leading-relaxed">
                      <div className="flex items-center gap-2 mb-3">
                        <Code2 size={16} className="text-accent" />
                        <span className="text-xs uppercase tracking-[0.2em] text-muted">
                          const project = {'{'}
                        </span>
                      </div>

                      <div className="space-y-3 pl-4">
                        <div className="flex gap-2">
                          <span className="text-sky-400">role</span>
                          <span className="text-white/60">:</span>
                          <span className="text-amber-300">
                            '{project.role || 'Full Stack Developer'}',
                          </span>
                        </div>

                        <div>
                          <div className="flex gap-2 mb-2">
                            <span className="text-sky-400">tools</span>
                            <span className="text-white/60">:</span>
                            <span className="text-white/60">[</span>
                          </div>
                          <div className="flex flex-wrap gap-2 pl-6">
                            {tools.map((tool, idx) => (
                              <span
                                key={idx}
                                className="px-2.5 py-1 rounded-full bg-card text-xs text-white border border-border"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                          <span className="pl-4 text-white/60">],</span>
                        </div>

                        {features.length > 0 && (
                          <div>
                            <div className="flex gap-2 mb-1">
                              <span className="text-sky-400">features</span>
                              <span className="text-white/60">:</span>
                              <span className="text-white/60">[</span>
                            </div>
                            <div className="pl-6 space-y-1">
                              {features.map((feature, idx) => (
                                <div key={idx} className="text-emerald-300">
                                  '{feature}',
                                </div>
                              ))}
                            </div>
                            <span className="pl-4 text-white/60">]</span>
                          </div>
                        )}
                      </div>

                      <span className="text-xs text-muted block mt-3">
                        {'}'}
                      </span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-3">
                      {liveUrl && (
                        <Button
                          asChild
                          variant="primary"
                          className="flex items-center gap-2 text-sm"
                        >
                          <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink size={16} />
                            Live Demo
                          </a>
                        </Button>
                      )}
                      {sourceUrl && (
                        <Button
                          asChild
                          variant="secondary"
                          className="flex items-center gap-2 text-sm"
                        >
                          <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
                            <Code2 size={16} />
                            Source Code
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>

      {selectedProjectData && selectedProject !== null && (
        <WorkDetailModal
          project={selectedProjectData}
          isOpen={true}
          onClose={handleCloseModal}
          currentIndex={currentIndex}
          totalProjects={projects.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      )}
    </>
  );
};

export default WorkSection;

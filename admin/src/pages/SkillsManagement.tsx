import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Save } from 'lucide-react';
import { skillsAPI } from '../lib/api';

type SkillType = 'design' | 'development' | 'tools';

interface Skill {
  _id: string;
  name: string;
  percentage: number;
  type: SkillType;
  icon?: string;
}

const SkillsManagement = () => {
  const [designSkills, setDesignSkills] = useState<Skill[]>([]);
  const [developmentSkills, setDevelopmentSkills] = useState<Skill[]>([]);
  const [toolsSkills, setToolsSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const [design, development, tools] = await Promise.all([
        skillsAPI.getAll('design'),
        skillsAPI.getAll('development'),
        skillsAPI.getAll('tools'),
      ]);
      setDesignSkills(design);
      setDevelopmentSkills(development);
      setToolsSkills(tools);
    } catch (error) {
      console.error('Error fetching skills:', error);
      alert('Failed to load skills');
    } finally {
      setLoading(false);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [skillType, setSkillType] = useState<SkillType>('design');
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [formData, setFormData] = useState<Omit<Skill, '_id' | 'type'>>({
    name: '',
    percentage: 0,
    icon: '',
  });

  const handleAdd = (type: SkillType) => {
    setSkillType(type);
    setEditingSkill(null);
    setFormData({ name: '', percentage: 0, icon: '' });
    setIsModalOpen(true);
  };

  const handleEdit = (skill: Skill, type: SkillType) => {
    setSkillType(type);
    setEditingSkill(skill);
    setFormData({ name: skill.name, percentage: skill.percentage, icon: skill.icon || '' });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this skill?')) {
      try {
        await skillsAPI.delete(id);
        await fetchSkills();
      } catch (error: any) {
        alert(error.message || 'Failed to delete skill');
      }
    }
  };

  const handleSave = async () => {
    try {
      if (editingSkill) {
        await skillsAPI.update(editingSkill._id, { ...formData, type: skillType });
      } else {
        await skillsAPI.create({ ...formData, type: skillType });
      }
      await fetchSkills();
      setIsModalOpen(false);
    } catch (error: any) {
      alert(error.message || 'Failed to save skill');
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-text">Skills Management</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Frontend (design) */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-text">Frontend</h2>
            <button
              onClick={() => handleAdd('design')}
              className="flex items-center gap-2 bg-accent hover:bg-accent2 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm"
            >
              <Plus size={18} />
              Add Skill
            </button>
          </div>

          {loading ? (
            <p className="text-muted">Loading skills...</p>
          ) : (
            <div className="space-y-4">
              {designSkills.map((skill) => (
                <div
                  key={skill._id}
                  className="bg-panel border border-border rounded-lg p-4 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-9 h-9 rounded-lg bg-card2 flex items-center justify-center overflow-hidden">
                      {skill.icon ? (
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <span className="text-xs font-semibold text-muted">
                          {skill.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-text font-medium text-sm">{skill.name}</span>
                        <span className="text-accent font-semibold text-xs">
                          {skill.percentage}%
                        </span>
                      </div>
                      <div className="w-full bg-card2 rounded-full h-1.5">
                        <div
                          className="bg-accent h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${skill.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(skill, 'design')}
                    className="p-2 bg-card hover:bg-card2 rounded-lg text-text transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(skill._id, 'design')}
                    className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
            </div>
          )}
        </div>

        {/* Backend (development) */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-text">Backend</h2>
            <button
              onClick={() => handleAdd('development')}
              className="flex items-center gap-2 bg-accent hover:bg-accent2 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm"
            >
              <Plus size={18} />
              Add Skill
            </button>
          </div>

          {loading ? (
            <p className="text-muted">Loading skills...</p>
          ) : (
            <div className="space-y-4">
              {developmentSkills.map((skill) => (
                <div
                  key={skill._id}
                  className="bg-panel border border-border rounded-lg p-4 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-9 h-9 rounded-lg bg-card2 flex items-center justify-center overflow-hidden">
                      {skill.icon ? (
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <span className="text-xs font-semibold text-muted">
                          {skill.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-text font-medium text-sm">{skill.name}</span>
                        <span className="text-accent font-semibold text-xs">
                          {skill.percentage}%
                        </span>
                      </div>
                      <div className="w-full bg-card2 rounded-full h-1.5">
                        <div
                          className="bg-accent h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${skill.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(skill, 'development')}
                    className="p-2 bg-card hover:bg-card2 rounded-lg text-text transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(skill._id)}
                    className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
            </div>
          )}
        </div>

        {/* Tools & Platforms */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-text">Tools &amp; Platforms</h2>
            <button
              onClick={() => handleAdd('tools')}
              className="flex items-center gap-2 bg-accent hover:bg-accent2 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm"
            >
              <Plus size={18} />
              Add Skill
            </button>
          </div>

          {loading ? (
            <p className="text-muted">Loading skills...</p>
          ) : (
            <div className="space-y-4">
              {toolsSkills.map((skill) => (
                <div
                  key={skill._id}
                  className="bg-panel border border-border rounded-lg p-4 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-9 h-9 rounded-lg bg-card2 flex items-center justify-center overflow-hidden">
                      {skill.icon ? (
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <span className="text-xs font-semibold text-muted">
                          {skill.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-text font-medium text-sm">{skill.name}</span>
                        <span className="text-accent font-semibold text-xs">
                          {skill.percentage}%
                        </span>
                      </div>
                      <div className="w-full bg-card2 rounded-full h-1.5">
                        <div
                          className="bg-accent h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${skill.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(skill, 'tools')}
                      className="p-2 bg-card hover:bg-card2 rounded-lg text-text transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(skill._id)}
                      className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-text">
                {editingSkill ? 'Edit Skill' : 'Add Skill'} (
                {skillType === 'design'
                  ? 'Frontend'
                  : skillType === 'development'
                  ? 'Backend'
                  : 'Tools & Platforms'}
                )
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
                <label className="block text-sm font-medium text-text mb-2">Skill Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-panel border border-border rounded-lg text-text focus:outline-none focus:border-accent"
                  placeholder="e.g., React, Figma"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">Percentage</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.percentage}
                  onChange={(e) => setFormData({ ...formData, percentage: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2 bg-panel border border-border rounded-lg text-text focus:outline-none focus:border-accent"
                />
                <div className="mt-2 w-full bg-card2 rounded-full h-2">
                  <div
                    className="bg-accent h-2 rounded-full transition-all duration-300"
                    style={{ width: `${formData.percentage}%` }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Icon URL (optional)
                </label>
                <input
                  type="text"
                  value={formData.icon || ''}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full px-4 py-2 bg-panel border border-border rounded-lg text-text focus:outline-none focus:border-accent"
                  placeholder="https://.../logo.png"
                />
                <p className="mt-1 text-xs text-muted">
                  This image will appear next to the skill in your public resume.
                </p>
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

export default SkillsManagement;


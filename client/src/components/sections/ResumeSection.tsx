import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { skillsAPI } from '../../lib/api';

type SkillType = 'design' | 'development' | 'tools';

interface Skill {
  _id: string;
  name: string;
  percentage: number;
  type: SkillType;
  icon?: string;
}

const ResumeSection = () => {
  const [frontendSkills, setFrontendSkills] = useState<Skill[]>([]);
  const [backendSkills, setBackendSkills] = useState<Skill[]>([]);
  const [toolsSkills, setToolsSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const [design, development, tools] = await Promise.all([
          skillsAPI.getAll('design'),
          skillsAPI.getAll('development'),
          skillsAPI.getAll('tools'),
        ]);
        setFrontendSkills(design);
        setBackendSkills(development);
        setToolsSkills(tools);
      } catch (error) {
        console.error('Error fetching skills:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);
  // Keep education and experience static for now (can be made dynamic later)
  const education = [
    {
      year: "2020-2024",
      title: "BSC in Computer Science and Engineering ",
      institution: "World University of Bangladesh",
      rating: "3.39"
    },
    {
      year: "2019",
      title: "Higher Secondary Certificate (HSC)",
      institution: "Mollartek High School and College",
      rating: "4.9"
    },
    {
      year: "2017",
      title: "Secondary School Certificate (SSC)",
      institution: "Mollartek High School and College",
      rating: "4.9"
    }
  ];

  const experience = [
    {
      year: "12/2024-02/2025",
      title: "Frontend Developer (Internship)",
      company: "HAMS FLY LTD",
      rating: "5.0"
    }
    // {
    //   year: "2020-2022",
    //   title: "Full Stack Developer",
    //   company: "Digital Agency",
    //   rating: "4.7"
    // }
  ];


  return (
    <div className="space-y-8 animate-slide-up">
      {/* Education & Experience */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Education */}
        <div>
          <h3 className="text-2xl font-bold text-text mb-6">Education Quality</h3>
          <div className="space-y-4">
            {education.map((item, index) => (
              <Card key={index} className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <Badge variant="accent">{item.year}</Badge>
                  {/* <Badge variant="secondary">{item.rating}/5</Badge> */}
                </div>
                <h4 className="text-lg font-semibold text-text mb-2">{item.title}</h4>
                <p className="text-muted">{item.institution}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div>
          <h3 className="text-2xl font-bold text-text mb-6">Job Experience</h3>
          <div className="space-y-4">
            {experience.map((item, index) => (
              <Card key={index} className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <Badge variant="accent">{item.year}</Badge>
                  {/* <Badge variant="secondary">{item.rating}/5</Badge> */}
                </div>
                <h4 className="text-lg font-semibold text-text mb-2">{item.title}</h4>
                <p className="text-muted">{item.company}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Skills heading & icon strip */}
      {!loading && (frontendSkills.length || backendSkills.length || toolsSkills.length) && (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-text mb-1">My Skills</h3>
            <div className="w-16 h-0.5 bg-accent mx-auto rounded-full" />
          </div>

          {/* Top icons row */}
          <div className="bg-panel/60 rounded-2xl px-3 py-2 overflow-x-auto scrollbar-hide flex gap-3">
            {[
              ...frontendSkills,
              ...backendSkills,
              ...toolsSkills,
            ]
              .filter((s) => s.icon)
              .map((skill) => (
                <div
                  key={skill._id}
                  className="flex items-center justify-center w-14 h-14 rounded-xl bg-card border border-border overflow-hidden flex-shrink-0"
                >
                  <img
                    src={skill.icon as string}
                    alt={skill.name}
                    className="w-10 h-10 object-contain"
                  />
                </div>
              ))}
          </div>

          {/* Columns */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Frontend */}
            {frontendSkills.length > 0 && (
              <Card className="p-5 bg-panel border border-border rounded-2xl">
                <h4 className="text-lg font-semibold text-text mb-4">Frontend</h4>
                <div className="space-y-3">
                  {frontendSkills.map((skill) => (
                    <div key={skill._id} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-card2 flex items-center justify-center overflow-hidden flex-shrink-0">
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
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-text">
                            {skill.name}
                          </span>
                          <span className="text-xs font-semibold text-muted">
                            {skill.percentage}%
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-black/40 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-white"
                            style={{ width: `${skill.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Backend */}
            {backendSkills.length > 0 && (
              <Card className="p-5 bg-panel border border-border rounded-2xl">
                <h4 className="text-lg font-semibold text-text mb-4">Backend</h4>
                <div className="space-y-3">
                  {backendSkills.map((skill) => (
                    <div key={skill._id} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-card2 flex items-center justify-center overflow-hidden flex-shrink-0">
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
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-text">
                            {skill.name}
                          </span>
                          <span className="text-xs font-semibold text-muted">
                            {skill.percentage}%
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-black/40 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-white"
                            style={{ width: `${skill.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Tools & Platforms */}
            {toolsSkills.length > 0 && (
              <Card className="p-5 bg-panel border border-border rounded-2xl">
                <h4 className="text-lg font-semibold text-text mb-4">Tools &amp; Platforms</h4>
                <div className="space-y-3">
                  {toolsSkills.map((skill) => (
                    <div key={skill._id} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-card2 flex items-center justify-center overflow-hidden flex-shrink-0">
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
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-text">
                            {skill.name}
                          </span>
                          <span className="text-xs font-semibold text-muted">
                            {skill.percentage}%
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-black/40 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-white"
                            style={{ width: `${skill.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default ResumeSection;

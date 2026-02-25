import React from 'react';
import { Mail, Phone, Calendar, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

const ProfileBar = () => {
  const profileData = {
    name: "Md Kharul Islam Shagor",
    role: "I am a Full Stack Developer",
    email: "shagormdkharulisla@gmail.com",
    phone: "+8801928991286",
    birthday: "March 04, 2001",
    location: "Dhaka, Bangladesh"
  };

  return (
    <div className="bg-panel border-t border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row items-center gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-accent to-accent2 p-0.5">
              <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                <img src="https://i.postimg.cc/ZqQNPSjy/IMG-4119-copy.jpg"/>
              </div>
            </div>
          </div>
          
          {/* Name and Social */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-2xl lg:text-3xl font-bold text-text mb-1">{profileData.name}</h1>
            <p className="text-muted mb-3">{profileData.role}</p>
            <div className="flex justify-center lg:justify-start gap-3">
              <a href="#" className="w-8 h-8 rounded-lg bg-card hover:bg-accent transition-colors duration-200 flex items-center justify-center">
                <Github size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-card hover:bg-accent transition-colors duration-200 flex items-center justify-center">
                <Linkedin size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-card hover:bg-accent transition-colors duration-200 flex items-center justify-center">
                <Twitter size={16} />
              </a>
            </div>
          </div>
          
          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-accent" />
              <div>
                <p className="text-muted">Email</p>
                <p className="text-text">{profileData.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-accent" />
              <div>
                <p className="text-muted">Phone</p>
                <p className="text-text">{profileData.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-accent" />
              <div>
                <p className="text-muted">Birthday</p>
                <p className="text-text">{profileData.birthday}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-accent" />
              <div>
                <p className="text-muted">Location</p>
                <p className="text-text">{profileData.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBar;

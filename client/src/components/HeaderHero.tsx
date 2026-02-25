import React from 'react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

const HeaderHero = () => {
  const profileData = {
    email: "shagormdkharulisla@gmail.com",
    phone: "+8801928991286",
    birthday: "04 March, 2001",
    location: "Dhaka, Bangladesh"
  };

  return (
    <div className="relative bg-panel">
      {/* Cover Photo */}
      <div className="relative h-64 lg:h-80 overflow-hidden">
        <img 
          src="https://i.postimg.cc/MZDH0w90/make-a-8k-resulation-coding-wallpaper-2912x1632-pc.jpg" 
          alt="Cover" 
          className="w-full h-full object-cover"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
      </div>
      
      {/* Profile Section */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative">
          {/* Profile Picture - Positioned at bottom of cover */}
          <div className="absolute -top-16 lg:-top-20 left-4 lg:left-8">
            <div className="relative">
              <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-panel border-4 border-panel shadow-lg overflow-hidden">
                <img 
                  src="https://i.postimg.cc/ZqQNPSjy/IMG-4119-copy.jpg" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          {/* Profile Info and Actions */}
          <div className="pt-20 lg:pt-24 pb-4 lg:pb-6">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              {/* Name and Info */}
              <div className="flex-1">
                <h1 className="text-2xl lg:text-3xl font-bold text-text mb-1">Md Kharul Islam Shagor</h1>
                <p className="text-muted text-sm lg:text-base mb-6">I am a Full Stack Developer

</p>

                {/* Contact Info Grid */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:gap-x-8 sm:gap-y-5 lg:gap-x-12 lg:gap-y-6">
                  <div>
                    <p className="text-xs text-muted uppercase tracking-wider mb-2">EMAIL</p>
                    <p className="text-sm lg:text-base text-text font-medium">{profileData.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted uppercase tracking-wider mb-2">PHONE</p>
                    <p className="text-sm lg:text-base text-text font-medium">{profileData.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted uppercase tracking-wider mb-2">BIRTHDAY</p>
                    <p className="text-sm lg:text-base text-text font-medium">{profileData.birthday}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted uppercase tracking-wider mb-2">LOCATION</p>
                    <p className="text-sm lg:text-base text-text font-medium">{profileData.location}</p>
                  </div>
                </div>
              </div>
              
              {/* Social Media Icons */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <a 
                  href="https://www.facebook.com/MdKharulShAgor" 
                  className="w-10 h-10 rounded-md bg-panel border border-border hover:border-accent transition-colors duration-200 flex items-center justify-center group"
                  target='_blank'
                >
                  <Facebook size={20} className="text-text group-hover:text-accent" strokeWidth={1.5} />
                </a>
                <a 
                  href="https://www.instagram.com/mdkharulshagor" 
                  className="w-10 h-10 rounded-md bg-panel border border-border hover:border-accent transition-colors duration-200 flex items-center justify-center group"
                  target='_blank'
                >
                  <Instagram size={20} className="text-text group-hover:text-accent" strokeWidth={1.5} />
                </a>
                <a 
                  href="https://www.linkedin.com/in/md-kharul-islam" 
                  className="w-10 h-10 rounded-md bg-panel border border-border hover:border-accent transition-colors duration-200 flex items-center justify-center group"
                  target='_blank'
                >
                  <Linkedin size={20} className="text-text group-hover:text-accent" strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderHero;

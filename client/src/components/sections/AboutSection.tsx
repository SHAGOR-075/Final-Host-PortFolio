import React, { useState } from 'react';
import { Download, Check, Code, Palette, Smartphone, Globe, X, Mail, MessageCircle, Fullscreen } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const AboutSection = () => {
  const [showCVModal, setShowCVModal] = useState(false);
  const services = [
    {
      icon: Code,
      title: "Web Development",
      description: "High-quality development of sites at the professional level."
    },
    // {
    //   icon: Smartphone,
    //   title: "Mobile Apps",
    //   description: "Professional development of applications for iOS and Android."
    // },
    // {
    //   icon: Palette,
    //   title: "UI/UX Design",
    //   description: "Modern and mobile-ready website that will help you reach all of your marketing."
    // },
    {
      icon: Globe,
      title: "Web Design",
      description: "High-quality development of sites at the professional level."
    }
  ];

  const clients = [
    { name: "Company A", logo: "CA" },
    { name: "Company B", logo: "CB" },
    { name: "Company C", logo: "CC" },
    { name: "Company D", logo: "CD" }
  ];

  return (
    <div className="space-y-8 animate-slide-up">
      {/* About Me Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Image Card */}
        <Card className="p-0 overflow-hidden">
          <div className="aspect-square bg-gradient-to-br from-accent/20 to-accent2/20 flex ">
          <img src="https://i.postimg.cc/ZqQNPSjy/IMG-4119-copy.jpg" className="w-full h-full object-cover"/>
            {/* <div className="w-32 h-32 rounded-full bg-gradient-to-br from-accent to-accent2 flex items-center justify-center">
              <img src="https://i.ibb.co.com/gFwKgCDq/6024190.png"/>
            </div> */}
          </div>
        </Card>

        {/* About Content */}
        <Card className="p-8">
          <h2 className="text-3xl font-bold text-text mb-6">About Me</h2>
          <p className="text-muted mb-6 leading-relaxed text-justify">
            I’m Md Kharul Islam Shagor, a Frontend Developer from Bangladesh. I build clean, fast, and responsive user interfaces using Next.js and React, with a strong focus on user experience.
            <br /> <br />
            Interests <br />
            I’m interested in AI powered web applications and how artificial intelligence can improve user experience. I enjoy integrating AI tools into frontend products, building smart UI features, and exploring how AI can make web apps more useful and interactive.
           
          </p>
          
          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-3">
              <Check size={20} className="text-accent" />
              <span className="text-text">Professional web development</span>
            </div>
            {/* <div className="flex items-center gap-3">
              <Check size={20} className="text-accent" />
              <span className="text-text">Mobile app development</span>
            </div>
            <div className="flex items-center gap-3">
              <Check size={20} className="text-accent" />
              <span className="text-text">UI/UX design expertise</span>
            </div> */}
          </div>
          
          <Button 
            variant="primary" 
            className="flex items-center gap-2"
            onClick={() => setShowCVModal(true)}
          >
            <Download size={20} />
            Download CV
          </Button>
        </Card>
      </div>

      {/* What I'm Doing Section */}
      <div>
        <h3 className="text-2xl font-bold text-text mb-8 text-center">What I am Doing</h3>
        {/* Mobile: Horizontal scroll, Desktop: Grid */}
        <div className="md:hidden overflow-x-auto -mx-4 px-4 scrollbar-hide" style={{ scrollBehavior: 'smooth' }}>
          <div className="flex gap-6 pb-4">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="p-6 card-hover flex-shrink-0 w-[280px]">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={24} className="text-accent" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-text mb-2">{service.title}</h4>
                      <p className="text-muted text-sm leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
        {/* Desktop: Grid layout */}
        <div className="hidden md:grid md:grid-cols-2 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="p-6 card-hover">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={24} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-text mb-2">{service.title}</h4>
                    <p className="text-muted text-sm leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Trusted Clients Section */}
      <div>
        <h3 className="text-2xl font-bold text-text mb-8 text-center">Our Trusted Clients</h3>
        {/* Mobile: Horizontal scroll, Desktop: Grid */}
        <div className="md:hidden overflow-x-auto -mx-4 px-4 scrollbar-hide" style={{ scrollBehavior: 'smooth' }}>
          <div className="flex gap-4 pb-4">
            {clients.map((client, index) => (
              <Card key={index} className="p-6 text-center card-hover flex-shrink-0 w-[160px]">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-accent/20 to-accent2/20 flex items-center justify-center mx-auto mb-3">
                  <span className="text-lg font-bold text-accent">{client.logo}</span>
                </div>
                <p className="text-sm text-muted">{client.name}</p>
              </Card>
            ))}
          </div>
        </div>
        {/* Desktop: Grid layout */}
        <div className="hidden md:grid md:grid-cols-4 gap-4">
          {clients.map((client, index) => (
            <Card key={index} className="p-6 text-center card-hover">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-accent/20 to-accent2/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-lg font-bold text-accent">{client.logo}</span>
              </div>
              <p className="text-sm text-muted">{client.name}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* CV Download Modal */}
      {showCVModal && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in p-4"
          onClick={() => setShowCVModal(false)}
        >
          <div 
            className="relative w-full max-w-md sm:max-w-lg bg-card border border-border rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowCVModal(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
            >
              <X size={18} className="sm:w-5 sm:h-5" />
            </button>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 lg:p-12 text-center">
              <div className="mb-6 sm:mb-8">
                <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 mx-auto mb-4 sm:mb-6 lg:mb-8 rounded-full bg-gradient-to-br from-accent/20 to-accent2/20 flex items-center justify-center">
                  <MessageCircle className="text-accent" size={32} style={{ width: 'clamp(32px, 8vw, 64px)', height: 'clamp(32px, 8vw, 64px)' }} />
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-text mb-3 sm:mb-4 lg:mb-6 leading-tight px-2">
                  Contact Admin to Download CV
                </h2>
                <p className="text-muted text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed max-w-xl mx-auto px-2">
                  To download the CV, please contact the administrator through the contact section or reach out directly.
                </p>
              </div>

              <div className="space-y-4 sm:space-y-5 lg:space-y-6">
                <div className="flex items-center justify-center gap-3 sm:gap-4 p-4 sm:p-5 lg:p-6 bg-panel border border-border rounded-lg">
                  <Mail className="text-accent flex-shrink-0" size={20} style={{ width: 'clamp(20px, 5vw, 24px)', height: 'clamp(20px, 5vw, 24px)' }} />
                  <span className="text-text text-sm sm:text-base lg:text-lg">Use the Contact section/WhatsApp to send a message</span>
                </div>
                
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full max-w-xs sm:max-w-md mx-auto text-sm sm:text-base lg:text-lg py-2.5 sm:py-3 lg:py-4"
                  onClick={() => setShowCVModal(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutSection;

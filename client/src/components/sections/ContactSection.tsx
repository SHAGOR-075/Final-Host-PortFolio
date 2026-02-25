import React, { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle, XCircle } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { contactAPI } from '../../lib/api';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await contactAPI.send(formData);
      setSuccess(true);
      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: ''
      });
      // Hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-slide-up">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-text mb-4">Get In Touch</h2>
        <p className="text-muted">Let's work together on your next project</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Contact Profile Card */}
        <Card className="p-8">
          <div className="text-center mb-8">
            <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-panel border-4 border-panel shadow-lg overflow-hidden mx-auto">
              <img src="https://i.postimg.cc/ZqQNPSjy/IMG-4119-copy.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold text-text mb-2">Md Kharul Islam Shagor</h3>
            <p className="text-muted mb-4">Full Stack Developer</p>
            <p className="text-sm text-muted leading-relaxed mb-6">
              I am available for freelance work. Connect with me via phone or email.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Phone size={18} className="text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted">Phone</p>
                <p className="text-text">+8801928991286</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Mail size={18} className="text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted">Email</p>
                <p className="text-text">shagormdkharulisla@gmail.com</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <MapPin size={18} className="text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted">Location</p>
                <p className="text-text">Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <a href="https://github.com/SHAGOR-075" className="w-10 h-10 rounded-lg bg-card hover:bg-accent transition-colors duration-200 flex items-center justify-center" target='_blank'>
            
              <Github size={18} /> 

            </a>
            <a href="https://www.linkedin.com/in/md-kharul-islam" className="w-10 h-10 rounded-lg bg-card hover:bg-accent transition-colors duration-200 flex items-center justify-center" target='_blank'>
              <Linkedin size={18} />
            </a>
            
          </div>
        </Card>

        {/* Contact Form */}
        <Card className="p-8">
          {success && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-lg flex items-center gap-3 animate-fade-in">
              <CheckCircle className="text-green-400 flex-shrink-0" size={20} />
              <div>
                <p className="text-green-400 font-medium">Message sent successfully!</p>
                <p className="text-green-400/80 text-sm">We will get back to you soon.</p>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-3 animate-fade-in">
              <XCircle className="text-red-400 flex-shrink-0" size={20} />
              <p className="text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input-field w-full"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="input-field w-full"
                  placeholder="Your phone"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="input-field w-full"
                placeholder="Your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="input-field w-full"
                placeholder="Subject"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                className="input-field w-full resize-none"
                placeholder="Your message"
                required
              ></textarea>
            </div>

            <Button 
              type="submit" 
              variant="primary" 
              className="w-full flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ContactSection;

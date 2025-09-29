import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Reviews } from './reviews';
import { SocialFeed } from './social-feed';
import { ConsultationTool } from './consultation-tool';

import { Blog } from './blog';
import { FeatureSummary } from './feature-summary';
import { Star, Clock, Award, Users, Scissors } from 'lucide-react';

interface HomepageProps {
  onPageChange: (page: string) => void;
}

export function Homepage({ onPageChange }: HomepageProps) {
  const services = [
    { name: 'Starter Locs', price: '₦15,000', duration: '2-3 hours', description: 'Begin your loc journey with professional starter locs' },
    { name: 'Retwist', price: '₦8,000', duration: '1-2 hours', description: 'Maintain your locs with expert retwisting' },
    { name: 'Loc Styling', price: '₦12,000', duration: '1.5-2 hours', description: 'Creative styling for special occasions' },
    { name: 'Loc Coloring', price: '₦20,000', duration: '3-4 hours', description: 'Professional coloring and highlights' }
  ];

  const products = [
    { name: 'Loc Shampoo', price: '₦3,500', image: 'https://images.unsplash.com/photo-1751313227607-b73d714068a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwaGFpciUyMHByb2R1Y3RzJTIwc2hhbXBvb3xlbnwxfHx8fDE3NTkxMjk5NTF8MA&ixlib=rb-4.1.0&q=80&w=1080' },
    { name: 'Loc Oil', price: '₦2,500', image: 'https://images.unsplash.com/photo-1751313227607-b73d714068a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwaGFpciUyMHByb2R1Y3RzJTIwc2hhbXBvb3xlbnwxfHx8fDE3NTkxMjk5NTF8MA&ixlib=rb-4.1.0&q=80&w=1080' },
    { name: 'Loc Gel', price: '₦2,000', image: 'https://images.unsplash.com/photo-1751313227607-b73d714068a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwaGFpciUyMHByb2R1Y3RzJTIwc2hhbXBvb3xlbnwxfHx8fDE3NTkxMjk5NTF8MA&ixlib=rb-4.1.0&q=80&w=1080' },
    { name: 'Silk Bonnets', price: '₦1,500', image: 'https://images.unsplash.com/photo-1751313227607-b73d714068a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwaGFpciUyMHByb2R1Y3RzJTIwc2hhbXBvb3xlbnwxfHx8fDE3NTkxMjk5NTF8MA&ixlib=rb-4.1.0&q=80&w=1080' }
  ];

  const galleryImages = [
    'https://images.unsplash.com/photo-1711637819201-1f2671641b4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjBkcmVhZGxvY2tzJTIwaGFpcnN0eWxlJTIwQWZyaWNhbnxlbnwxfHx8fDE3NTkxMzEyMTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1662124778157-235dd9f10a44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc3R5bGlzdCUyMG1ha2luZyUyMGRyZWFkbG9ja3N8ZW58MXx8fHwxNzU5MTMxMjA1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkcmVhZGxvY2slMjBzdHlsaW5nJTIwcHJvY2Vzc3xlbnwxfHx8fDE3NTkxMzEyMDh8MA&ixlib=rb-4.1.0&q=80&w=1080'
  ];

  const stats = [
    { icon: Users, label: 'Happy Clients', value: '500+' },
    { icon: Award, label: 'Years Experience', value: '5+' },
    { icon: Scissors, label: 'Styles Created', value: '1000+' },
    { icon: Star, label: 'Rating', value: '4.9/5' }
  ];

  return (
    <div className="min-h-screen">
      {/* Modern Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
        {/* Background Elements */}
        <div className="absolute inset-0">
          {/* Main Background Image */}
          <div className="absolute inset-0 opacity-30">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1599387737838-660b75526801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBoYWlyJTIwc2Fsb24lMjBpbnRlcmlvciUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NTkxMzE3MDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Modern salon interior"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"></div>
          
          {/* Animated Elements - Hidden on mobile for better performance */}
          <div className="hidden md:block absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-yellow-500/20 to-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="hidden md:block absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-yellow-600/15 to-orange-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        {/* Content Grid */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center min-h-screen py-12 sm:py-16 lg:py-20">
            
            {/* Left Content */}
            <div className="hero-content space-y-6 sm:space-y-8 lg:space-y-12 text-center lg:text-left">
              {/* Brand Badge */}
              <div className="inline-flex items-center space-x-2 sm:space-x-3 bg-gradient-to-r from-yellow-500/20 to-yellow-400/10 backdrop-blur-sm border border-yellow-500/30 rounded-full px-4 sm:px-6 py-2 sm:py-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                <span className="text-yellow-400 text-xs sm:text-sm tracking-wide">AUTHENTIC AFRICAN CULTURE</span>
              </div>

              {/* Main Heading */}
              <div className="space-y-4 sm:space-y-6">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-none">
                  <span className="block gradient-text">Amalyn</span>
                  <span className="block text-white mt-1 sm:mt-2">Locs</span>
                </h1>
                <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full mx-auto lg:mx-0"></div>
              </div>

              {/* Tagline */}
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Where <span className="text-yellow-400">artistry</span> meets 
                <span className="text-yellow-400"> authenticity</span> in every loc
              </p>

              {/* Description */}
              <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Experience the finest in African dreadlock culture with our expert locticians. 
                From starter locs to intricate styling, we craft each loc with precision, care, and cultural respect.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center lg:justify-start">
                <Button 
                  onClick={() => onPageChange('booking')}
                  className="group relative bg-yellow-400 hover:bg-yellow-500 text-black px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-5 text-base sm:text-lg rounded-2xl font-bold shadow-2xl shadow-yellow-400/25 transition-all duration-300 hover:scale-105 hover:shadow-yellow-400/40 w-full sm:w-auto"
                >
                  <span className="relative z-10">Book Your Session</span>
                </Button>
                
                <Button 
                  onClick={() => onPageChange('gallery')}
                  variant="outline" 
                  className="group border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-5 text-base sm:text-lg rounded-2xl font-bold backdrop-blur-sm bg-white/10 transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                >
                  <span className="mr-2">Explore Gallery</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Button>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-center lg:justify-start space-x-4 sm:space-x-8 lg:space-x-12 pt-6 sm:pt-8">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl lg:text-3xl text-yellow-400">500+</div>
                  <div className="text-xs sm:text-sm text-gray-400 mt-1">Happy Clients</div>
                </div>
                <div className="w-px h-8 sm:h-12 bg-gray-600"></div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl lg:text-3xl text-yellow-400">5+</div>
                  <div className="text-xs sm:text-sm text-gray-400 mt-1">Years Exp.</div>
                </div>
                <div className="w-px h-8 sm:h-12 bg-gray-600"></div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl lg:text-3xl text-yellow-400">4.9★</div>
                  <div className="text-xs sm:text-sm text-gray-400 mt-1">Rating</div>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="relative lg:pl-8 hero-slide-in order-first lg:order-last">
              {/* Floating Cards */}
              <div className="relative">
                {/* Main Image Card */}
                <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-2xl">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1658252844173-ba5de80a3015?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjBhZnJpY2FuJTIwd29tYW4lMjBkcmVhZGxvY2tzJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU5MTMxNzExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Beautiful dreadlocks styling"
                    className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-cover rounded-xl sm:rounded-2xl"
                  />
                  
                  {/* Floating Badge */}
                  <div className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black px-3 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl shadow-xl font-semibold text-sm sm:text-base">
                    ✨ Expert Styling
                  </div>
                </div>

                {/* Floating Info Cards - Hidden on mobile for cleaner look */}
                <div className="hidden md:block hero-float absolute -bottom-6 -right-6 bg-gradient-to-br from-white to-gray-50 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-4 sm:p-6 shadow-2xl max-w-xs">
                  <div className="flex items-center space-x-3 mb-2">
                    <Award className="h-4 sm:h-5 w-4 sm:w-5 text-yellow-600" />
                    <span className="text-gray-800 font-semibold text-sm sm:text-base">Quality</span>
                  </div>
                  <p className="text-gray-600 text-sm sm:text-base">Premium Service</p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">Expert craftsmanship</p>
                </div>

                <div className="hidden md:block hero-float absolute top-4 sm:top-8 -left-4 sm:-left-8 bg-gradient-to-br from-black/80 to-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-2xl" style={{animationDelay: '2s'}}>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-white text-xs sm:text-sm">Available Now</span>
                  </div>
                  <p className="text-gray-300 text-xs sm:text-sm">Book your session</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 animate-bounce">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-sm">Scroll to explore</span>
            <div className="w-px h-8 bg-gradient-to-b from-gray-400 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-yellow-400">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center text-black">
                  <IconComponent className="h-8 sm:h-10 md:h-12 w-8 sm:w-10 md:w-12 mx-auto mb-3 sm:mb-4" />
                  <div className="text-xl sm:text-2xl md:text-3xl mb-1 sm:mb-2 font-bold">{stat.value}</div>
                  <div className="text-sm sm:text-base md:text-lg font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl mb-6 sm:mb-8 gradient-text">About Amalyn Locs</h2>
              <p className="text-lg sm:text-xl mb-4 sm:mb-6 text-gray-700 leading-relaxed">
                Amalyn Locs celebrates and promotes authentic African dreadlock culture. We specialize in creating, maintaining, and styling beautiful dreadlocks while honoring the rich cultural heritage behind this ancient art form.
              </p>
              <p className="text-base sm:text-lg mb-6 sm:mb-8 text-gray-600 leading-relaxed">
                Our experienced locticians use traditional techniques combined with modern styling methods to create stunning, healthy locs that tell your unique story.
              </p>
              <div className="flex items-center justify-center md:justify-start space-x-3 text-black bg-yellow-400 p-3 sm:p-4 rounded-xl">
                <Award className="h-5 sm:h-6 w-5 sm:w-6 text-black flex-shrink-0" />
                <span className="text-base sm:text-lg font-semibold">Expert Locticians • Premium Quality</span>
              </div>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1662124778157-235dd9f10a44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc3R5bGlzdCUyMG1ha2luZyUyMGRyZWFkbG9ja3N8ZW58MXx8fHwxNzU5MTMxMjA1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Amalyn Locs professional service"
                className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="hidden sm:block absolute -bottom-3 sm:-bottom-4 -right-3 sm:-right-4 bg-yellow-500 text-black p-3 sm:p-4 rounded-xl shadow-lg">
                <p className="font-semibold text-sm sm:text-base">Expert Locticians</p>
                <p className="text-xs sm:text-sm">5+ Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6 gradient-text">Our Expert Services</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">Professional dreadlock services tailored to your unique style and needs</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <Card key={index} className="modern-card hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0 rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-br from-yellow-50 to-yellow-100 pb-4 sm:pb-6">
                  <CardTitle className="text-black text-lg sm:text-xl">{service.name}</CardTitle>
                  <CardDescription className="text-yellow-600 text-2xl font-bold">{service.price}</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-6">
                    <Clock className="h-4 w-4 mr-2 text-yellow-500" />
                    {service.duration}
                  </div>
                  <Button 
                    onClick={() => onPageChange('booking')}
                    className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-black font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-black">Featured Products</h2>
            <p className="text-lg text-gray-600">Premium products for healthy, beautiful locs</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg mb-2 text-black">{product.name}</h3>
                  <p className="text-yellow-600 text-xl mb-4">{product.price}</p>
                  <Button 
                    onClick={() => onPageChange('shop')}
                    className="w-full bg-yellow-500 hover:bg-yellow-400 text-black"
                  >
                    Shop Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-16 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-yellow-500">Our Work</h2>
            <p className="text-lg text-gray-300">Beautiful dreadlock styles we've created</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {galleryImages.map((image, index) => (
              <div key={index} className="relative overflow-hidden rounded-lg group">
                <ImageWithFallback
                  src={image}
                  alt={`Dreadlock style ${index + 1}`}
                  className="w-full h-64 object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button 
                    onClick={() => onPageChange('gallery')}
                    className="bg-yellow-500 hover:bg-yellow-400 text-black"
                  >
                    View Gallery
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Button 
              onClick={() => onPageChange('gallery')}
              variant="outline"
              className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
            >
              View All Styles
            </Button>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <Reviews onPageChange={onPageChange} compact={true} />

      {/* Social Media Section */}
      <SocialFeed compact={true} />

      {/* Consultation Tool Section */}
      <ConsultationTool onPageChange={onPageChange} compact={true} />

      {/* Reviews Section */}
      <Reviews onPageChange={onPageChange} compact={true} />

      {/* Blog Section */}
      <Blog onPageChange={onPageChange} compact={true} />

      {/* CTA Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-yellow-500/10"></div>
        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <h2 className="text-5xl md:text-6xl mb-8 gradient-text-light">Ready to Transform?</h2>
          <p className="text-2xl mb-12 text-white leading-relaxed">
            Book your appointment today and experience the artistry of authentic dreadlock styling
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              onClick={() => onPageChange('booking')}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-12 py-4 text-lg rounded-full shadow-glow transition-all duration-300 hover:scale-105"
            >
              Book Your Session
            </Button>
            <Button 
              onClick={() => onPageChange('contact')}
              variant="outline" 
              className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-bold px-12 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105"
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
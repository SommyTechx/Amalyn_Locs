import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Clock, Star, Users, Check, ArrowRight, Award, Shield, Sparkles } from 'lucide-react';

interface ServicesProps {
  onPageChange: (page: string) => void;
}

export function Services({ onPageChange }: ServicesProps) {
  const services = [
    {
      id: 'starter',
      name: 'Starter Locs',
      price: 15000,
      duration: '2-3 hours',
      description: 'Begin your loc journey with professional starter locs using traditional African techniques and premium products.',
      features: ['Free consultation included', 'Choice of starting method', 'Complete aftercare instructions', 'Product recommendations'],
      image: 'https://images.unsplash.com/photo-1622265544955-56574abbce5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwZHJlYWRsb2NrcyUyMHNhbG9uJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc1OTEzOTY1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      popular: true,
      rating: 4.9,
      icon: Sparkles,
      category: 'Foundation'
    },
    {
      id: 'retwist',
      name: 'Retwist & Maintenance',
      price: 8000,
      duration: '1-2 hours',
      description: 'Keep your locs neat, healthy and well-maintained with expert retwisting using premium organic products.',
      features: ['Root maintenance', 'Scalp treatment', 'Loc conditioning', 'Styling consultation'],
      image: 'https://images.unsplash.com/photo-1624597993888-0a395fb5c8dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2MlMjBtYWludGVuYW5jZSUyMHN0eWxpbmclMjBoYWlyfGVufDF8fHx8MTc1OTEzOTY1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      popular: true,
      rating: 4.8,
      icon: Shield,
      category: 'Maintenance'
    },
    {
      id: 'styling',
      name: 'Loc Styling',
      price: 12000,
      duration: '1.5-2 hours',
      description: 'Creative and elegant styling for special occasions, weddings, and everyday sophisticated looks.',
      features: ['Custom styling design', 'Premium accessories', 'Style maintenance tips', 'Photography session'],
      image: 'https://images.unsplash.com/photo-1673555261512-918f0d09b55e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmVhZGxvY2tzJTIwc3R5bGluZyUyMHdlZGRpbmclMjBlbGVnYW50fGVufDF8fHx8MTc1OTEzOTY1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      popular: false,
      rating: 4.7,
      icon: Award,
      category: 'Styling'
    },
    {
      id: 'coloring',
      name: 'Loc Coloring',
      price: 20000,
      duration: '3-4 hours',
      description: 'Professional coloring and highlights to enhance your locs with vibrant, long-lasting colors.',
      features: ['Color consultation', 'Premium color products', 'Damage protection treatment', 'Color maintenance plan'],
      image: 'https://images.unsplash.com/photo-1598308077542-a1d37a109793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmVhZGxvY2tzJTIwY29sb3JpbmclMjBwcm9mZXNzaW9uYWwlMjBzYWxvbnxlbnwxfHx8fDE3NTkxMzk2NTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      popular: false,
      rating: 4.9,
      icon: Sparkles,
      category: 'Color'
    },
    {
      id: 'deep-clean',
      name: 'Deep Cleansing',
      price: 10000,
      duration: '2 hours',
      description: 'Intensive deep cleansing treatment to remove buildup and refresh your locs for optimal health.',
      features: ['Clarifying shampoo treatment', 'Therapeutic scalp massage', 'Deep conditioning', 'Organic loc oil treatment'],
      image: 'https://images.unsplash.com/photo-1637777277337-f114350fb088?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwdHJlYXRtZW50JTIwZGVlcCUyMGNsZWFuc2luZyUyMHNhbG9ufGVufDF8fHx8MTc1OTEzOTY1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      popular: false,
      rating: 4.6,
      icon: Shield,
      category: 'Treatment'
    },
    {
      id: 'consultation',
      name: 'Loc Consultation',
      price: 5000,
      duration: '30 minutes',
      description: 'Professional consultation for loc journey planning, maintenance advice, and personalized recommendations.',
      features: ['Comprehensive hair assessment', 'Personal journey planning', 'Product recommendations', 'Styling advice & tips'],
      image: 'https://images.unsplash.com/photo-1713845784497-fe3d7ed176d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwY29uc3VsdGF0aW9uJTIwYWZyaWNhbiUyMGhlcml0YWdlfGVufDF8fHx8MTc1OTEzOTY1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      popular: false,
      rating: 4.8,
      icon: Users,
      category: 'Consultation'
    }
  ];

  const packages = [
    {
      name: 'Starter Journey Package',
      price: 18000,
      originalPrice: 20000,
      services: ['Consultation', 'Starter Locs', 'Product Kit', 'Follow-up Care'],
      description: 'Perfect beginning for your loc journey with comprehensive support',
      popular: true,
      savings: '10%'
    },
    {
      name: 'Maintenance Essentials',
      price: 15000,
      originalPrice: 18000,
      services: ['Retwist', 'Deep Cleansing', 'Styling', 'Product Kit'],
      description: 'Complete maintenance package for healthy, beautiful locs',
      popular: false,
      savings: '17%'
    },
    {
      name: 'VIP Experience',
      price: 30000,
      originalPrice: 35000,
      services: ['Consultation', 'Premium Styling', 'Coloring', 'Photography', 'Aftercare Kit'],
      description: 'Luxury experience with professional photography and premium care',
      popular: false,
      savings: '14%'
    }
  ];

  const testimonials = [
    {
      name: 'Chioma Okafor',
      service: 'Starter Locs',
      rating: 5,
      comment: 'Absolutely amazing experience! My locs look beautiful and the staff was incredibly professional and knowledgeable.',
      date: '2024-12-10',
      verified: true
    },
    {
      name: 'Emeka Nwachukwu',
      service: 'Retwist & Maintenance',
      rating: 5,
      comment: 'Best loc maintenance in Enugu. I always leave feeling fresh, confident, and ready to take on the world.',
      date: '2024-12-08',
      verified: true
    },
    {
      name: 'Adaeze Okwu',
      service: 'Loc Styling',
      rating: 5,
      comment: 'Perfect styling for my wedding! Everyone complimented my locs. Highly recommend for special occasions!',
      date: '2024-12-05',
      verified: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header Section */}
      <div className="relative bg-black text-white py-16 sm:py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black opacity-90"></div>
        <div className="absolute inset-0 bg-yellow-500/5 opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="hero-content">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-4 sm:mb-6 gradient-text-light">
              Our Services
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Professional dreadlock services celebrating African culture and heritage. 
              Expert care for every stage of your loc journey.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-10 md:mt-12 text-yellow-500">
              <div className="flex items-center gap-2">
                <Award className="h-5 sm:h-6 w-5 sm:w-6 flex-shrink-0" />
                <span className="text-sm sm:text-base">Premium Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 sm:h-6 w-5 sm:w-6 flex-shrink-0" />
                <span className="text-sm sm:text-base">Expert Care</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 sm:h-6 w-5 sm:w-6 flex-shrink-0" />
                <span className="text-sm sm:text-base">Traditional Techniques</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Featured Services */}
        <div className="mb-16 sm:mb-20">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 gradient-text">Most Popular Services</h2>
            <p className="text-lg sm:text-xl text-gray-600">Our clients' favorite services for exceptional results</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {services.filter(service => service.popular).map((service) => (
              <Card key={service.id} className="group hover:shadow-2xl transition-all duration-500 border-0 modern-card overflow-hidden">
                <div className="relative">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.name}
                    className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  <Badge className="absolute top-4 sm:top-6 left-4 sm:left-6 bg-yellow-500 text-black shadow-lg text-xs sm:text-sm">
                    Most Popular
                  </Badge>
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <service.icon className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <CardTitle className="text-2xl text-black mb-1">{service.name}</CardTitle>
                      <Badge variant="outline" className="text-xs text-gray-600 border-gray-300">
                        {service.category}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-sm mb-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                        <span className="text-gray-700">{service.rating}</span>
                      </div>
                      <CardDescription className="text-2xl text-yellow-600">
                        ₦{service.price.toLocaleString()}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-6">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{service.duration}</span>
                  </div>
                  <div className="grid grid-cols-1 gap-3 mb-8">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                          <Check className="h-3 w-3 text-green-600" />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button 
                    onClick={() => onPageChange('booking')}
                    className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-black shadow-lg hover:shadow-xl transition-all duration-300"
                    size="lg"
                  >
                    Book This Service
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Services Grid */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 gradient-text">All Services</h2>
            <p className="text-xl text-gray-600">Complete range of professional loc services</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 border-0 modern-card overflow-hidden">
                <div className="relative">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  {service.popular && (
                    <Badge className="absolute top-4 left-4 bg-yellow-500 text-black text-xs">
                      Popular
                    </Badge>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <service.icon className="h-4 w-4 text-yellow-600" />
                  </div>
                </div>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <CardTitle className="text-lg text-black">{service.name}</CardTitle>
                      <Badge variant="outline" className="text-xs text-gray-500 border-gray-300 mt-1">
                        {service.category}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-sm mb-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current mr-1" />
                        <span className="text-gray-600">{service.rating}</span>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-xl text-yellow-600">
                    ₦{service.price.toLocaleString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>
                  <div className="flex items-center text-xs text-gray-500 mb-4">
                    <Clock className="h-3 w-3 mr-1" />
                    {service.duration}
                  </div>
                  <Button 
                    onClick={() => onPageChange('booking')}
                    variant="outline"
                    className="w-full border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-black transition-all duration-300"
                    size="sm"
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Service Packages */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 gradient-text">Service Packages</h2>
            <p className="text-xl text-gray-600">Save more with our comprehensive service bundles</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card key={index} className={`relative group hover:shadow-xl transition-all duration-300 border-0 modern-card overflow-hidden ${pkg.popular ? 'ring-2 ring-yellow-500 shadow-glow' : ''}`}>
                {pkg.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-black px-4 py-1 shadow-lg">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pt-8">
                  <CardTitle className="text-2xl text-black mb-2">{pkg.name}</CardTitle>
                  <div className="mb-4">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <span className="text-3xl text-yellow-600">₦{pkg.price.toLocaleString()}</span>
                      <Badge variant="outline" className="text-xs text-green-600 border-green-300">
                        Save {pkg.savings}
                      </Badge>
                    </div>
                    <span className="text-lg text-gray-500 line-through">₦{pkg.originalPrice.toLocaleString()}</span>
                  </div>
                  <CardDescription className="text-gray-600">{pkg.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-8">
                    {pkg.services.map((service, serviceIndex) => (
                      <div key={serviceIndex} className="flex items-center text-sm">
                        <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                          <Check className="h-3 w-3 text-green-600" />
                        </div>
                        <span className="text-gray-700">{service}</span>
                      </div>
                    ))}
                  </div>
                  <Button 
                    onClick={() => onPageChange('booking')}
                    className={`w-full transition-all duration-300 ${
                      pkg.popular 
                        ? 'bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-black shadow-lg' 
                        : 'bg-black hover:bg-gray-800 text-yellow-500'
                    }`}
                    size="lg"
                  >
                    Choose Package
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 gradient-text">Client Testimonials</h2>
            <p className="text-xl text-gray-600">What our satisfied clients say about our services</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 modern-card hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < testimonial.rating
                              ? 'text-yellow-500 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    {testimonial.verified && (
                      <Badge variant="outline" className="text-xs text-green-600 border-green-300">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-700 mb-6 italic leading-relaxed">
                    "{testimonial.comment}"
                  </p>
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-black mb-1">{testimonial.name}</p>
                    <p className="text-sm text-yellow-600 mb-1">{testimonial.service}</p>
                    <p className="text-xs text-gray-500">{new Date(testimonial.date).toLocaleDateString()}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Process Section */}
        <div className="bg-gradient-to-r from-gray-50 to-white rounded-3xl p-12 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 gradient-text">Our Service Process</h2>
            <p className="text-xl text-gray-600">Professional care in every step of your experience</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { 
                step: '1', 
                title: 'Consultation', 
                description: 'Comprehensive discussion about your loc goals and professional hair assessment',
                icon: Users
              },
              { 
                step: '2', 
                title: 'Preparation', 
                description: 'Careful cleansing and preparation of your hair using premium products',
                icon: Shield
              },
              { 
                step: '3', 
                title: 'Service', 
                description: 'Expert styling using traditional African techniques and modern innovations',
                icon: Award
              },
              { 
                step: '4', 
                title: 'Aftercare', 
                description: 'Detailed instructions and premium products for ongoing maintenance',
                icon: Sparkles
              }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <span className="text-xl">{item.step}</span>
                  </div>
                  <div className="absolute -top-2 -right-2 bg-white rounded-full p-2 shadow-lg">
                    <item.icon className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
                <h3 className="text-xl mb-3 text-black">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                {index < 3 && (
                  <ArrowRight className="h-6 w-6 text-yellow-500 mx-auto mt-6 hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-black via-gray-900 to-black rounded-3xl p-12 text-center text-white">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-4xl mb-6 gradient-text-light">Ready to Transform Your Hair?</h3>
            <p className="text-xl mb-8 text-gray-300 leading-relaxed">
              Book your appointment today and experience the art of professional dreadlock styling with authentic African techniques
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => onPageChange('booking')}
                className="bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-black px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                size="lg"
              >
                Book Appointment
              </Button>
              <Button 
                onClick={() => onPageChange('gallery')}
                variant="outline" 
                className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black px-8 py-4 text-lg transition-all duration-300"
                size="lg"
              >
                View Our Work
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
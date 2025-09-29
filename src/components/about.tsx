import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Award, Users, Heart, Star, MapPin, Clock, Phone } from 'lucide-react';

interface AboutProps {
  onPageChange: (page: string) => void;
}

export function About({ onPageChange }: AboutProps) {
  const teamMembers = [
    {
      name: 'Adaeze Nkomo',
      role: 'Master Loc Stylist & Founder',
      experience: '8 years',
      specialty: 'Traditional African Loc Techniques',
      image: 'https://images.unsplash.com/photo-1643956740911-62c19a5405f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmVhZGxvY2tzJTIwaGFpcnN0eWxlJTIwYWZyaWNhbnxlbnwxfHx8fDE3NTkxMjk5NTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      bio: 'Passionate about preserving African hair culture through authentic dreadlock artistry.'
    },
    {
      name: 'Chidi Okoro',
      role: 'Senior Loc Technician',
      experience: '5 years',
      specialty: 'Loc Maintenance & Styling',
      image: 'https://images.unsplash.com/photo-1718001491891-0d0a1f37e33b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwZHJlYWRsb2NrcyUyMHN0eWxpbmd8ZW58MXx8fHwxNzU5MTI5OTUyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      bio: 'Expert in modern loc techniques with a focus on healthy hair growth and maintenance.'
    },
    {
      name: 'Ngozi Eze',
      role: 'Loc Colorist',
      experience: '4 years',
      specialty: 'Color Treatments & Highlights',
      image: 'https://images.unsplash.com/photo-1643956740911-62c19a5405f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmVhZGxvY2tzJTIwaGFpcnN0eWxlJTIwYWZyaWNhbnxlbnwxfHx8fDE3NTkxMjk5NTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      bio: 'Creative colorist specializing in vibrant, healthy color treatments for locs.'
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Cultural Heritage',
      description: 'We honor and celebrate the rich history and cultural significance of dreadlocks in African tradition.'
    },
    {
      icon: Award,
      title: 'Professional Excellence',
      description: 'Committed to providing the highest quality services using authentic techniques and premium products.'
    },
    {
      icon: Users,
      title: 'Community Focus',
      description: 'Building a supportive community that embraces natural hair and celebrates individuality.'
    },
    {
      icon: Star,
      title: 'Customer Satisfaction',
      description: 'Every client leaves feeling confident and beautiful with healthy, well-maintained locs.'
    }
  ];

  const milestones = [
    { year: '2019', event: 'DreadLoc Studio Founded', description: 'Started with a vision to promote authentic African hair culture in Enugu' },
    { year: '2020', event: 'First 100 Clients', description: 'Achieved our first major milestone serving the local community' },
    { year: '2021', event: 'Product Line Launch', description: 'Introduced our curated selection of premium loc care products' },
    { year: '2022', event: 'Team Expansion', description: 'Grew our team of expert stylists to better serve our growing clientele' },
    { year: '2023', event: 'Online Presence', description: 'Launched online booking and expanded to serve diaspora customers' },
    { year: '2024', event: '500+ Happy Clients', description: 'Reached a major milestone serving over 500 satisfied customers' }
  ];

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl mb-6 gradient-text">About Amalyn Locs</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Celebrating African dreadlock culture in Enugu with authentic techniques, 
            premium products, and exceptional service.
          </p>
        </div>

        {/* Our Story */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-4xl mb-8 gradient-text">Our Story</h2>
            <div className="space-y-6 text-gray-600">
              <p className="text-lg leading-relaxed">
                Amalyn Locs was born from a deep passion for African hair culture and the desire to provide 
                authentic dreadlock services in Enugu. Founded in 2019, we started with a simple mission: to 
                celebrate and preserve the rich tradition of dreadlocks while helping our clients express their 
                unique identity.
              </p>
              <p>
                Located in the heart of Swissguard, Enugu, our studio has become a sanctuary for those seeking 
                professional dreadlock services. We believe that locs are more than just a hairstyle – they're 
                a symbol of heritage, spirituality, and personal journey.
              </p>
              <p>
                Our team of expert stylists combines traditional African techniques with modern innovations to 
                ensure every client receives the highest quality service. From starter locs to maintenance and 
                creative styling, we're here to support you throughout your entire loc journey.
              </p>
            </div>
          </div>
          <div className="relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1723101917533-4fc9149c3684?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmVhZGxvY2slMjBzYWxvbiUyMGludGVyaW9yfGVufDF8fHx8MTc1OTEyOTk1MXww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="DreadLoc Studio interior"
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="text-2xl mb-2">Visit Our Studio</h3>
                <p className="text-lg">Swissguard, Enugu State</p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h2 className="text-3xl mb-8 text-black text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-black" />
                    </div>
                    <h3 className="text-xl mb-3 text-black">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Our Team */}
        <div className="mb-16">
          <h2 className="text-3xl mb-8 text-black text-center">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <div className="relative">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-black">{member.name}</CardTitle>
                  <CardDescription className="text-yellow-600">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Experience:</span>
                      <span className="text-black">{member.experience}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Specialty:</span>
                      <span className="text-black">{member.specialty}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Our Journey */}
        <div className="mb-16">
          <h2 className="text-3xl mb-8 text-black text-center">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-yellow-500 transform md:-translate-x-1/2"></div>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                    <Card className="ml-8 md:ml-0">
                      <CardContent className="p-6">
                        <div className="text-yellow-600 mb-2">{milestone.year}</div>
                        <h3 className="text-xl mb-2 text-black">{milestone.event}</h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-yellow-500 rounded-full transform md:-translate-x-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Location & Hours */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-black">
                <MapPin className="mr-2 h-5 w-5 text-yellow-500" />
                Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-gray-600">DreadLoc Studio</p>
                <p className="text-gray-600">Swissguard, Enugu State</p>
                <p className="text-gray-600">Nigeria</p>
                <Button 
                  onClick={() => onPageChange('contact')}
                  className="mt-4 bg-yellow-500 hover:bg-yellow-400 text-black"
                >
                  Get Directions
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-black">
                <Clock className="mr-2 h-5 w-5 text-yellow-500" />
                Opening Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday:</span>
                  <span className="text-black">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday:</span>
                  <span className="text-black">8:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday:</span>
                  <span className="text-black">10:00 AM - 4:00 PM</span>
                </div>
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <Phone className="inline h-4 w-4 mr-1" />
                    Call ahead for appointments: +234 812 345 6789
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center bg-black rounded-lg p-12">
          <h3 className="text-3xl mb-4 text-yellow-500">Join Our Loc Family</h3>
          <p className="text-xl mb-8 text-white max-w-2xl mx-auto">
            Experience the difference of authentic African dreadlock artistry. 
            Book your consultation today and start your loc journey with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => onPageChange('booking')}
              className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-3"
            >
              Book Consultation
            </Button>
            <Button 
              onClick={() => onPageChange('contact')}
              variant="outline" 
              className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black px-8 py-3"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  CheckCircle, 
  Star, 
  Instagram, 
  MessageCircle, 

  BookOpen,

  Sparkles,
  TrendingUp,
  Users,
  Heart,
  Calendar
} from 'lucide-react';

interface FeatureSummaryProps {
  onPageChange: (page: string) => void;
}

export function FeatureSummary({ onPageChange }: FeatureSummaryProps) {
  const implementedFeatures = [
    {
      icon: Star,
      title: 'Customer Reviews & Social Proof',
      description: 'Comprehensive review system with ratings, testimonials, and social validation',
      page: 'reviews',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50 border-yellow-200'
    },
    {
      icon: Instagram,
      title: 'Social Media Integration',
      description: 'Live Instagram feed, social sharing, and user-generated content showcase',
      page: 'social',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 border-purple-200'
    },
    {
      icon: Sparkles,
      title: 'Interactive Consultation Tool',
      description: 'AI-powered hair assessment with personalized recommendations',
      page: 'consultation',
      color: 'text-pink-500',
      bgColor: 'bg-pink-50 border-pink-200'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat Support',
      description: '24/7 AI chatbot with seamless human agent handoff via WhatsApp',
      page: 'home',
      color: 'text-green-500',
      bgColor: 'bg-green-50 border-green-200'
    },
    {
      icon: BookOpen,
      title: 'Content Marketing Blog',
      description: 'Expert tips, tutorials, and loc care guides with SEO optimization',
      page: 'blog',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 border-blue-200'
    },

  ];

  const upcomingFeatures = [
    { title: 'Mobile App Development', status: 'Planning' },
    { title: 'Real-time Booking Calendar', status: 'Coming Soon' },
    { title: 'Payment Integration', status: 'Planning' },
    { title: 'Virtual Try-On AR', status: 'Research' }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            ✨ Modern Website Features
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            Amalyn Locs now features cutting-edge technology for the ultimate user experience
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge className="bg-green-100 text-green-800 px-4 py-2">
              <CheckCircle className="h-4 w-4 mr-2" />
              5 Major Features Implemented
            </Badge>
            <Badge className="bg-blue-100 text-blue-800 px-4 py-2">
              <TrendingUp className="h-4 w-4 mr-2" />
              Industry-Leading Technology
            </Badge>
            <Badge className="bg-purple-100 text-purple-800 px-4 py-2">
              <Heart className="h-4 w-4 mr-2" />
              Enhanced User Experience
            </Badge>
          </div>
        </div>

        {/* Implemented Features */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
            ✅ Implemented Features
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {implementedFeatures.map((feature, index) => (
              <Card key={index} className={`p-6 modern-card hover:shadow-lg transition-all duration-300 cursor-pointer ${feature.bgColor}`}>
                <div className="flex items-start mb-4">
                  <div className={`p-3 rounded-full bg-white shadow-sm mr-4`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-2">{feature.title}</h4>
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">
                      {feature.description}
                    </p>
                    <Button
                      onClick={() => onPageChange(feature.page)}
                      size="sm"
                      className={`w-full ${feature.color.replace('text-', 'bg-').replace('-500', '-500')} text-white hover:opacity-90`}
                    >
                      Explore Feature
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-8 text-center modern-card bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
            <Users className="h-16 w-16 text-yellow-500 mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-4">Customer-Focused</h3>
            <p className="text-gray-700 mb-6">
              Every feature designed to enhance the customer experience, from booking to aftercare
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Customer Reviews</span>
                <Badge variant="secondary">✓ Live</Badge>
              </div>
              <div className="flex justify-between">
                <span>Consultation Tool</span>
                <Badge variant="secondary">✓ AI-Powered</Badge>
              </div>

            </div>
          </Card>

          <Card className="p-8 text-center modern-card bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <TrendingUp className="h-16 w-16 text-purple-500 mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-4">Technology-Forward</h3>
            <p className="text-gray-700 mb-6">
              Leveraging the latest web technologies for superior performance and user experience
            </p>
            <div className="space-y-2 text-sm">

              <div className="flex justify-between">
                <span>AI Chat Assistant</span>
                <Badge variant="secondary">✓ 24/7 Support</Badge>
              </div>
              <div className="flex justify-between">
                <span>Real-time Updates</span>
                <Badge variant="secondary">✓ Live Data</Badge>
              </div>
            </div>
          </Card>

          <Card className="p-8 text-center modern-card bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
            <Heart className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-4">Business Growth</h3>
            <p className="text-gray-700 mb-6">
              Features designed to drive engagement, retention, and business growth
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Social Integration</span>
                <Badge variant="secondary">✓ Instagram Feed</Badge>
              </div>
              <div className="flex justify-between">
                <span>SEO Blog Content</span>
                <Badge variant="secondary">✓ Optimized</Badge>
              </div>

            </div>
          </Card>
        </div>

        {/* Coming Soon */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-8 flex items-center justify-center">
            <Calendar className="h-8 w-8 text-blue-500 mr-3" />
            🚀 Coming Soon
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {upcomingFeatures.map((feature, index) => (
              <Card key={index} className="p-4 modern-card bg-gray-50">
                <h4 className="font-semibold mb-2">{feature.title}</h4>
                <Badge variant="outline" className="text-xs">
                  {feature.status}
                </Badge>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={() => onPageChange('contact')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 px-8 py-4 text-lg"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Request New Features
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
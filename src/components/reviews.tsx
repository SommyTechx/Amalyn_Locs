import { useState, useEffect } from 'react';
import { Star, Quote, Play, ChevronLeft, ChevronRight, Heart, ThumbsUp } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getUnsplashImage } from '../utils/unsplash';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  service: string;
  date: string;
  verified: boolean;
  beforeImage?: string;
  afterImage?: string;
  videoTestimonial?: string;
  location?: string;
  helpful: number;
}

interface ReviewsProps {
  onPageChange?: (page: string) => void;
  compact?: boolean;
}

export function Reviews({ onPageChange, compact = false }: ReviewsProps) {
  const [currentReview, setCurrentReview] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [heroImage, setHeroImage] = useState('');

  // Mock data - in real app this would come from Google Reviews API or your backend
  const reviews: Review[] = [
    {
      id: '1',
      name: 'Adunni Olatunji',
      rating: 5,
      comment: 'Amalyn transformed my hair journey! The starter locs process was so professional and the results exceeded my expectations. My locs look natural and beautiful.',
      service: 'Starter Locs',
      date: '2024-01-15',
      verified: true,
      beforeImage: '',
      afterImage: '',
      location: 'Lagos, Nigeria',
      helpful: 12
    },
    {
      id: '2', 
      name: 'Kemi Adebayo',
      rating: 5,
      comment: 'Best loc maintenance in the city! Amalyn\'s attention to detail is incredible. My retwist always looks perfect and lasts for weeks.',
      service: 'Retwist & Maintenance',
      date: '2024-01-10',
      verified: true,
      beforeImage: '',
      afterImage: '',
      location: 'Abuja, Nigeria',
      helpful: 8
    },
    {
      id: '3',
      name: 'Funmi Ibrahim',
      rating: 5,
      comment: 'The loc styling for my wedding was absolutely stunning! Amalyn created the perfect updo that lasted all day. So many compliments!',
      service: 'Loc Styling',
      date: '2024-01-05',
      verified: true,
      beforeImage: '',
      afterImage: '',
      location: 'Port Harcourt, Nigeria',
      helpful: 15
    },
    {
      id: '4',
      name: 'Chioma Okoro',
      rating: 5,
      comment: 'The coloring service was amazing! My honey blonde locs look so natural and healthy. Amalyn really knows color theory.',
      service: 'Coloring',
      date: '2023-12-28',
      verified: true,
      beforeImage: '',
      afterImage: '',
      location: 'Lagos, Nigeria',
      helpful: 10
    },
    {
      id: '5',
      name: 'Zainab Mohammed',
      rating: 5,
      comment: 'Deep cleansing service left my scalp feeling so fresh and clean. My locs have never felt this healthy!',
      service: 'Deep Cleansing',
      date: '2023-12-20',
      verified: true,
      location: 'Kano, Nigeria',
      helpful: 6
    },
    {
      id: '6',
      name: 'Blessing Eze',
      rating: 5,
      comment: 'The consultation was so thorough! Amalyn educated me on proper loc care and created a maintenance schedule perfect for my lifestyle.',
      service: 'Consultation',
      date: '2023-12-15',
      verified: true,
      location: 'Enugu, Nigeria',
      helpful: 9
    }
  ];

  const services = ['all', 'Starter Locs', 'Retwist & Maintenance', 'Loc Styling', 'Coloring', 'Deep Cleansing', 'Consultation'];

  const filteredReviews = selectedCategory === 'all' 
    ? reviews 
    : reviews.filter(review => review.service === selectedCategory);

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;

  useEffect(() => {
    const loadImages = async () => {
      try {
        if (!compact) {
          const heroUrl = await getUnsplashImage("happy african woman beautiful hair salon");
          setHeroImage(heroUrl);
        }

        // Load before/after images for reviews
        const imagePromises = reviews.map(async (review, index) => {
          if (index < 3) { // Only load images for first 3 reviews to avoid rate limits
            const beforeUrl = await getUnsplashImage("before hair dreadlocks african");
            const afterUrl = await getUnsplashImage("beautiful dreadlocks african woman styled");
            return { id: review.id, beforeImage: beforeUrl, afterImage: afterUrl };
          }
          return null;
        });

        const imageResults = await Promise.all(imagePromises);
        // In real app, you'd update the reviews state here
      } catch (error) {
        console.error('Error loading images:', error);
      }
    };

    loadImages();
  }, [compact]);

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % filteredReviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + filteredReviews.length) % filteredReviews.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (compact) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">What Our Clients Say</h2>
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="flex items-center space-x-1">
                {renderStars(5)}
              </div>
              <span className="text-2xl font-bold">{averageRating.toFixed(1)}</span>
              <span className="text-gray-600">({totalReviews} reviews)</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {filteredReviews.slice(0, 3).map((review) => (
              <Card key={review.id} className="p-6 modern-card">
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-3">
                    <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-black font-semibold">
                      {review.name.charAt(0)}
                    </div>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold">{review.name}</h4>
                      {review.verified && (
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex">{renderStars(review.rating)}</div>
                      <span className="text-sm text-gray-500">{review.service}</span>
                    </div>
                  </div>
                </div>

                <Quote className="h-6 w-6 text-yellow-400 mb-2" />
                <p className="text-gray-700 mb-4 leading-relaxed">{review.comment}</p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{review.location}</span>
                  <span>{new Date(review.date).toLocaleDateString()}</span>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button 
              onClick={() => onPageChange?.('reviews')}
              className="bg-black text-white hover:bg-gray-800"
            >
              View All Reviews
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-black text-white">
        {heroImage && (
          <div className="absolute inset-0">
            <ImageWithFallback
              src={heroImage}
              alt="Happy clients"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 hero-overlay"></div>
          </div>
        )}
        
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl mb-6 hero-content">Client Reviews</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 hero-content">
            See what our amazing clients have to say about their loc journey with us
          </p>
          
          <div className="flex items-center justify-center space-x-8 mb-8 hero-content">
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text-light">{averageRating.toFixed(1)}</div>
              <div className="flex justify-center mb-2">{renderStars(5)}</div>
              <div className="text-sm text-gray-300">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text-light">{totalReviews}+</div>
              <div className="text-sm text-gray-300">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text-light">100%</div>
              <div className="text-sm text-gray-300">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {services.map((service) => (
              <Button
                key={service}
                variant={selectedCategory === service ? "default" : "outline"}
                onClick={() => setSelectedCategory(service)}
                className={`${
                  selectedCategory === service
                    ? 'bg-yellow-400 text-black hover:bg-yellow-500'
                    : 'hover:bg-yellow-400/10'
                }`}
              >
                {service === 'all' ? 'All Services' : service}
              </Button>
            ))}
          </div>

          {/* Featured Review Carousel */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-center mb-8">Featured Reviews</h2>
            <div className="relative">
              <Card className="p-8 modern-card max-w-4xl mx-auto">
                {filteredReviews.length > 0 && (
                  <div className="text-center">
                    <Quote className="h-12 w-12 text-yellow-400 mx-auto mb-6" />
                    
                    <div className="flex items-center justify-center mb-4">
                      <Avatar className="h-16 w-16 mr-4">
                        <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-black font-bold text-xl">
                          {filteredReviews[currentReview].name.charAt(0)}
                        </div>
                      </Avatar>
                      <div className="text-left">
                        <h3 className="text-xl font-bold">{filteredReviews[currentReview].name}</h3>
                        <div className="flex items-center space-x-2">
                          <div className="flex">{renderStars(filteredReviews[currentReview].rating)}</div>
                          {filteredReviews[currentReview].verified && (
                            <Badge className="bg-green-100 text-green-800">Verified</Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <p className="text-lg text-gray-700 mb-6 leading-relaxed max-w-3xl mx-auto">
                      {filteredReviews[currentReview].comment}
                    </p>

                    <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                      <span className="font-medium text-yellow-600">
                        {filteredReviews[currentReview].service}
                      </span>
                      <span>{filteredReviews[currentReview].location}</span>
                      <span>{new Date(filteredReviews[currentReview].date).toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center justify-center mt-6 space-x-2">
                      <ThumbsUp className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {filteredReviews[currentReview].helpful} people found this helpful
                      </span>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                {filteredReviews.length > 1 && (
                  <div className="flex justify-between items-center mt-8">
                    <Button
                      variant="outline"
                      onClick={prevReview}
                      className="flex items-center space-x-2"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span>Previous</span>
                    </Button>

                    <div className="flex space-x-2">
                      {filteredReviews.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentReview(index)}
                          className={`w-3 h-3 rounded-full transition-colors ${
                            index === currentReview ? 'bg-yellow-400' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      onClick={nextReview}
                      className="flex items-center space-x-2"
                    >
                      <span>Next</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </Card>
            </div>
          </div>

          {/* All Reviews Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((review) => (
              <Card key={review.id} className="p-6 modern-card hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-black font-semibold">
                        {review.name.charAt(0)}
                      </div>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold">{review.name}</h4>
                        {review.verified && (
                          <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                            ✓
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {review.service}
                  </Badge>
                </div>

                <p className="text-gray-700 mb-4 text-sm leading-relaxed">{review.comment}</p>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{review.location}</span>
                  <div className="flex items-center space-x-1">
                    <Heart className="h-3 w-3" />
                    <span>{review.helpful}</span>
                  </div>
                </div>

                <div className="text-xs text-gray-400 mt-2">
                  {new Date(review.date).toLocaleDateString()}
                </div>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <Card className="p-8 modern-card max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Ready to Join Our Happy Clients?</h3>
              <p className="text-gray-600 mb-6">
                Experience the same amazing service that our clients rave about. Book your appointment today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => onPageChange?.('booking')}
                  className="bg-yellow-400 text-black hover:bg-yellow-500"
                >
                  Book Your Appointment
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => onPageChange?.('contact')}
                >
                  Get Consultation
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
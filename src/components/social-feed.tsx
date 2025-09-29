import { useState, useEffect } from 'react';
import { Instagram, Heart, MessageCircle, Share, ExternalLink, Play } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getUnsplashImage } from '../utils/unsplash';

interface SocialPost {
  id: string;
  platform: 'instagram' | 'tiktok' | 'facebook';
  type: 'image' | 'video' | 'carousel';
  content: string;
  media: string[];
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  hashtags: string[];
  isVideo?: boolean;
}

interface SocialFeedProps {
  compact?: boolean;
  platform?: 'all' | 'instagram' | 'tiktok' | 'facebook';
}

export function SocialFeed({ compact = false, platform = 'all' }: SocialFeedProps) {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock social media data
  const mockPosts: SocialPost[] = [
    {
      id: '1',
      platform: 'instagram',
      type: 'image',
      content: 'Fresh starter locs completed today! 🔥 This client wanted a natural, organic look and we delivered exactly that. Book your appointment for professional loc installation.',
      media: [''],
      likes: 234,
      comments: 45,
      shares: 12,
      timestamp: '2024-01-15T10:30:00Z',
      hashtags: ['#starterlocs', '#dreadlocks', '#amalynlocs', '#naturalhair', '#locjourney']
    },
    {
      id: '2', 
      platform: 'instagram',
      type: 'video',
      content: 'Watch this amazing loc retwist transformation! ✨ Maintenance is key to healthy, beautiful locs.',
      media: [''],
      likes: 456,
      comments: 89,
      shares: 23,
      timestamp: '2024-01-12T14:15:00Z',
      hashtags: ['#retwist', '#locmaintenance', '#transformation', '#amalynlocs'],
      isVideo: true
    },
    {
      id: '3',
      platform: 'instagram', 
      type: 'carousel',
      content: 'Before ➡️ After: Stunning loc styling for a special event! 💫 From simple to sophisticated in just one session.',
      media: ['', ''],
      likes: 678,
      comments: 134,
      shares: 45,
      timestamp: '2024-01-10T16:45:00Z',
      hashtags: ['#locstyling', '#beforeandafter', '#specialevent', '#amalynlocs', '#locupdo']
    },
    {
      id: '4',
      platform: 'instagram',
      type: 'image',
      content: 'Color transformation Tuesday! 🌈 Added some beautiful honey highlights to these mature locs.',
      media: [''],
      likes: 345,
      comments: 67,
      shares: 18,
      timestamp: '2024-01-08T11:20:00Z',
      hashtags: ['#loccoloring', '#highlights', '#coloredlocs', '#amalynlocs', '#transformation']
    },
    {
      id: '5',
      platform: 'instagram',
      type: 'image',
      content: 'Deep cleansing day! 🧼 Healthy scalp = healthy locs. Don\'t forget to book your deep cleansing sessions.',
      media: [''],
      likes: 123,
      comments: 34,
      shares: 8,
      timestamp: '2024-01-05T09:10:00Z',
      hashtags: ['#deepcleansing', '#healthylocs', '#scalpcleaning', '#amalynlocs', '#loccare']
    },
    {
      id: '6',
      platform: 'instagram',
      type: 'video',
      content: 'Tips Tuesday: How to maintain your locs at home 💡 Save this post for reference!',
      media: [''],
      likes: 567,
      comments: 156,
      shares: 89,
      timestamp: '2024-01-03T15:30:00Z',
      hashtags: ['#loccare', '#tips', '#maintenance', '#amalynlocs', '#education'],
      isVideo: true
    }
  ];

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        // Load images for posts
        const postsWithImages = await Promise.all(
          mockPosts.map(async (post, index) => {
            const queries = [
              'beautiful dreadlocks african woman styled',
              'dreadlock retwist process',
              'elegant loc updo styling',
              'colored dreadlocks highlights',
              'scalp cleansing hair care',
              'loc maintenance tutorial'
            ];
            
            const imageUrl = await getUnsplashImage(queries[index % queries.length]);
            return {
              ...post,
              media: [imageUrl, ...(post.media.length > 1 ? [imageUrl] : [])]
            };
          })
        );
        
        setPosts(postsWithImages);
      } catch (error) {
        console.error('Error loading posts:', error);
        setPosts(mockPosts);
      }
      setLoading(false);
    };

    loadPosts();
  }, []);

  const filteredPosts = platform === 'all' ? posts : posts.filter(post => post.platform === platform);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="h-5 w-5" />;
      default:
        return <Instagram className="h-5 w-5" />;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return 'from-purple-500 to-pink-500';
      case 'tiktok':
        return 'from-black to-red-500';
      case 'facebook':
        return 'from-blue-600 to-blue-700';
      default:
        return 'from-purple-500 to-pink-500';
    }
  };

  if (compact) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Follow Our Journey</h2>
            <p className="text-xl text-gray-600 mb-6">
              See our latest work and client transformations on social media
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <Instagram className="h-4 w-4 mr-2" />
                @amalynlocs
              </Badge>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {filteredPosts.slice(0, 3).map((post) => (
              <Card key={post.id} className="overflow-hidden modern-card group hover:shadow-xl transition-all duration-300">
                <div className="relative">
                  <ImageWithFallback
                    src={post.media[0]}
                    alt="Social media post"
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {post.isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                      <Play className="h-12 w-12 text-white" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <Badge className={`bg-gradient-to-r ${getPlatformColor(post.platform)} text-white`}>
                      {getPlatformIcon(post.platform)}
                      <span className="ml-2 capitalize">{post.platform}</span>
                    </Badge>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-700 mb-4 line-clamp-3">{post.content}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Heart className="h-4 w-4 mr-1" />
                        {post.likes}
                      </span>
                      <span className="flex items-center">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {post.comments}
                      </span>
                    </div>
                    <span>{formatTimestamp(post.timestamp)}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {post.hashtags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button
              onClick={() => window.open('https://instagram.com/amalynlocs', '_blank')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
            >
              <Instagram className="h-5 w-5 mr-2" />
              Follow on Instagram
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl mb-6">Social Media</h1>
          <p className="text-xl md:text-2xl mb-8">
            Follow our journey and see the latest transformations
          </p>
          
          <div className="flex items-center justify-center space-x-6">
            <Button
              onClick={() => window.open('https://instagram.com/amalynlocs', '_blank')}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Instagram className="h-5 w-5 mr-2" />
              @amalynlocs
            </Button>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} className="p-6 animate-pulse">
                  <div className="bg-gray-200 h-64 rounded mb-4"></div>
                  <div className="space-y-3">
                    <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                    <div className="bg-gray-200 h-4 rounded w-1/2"></div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden modern-card group hover:shadow-xl transition-all duration-300">
                  <div className="relative">
                    <ImageWithFallback
                      src={post.media[0]}
                      alt="Social media post"
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {post.isVideo && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                        <Play className="h-12 w-12 text-white" />
                      </div>
                    )}
                    {post.type === 'carousel' && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-black/50 text-white">
                          1/{post.media.length}
                        </Badge>
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <Badge className={`bg-gradient-to-r ${getPlatformColor(post.platform)} text-white`}>
                        {getPlatformIcon(post.platform)}
                        <span className="ml-2 capitalize">{post.platform}</span>
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-700 mb-4">{post.content}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center hover:text-red-500 cursor-pointer transition-colors">
                          <Heart className="h-4 w-4 mr-1" />
                          {post.likes}
                        </span>
                        <span className="flex items-center hover:text-blue-500 cursor-pointer transition-colors">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {post.comments}
                        </span>
                        <span className="flex items-center hover:text-green-500 cursor-pointer transition-colors">
                          <Share className="h-4 w-4 mr-1" />
                          {post.shares}
                        </span>
                      </div>
                      <span>{formatTimestamp(post.timestamp)}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.hashtags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`https://instagram.com/p/${post.id}`, '_blank')}
                      className="w-full"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View on {post.platform}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center mt-16">
            <Card className="p-8 modern-card max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Stay Connected</h3>
              <p className="text-gray-600 mb-6">
                Follow us on social media for daily inspiration, tips, and behind-the-scenes content!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => window.open('https://instagram.com/amalynlocs', '_blank')}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                >
                  <Instagram className="h-5 w-5 mr-2" />
                  Follow on Instagram
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open('https://wa.me/2348123456789?text=I%20saw%20your%20work%20on%20social%20media!', '_blank')}
                >
                  Book Appointment
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
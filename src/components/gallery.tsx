import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getUnsplashImage } from '../utils/unsplash';
import { 
  Heart, 
  Eye, 
  Filter, 
  Calendar, 
  Search,
  Grid,
  Play,
  Share2,
  BookOpen,
  Star,
  TrendingUp,
  Palette,
  Scissors,
  Sparkles,
  ArrowRight,
  Instagram
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { toast } from 'sonner@2.0.3';

export function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('masonry');
  const [heroImage, setHeroImage] = useState('');
  const [galleryImages, setGalleryImages] = useState<{[key: number]: string}>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      try {
        setIsLoading(true);
        
        // Load hero image
        const heroUrl = await getUnsplashImage('african dreadlocks salon gallery');
        setHeroImage(heroUrl);

        // Load gallery images
        const imageSearchTerms = [
          'african dreadlocks hairstyle natural',
          'loc updo elegant style',
          'dreadlocks maintenance retwist',
          'colored dreadlocks gold highlights',
          'loc extensions long hair',
          'starter locs palm rolling',
          'creative dreadlocks parting',
          'burgundy colored locs',
          'loc maintenance treatment',
          'wedding dreadlocks style',
          'two strand twist locs',
          'natural loc root treatment'
        ];

        const imagePromises = galleryItems.map(async (item, index) => {
          const imageUrl = await getUnsplashImage(imageSearchTerms[index] || 'african dreadlocks style');
          return { id: item.id, imageUrl };
        });

        const images = await Promise.all(imagePromises);
        const imageMap = images.reduce((acc, { id, imageUrl }) => {
          acc[id] = imageUrl;
          return acc;
        }, {} as {[key: number]: string});
        
        setGalleryImages(imageMap);
      } catch (error) {
        console.error('Error loading images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, []);

  const categories = [
    { id: 'all', name: 'All Styles', icon: Grid, count: 12 },
    { id: 'starter', name: 'Starter Locs', icon: Sparkles, count: 3 },
    { id: 'retwist', name: 'Retwists', icon: TrendingUp, count: 1 },
    { id: 'styling', name: 'Styling', icon: Scissors, count: 4 },
    { id: 'coloring', name: 'Coloring', icon: Palette, count: 2 },
    { id: 'maintenance', name: 'Maintenance', icon: Heart, count: 2 }
  ];

  const galleryItems = [
    {
      id: 1,
      title: 'Fresh Starter Locs',
      category: 'starter',
      description: 'Beautiful starter locs using two-strand twist method for natural hair texture',
      date: '2024-12-15',
      featured: true,
      likes: 145,
      client: 'Sarah M.',
      duration: '3-4 hours',
      technique: 'Two-strand twist method',
      beforeAfter: false
    },
    {
      id: 2,
      title: 'Elegant Loc Updo',
      category: 'styling',
      description: 'Sophisticated bridal updo style perfect for special occasions and weddings',
      date: '2024-12-10',
      featured: true,
      likes: 262,
      client: 'Amara K.',
      duration: '2 hours',
      technique: 'Pinning and sculpting',
      beforeAfter: false
    },
    {
      id: 3,
      title: 'Perfect Retwist Session',
      category: 'retwist',
      description: 'Professional maintenance retwist for healthy, neat locs',
      date: '2024-12-08',
      featured: false,
      likes: 98,
      client: 'David O.',
      duration: '1.5 hours',
      technique: 'Palm rolling and twisting',
      beforeAfter: true
    },
    {
      id: 4,
      title: 'Golden Goddess Highlights',
      category: 'coloring',
      description: 'Stunning golden highlights on mature locs creating dimension and warmth',
      date: '2024-12-05',
      featured: true,
      likes: 389,
      client: 'Kemi L.',
      duration: '4 hours',
      technique: 'Selective bleaching and toning',
      beforeAfter: true
    },
    {
      id: 5,
      title: 'Loc Extension Transformation',
      category: 'styling',
      description: 'Added length and volume with premium human hair loc extensions',
      date: '2024-12-03',
      featured: false,
      likes: 134,
      client: 'Chioma A.',
      duration: '5-6 hours',
      technique: 'Extension installation',
      beforeAfter: true
    },
    {
      id: 6,
      title: 'Palm Roll Starter Method',
      category: 'starter',
      description: 'Traditional palm rolling technique for creating uniform starter locs',
      date: '2024-12-01',
      featured: false,
      likes: 89,
      client: 'Michael T.',
      duration: '3 hours',
      technique: 'Palm rolling',
      beforeAfter: false
    },
    {
      id: 7,
      title: 'Artistic Triangle Parting',
      category: 'styling',
      description: 'Creative geometric parting patterns for a unique artistic look',
      date: '2024-11-28',
      featured: true,
      likes: 256,
      client: 'Zara P.',
      duration: '2.5 hours',
      technique: 'Precision parting and styling',
      beforeAfter: false
    },
    {
      id: 8,
      title: 'Burgundy Color Transformation',
      category: 'coloring',
      description: 'Rich burgundy color treatment creating depth and richness',
      date: '2024-11-25',
      featured: true,
      likes: 173,
      client: 'Asha B.',
      duration: '4.5 hours',
      technique: 'Semi-permanent color application',
      beforeAfter: true
    },
    {
      id: 9,
      title: 'Complete Maintenance Package',
      category: 'maintenance',
      description: 'Full service including deep cleansing, conditioning, and retwist',
      date: '2024-11-22',
      featured: false,
      likes: 121,
      client: 'Jordan C.',
      duration: '3 hours',
      technique: 'Multi-step treatment',
      beforeAfter: false
    },
    {
      id: 10,
      title: 'Royal Wedding Style',
      category: 'styling',
      description: 'Elegant bridal styling with gold accessories and intricate design',
      date: '2024-11-20',
      featured: true,
      likes: 495,
      client: 'Princess N.',
      duration: '3.5 hours',
      technique: 'Formal updo with accessories',
      beforeAfter: false
    },
    {
      id: 11,
      title: 'Comb Coil Starter Technique',
      category: 'starter',
      description: 'Starting natural hair journey with precision comb coil method',
      date: '2024-11-18',
      featured: false,
      likes: 76,
      client: 'Ahmed R.',
      duration: '2.5 hours',
      technique: 'Comb coiling',
      beforeAfter: false
    },
    {
      id: 12,
      title: 'Natural Root Strengthening',
      category: 'maintenance',
      description: 'Specialized root treatment with organic oils and strengthening therapy',
      date: '2024-11-15',
      featured: false,
      likes: 87,
      client: 'Grace O.',
      duration: '2 hours',
      technique: 'Root therapy treatment',
      beforeAfter: true
    }
  ];

  const filteredItems = galleryItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.technique.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredItems = galleryItems.filter(item => item.featured);

  const shareImage = (item: any) => {
    const shareText = `Check out this amazing loc style: ${item.title} by Amalyn Locs!`;
    const shareUrl = 'https://amalynlocs.com/gallery';
    
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: shareText,
        url: shareUrl
      });
    } else {
      navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-black to-gray-900 text-white">
        {heroImage && (
          <div className="absolute inset-0">
            <ImageWithFallback
              src={heroImage}
              alt="Style gallery"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 hero-overlay"></div>
          </div>
        )}
        
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl mb-6 hero-content">Style Gallery</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 hero-content max-w-3xl mx-auto">
            Discover inspiring dreadlock transformations and artistic creations from our talented team
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto hero-content">
            <div className="flex items-center justify-center">
              <Star className="h-8 w-8 text-yellow-400 mr-3" />
              <span className="text-lg">Award-Winning Styles</span>
            </div>
            <div className="flex items-center justify-center">
              <Instagram className="h-8 w-8 text-yellow-400 mr-3" />
              <span className="text-lg">Instagram Famous</span>
            </div>
            <div className="flex items-center justify-center">
              <BookOpen className="h-8 w-8 text-yellow-400 mr-3" />
              <span className="text-lg">Technique Tutorials</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search styles, techniques, or clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-3 text-lg border-2 border-gray-200 focus:border-black"
            />
          </div>
          
          <div className="flex gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-56 border-2 border-gray-200 focus:border-black">
                <Filter className="h-5 w-5 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <category.icon className="h-4 w-4 mr-2" />
                        {category.name}
                      </div>
                      <Badge variant="outline" className="ml-2">
                        {category.count}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button
              variant={viewMode === 'masonry' ? 'default' : 'outline'}
              onClick={() => setViewMode(viewMode === 'grid' ? 'masonry' : 'grid')}
              className="border-2 border-gray-200"
            >
              <Grid className="h-4 w-4 mr-2" />
              {viewMode === 'grid' ? 'Masonry' : 'Grid'}
            </Button>
          </div>
        </div>

        {/* Featured Gallery */}
        {selectedCategory === 'all' && !searchTerm && (
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <Star className="h-8 w-8 text-yellow-500 mr-3" />
              <h2 className="text-3xl font-bold">Featured Transformations</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredItems.slice(0, 4).map((item, index) => (
                <Card 
                  key={item.id} 
                  className={`modern-card hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-yellow-400/20 hover:border-yellow-400 group ${
                    index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                  }`}
                  onClick={() => setSelectedImage(item.id)}
                >
                  <CardContent className="p-0 relative overflow-hidden">
                    {isLoading ? (
                      <div className={`bg-gray-200 animate-pulse ${index === 0 ? 'h-80 md:h-full' : 'h-64'}`} />
                    ) : (
                      <ImageWithFallback
                        src={galleryImages[item.id] || ''}
                        alt={item.title}
                        className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                          index === 0 ? 'h-80 md:h-full' : 'h-64'
                        }`}
                      />
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex justify-between items-end mb-2">
                          <div className="text-white">
                            <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                            <p className="text-sm text-gray-200 line-clamp-2">{item.description}</p>
                          </div>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={(e) => {
                              e.stopPropagation();
                              shareImage(item);
                            }}
                            className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-300">
                          <div className="flex items-center">
                            <Heart className="h-4 w-4 mr-1 text-red-400" />
                            {item.likes}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(item.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Badge className="absolute top-4 left-4 bg-yellow-400 text-black font-semibold">
                      ⭐ Featured
                    </Badge>
                    
                    {item.beforeAfter && (
                      <Badge className="absolute top-4 right-4 bg-blue-500 text-white">
                        Before/After
                      </Badge>
                    )}
                    
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Eye className="h-8 w-8 text-white drop-shadow-lg" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Main Gallery */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">
              {selectedCategory === 'all' ? 'All Styles' : categories.find(c => c.id === selectedCategory)?.name}
              <span className="text-gray-500 ml-2">({filteredItems.length})</span>
            </h2>
          </div>
          
          {filteredItems.length === 0 ? (
            <div className="text-center py-16">
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No styles found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <div className={`grid gap-6 ${
              viewMode === 'masonry' 
                ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'md:grid-cols-3 lg:grid-cols-4'
            }`}>
              {filteredItems.map((item) => (
                <Card 
                  key={item.id} 
                  className="modern-card hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  onClick={() => setSelectedImage(item.id)}
                >
                  <CardContent className="p-0 relative overflow-hidden">
                    {isLoading ? (
                      <div className="bg-gray-200 animate-pulse h-64" />
                    ) : (
                      <ImageWithFallback
                        src={galleryImages[item.id] || ''}
                        alt={item.title}
                        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute top-4 right-4">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={(e) => {
                            e.stopPropagation();
                            shareImage(item);
                          }}
                          className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Eye className="h-8 w-8 text-white drop-shadow-lg" />
                      </div>
                    </div>
                    
                    {item.featured && (
                      <Badge className="absolute top-4 left-4 bg-yellow-400 text-black font-semibold">
                        ⭐ Featured
                      </Badge>
                    )}
                    
                    {item.beforeAfter && (
                      <Badge className="absolute top-4 right-4 bg-blue-500 text-white">
                        B/A
                      </Badge>
                    )}
                    
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                      <p className="text-gray-300 text-sm mb-2 line-clamp-1">{item.technique}</p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-300">
                        <div className="flex items-center">
                          <Heart className="h-3 w-3 mr-1 text-red-400" />
                          {item.likes}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(item.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Call to Action */}
        <Card className="modern-card text-center p-8 bg-gradient-to-r from-black to-gray-900 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready for Your Transformation?</h2>
          <p className="text-xl mb-6 text-gray-300 max-w-2xl mx-auto">
            Join hundreds of satisfied clients who trust Amalyn Locs for their dreadlock journey
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 text-lg">
              <Calendar className="h-5 w-5 mr-2" />
              Book Your Style
            </Button>
            <Button 
              variant="outline" 
              className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-8 py-4 text-lg"
            >
              <ArrowRight className="h-5 w-5 mr-2" />
              View Services
            </Button>
          </div>
        </Card>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-4xl w-full max-h-full relative">
            <Button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 bg-white text-black hover:bg-gray-100 z-10"
            >
              ✕ Close
            </Button>
            {(() => {
              const item = galleryItems.find(i => i.id === selectedImage);
              return item ? (
                <div className="bg-white rounded-lg overflow-hidden max-h-full overflow-y-auto">
                  <div className="relative">
                    <ImageWithFallback
                      src={galleryImages[item.id] || ''}
                      alt={item.title}
                      className="w-full max-h-96 object-cover"
                    />
                    {item.featured && (
                      <Badge className="absolute top-4 left-4 bg-yellow-400 text-black">
                        ⭐ Featured
                      </Badge>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-black mb-2">{item.title}</h3>
                        <p className="text-gray-600 mb-4">{item.description}</p>
                      </div>
                      <Button
                        onClick={() => shareImage(item)}
                        variant="outline"
                        size="sm"
                      >
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            {new Date(item.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Heart className="h-4 w-4 mr-2 text-red-500" />
                          <span className="text-sm text-gray-600">{item.likes} likes</span>
                        </div>
                        <div className="flex items-center">
                          <Scissors className="h-4 w-4 mr-2 text-blue-500" />
                          <span className="text-sm text-gray-600">{item.technique}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-2 text-purple-500" />
                          <span className="text-sm text-gray-600">Client: {item.client}</span>
                        </div>
                        <div className="flex items-center">
                          <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                          <span className="text-sm text-gray-600">Duration: {item.duration}</span>
                        </div>
                        <Badge variant="outline" className="border-yellow-500 text-yellow-600">
                          {categories.find(c => c.id === item.category)?.name}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t">
                      <Button 
                        className="w-full bg-black text-yellow-400 hover:bg-gray-800"
                        onClick={() => {
                          setSelectedImage(null);
                          // Navigate to booking
                        }}
                      >
                        Book Similar Style
                      </Button>
                    </div>
                  </div>
                </div>
              ) : null;
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
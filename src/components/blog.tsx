import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { 
  Calendar, 
  Clock, 
  User, 
  Search, 
  Filter,
  BookOpen,
  TrendingUp,
  Star,
  Share2,
  ArrowRight,
  Heart,
  Eye,
  MessageCircle,
  Bookmark,
  ChevronRight
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getUnsplashImage } from '../utils/unsplash';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  readTime: number;
  category: string;
  tags: string[];
  featured: boolean;
  likes: number;
  shares: number;
  views: number;
  comments: number;
  image: string;
}

interface BlogProps {
  onPageChange?: (page: string) => void;
  compact?: boolean;
}

export function Blog({ onPageChange, compact = false }: BlogProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', name: 'All Topics', color: 'bg-gray-100 text-gray-700' },
    { id: 'Care Tips', name: 'Care Tips', color: 'bg-green-100 text-green-700' },
    { id: 'Styling', name: 'Styling', color: 'bg-purple-100 text-purple-700' },
    { id: 'Maintenance', name: 'Maintenance', color: 'bg-blue-100 text-blue-700' },
    { id: 'Product Reviews', name: 'Products', color: 'bg-orange-100 text-orange-700' },
    { id: 'Inspiration', name: 'Inspiration', color: 'bg-pink-100 text-pink-700' }
  ];

  // Mock blog posts with updated data
  const mockPosts: BlogPost[] = [
    {
      id: '1',
      title: 'The Complete Guide to Starting Your Loc Journey',
      excerpt: 'Everything you need to know before getting your first locs - from hair preparation to choosing the right method for your hair type.',
      content: `Starting your loc journey is an exciting decision that requires careful consideration and planning. This comprehensive guide will walk you through everything you need to know...

**Preparing Your Hair**
Before starting locs, it's important to have healthy hair. This means:
- Deep conditioning treatments
- Trimming damaged ends  
- Clarifying your scalp
- Avoiding chemical treatments for at least 6 weeks

**Choosing Your Method**
There are several methods for starting locs:
1. **Twist and Rip**: Best for coarse, textured hair
2. **Comb Coil**: Great for tighter curl patterns
3. **Two-strand twists**: Perfect for fine hair
4. **Interlocking**: Ideal for all hair types

**What to Expect**
The loc journey has distinct phases:
- **Starter Phase** (0-3 months): Hair may look messy as it begins to lock
- **Budding Phase** (3-6 months): Locs start to form and tighten
- **Teen Phase** (6-12 months): Locs may look awkward but are maturing
- **Mature Phase** (12+ months): Fully formed, strong locs

Remember, patience is key in your loc journey!`,
      author: 'Amalyn Johnson',
      publishDate: '2024-01-15',
      readTime: 8,
      category: 'Care Tips',
      tags: ['starter locs', 'beginner guide', 'hair care'],
      featured: true,
      likes: 245,
      shares: 89,
      views: 1240,
      comments: 23,
      image: ''
    },
    {
      id: '2',
      title: '10 Essential Products for Healthy Locs',
      excerpt: 'Discover the must-have products that will keep your locs clean, moisturized, and looking their best throughout every stage.',
      content: `Maintaining healthy locs requires the right products. Here are the 10 essentials every loc wearer should have...`,
      author: 'Kemi Adebayo',
      publishDate: '2024-01-12',
      readTime: 6,
      category: 'Product Reviews',
      tags: ['products', 'maintenance', 'recommendations'],
      featured: false,
      likes: 156,
      shares: 43,
      views: 890,
      comments: 18,
      image: ''
    },
    {
      id: '3',
      title: 'Elegant Loc Updos for Special Occasions',
      excerpt: 'Transform your locs into stunning styles perfect for weddings, parties, and professional events with these step-by-step tutorials.',
      content: `Your locs are versatile and can be styled for any occasion. Here are some elegant updo ideas...`,
      author: 'Funmi Ibrahim',
      publishDate: '2024-01-10',
      readTime: 5,
      category: 'Styling',
      tags: ['updos', 'special events', 'styling'],
      featured: true,
      likes: 298,
      shares: 156,
      views: 1560,
      comments: 34,
      image: ''
    },
    {
      id: '4',
      title: 'Common Loc Maintenance Mistakes to Avoid',
      excerpt: 'Learn from others\' mistakes and keep your locs healthy by avoiding these common pitfalls that can damage your hair.',
      content: `Proper maintenance is crucial for healthy locs. Here are the most common mistakes to avoid...`,
      author: 'Chioma Okoro',
      publishDate: '2024-01-08',
      readTime: 7,
      category: 'Maintenance',
      tags: ['maintenance', 'mistakes', 'care tips'],
      featured: false,
      likes: 189,
      shares: 67,
      views: 780,
      comments: 15,
      image: ''
    },
    {
      id: '5',
      title: 'Seasonal Loc Care: Adjusting Your Routine',
      excerpt: 'How to adapt your loc care routine to different seasons and weather conditions for optimal hair health year-round.',
      content: `Different seasons require different approaches to loc care. Here's how to adjust your routine...`,
      author: 'Zainab Mohammed',
      publishDate: '2024-01-05',
      readTime: 6,
      category: 'Care Tips',
      tags: ['seasonal care', 'weather', 'routine'],
      featured: false,
      likes: 134,
      shares: 45,
      views: 650,
      comments: 12,
      image: ''
    },
    {
      id: '6',
      title: 'Celebrity Loc Inspiration: Iconic Styles Through the Years',
      excerpt: 'Get inspired by iconic loc styles worn by celebrities and public figures throughout history and modern times.',
      content: `From Bob Marley to Ava DuVernay, locs have been worn by many influential figures...`,
      author: 'Blessing Eze',
      publishDate: '2024-01-03',
      readTime: 4,
      category: 'Inspiration',
      tags: ['celebrities', 'inspiration', 'history'],
      featured: false,
      likes: 267,
      shares: 123,
      views: 980,
      comments: 28,
      image: ''
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
              'beautiful dreadlocks tutorial guide',
              'hair care products natural',
              'elegant loc updo hairstyle',
              'hair maintenance care routine',
              'seasonal hair care products',
              'celebrity dreadlocks inspiration'
            ];
            
            const imageUrl = await getUnsplashImage(queries[index % queries.length]);
            return {
              ...post,
              image: imageUrl
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

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = posts.filter(post => post.featured);

  if (compact) {
    return (
      <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6 gradient-text">Loc Care Tips & Guides</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Expert advice and insights for your loc journey from our professional stylists
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {posts.slice(0, 3).map((post) => (
              <Card key={post.id} className="overflow-hidden modern-card group hover:shadow-2xl transition-all duration-500 border-0">
                <div className="relative">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-yellow-500 text-black shadow-lg">
                      {post.category}
                    </Badge>
                  </div>
                  {post.featured && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white text-yellow-600 shadow-lg">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        Featured
                      </Badge>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center space-x-4 text-white text-xs">
                      <span className="flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {post.views}
                      </span>
                      <span className="flex items-center">
                        <Heart className="h-3 w-3 mr-1" />
                        {post.likes}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg mb-3 line-clamp-2 text-black leading-snug">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime} min read</span>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedPost(post)}
                    className="w-full border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-black transition-all duration-300"
                  >
                    Read Article
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              onClick={() => onPageChange?.('blog')}
              className="bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-black px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
              size="lg"
            >
              <BookOpen className="h-5 w-5 mr-2" />
              Explore All Articles
            </Button>
          </div>
        </div>
      </section>
    );
  }

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-white">
        {/* Article Header */}
        <section className="relative py-20 bg-gradient-to-br from-black via-gray-900 to-black text-white">
          <div className="absolute inset-0 bg-yellow-500/10"></div>
          <div className="relative max-w-4xl mx-auto px-4">
            <Button
              variant="outline"
              onClick={() => setSelectedPost(null)}
              className="mb-8 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
            >
              ← Back to Articles
            </Button>

            <div className="text-center">
              <Badge className="mb-6 bg-yellow-500 text-black text-sm px-4 py-2">{selectedPost.category}</Badge>
              <h1 className="text-4xl md:text-6xl mb-6 gradient-text-light leading-tight">{selectedPost.title}</h1>
              
              <div className="flex flex-wrap items-center justify-center gap-8 text-gray-300 mb-12">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>{selectedPost.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>{new Date(selectedPost.publishDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>{selectedPost.readTime} min read</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="h-5 w-5" />
                  <span>{selectedPost.views} views</span>
                </div>
              </div>

              <ImageWithFallback
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="prose prose-lg max-w-none">
              {selectedPost.content.split('\n').map((paragraph, index) => {
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return <h3 key={index} className="text-2xl mb-6 mt-12 text-black">{paragraph.slice(2, -2)}</h3>;
                } else if (paragraph.startsWith('- ')) {
                  return <li key={index} className="ml-6 mb-2 text-gray-700">{paragraph.slice(2)}</li>;
                } else if (paragraph.match(/^\d+\./)) {
                  return <li key={index} className="ml-6 mb-2 text-gray-700">{paragraph}</li>;
                }
                return <p key={index} className="mb-6 leading-relaxed text-gray-700 text-lg">{paragraph}</p>;
              })}
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-yellow-50 rounded-2xl p-8 mt-12">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-wrap gap-3">
                  {selectedPost.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-yellow-100 text-yellow-700">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center space-x-4">
                  <Button size="sm" variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                    <Heart className="h-4 w-4 mr-2" />
                    {selectedPost.likes}
                  </Button>
                  <Button size="sm" variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button size="sm" variant="outline" className="border-green-300 text-green-600 hover:bg-green-50">
                    <Bookmark className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-yellow-50">
      {/* Header */}
      <section className="relative py-24 bg-gradient-to-r from-black via-gray-900 to-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-yellow-500/10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="hero-content">
            <h1 className="text-5xl md:text-7xl mb-6 gradient-text-light">Loc Care Blog</h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Expert tips, professional guides, and authentic inspiration for every stage of your loc journey
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-yellow-500">
              <div className="flex items-center gap-2">
                <BookOpen className="h-6 w-6" />
                <span>Expert Guides</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-6 w-6" />
                <span>Professional Tips</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-6 w-6" />
                <span>Community Stories</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search articles, topics, or authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-3 border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`${
                    selectedCategory === category.id
                      ? 'bg-yellow-500 text-black hover:bg-yellow-400'
                      : 'border-gray-300 text-gray-600 hover:border-yellow-500 hover:text-yellow-600'
                  } transition-all duration-300`}
                >
                  {category.name}
                  {selectedCategory === category.id && (
                    <span className="ml-2 bg-black/20 text-xs px-2 py-1 rounded-full">
                      {filteredPosts.length}
                    </span>
                  )}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && selectedCategory === 'all' && !searchQuery && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center mb-12">
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full p-3 mr-4">
                <TrendingUp className="h-6 w-6 text-black" />
              </div>
              <h2 className="text-3xl gradient-text">Featured Articles</h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {featuredPosts.slice(0, 2).map((post) => (
                <Card key={post.id} className="overflow-hidden modern-card group hover:shadow-2xl transition-all duration-500 border-0">
                  <div className="relative">
                    <ImageWithFallback
                      src={post.image}
                      alt={post.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute top-6 left-6">
                      <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-black shadow-lg">
                        <Star className="h-4 w-4 mr-2 fill-current" />
                        Featured Article
                      </Badge>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center justify-between text-white text-sm">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {post.views}
                          </span>
                          <span className="flex items-center">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            {post.comments}
                          </span>
                        </div>
                        <Badge className="bg-white/20 text-white border-white/30">
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <h3 className="text-2xl mb-4 text-black leading-tight">{post.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{post.excerpt}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <User className="h-4 w-4 mr-2" />
                          {post.author}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          {post.readTime} min read
                        </span>
                      </div>
                      <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                    </div>

                    <Button
                      onClick={() => setSelectedPost(post)}
                      className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-black shadow-lg hover:shadow-xl transition-all duration-300"
                      size="lg"
                    >
                      Read Full Article
                      <ChevronRight className="h-5 w-5 ml-2" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl mb-12 text-black">
            {selectedCategory === 'all' ? 'All Articles' : `${selectedCategory} Articles`}
            <span className="text-lg text-gray-500 ml-3">({filteredPosts.length} articles)</span>
          </h2>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} className="p-6 animate-pulse modern-card">
                  <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                  <div className="space-y-3">
                    <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                    <div className="bg-gray-200 h-4 rounded w-1/2"></div>
                    <div className="bg-gray-200 h-4 rounded w-2/3"></div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden modern-card group hover:shadow-xl transition-all duration-500 border-0">
                  <div className="relative">
                    <ImageWithFallback
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-yellow-500 text-black shadow-md">
                        {post.category}
                      </Badge>
                    </div>
                    {post.featured && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-white text-yellow-600 shadow-md">
                          <Star className="h-3 w-3 mr-1 fill-current" />
                        </Badge>
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between text-white text-xs">
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            {post.views}
                          </span>
                          <span className="flex items-center">
                            <Heart className="h-3 w-3 mr-1" />
                            {post.likes}
                          </span>
                        </div>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {post.readTime} min
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg mb-3 line-clamp-2 text-black leading-snug">{post.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center space-x-2">
                        <User className="h-3 w-3" />
                        <span>{post.author}</span>
                      </div>
                      <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                    </div>

                    <Button
                      size="sm"
                      onClick={() => setSelectedPost(post)}
                      className="w-full bg-black hover:bg-gray-800 text-yellow-500 transition-all duration-300"
                    >
                      Read Article
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {filteredPosts.length === 0 && !loading && (
            <div className="text-center py-16">
              <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-2xl text-gray-900 mb-4">No articles found</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                We couldn't find any articles matching your search criteria. Try adjusting your filters or search terms.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="bg-yellow-500 hover:bg-yellow-400 text-black"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { 
  Crown, 
  Gift, 
  Star, 
  Users, 
  Zap, 
  Calendar, 
  Trophy,
  Heart,
  Share2,
  Mail,
  Copy,
  CheckCircle,
  Sparkles,
  TrendingUp,
  Award,
  Coins,
  Ticket
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getUnsplashImage } from '../utils/unsplash';

interface MembershipTier {
  id: string;
  name: string;
  color: string;
  icon: any;
  pointsRequired: number;
  benefits: string[];
  discountPercentage: number;
  exclusiveServices: string[];
  priorityBooking: boolean;
  freeServices: number;
}

interface LoyaltyData {
  currentPoints: number;
  totalPointsEarned: number;
  currentTier: string;
  referrals: number;
  visits: number;
  favoriteServices: string[];
  memberSince: string;
  nextReward: string;
  pointsToNextTier: number;
}

interface LoyaltyProgramProps {
  onPageChange?: (page: string) => void;
  compact?: boolean;
}

export function LoyaltyProgram({ onPageChange, compact = false }: LoyaltyProgramProps) {
  const [membershipTiers] = useState<MembershipTier[]>([
    {
      id: 'bronze',
      name: 'Bronze Member',
      color: 'from-amber-600 to-amber-800',
      icon: Star,
      pointsRequired: 0,
      benefits: [
        '5% discount on all services',
        'Birthday month special offer',
        'Member-only email newsletter',
        'Appointment reminders'
      ],
      discountPercentage: 5,
      exclusiveServices: [],
      priorityBooking: false,
      freeServices: 0
    },
    {
      id: 'silver',
      name: 'Silver VIP',
      color: 'from-gray-400 to-gray-600',
      icon: Award,
      pointsRequired: 500,
      benefits: [
        '10% discount on all services',
        'Priority booking access',
        'Quarterly loc health consultation',
        'Free deep cleansing (1x per year)',
        'Exclusive styling tutorials'
      ],
      discountPercentage: 10,
      exclusiveServices: ['Free deep cleansing'],
      priorityBooking: true,
      freeServices: 1
    },
    {
      id: 'gold',
      name: 'Gold Elite',
      color: 'from-yellow-400 to-yellow-600',
      icon: Trophy,
      pointsRequired: 1500,
      benefits: [
        '15% discount on all services',
        'Priority booking & same-day appointments',
        'Monthly loc consultation',
        'Free retwist (2x per year)',
        'Exclusive product previews',
        '20% off all products'
      ],
      discountPercentage: 15,
      exclusiveServices: ['Free retwist sessions', 'Product previews'],
      priorityBooking: true,
      freeServices: 2
    },
    {
      id: 'platinum',
      name: 'Platinum Royalty',
      color: 'from-purple-500 to-purple-700',
      icon: Crown,
      pointsRequired: 3000,
      benefits: [
        '20% discount on all services',
        'VIP booking line & 24/7 support',
        'Weekly loc health monitoring',
        'Free styling session (4x per year)',
        'First access to new services',
        'Personal loctician assignment',
        '25% off all products',
        'Exclusive events invitation'
      ],
      discountPercentage: 20,
      exclusiveServices: ['VIP support', 'Personal loctician', 'Exclusive events'],
      priorityBooking: true,
      freeServices: 4
    }
  ]);

  const [loyaltyData, setLoyaltyData] = useState<LoyaltyData>({
    currentPoints: 1250,
    totalPointsEarned: 2100,
    currentTier: 'silver',
    referrals: 8,
    visits: 12,
    favoriteServices: ['Retwist & Maintenance', 'Loc Styling'],
    memberSince: '2023-06-15',
    nextReward: 'Free Styling Session',
    pointsToNextTier: 250
  });

  const [emailForNewsletter, setEmailForNewsletter] = useState('');
  const [referralCode, setReferralCode] = useState('AMALYN-REF-789');
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [heroImage, setHeroImage] = useState('');

  useEffect(() => {
    const loadImages = async () => {
      try {
        if (!compact) {
          const heroUrl = await getUnsplashImage("happy african woman loyalty rewards");
          setHeroImage(heroUrl);
        }
      } catch (error) {
        console.error('Error loading images:', error);
      }
    };

    loadImages();
  }, [compact]);

  const currentTierData = membershipTiers.find(tier => tier.id === loyaltyData.currentTier);
  const nextTierData = membershipTiers.find(tier => tier.pointsRequired > (currentTierData?.pointsRequired || 0));

  const earnPointsActivities = [
    { activity: 'Service booking', points: 50, icon: Calendar },
    { activity: 'Product purchase', points: 10, icon: Gift },
    { activity: 'Referral (friend books)', points: 200, icon: Users },
    { activity: 'Social media share', points: 25, icon: Share2 },
    { activity: 'Newsletter signup', points: 50, icon: Mail },
    { activity: 'Review submission', points: 75, icon: Star }
  ];

  const recentRewards = [
    { date: '2024-01-15', reward: '10% Service Discount', points: 500, redeemed: true },
    { date: '2024-01-10', reward: 'Free Deep Cleansing', points: 750, redeemed: true },
    { date: '2024-01-05', reward: 'Product Discount', points: 300, redeemed: false }
  ];

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast.success('Referral code copied to clipboard!');
  };

  const subscribeToNewsletter = () => {
    if (emailForNewsletter) {
      toast.success('Successfully subscribed! You earned 50 points!');
      setLoyaltyData(prev => ({
        ...prev,
        currentPoints: prev.currentPoints + 50,
        totalPointsEarned: prev.totalPointsEarned + 50
      }));
      setEmailForNewsletter('');
    }
  };

  const shareOnSocial = (platform: string) => {
    const message = 'Check out Amalyn Locs - the best loc care specialists! Use my referral code: ' + referralCode;
    const url = encodeURIComponent('https://amalynlocs.com');
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${url}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodeURIComponent(message)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(message + ' ' + url)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank');
      toast.success('You earned 25 points for sharing!');
      setLoyaltyData(prev => ({
        ...prev,
        currentPoints: prev.currentPoints + 25,
        totalPointsEarned: prev.totalPointsEarned + 25
      }));
    }
  };

  if (compact) {
    return (
      <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Loyalty Rewards Program</h2>
            <p className="text-xl text-gray-600 mb-6">
              Earn points, unlock exclusive benefits, and enjoy VIP treatment
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 modern-card text-center">
              <Coins className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Earn Points</h3>
              <p className="text-gray-600 mb-4">
                Earn points for every service, referral, and social interaction
              </p>
              <Badge className="bg-purple-100 text-purple-800">
                50 points per visit
              </Badge>
            </Card>

            <Card className="p-6 modern-card text-center">
              <Crown className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Unlock Tiers</h3>
              <p className="text-gray-600 mb-4">
                Progress through Bronze, Silver, Gold, and Platinum levels
              </p>
              <Badge className="bg-yellow-100 text-yellow-800">
                Up to 20% off
              </Badge>
            </Card>

            <Card className="p-6 modern-card text-center">
              <Gift className="h-12 w-12 text-pink-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Exclusive Benefits</h3>
              <p className="text-gray-600 mb-4">
                Enjoy free services, priority booking, and VIP treatment
              </p>
              <Badge className="bg-pink-100 text-pink-800">
                Free services included
              </Badge>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button 
              onClick={() => onPageChange?.('loyalty')}
              className="bg-purple-500 text-white hover:bg-purple-600 px-8 py-4 text-lg"
            >
              <Crown className="h-5 w-5 mr-2" />
              Join Loyalty Program
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        {heroImage && (
          <div className="absolute inset-0">
            <ImageWithFallback
              src={heroImage}
              alt="Loyalty program"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 hero-overlay"></div>
          </div>
        )}
        
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl mb-6 hero-content">Loyalty Rewards</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 hero-content">
            Earn points, unlock exclusive benefits, and enjoy VIP treatment
          </p>
          
          {currentTierData && (
            <div className="max-w-2xl mx-auto hero-content">
              <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20">
                <div className="flex items-center justify-center mb-4">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${currentTierData.color} flex items-center justify-center mr-4`}>
                    <currentTierData.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-2xl font-bold">{currentTierData.name}</h3>
                    <p className="text-gray-200">{loyaltyData.currentPoints} points</p>
                  </div>
                </div>
                
                {nextTierData && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress to {nextTierData.name}</span>
                      <span>{loyaltyData.pointsToNextTier} points to go</span>
                    </div>
                    <Progress 
                      value={((currentTierData.pointsRequired + loyaltyData.currentPoints - currentTierData.pointsRequired) / (nextTierData.pointsRequired - currentTierData.pointsRequired)) * 100} 
                      className="h-3"
                    />
                  </div>
                )}
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* Current Status */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="p-6 text-center modern-card">
              <Coins className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-purple-600 mb-2">{loyaltyData.currentPoints}</div>
              <p className="text-gray-600">Current Points</p>
            </Card>

            <Card className="p-6 text-center modern-card">
              <TrendingUp className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-green-600 mb-2">{loyaltyData.totalPointsEarned}</div>
              <p className="text-gray-600">Lifetime Points</p>
            </Card>

            <Card className="p-6 text-center modern-card">
              <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-blue-600 mb-2">{loyaltyData.referrals}</div>
              <p className="text-gray-600">Referrals Made</p>
            </Card>

            <Card className="p-6 text-center modern-card">
              <Calendar className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-orange-600 mb-2">{loyaltyData.visits}</div>
              <p className="text-gray-600">Visits Completed</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Membership Tiers</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {membershipTiers.map((tier) => {
              const IconComponent = tier.icon;
              const isCurrentTier = tier.id === loyaltyData.currentTier;
              
              return (
                <Card key={tier.id} className={`p-6 modern-card ${isCurrentTier ? 'ring-2 ring-purple-500' : ''} relative`}>
                  {isCurrentTier && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white">
                      Current Tier
                    </Badge>
                  )}
                  
                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${tier.color} flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                    <p className="text-gray-600">{tier.pointsRequired}+ points</p>
                  </div>

                  <div className="space-y-3">
                    {tier.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Discount:</span>
                      <span className="font-semibold">{tier.discountPercentage}%</span>
                    </div>
                    {tier.freeServices > 0 && (
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>Free Services:</span>
                        <span className="font-semibold">{tier.freeServices}/year</span>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Earn Points */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How to Earn Points</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {earnPointsActivities.map((activity) => {
              const IconComponent = activity.icon;
              return (
                <Card key={activity.activity} className="p-6 modern-card hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                      <IconComponent className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{activity.activity}</h3>
                      <p className="text-purple-600 font-bold">+{activity.points} points</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Referral Program */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Refer Friends & Earn</h2>
            <p className="text-xl text-gray-600">
              Share the love and earn 200 points for each friend who books a service
            </p>
          </div>

          <Card className="p-8 modern-card">
            <div className="text-center mb-8">
              <div className="inline-flex items-center bg-purple-100 rounded-full px-6 py-3 mb-4">
                <Gift className="h-6 w-6 text-purple-600 mr-2" />
                <span className="font-semibold text-purple-800">Your Referral Code</span>
              </div>
              
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="bg-gray-100 rounded-lg px-6 py-4 text-2xl font-mono font-bold text-purple-600">
                  {referralCode}
                </div>
                <Button onClick={copyReferralCode} variant="outline">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>

              <div className="flex justify-center space-x-4 mb-8">
                <Button onClick={() => shareOnSocial('whatsapp')} className="bg-green-500 hover:bg-green-600 text-white">
                  Share on WhatsApp
                </Button>
                <Button onClick={() => shareOnSocial('facebook')} className="bg-blue-600 hover:bg-blue-700 text-white">
                  Share on Facebook
                </Button>
                <Button onClick={() => shareOnSocial('twitter')} className="bg-blue-400 hover:bg-blue-500 text-white">
                  Share on Twitter
                </Button>
              </div>

              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="bg-white rounded-lg p-4 border">
                  <div className="text-2xl font-bold text-purple-600 mb-2">200</div>
                  <div className="text-sm text-gray-600">Points per referral</div>
                </div>
                <div className="bg-white rounded-lg p-4 border">
                  <div className="text-2xl font-bold text-green-600 mb-2">{loyaltyData.referrals}</div>
                  <div className="text-sm text-gray-600">Successful referrals</div>
                </div>
                <div className="bg-white rounded-lg p-4 border">
                  <div className="text-2xl font-bold text-blue-600 mb-2">{loyaltyData.referrals * 200}</div>
                  <div className="text-sm text-gray-600">Points earned from referrals</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="p-8 modern-card text-center">
            <Mail className="h-16 w-16 text-purple-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">Join Our VIP Newsletter</h2>
            <p className="text-gray-600 mb-8">
              Get exclusive styling tips, early access to promotions, and earn 50 points instantly!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={emailForNewsletter}
                onChange={(e) => setEmailForNewsletter(e.target.value)}
                className="flex-1"
              />
              <Button onClick={subscribeToNewsletter} className="bg-purple-500 hover:bg-purple-600 text-white">
                <Sparkles className="h-4 w-4 mr-2" />
                Subscribe (+50 pts)
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Recent Rewards Activity</h2>
          
          <div className="space-y-4">
            {recentRewards.map((reward, index) => (
              <Card key={index} className="p-4 modern-card">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                      reward.redeemed ? 'bg-green-100' : 'bg-yellow-100'
                    }`}>
                      {reward.redeemed ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <Ticket className="h-5 w-5 text-yellow-600" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold">{reward.reward}</h4>
                      <p className="text-sm text-gray-600">{reward.points} points • {reward.date}</p>
                    </div>
                  </div>
                  <Badge variant={reward.redeemed ? "secondary" : "default"}>
                    {reward.redeemed ? 'Redeemed' : 'Available'}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Earning?</h2>
          <p className="text-xl mb-8 text-gray-200">
            Book your next appointment and start collecting loyalty points today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => onPageChange?.('booking')}
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Book Appointment
            </Button>
            <Button 
              variant="outline"
              onClick={() => onPageChange?.('services')}
              className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg"
            >
              View Services
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
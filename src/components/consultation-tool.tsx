import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { 
  Camera, 
  Upload, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles,
  Clock,
  DollarSign,
  Star,
  User,
  Phone,
  Mail
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ConsultationData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
  };
  hairInfo: {
    currentLength: string;
    hairTexture: string;
    previousLocs: string;
    healthConcerns: string[];
    lifestyle: string;
  };
  preferences: {
    locSize: string;
    locCount: string;
    timeline: string;
    budget: string;
    inspiration: string[];
  };
  photos: File[];
}

interface ConsultationToolProps {
  onPageChange?: (page: string) => void;
  compact?: boolean;
}

export function ConsultationTool({ onPageChange, compact = false }: ConsultationToolProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [consultationData, setConsultationData] = useState<ConsultationData>({
    personalInfo: { name: '', email: '', phone: '' },
    hairInfo: { 
      currentLength: '', 
      hairTexture: '', 
      previousLocs: '', 
      healthConcerns: [],
      lifestyle: ''
    },
    preferences: { 
      locSize: '', 
      locCount: '', 
      timeline: '', 
      budget: '',
      inspiration: []
    },
    photos: []
  });
  const [recommendations, setRecommendations] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const steps = [
    { id: 1, title: 'Personal Info', icon: User },
    { id: 2, title: 'Hair Assessment', icon: Sparkles },
    { id: 3, title: 'Preferences', icon: Star },
    { id: 4, title: 'Photos', icon: Camera },
    { id: 5, title: 'Recommendations', icon: CheckCircle }
  ];

  const hairTextures = [
    { id: '4a', label: 'Type 4A - Soft coils' },
    { id: '4b', label: 'Type 4B - Z-pattern' },
    { id: '4c', label: 'Type 4C - Tight coils' },
    { id: '3c', label: 'Type 3C - Tight curls' },
    { id: 'mixed', label: 'Mixed textures' }
  ];

  const locSizes = [
    { id: 'micro', label: 'Micro Locs', description: '200+ locs, pencil thickness' },
    { id: 'small', label: 'Small Locs', description: '100-200 locs, finger thickness' },
    { id: 'medium', label: 'Medium Locs', description: '50-100 locs, thumb thickness' },
    { id: 'large', label: 'Large Locs', description: '20-50 locs, chunky' }
  ];

  const healthConcerns = [
    'Sensitive scalp',
    'Thinning edges',
    'Dry hair',
    'Oily scalp',
    'Damaged hair',
    'Chemical treatments',
    'None'
  ];

  const inspirationStyles = [
    'Natural/Organic look',
    'Neat and uniform',
    'Bohemian/Free-form',
    'Sisterlocs style',
    'Traditional locs',
    'Modern styling'
  ];

  const generateRecommendations = () => {
    setLoading(true);
    
    // AI-like recommendation logic
    setTimeout(() => {
      const { hairInfo, preferences } = consultationData;
      
      let recommendedService = 'Starter Locs';
      let estimatedTime = '4-6 hours';
      let estimatedCost = '$200-300';
      let maintenanceSchedule = 'Every 6-8 weeks';
      
      // Logic based on selections
      if (preferences.locSize === 'micro') {
        estimatedTime = '8-12 hours';
        estimatedCost = '$400-600';
        maintenanceSchedule = 'Every 4-6 weeks';
      } else if (preferences.locSize === 'large') {
        estimatedTime = '2-4 hours';
        estimatedCost = '$150-250';
        maintenanceSchedule = 'Every 8-10 weeks';
      }

      if (hairInfo.previousLocs === 'yes') {
        recommendedService = 'Retwist & Maintenance';
        estimatedTime = '2-3 hours';
        estimatedCost = '$80-150';
      }

      const recommendations = {
        service: recommendedService,
        locSize: preferences.locSize,
        estimatedTime,
        estimatedCost,
        maintenanceSchedule,
        tips: [
          'Start with a clarifying shampoo treatment',
          'Avoid heavy oils during the first month',
          'Sleep with a silk/satin pillowcase',
          'Schedule regular maintenance appointments'
        ],
        products: [
          'Residue-free shampoo',
          'Light hold gel',
          'Loc maintenance spray',
          'Silk sleeping cap'
        ]
      };

      setRecommendations(recommendations);
      setLoading(false);
      setCurrentStep(5);
    }, 2000);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setConsultationData(prev => ({
      ...prev,
      photos: [...prev.photos, ...files]
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const submitConsultation = () => {
    toast.success('Consultation request submitted! We\'ll contact you within 24 hours.');
    // Here you would send the data to your backend
  };

  if (compact) {
    return (
      <section className="py-16 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Free Hair Consultation</h2>
            <p className="text-xl text-gray-600 mb-6">
              Get personalized recommendations for your loc journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 modern-card text-center">
              <Sparkles className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Hair Assessment</h3>
              <p className="text-gray-600 mb-4">
                Tell us about your hair type, texture, and current condition
              </p>
            </Card>

            <Card className="p-6 modern-card text-center">
              <Camera className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Photo Analysis</h3>
              <p className="text-gray-600 mb-4">
                Upload photos for professional analysis and recommendations
              </p>
            </Card>

            <Card className="p-6 modern-card text-center">
              <CheckCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Custom Plan</h3>
              <p className="text-gray-600 mb-4">
                Receive a personalized loc plan with timeline and pricing
              </p>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button 
              onClick={() => onPageChange?.('consultation')}
              className="bg-yellow-400 text-black hover:bg-yellow-500 px-8 py-4 text-lg"
            >
              Start Free Consultation
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      {/* Header */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl mb-6">Hair Consultation</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Get personalized recommendations for your perfect loc journey
          </p>
        </div>
      </section>

      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          {steps.map((step) => {
            const IconComponent = step.icon;
            return (
              <div key={step.id} className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors ${
                  currentStep >= step.id 
                    ? 'bg-yellow-400 text-black' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  <IconComponent className="h-6 w-6" />
                </div>
                <span className={`text-sm font-medium ${
                  currentStep >= step.id ? 'text-yellow-600' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div 
            className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <Card className="p-8 modern-card">
          
          {/* Step 1: Personal Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Let's Get Started</h2>
                <p className="text-gray-600">Tell us a little about yourself</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={consultationData.personalInfo.name}
                    onChange={(e) => setConsultationData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, name: e.target.value }
                    }))}
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={consultationData.personalInfo.email}
                    onChange={(e) => setConsultationData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, email: e.target.value }
                    }))}
                    placeholder="Enter your email"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={consultationData.personalInfo.phone}
                    onChange={(e) => setConsultationData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, phone: e.target.value }
                    }))}
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Hair Assessment */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Hair Assessment</h2>
                <p className="text-gray-600">Help us understand your hair better</p>
              </div>

              <div>
                <Label className="text-lg font-semibold mb-4 block">Hair Texture</Label>
                <RadioGroup
                  value={consultationData.hairInfo.hairTexture}
                  onValueChange={(value) => setConsultationData(prev => ({
                    ...prev,
                    hairInfo: { ...prev.hairInfo, hairTexture: value }
                  }))}
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    {hairTextures.map((texture) => (
                      <div key={texture.id} className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value={texture.id} id={texture.id} />
                        <Label htmlFor={texture.id} className="flex-1 cursor-pointer">
                          {texture.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-lg font-semibold mb-4 block">Current Hair Length</Label>
                <RadioGroup
                  value={consultationData.hairInfo.currentLength}
                  onValueChange={(value) => setConsultationData(prev => ({
                    ...prev,
                    hairInfo: { ...prev.hairInfo, currentLength: value }
                  }))}
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    {['Short (1-3 inches)', 'Medium (4-6 inches)', 'Long (7+ inches)', 'Very long (12+ inches)'].map((length) => (
                      <div key={length} className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value={length} id={length} />
                        <Label htmlFor={length} className="flex-1 cursor-pointer">
                          {length}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-lg font-semibold mb-4 block">Health Concerns (Select all that apply)</Label>
                <div className="grid md:grid-cols-2 gap-4">
                  {healthConcerns.map((concern) => (
                    <div key={concern} className="flex items-center space-x-2 p-3 border rounded-lg">
                      <Checkbox
                        id={concern}
                        checked={consultationData.hairInfo.healthConcerns.includes(concern)}
                        onCheckedChange={(checked) => {
                          setConsultationData(prev => ({
                            ...prev,
                            hairInfo: {
                              ...prev.hairInfo,
                              healthConcerns: checked
                                ? [...prev.hairInfo.healthConcerns, concern]
                                : prev.hairInfo.healthConcerns.filter(c => c !== concern)
                            }
                          }));
                        }}
                      />
                      <Label htmlFor={concern} className="flex-1 cursor-pointer">
                        {concern}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Preferences */}
          {currentStep === 3 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Your Preferences</h2>
                <p className="text-gray-600">Tell us what you're looking for</p>
              </div>

              <div>
                <Label className="text-lg font-semibold mb-4 block">Preferred Loc Size</Label>
                <RadioGroup
                  value={consultationData.preferences.locSize}
                  onValueChange={(value) => setConsultationData(prev => ({
                    ...prev,
                    preferences: { ...prev.preferences, locSize: value }
                  }))}
                >
                  <div className="space-y-4">
                    {locSizes.map((size) => (
                      <div key={size.id} className="flex items-center space-x-3 p-4 border rounded-lg">
                        <RadioGroupItem value={size.id} id={size.id} />
                        <div className="flex-1">
                          <Label htmlFor={size.id} className="font-medium cursor-pointer">
                            {size.label}
                          </Label>
                          <p className="text-sm text-gray-600">{size.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-lg font-semibold mb-4 block">Timeline</Label>
                  <RadioGroup
                    value={consultationData.preferences.timeline}
                    onValueChange={(value) => setConsultationData(prev => ({
                      ...prev,
                      preferences: { ...prev.preferences, timeline: value }
                    }))}
                  >
                    <div className="space-y-2">
                      {['ASAP', 'Within 2 weeks', 'Within 1 month', 'Flexible'].map((timeline) => (
                        <div key={timeline} className="flex items-center space-x-2">
                          <RadioGroupItem value={timeline} id={timeline} />
                          <Label htmlFor={timeline} className="cursor-pointer">
                            {timeline}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-lg font-semibold mb-4 block">Budget Range</Label>
                  <RadioGroup
                    value={consultationData.preferences.budget}
                    onValueChange={(value) => setConsultationData(prev => ({
                      ...prev,
                      preferences: { ...prev.preferences, budget: value }
                    }))}
                  >
                    <div className="space-y-2">
                      {['$100-200', '$200-300', '$300-500', '$500+', 'Flexible'].map((budget) => (
                        <div key={budget} className="flex items-center space-x-2">
                          <RadioGroupItem value={budget} id={budget} />
                          <Label htmlFor={budget} className="cursor-pointer">
                            {budget}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Photos */}
          {currentStep === 4 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Hair Photos</h2>
                <p className="text-gray-600">Upload photos for better recommendations (optional)</p>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg mb-4">Upload photos of your current hair</p>
                <p className="text-sm text-gray-600 mb-4">
                  For best results, include: front view, back view, and close-up of hair texture
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <Label htmlFor="photo-upload">
                  <Button type="button" variant="outline" className="cursor-pointer">
                    <Camera className="h-4 w-4 mr-2" />
                    Choose Photos
                  </Button>
                </Label>
              </div>

              {consultationData.photos.length > 0 && (
                <div className="grid md:grid-cols-3 gap-4">
                  {consultationData.photos.map((photo, index) => (
                    <div key={index} className="border rounded-lg p-2">
                      <p className="text-sm text-center">{photo.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 5: Recommendations */}
          {currentStep === 5 && (
            <div className="space-y-8">
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400 mx-auto mb-4"></div>
                  <h2 className="text-2xl font-bold mb-2">Analyzing Your Information...</h2>
                  <p className="text-gray-600">Creating your personalized recommendations</p>
                </div>
              ) : recommendations ? (
                <div>
                  <div className="text-center mb-8">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold mb-4">Your Personalized Recommendations</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <Card className="p-6">
                      <h3 className="text-xl font-bold mb-4 flex items-center">
                        <Sparkles className="h-6 w-6 mr-2 text-yellow-500" />
                        Recommended Service
                      </h3>
                      <p className="text-2xl font-bold text-yellow-600 mb-2">{recommendations.service}</p>
                      <p className="text-gray-600">Based on your hair type and preferences</p>
                    </Card>

                    <Card className="p-6">
                      <h3 className="text-xl font-bold mb-4 flex items-center">
                        <Clock className="h-6 w-6 mr-2 text-blue-500" />
                        Time & Cost
                      </h3>
                      <p className="text-lg mb-1"><strong>Duration:</strong> {recommendations.estimatedTime}</p>
                      <p className="text-lg mb-1"><strong>Investment:</strong> {recommendations.estimatedCost}</p>
                      <p className="text-sm text-gray-600">Maintenance: {recommendations.maintenanceSchedule}</p>
                    </Card>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="p-6">
                      <h3 className="text-xl font-bold mb-4">Care Tips</h3>
                      <ul className="space-y-2">
                        {recommendations.tips.map((tip: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                            <span className="text-sm">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>

                    <Card className="p-6">
                      <h3 className="text-xl font-bold mb-4">Recommended Products</h3>
                      <ul className="space-y-2">
                        {recommendations.products.map((product: string, index: number) => (
                          <li key={index} className="flex items-center">
                            <Badge variant="outline" className="mr-2">
                              {index + 1}
                            </Badge>
                            <span className="text-sm">{product}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </div>

                  <div className="text-center mt-8">
                    <Card className="p-6 bg-yellow-50 border-yellow-200">
                      <h3 className="text-xl font-bold mb-4">Ready to Get Started?</h3>
                      <p className="text-gray-600 mb-6">
                        Book your appointment now and mention this consultation for a 10% discount!
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                          onClick={() => onPageChange?.('booking')}
                          className="bg-yellow-400 text-black hover:bg-yellow-500"
                        >
                          Book Appointment
                        </Button>
                        <Button
                          variant="outline"
                          onClick={submitConsultation}
                        >
                          Save Consultation
                        </Button>
                      </div>
                    </Card>
                  </div>
                </div>
              ) : null}
            </div>
          )}

          {/* Navigation */}
          {currentStep < 5 && !loading && (
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Previous</span>
              </Button>

              <Button
                onClick={currentStep === 4 ? generateRecommendations : nextStep}
                className="bg-yellow-400 text-black hover:bg-yellow-500 flex items-center space-x-2"
              >
                <span>{currentStep === 4 ? 'Get Recommendations' : 'Next'}</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
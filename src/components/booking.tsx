import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  CreditCard, 
  CheckCircle, 
  MapPin, 
  Star,
  Shield,
  Award,
  Sparkles,
  MessageCircle,
  ArrowRight,
  Info
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Booking() {
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [currentStep, setCurrentStep] = useState(1);

  const services = [
    { 
      id: 'starter', 
      name: 'Starter Locs', 
      price: 15000, 
      duration: '2-3 hours',
      description: 'Professional starter locs using traditional techniques',
      icon: Sparkles,
      category: 'Foundation',
      popular: true
    },
    { 
      id: 'retwist', 
      name: 'Retwist & Maintenance', 
      price: 8000, 
      duration: '1-2 hours',
      description: 'Expert retwisting and maintenance for healthy locs',
      icon: Shield,
      category: 'Maintenance',
      popular: true
    },
    { 
      id: 'styling', 
      name: 'Loc Styling', 
      price: 12000, 
      duration: '1.5-2 hours',
      description: 'Creative styling for special occasions and events',
      icon: Award,
      category: 'Styling',
      popular: false
    },
    { 
      id: 'coloring', 
      name: 'Loc Coloring', 
      price: 20000, 
      duration: '3-4 hours',
      description: 'Professional coloring with premium products',
      icon: Sparkles,
      category: 'Color',
      popular: false
    },
    { 
      id: 'maintenance', 
      name: 'Deep Cleansing', 
      price: 10000, 
      duration: '2 hours',
      description: 'Deep cleansing treatment for optimal loc health',
      icon: Shield,
      category: 'Treatment',
      popular: false
    },
    { 
      id: 'consultation', 
      name: 'Loc Consultation', 
      price: 5000, 
      duration: '30 minutes',
      description: 'Professional consultation for your loc journey',
      icon: User,
      category: 'Consultation',
      popular: false
    }
  ];

  const timeSlots = [
    { time: '09:00', available: true },
    { time: '10:00', available: true },
    { time: '11:00', available: false },
    { time: '12:00', available: true },
    { time: '13:00', available: true },
    { time: '14:00', available: true },
    { time: '15:00', available: false },
    { time: '16:00', available: true },
    { time: '17:00', available: true }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedService || !selectedDate || !selectedTime || !customerInfo.name || !customerInfo.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    const selectedServiceData = services.find(s => s.id === selectedService);
    
    // Save booking to admin system
    try {
      const bookingData = {
        id: Date.now().toString(),
        name: customerInfo.name,
        email: customerInfo.email,
        phone: customerInfo.phone,
        service: selectedServiceData?.name,
        date: selectedDate,
        time: selectedTime,
        status: 'pending',
        price: selectedServiceData?.price.toString(),
        notes: customerInfo.notes,
        createdAt: new Date().toISOString()
      };

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-f2724e29/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ booking: bookingData }),
      });

      if (response.ok) {
        toast.success('Booking saved successfully!');
      }
    } catch (error) {
      console.error('Error saving booking:', error);
      // Continue with WhatsApp even if backend fails
    }

    const whatsappMessage = encodeURIComponent(
      `Hello! I would like to book an appointment:\n\n` +
      `Service: ${selectedServiceData?.name}\n` +
      `Date: ${selectedDate}\n` +
      `Time: ${selectedTime}\n` +
      `Name: ${customerInfo.name}\n` +
      `Phone: ${customerInfo.phone}\n` +
      `Email: ${customerInfo.email}\n` +
      `Notes: ${customerInfo.notes}\n\n` +
      `Please confirm my appointment. Thank you!`
    );

    window.open(`https://wa.me/2348169887054?text=${whatsappMessage}`, '_blank');
    toast.success('Booking submitted! Redirecting to WhatsApp for confirmation...');
    
    // Reset form
    setSelectedService('');
    setSelectedDate('');
    setSelectedTime('');
    setCustomerInfo({ name: '', email: '', phone: '', notes: '' });
    setCurrentStep(1);
  };

  const selectedServiceData = services.find(s => s.id === selectedService);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-yellow-50">
      {/* Header Section */}
      <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-r from-black via-gray-900 to-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-yellow-500/10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1723101917533-4fc9149c3684?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoYWlyJTIwc2Fsb24lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTkxNDA5NDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.1
        }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="hero-content">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-4 sm:mb-6 gradient-text-light">
              Book Your Appointment
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8">
              Schedule your visit to Amalyn Locs for professional dreadlock services and authentic African hair care
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 text-yellow-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 sm:h-6 w-5 sm:w-6 flex-shrink-0" />
                <span className="text-sm sm:text-base">Professional Service</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 sm:h-6 w-5 sm:w-6 flex-shrink-0" />
                <span className="text-sm sm:text-base">Expert Stylists</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 sm:h-6 w-5 sm:w-6 flex-shrink-0" />
                <span className="text-sm sm:text-base">Premium Products</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Progress Steps */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center justify-center space-x-4 sm:space-x-6 md:space-x-8 mb-6 sm:mb-8 overflow-x-auto pb-2">
            {[
              { step: 1, title: 'Select Service', icon: Award },
              { step: 2, title: 'Choose Time', icon: Calendar },
              { step: 3, title: 'Your Details', icon: User },
              { step: 4, title: 'Confirm', icon: CheckCircle }
            ].map((item, index) => (
              <div key={item.step} className="flex flex-col sm:flex-row items-center flex-shrink-0">
                <div className={`flex items-center justify-center w-10 sm:w-12 h-10 sm:h-12 rounded-full border-2 ${
                  currentStep >= item.step 
                    ? 'bg-yellow-500 border-yellow-500 text-black' 
                    : 'border-gray-300 text-gray-400'
                } transition-all duration-300`}>
                  <item.icon className="h-4 sm:h-5 md:h-6 w-4 sm:w-5 md:w-6" />
                </div>
                <div className="mt-2 sm:mt-0 sm:ml-3 text-center sm:text-left">
                  <p className={`text-xs sm:text-sm font-medium ${currentStep >= item.step ? 'text-yellow-600' : 'text-gray-500'}`}>
                    Step {item.step}
                  </p>
                  <p className={`text-xs ${currentStep >= item.step ? 'text-gray-700' : 'text-gray-400'} hidden sm:block`}>
                    {item.title}
                  </p>
                  <p className={`text-xs ${currentStep >= item.step ? 'text-gray-700' : 'text-gray-400'} sm:hidden`}>
                    {item.title.split(' ')[0]}
                  </p>
                </div>
                {index < 3 && (
                  <ArrowRight className="h-4 w-4 text-gray-400 mx-2 sm:mx-4 hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Main Booking Form */}
          <div className="lg:col-span-2">
            {/* Step 1: Service Selection */}
            {currentStep === 1 && (
              <Card className="border-0 modern-card">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl text-black flex items-center">
                    <Award className="mr-2 sm:mr-3 h-5 sm:h-6 w-5 sm:w-6 text-yellow-500 flex-shrink-0" />
                    Choose Your Service
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-sm sm:text-base">
                    Select the service that best fits your loc care needs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:gap-4">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        onClick={() => setSelectedService(service.id)}
                        className={`p-4 sm:p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                          selectedService === service.id
                            ? 'border-yellow-500 bg-yellow-50 shadow-lg'
                            : 'border-gray-200 hover:border-yellow-300 hover:shadow-md'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                          {/* Mobile-first layout */}
                          <div className="flex items-start space-x-3 sm:space-x-4 mb-3 sm:mb-0">
                            <div className={`p-2 sm:p-3 rounded-full flex-shrink-0 ${
                              selectedService === service.id ? 'bg-yellow-500' : 'bg-gray-100'
                            }`}>
                              <service.icon className={`h-5 sm:h-6 w-5 sm:w-6 ${
                                selectedService === service.id ? 'text-black' : 'text-gray-600'
                              }`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <h3 className="text-base sm:text-lg text-black">{service.name}</h3>
                                {service.popular && (
                                  <Badge className="bg-green-100 text-green-700 text-xs">
                                    Popular
                                  </Badge>
                                )}
                                <Badge variant="outline" className="text-xs">
                                  {service.category}
                                </Badge>
                              </div>
                              <p className="text-gray-600 text-sm mb-2 leading-relaxed">{service.description}</p>
                              <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500">
                                <span className="flex items-center">
                                  <Clock className="h-3 sm:h-4 w-3 sm:w-4 mr-1" />
                                  {service.duration}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-left sm:text-right flex-shrink-0">
                            <p className="text-xl sm:text-2xl text-yellow-600 font-semibold">
                              ₦{service.price.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => setCurrentStep(2)}
                    disabled={!selectedService}
                    className="w-full mt-6 bg-yellow-500 hover:bg-yellow-400 text-black disabled:opacity-50"
                    size="lg"
                  >
                    Continue to Date & Time
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Date & Time Selection */}
            {currentStep === 2 && (
              <Card className="border-0 modern-card">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl text-black flex items-center">
                    <Calendar className="mr-2 sm:mr-3 h-5 sm:h-6 w-5 sm:w-6 text-yellow-500 flex-shrink-0" />
                    Select Date & Time
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-sm sm:text-base">
                    Choose your preferred date and available time slot
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  {/* Date Selection */}
                  <div>
                    <Label htmlFor="date" className="text-sm sm:text-base mb-2 sm:mb-3 block">Preferred Date *</Label>
                    <Input 
                      type="date" 
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full py-2 sm:py-3 text-base sm:text-lg border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                    />
                  </div>

                  {/* Time Selection */}
                  <div>
                    <Label className="text-sm sm:text-base mb-2 sm:mb-3 block">Available Time Slots *</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot.time}
                          type="button"
                          onClick={() => slot.available && setSelectedTime(slot.time)}
                          disabled={!slot.available}
                          className={`p-3 sm:p-4 rounded-lg border-2 text-center transition-all duration-300 ${
                            selectedTime === slot.time
                              ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                              : slot.available
                              ? 'border-gray-200 hover:border-yellow-300 text-gray-700 hover:bg-yellow-50'
                              : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          <div className="text-sm sm:text-base md:text-lg font-medium">{slot.time}</div>
                          <div className="text-xs mt-1">
                            {slot.available ? 'Available' : 'Booked'}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Button
                      onClick={() => setCurrentStep(1)}
                      variant="outline"
                      className="w-full sm:flex-1 py-2 sm:py-3"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={() => setCurrentStep(3)}
                      disabled={!selectedDate || !selectedTime}
                      className="w-full sm:flex-1 bg-yellow-500 hover:bg-yellow-400 text-black disabled:opacity-50 py-2 sm:py-3"
                    >
                      Continue
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Customer Information */}
            {currentStep === 3 && (
              <Card className="border-0 modern-card">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl text-black flex items-center">
                    <User className="mr-2 sm:mr-3 h-5 sm:h-6 w-5 sm:w-6 text-yellow-500 flex-shrink-0" />
                    Your Information
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-sm sm:text-base">
                    Please provide your contact details for the appointment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Customer Information */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-base mb-2 block">Full Name *</Label>
                      <Input 
                        type="text" 
                        placeholder="Your full name"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                        className="py-3 border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-base mb-2 block">Phone Number *</Label>
                      <Input 
                        type="tel" 
                        placeholder="+234 xxx xxx xxxx"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                        className="py-3 border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-base mb-2 block">Email Address</Label>
                    <Input 
                      type="email" 
                      placeholder="your.email@example.com"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                      className="py-3 border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="notes" className="text-base mb-2 block">Additional Notes</Label>
                    <Textarea 
                      placeholder="Any special requests, hair condition details, or questions..."
                      value={customerInfo.notes}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, notes: e.target.value }))}
                      className="min-h-24 border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button
                      onClick={() => setCurrentStep(2)}
                      variant="outline"
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={() => setCurrentStep(4)}
                      disabled={!customerInfo.name || !customerInfo.phone}
                      className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black disabled:opacity-50"
                    >
                      Review Booking
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <Card className="border-0 modern-card">
                <CardHeader>
                  <CardTitle className="text-2xl text-black flex items-center">
                    <CheckCircle className="mr-3 h-6 w-6 text-yellow-500" />
                    Confirm Your Booking
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Please review your appointment details before confirming
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 mb-6">
                    <h3 className="text-lg mb-4 text-black">Booking Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Service:</span>
                        <span className="text-black">{selectedServiceData?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span className="text-black">{new Date(selectedDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Time:</span>
                        <span className="text-black">{selectedTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="text-black">{selectedServiceData?.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="text-black">{customerInfo.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span className="text-black">{customerInfo.phone}</span>
                      </div>
                      <hr className="border-gray-300" />
                      <div className="flex justify-between text-lg">
                        <span className="text-gray-700">Total Cost:</span>
                        <span className="text-yellow-600">₦{selectedServiceData?.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      onClick={() => setCurrentStep(3)}
                      variant="outline"
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      size="lg"
                    >
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Book via WhatsApp
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Booking Summary Sidebar */}
          <div className="order-first lg:order-last">
            <Card className="lg:sticky lg:top-4 border-0 modern-card shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl text-black">Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                {selectedServiceData && (
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 sm:p-6">
                    <div className="flex items-center mb-2 sm:mb-3">
                      <selectedServiceData.icon className="h-5 sm:h-6 w-5 sm:w-6 text-yellow-600 mr-2 sm:mr-3 flex-shrink-0" />
                      <h3 className="text-base sm:text-lg text-black">{selectedServiceData.name}</h3>
                    </div>
                    <div className="flex items-center text-xs sm:text-sm text-gray-600 mb-2">
                      <Clock className="h-3 sm:h-4 w-3 sm:w-4 mr-2 flex-shrink-0" />
                      {selectedServiceData.duration}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2">{selectedServiceData.description}</p>
                    <p className="text-xl sm:text-2xl text-yellow-600 font-semibold">₦{selectedServiceData.price.toLocaleString()}</p>
                  </div>
                )}

                {selectedDate && (
                  <div className="flex items-center p-3 sm:p-4 bg-blue-50 rounded-lg">
                    <Calendar className="h-4 sm:h-5 w-4 sm:w-5 mr-2 sm:mr-3 text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600">Date</p>
                      <p className="text-sm sm:text-base text-black">{new Date(selectedDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                )}

                {selectedTime && (
                  <div className="flex items-center p-3 sm:p-4 bg-green-50 rounded-lg">
                    <Clock className="h-4 sm:h-5 w-4 sm:w-5 mr-2 sm:mr-3 text-green-600 flex-shrink-0" />
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600">Time</p>
                      <p className="text-sm sm:text-base text-black">{selectedTime}</p>
                    </div>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4 sm:pt-6">
                  <h4 className="text-sm sm:text-base text-black mb-3 sm:mb-4 flex items-center">
                    <CreditCard className="h-4 sm:h-5 w-4 sm:w-5 mr-2 text-gray-600 flex-shrink-0" />
                    Payment Options
                  </h4>
                  <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                    <div className="flex items-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                      <CreditCard className="h-3 sm:h-4 w-3 sm:w-4 mr-2 sm:mr-3 text-gray-600 flex-shrink-0" />
                      <span className="text-gray-700">Pay at the salon</span>
                    </div>
                    <div className="flex items-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                      <Phone className="h-3 sm:h-4 w-3 sm:w-4 mr-2 sm:mr-3 text-gray-600 flex-shrink-0" />
                      <span className="text-gray-700">Bank transfer (details via WhatsApp)</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 sm:pt-6">
                  <h4 className="text-sm sm:text-base text-black mb-3 sm:mb-4 flex items-center">
                    <MapPin className="h-4 sm:h-5 w-4 sm:w-5 mr-2 text-gray-600 flex-shrink-0" />
                    Contact Info
                  </h4>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-3 sm:h-4 w-3 sm:w-4 mr-2 sm:mr-3 flex-shrink-0" />
                      +234 816 988 7054
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-3 sm:h-4 w-3 sm:w-4 mr-2 sm:mr-3 flex-shrink-0" />
                      info@amalynlocs.com
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Important Notes */}
        <Card className="mt-8 sm:mt-12 border-yellow-500 bg-gradient-to-r from-yellow-50 to-orange-50 border-2">
          <CardHeader>
            <CardTitle className="text-yellow-700 flex items-center text-base sm:text-lg">
              <Info className="h-5 sm:h-6 w-5 sm:w-6 mr-2 sm:mr-3 flex-shrink-0" />
              Important Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm text-gray-700">
              <div className="space-y-2">
                <p className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                  Please arrive 10 minutes before your appointment time
                </p>
                <p className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                  Consultation included for first-time clients
                </p>
                <p className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                  24-hour notice required for cancellations
                </p>
              </div>
              <div className="space-y-2">
                <p className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                  Bring a silk scarf or bonnet for after-care
                </p>
                <p className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                  Payment can be made at salon or via transfer
                </p>
                <p className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                  Free aftercare consultation included
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
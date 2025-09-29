import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, Star } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+234 816 988 7054', '+234 903 123 4567'],
      action: 'Call us now'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@dreadlocstudio.com', 'bookings@dreadlocstudio.com'],
      action: 'Send email'
    },
    {
      icon: MapPin,
      title: 'Location',
      details: ['Swissguard, Enugu State', 'Nigeria'],
      action: 'Get directions'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      details: ['+234 816 988 7054', '24/7 Chat Support'],
      action: 'Chat with us'
    }
  ];

  const businessHours = [
    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Saturday', hours: '8:00 AM - 7:00 PM' },
    { day: 'Sunday', hours: '10:00 AM - 4:00 PM' }
  ];

  const faqs = [
    {
      question: 'How long does it take to start locs?',
      answer: 'Starting locs typically takes 2-3 hours depending on your hair length and chosen method. We offer consultation to determine the best approach for your hair type.'
    },
    {
      question: 'How often should I get my locs retwisted?',
      answer: 'Generally every 4-6 weeks, but this varies based on your hair growth rate and lifestyle. We provide personalized maintenance schedules during your consultation.'
    },
    {
      question: 'Do you offer products for loc maintenance?',
      answer: 'Yes! We carry a curated selection of premium loc care products including shampoos, oils, and styling products. All products are available in-store and online.'
    },
    {
      question: 'Can I book appointments online?',
      answer: 'Yes, you can book appointments through our website or WhatsApp. We recommend booking in advance as our schedule fills up quickly.'
    },
    {
      question: 'Do you serve customers outside Enugu?',
      answer: 'Yes! We serve clients from all over Nigeria and have options for diaspora customers who want to purchase our products online with international shipping.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    const whatsappMessage = encodeURIComponent(
      `Hello! Contact form submission:\n\n` +
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n` +
      `Subject: ${formData.subject}\n\n` +
      `Message: ${formData.message}\n\n` +
      `Please get back to me. Thank you!`
    );

    window.open(`https://wa.me/2348169887054?text=${whatsappMessage}`, '_blank');
    toast.success('Redirecting to WhatsApp...');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/2348169887054?text=Hello%2C%20I%20have%20a%20question%20about%20your%20services', '_blank');
  };

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl mb-6 gradient-text">Contact Us</h1>
          <p className="text-xl text-gray-600">
            Get in touch with Amalyn Locs - we're here to help with all your loc needs
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => {
            const IconComponent = info.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-black" />
                  </div>
                  <h3 className="text-xl mb-3 text-black">{info.title}</h3>
                  <div className="space-y-1 mb-4">
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-gray-600">{detail}</p>
                    ))}
                  </div>
                  <Button 
                    onClick={info.title === 'WhatsApp' ? handleWhatsApp : undefined}
                    variant="outline" 
                    className="border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-black"
                    size="sm"
                  >
                    {info.action}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-black">
                  <Send className="mr-2 h-5 w-5 text-yellow-500" />
                  Send us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input 
                        type="text" 
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input 
                        type="email" 
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        type="tel" 
                        placeholder="+234 xxx xxx xxxx"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Select value={formData.subject} onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="booking">Booking Inquiry</SelectItem>
                          <SelectItem value="services">Services Question</SelectItem>
                          <SelectItem value="products">Product Inquiry</SelectItem>
                          <SelectItem value="pricing">Pricing Information</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea 
                      placeholder="Tell us how we can help you..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-yellow-500 hover:bg-yellow-400 text-black"
                  >
                    Send Message via WhatsApp
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Business Hours & Quick Contact */}
          <div className="space-y-6">
            {/* Business Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-black">
                  <Clock className="mr-2 h-5 w-5 text-yellow-500" />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {businessHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-gray-600">{schedule.day}:</span>
                      <span className="text-black">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    Walk-ins welcome, but appointments are recommended
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="text-black">Quick Contact</CardTitle>
                <CardDescription>Need immediate assistance?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={handleWhatsApp}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp Chat
                </Button>
                <Button 
                  onClick={() => window.location.href = 'tel:+2348169887054'}
                  variant="outline" 
                  className="w-full border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-black"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call Now
                </Button>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle className="text-black">Client Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 italic">
                      "Excellent service! My locs look amazing and the staff is so professional."
                    </p>
                    <p className="text-xs text-gray-500 mt-1">- Chioma O.</p>
                  </div>
                  <div>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 italic">
                      "Best loc studio in Enugu! Always satisfied with their work."
                    </p>
                    <p className="text-xs text-gray-500 mt-1">- Emeka N.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl mb-8 text-black text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg text-black">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Map Section */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="flex items-center text-black">
              <MapPin className="mr-2 h-5 w-5 text-yellow-500" />
              Find Us
            </CardTitle>
            <CardDescription>Located in Swissguard, Enugu State</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-600">
                <MapPin className="h-12 w-12 mx-auto mb-4" />
                <p className="text-lg">Interactive Map</p>
                <p className="text-sm">DreadLoc Studio</p>
                <p className="text-sm">Swissguard, Enugu State</p>
                <Button className="mt-4 bg-yellow-500 hover:bg-yellow-400 text-black">
                  Get Directions
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center bg-black rounded-lg p-12">
          <h3 className="text-3xl mb-4 text-yellow-500">Ready to Visit Us?</h3>
          <p className="text-xl mb-8 text-white">
            Come experience the best dreadlock services in Enugu. We can't wait to meet you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleWhatsApp}
              className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-3"
            >
              Book Appointment
            </Button>
            <Button 
              onClick={() => window.location.href = 'tel:+2348169887054'}
              variant="outline" 
              className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black px-8 py-3"
            >
              Call Us Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
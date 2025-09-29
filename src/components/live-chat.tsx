import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Phone,
  Clock,
  CheckCircle,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Avatar } from './ui/avatar';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot' | 'agent';
  timestamp: Date;
  type: 'text' | 'quick-reply' | 'appointment';
}

interface LiveChatProps {
  onPageChange?: (page: string) => void;
}

export function LiveChat({ onPageChange }: LiveChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial bot message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        content: 'Hi! 👋 I\'m here to help you with your loc journey. How can I assist you today?',
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Update unread count when chat is closed
  useEffect(() => {
    if (!isOpen && messages.length > 1) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.sender !== 'user') {
        setUnreadCount(prev => prev + 1);
      }
    }
  }, [messages, isOpen]);

  // Reset unread count when chat is opened
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
    }
  }, [isOpen]);

  const quickReplies = [
    'Book an appointment',
    'Service pricing',
    'Hair consultation', 
    'Location & hours',
    'Product recommendations',
    'Speak to someone'
  ];

  const botResponses: { [key: string]: string } = {
    'book': 'I\'d love to help you book an appointment! Let me connect you with our booking system. 📅',
    'booking': 'I\'d love to help you book an appointment! Let me connect you with our booking system. 📅',
    'appointment': 'I\'d love to help you book an appointment! Let me connect you with our booking system. 📅',
    'price': 'Our services range from ₦5,000-20,000 depending on the type of loc service. Starter locs: ₦15,000, Retwist: ₦8,000, Styling: ₦12,000. Would you like specific pricing? 💰',
    'pricing': 'Our services range from ₦5,000-20,000 depending on the type of loc service. Starter locs: ₦15,000, Retwist: ₦8,000, Styling: ₦12,000. Would you like specific pricing? 💰',
    'cost': 'Our services range from ₦5,000-20,000 depending on the type of loc service. Starter locs: ₦15,000, Retwist: ₦8,000, Styling: ₦12,000. Would you like specific pricing? 💰',
    'consultation': 'I can help you with a free hair consultation! This includes hair assessment, style recommendations, and a custom care plan. Would you like to start? ✨',
    'location': 'We\'re open Monday-Saturday 9AM-7PM, Sunday 11AM-5PM. Located in the heart of Lagos. Need specific directions? 📍',
    'hours': 'We\'re open Monday-Saturday 9AM-7PM, Sunday 11AM-5PM. Located in the heart of Lagos. Need specific directions? 📍',
    'products': 'We recommend residue-free shampoos, light hold gels, and loc maintenance sprays. I can suggest specific brands based on your hair type! 🧴',
    'hello': 'Hello! Welcome to Amalyn Locs! How can I help you today? 😊',
    'hi': 'Hi there! Great to see you! What can I help you with regarding your loc journey? 👋',
    'help': 'I\'m here to help! I can assist with booking, pricing, consultations, product recommendations, and more. What do you need? 💪',
    'starter': 'Starter locs are perfect for beginning your loc journey! The process takes 2-3 hours and costs ₦15,000. We use the twist and rip or comb coil method. Interested? 🌟',
    'retwist': 'Retwist maintenance keeps your locs healthy and neat! We recommend every 6-8 weeks, takes 1-2 hours, costs ₦8,000. Ready to book? ✨',
    'styling': 'We offer beautiful loc styling for special events! Updos, braids, accessories - ₦12,000 depending on complexity. Have something special coming up? 💫'
  };

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(botResponses)) {
      if (message.includes(key)) {
        return response;
      }
    }
    
    // Default response
    return 'Thank you for your message! For detailed questions, I recommend speaking with one of our specialists. Would you like me to connect you with someone? 🤝';
  };

  const sendMessage = () => {
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: currentMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(currentMessage),
        sender: 'bot', 
        timestamp: new Date(),
        type: 'text'
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleQuickReply = (reply: string) => {
    setCurrentMessage(reply);
    
    // Auto-send quick reply
    setTimeout(() => {
      sendMessage();
    }, 100);
  };

  const connectToAgent = () => {
    const agentMessage: Message = {
      id: Date.now().toString(),
      content: 'I\'m connecting you to one of our specialists. In the meantime, you can also reach us via WhatsApp for immediate assistance!',
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    };
    
    setMessages(prev => [...prev, agentMessage]);
    
    setTimeout(() => {
      window.open('https://wa.me/2348169887054?text=Hello%2C%20I%20was%20chatting%20with%20your%20bot%20and%20would%20like%20to%20speak%20with%20someone', '_blank');
    }, 1500);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-yellow-400 hover:bg-yellow-500 text-black rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-all duration-300 relative"
        >
          <MessageCircle className="h-8 w-8" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`w-80 ${isMinimized ? 'h-16' : 'h-96'} flex flex-col modern-card shadow-xl transition-all duration-300`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-yellow-400 rounded-t-lg">
          <div className="flex items-center space-x-3">
            <Avatar className="w-8 h-8">
              <div className="w-full h-full bg-black flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
            </Avatar>
            <div>
              <h3 className="font-semibold text-black">Amalyn Assistant</h3>
              <div className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                <span className="text-xs text-black">{isOnline ? 'Online' : 'Offline'}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-black hover:bg-yellow-500/20"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsOpen(false)}
              className="text-black hover:bg-yellow-500/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-yellow-400 text-black'
                        : 'bg-white border'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border rounded-lg p-3 max-w-[70%]">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 2 && (
              <div className="p-3 border-t bg-white">
                <p className="text-xs text-gray-600 mb-2">Quick options:</p>
                <div className="flex flex-wrap gap-1">
                  {quickReplies.slice(0, 3).map((reply) => (
                    <Button
                      key={reply}
                      size="sm"
                      variant="outline"
                      onClick={() => handleQuickReply(reply)}
                      className="text-xs h-7 px-2"
                    >
                      {reply}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t bg-white rounded-b-lg">
              <div className="flex space-x-2">
                <Input
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  placeholder="Type your message..."
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  className="flex-1 text-sm"
                />
                <Button
                  onClick={sendMessage}
                  disabled={!currentMessage.trim()}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black"
                  size="sm"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={connectToAgent}
                  className="text-xs text-gray-600 hover:text-black"
                >
                  <Phone className="h-3 w-3 mr-1" />
                  Speak to someone
                </Button>
                
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  <span>Usually replies in minutes</span>
                </div>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
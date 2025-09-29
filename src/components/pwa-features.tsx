import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Smartphone, 
  Download, 
  Bell, 
  CloudOff, 
  Zap, 
  Menu,
  X,
  Home,
  Calendar,
  MessageCircle,
  Star,
  Settings,
  Wifi,
  WifiOff
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface PWAFeaturesProps {
  onPageChange?: (page: string) => void;
}

export function PWAFeatures({ onPageChange }: PWAFeaturesProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    // Check if app is already installed
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    // Online/Offline detection
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check if notifications are already enabled
    if ('Notification' in window) {
      setNotificationsEnabled(Notification.permission === 'granted');
    }

    // Check if running as PWA
    const isRunningStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (isRunningStandalone) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      toast.success('App installed successfully!');
    } else {
      toast.info('App installation cancelled.');
    }
    
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      toast.error('This browser does not support notifications');
      return;
    }

    const permission = await Notification.requestPermission();
    
    if (permission === 'granted') {
      setNotificationsEnabled(true);
      toast.success('Notifications enabled! You\'ll receive appointment reminders.');
      
      // Send a test notification
      setTimeout(() => {
        new Notification('Amalyn Locs', {
          body: 'Welcome! You\'ll now receive appointment reminders and updates.',
          icon: '/favicon.ico',
          badge: '/favicon.ico'
        });
      }, 1000);
    } else {
      toast.error('Notifications permission denied');
    }
  };

  const sendTestNotification = () => {
    if (notificationsEnabled) {
      new Notification('Appointment Reminder', {
        body: 'Your retwist appointment is tomorrow at 2:00 PM',
        icon: '/favicon.ico',
        badge: '/favicon.ico'
      });
      toast.success('Test notification sent!');
    }
  };

  const quickActions = [
    { icon: Calendar, label: 'Book Now', action: () => onPageChange?.('booking'), color: 'bg-yellow-500' },
    { icon: MessageCircle, label: 'Chat', action: () => {}, color: 'bg-green-500' },
    { icon: Star, label: 'Reviews', action: () => onPageChange?.('reviews'), color: 'bg-blue-500' },
    { icon: Home, label: 'Home', action: () => onPageChange?.('home'), color: 'bg-purple-500' }
  ];

  return (
    <>
      {/* Install Banner */}
      {isInstallable && !isInstalled && (
        <div className="fixed top-20 left-4 right-4 z-40 md:hidden">
          <Card className="p-4 modern-card shadow-lg bg-yellow-50 border-yellow-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Smartphone className="h-6 w-6 text-yellow-600 mr-3" />
                <div>
                  <h4 className="font-semibold text-yellow-800">Install Amalyn Locs App</h4>
                  <p className="text-sm text-yellow-700">Get faster access and offline features</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  onClick={handleInstallClick}
                  className="bg-yellow-500 text-white hover:bg-yellow-600"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Install
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsInstallable(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Offline Banner */}
      {!isOnline && (
        <div className="fixed top-20 left-4 right-4 z-40">
          <Card className="p-4 modern-card shadow-lg bg-orange-50 border-orange-200">
            <div className="flex items-center">
              <WifiOff className="h-5 w-5 text-orange-600 mr-3" />
              <div>
                <h4 className="font-semibold text-orange-800">You're offline</h4>
                <p className="text-sm text-orange-700">Some features may be limited</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Mobile Quick Actions */}
      <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
        <Card className="p-3 modern-card shadow-xl">
          <div className="flex justify-around">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className={`flex flex-col items-center p-3 rounded-xl ${action.color} text-white hover:scale-105 transition-transform`}
              >
                <action.icon className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">{action.label}</span>
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* PWA Features Page Content */}
      <div className="min-h-screen bg-gray-50 pb-24 md:pb-8">
        {/* Header */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl mb-6">Mobile App Experience</h1>
            <p className="text-xl md:text-2xl mb-8">
              Install our app for the best mobile experience
            </p>
          </div>
        </section>

        {/* Installation Section */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4">
            <Card className="p-8 modern-card text-center">
              {isInstalled ? (
                <div>
                  <Zap className="h-16 w-16 text-green-500 mx-auto mb-6" />
                  <h2 className="text-2xl font-bold text-green-800 mb-4">App Installed!</h2>
                  <p className="text-gray-600 mb-6">
                    You're using the Amalyn Locs app. Enjoy the enhanced mobile experience!
                  </p>
                  <Badge className="bg-green-100 text-green-800">
                    Running as Installed App
                  </Badge>
                </div>
              ) : isInstallable ? (
                <div>
                  <Smartphone className="h-16 w-16 text-blue-500 mx-auto mb-6" />
                  <h2 className="text-2xl font-bold mb-4">Install Amalyn Locs App</h2>
                  <p className="text-gray-600 mb-6">
                    Get faster loading, offline access, and push notifications
                  </p>
                  <Button
                    onClick={handleInstallClick}
                    className="bg-blue-500 text-white hover:bg-blue-600 px-8 py-3"
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Install App
                  </Button>
                </div>
              ) : (
                <div>
                  <Smartphone className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">App Features</h2>
                  <p className="text-gray-600 mb-6">
                    This browser may not support app installation, but you can still bookmark this page for quick access
                  </p>
                  <Badge variant="secondary">
                    Web Version
                  </Badge>
                </div>
              )}
            </Card>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">App Features</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="p-6 modern-card text-center">
                <Zap className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
                <p className="text-gray-600">
                  Instant loading with cached content for the smoothest experience
                </p>
              </Card>

              <Card className="p-6 modern-card text-center">
                <CloudOff className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Offline Access</h3>
                <p className="text-gray-600">
                  View your appointments and service details even without internet
                </p>
              </Card>

              <Card className="p-6 modern-card text-center">
                <Bell className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Push Notifications</h3>
                <p className="text-gray-600">
                  Get appointment reminders and exclusive offers sent directly to your phone
                </p>
              </Card>

              <Card className="p-6 modern-card text-center">
                <Home className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Home Screen</h3>
                <p className="text-gray-600">
                  Add to your home screen for one-tap access like a native app
                </p>
              </Card>

              <Card className="p-6 modern-card text-center">
                <Settings className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Personalized</h3>
                <p className="text-gray-600">
                  Remember your preferences and booking history for faster service
                </p>
              </Card>

              <Card className="p-6 modern-card text-center">
                <MessageCircle className="h-12 w-12 text-pink-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Quick Actions</h3>
                <p className="text-gray-600">
                  Book appointments, chat with us, and access services with one tap
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Notifications Section */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <Card className="p-8 modern-card">
              <div className="text-center mb-8">
                <Bell className="h-16 w-16 text-blue-500 mx-auto mb-6" />
                <h2 className="text-2xl font-bold mb-4">Enable Notifications</h2>
                <p className="text-gray-600">
                  Never miss an appointment with timely reminders and updates
                </p>
              </div>

              {notificationsEnabled ? (
                <div className="text-center">
                  <Badge className="bg-green-100 text-green-800 mb-6">
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications Enabled
                  </Badge>
                  <p className="text-gray-600 mb-6">
                    You'll receive appointment reminders and exclusive offers
                  </p>
                  <Button onClick={sendTestNotification} variant="outline">
                    Send Test Notification
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <Button
                    onClick={requestNotificationPermission}
                    className="bg-blue-500 text-white hover:bg-blue-600 px-8 py-3"
                  >
                    <Bell className="h-5 w-5 mr-2" />
                    Enable Notifications
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </section>

        {/* Connection Status */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4">
            <Card className="p-6 modern-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {isOnline ? (
                    <Wifi className="h-8 w-8 text-green-500 mr-4" />
                  ) : (
                    <WifiOff className="h-8 w-8 text-red-500 mr-4" />
                  )}
                  <div>
                    <h3 className="font-bold">Connection Status</h3>
                    <p className="text-sm text-gray-600">
                      {isOnline ? 'Online - All features available' : 'Offline - Limited functionality'}
                    </p>
                  </div>
                </div>
                <Badge 
                  className={isOnline ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                >
                  {isOnline ? 'Online' : 'Offline'}
                </Badge>
              </div>
            </Card>
          </div>
        </section>

        {/* How to Install */}
        {!isInstalled && (
          <section className="py-12 bg-white">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-2xl font-bold text-center mb-8">How to Install</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="p-6 modern-card">
                  <h3 className="font-bold mb-4 flex items-center">
                    <Smartphone className="h-5 w-5 mr-2" />
                    On Mobile (Chrome/Safari)
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p>1. Tap the menu (⋮) or share button</p>
                    <p>2. Select "Add to Home Screen"</p>
                    <p>3. Tap "Add" to confirm</p>
                    <p>4. Find the app icon on your home screen</p>
                  </div>
                </Card>

                <Card className="p-6 modern-card">
                  <h3 className="font-bold mb-4 flex items-center">
                    <Download className="h-5 w-5 mr-2" />
                    On Desktop (Chrome/Edge)
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p>1. Look for the install icon in the address bar</p>
                    <p>2. Click "Install Amalyn Locs"</p>
                    <p>3. Confirm the installation</p>
                    <p>4. Access from desktop or start menu</p>
                  </div>
                </Card>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}

// Service Worker Registration
export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
}
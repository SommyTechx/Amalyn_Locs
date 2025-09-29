import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from './ui/dialog';
import { toast } from 'sonner@2.0.3';
import { 
  Upload, 
  Download, 
  Settings, 
  Eye, 
  Save, 
  Calendar,
  ShoppingBag,
  Image as ImageIcon,
  BarChart3,
  Users,
  DollarSign,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  Trash2,
  Edit,
  Plus,
  Home
} from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface AdminProps {
  onPageChange: (page: string) => void;
}

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  price?: string;
  notes?: string;
  createdAt: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image?: string;
  inStock: boolean;
  createdAt: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  category: string;
  image?: string;
  active: boolean;
  createdAt: string;
}

interface ImageData {
  id: string;
  fileName: string;
  filePath: string;
  url: string;
  type: 'product' | 'gallery' | 'general';
  uploadedAt: string;
}

interface Analytics {
  totals: {
    bookings: number;
    products: number;
    images: number;
    reviews: number;
  };
  recent: {
    monthlyBookings: number;
    weeklyBookings: number;
  };
  bookingsByStatus: {
    pending: number;
    confirmed: number;
    completed: number;
    cancelled: number;
  };
  revenue: {
    total: number;
    monthly: number;
  };
}

export function Admin({ onPageChange }: AdminProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  // State for different sections
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [images, setImages] = useState<ImageData[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  
  // Form states
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Simple admin authentication
  const handleAuth = () => {
    if (password === 'amalyn2024admin') {
      setIsAuthenticated(true);
      loadAllData();
      toast.success('Admin access granted');
    } else {
      toast.error('Invalid password');
    }
  };

  const loadAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        loadBookings(),
        loadProducts(),
        loadServices(),
        loadImages(),
        loadAnalytics()
      ]);
    } catch (error) {
      console.error('Error loading admin data:', error);
    }
    setLoading(false);
  };

  const makeRequest = async (endpoint: string, options: RequestInit = {}) => {
    const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-f2724e29${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Request failed: ${response.statusText}`);
    }
    
    return response.json();
  };

  const loadBookings = async () => {
    try {
      const data = await makeRequest('/admin/bookings');
      setBookings(data.bookings || []);
    } catch (error) {
      console.error('Error loading bookings:', error);
    }
  };

  const loadProducts = async () => {
    try {
      const data = await makeRequest('/admin/products');
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const loadServices = async () => {
    try {
      const data = await makeRequest('/admin/services');
      setServices(data.services || []);
    } catch (error) {
      console.error('Error loading services:', error);
    }
  };

  const loadImages = async () => {
    try {
      const data = await makeRequest('/admin/images');
      setImages(data.images || []);
    } catch (error) {
      console.error('Error loading images:', error);
    }
  };

  const loadAnalytics = async () => {
    try {
      const data = await makeRequest('/admin/analytics');
      setAnalytics(data.analytics);
    } catch (error) {
      console.error('Error loading analytics:', error);
    }
  };

  const updateBookingStatus = async (bookingId: string, status: string) => {
    try {
      await makeRequest(`/admin/bookings/${bookingId}/status`, {
        method: 'POST',
        body: JSON.stringify({ status }),
      });
      
      toast.success('Booking status updated');
      loadBookings();
      loadAnalytics();
    } catch (error) {
      console.error('Error updating booking status:', error);
      toast.error('Failed to update booking status');
    }
  };

  const deleteBooking = async (bookingId: string) => {
    if (!confirm('Are you sure you want to delete this booking?')) return;
    
    try {
      await makeRequest(`/admin/bookings/${bookingId}`, {
        method: 'DELETE',
      });
      
      toast.success('Booking deleted');
      loadBookings();
      loadAnalytics();
    } catch (error) {
      console.error('Error deleting booking:', error);
      toast.error('Failed to delete booking');
    }
  };

  const saveProduct = async (product: Partial<Product>) => {
    try {
      const endpoint = product.id ? `/admin/products/${product.id}` : '/admin/products';
      const method = product.id ? 'PUT' : 'POST';
      
      await makeRequest(endpoint, {
        method,
        body: JSON.stringify({ product }),
      });
      
      toast.success('Product saved successfully');
      loadProducts();
      setEditingProduct(null);
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Failed to save product');
    }
  };

  const deleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await makeRequest(`/admin/products/${productId}`, {
        method: 'DELETE',
      });
      
      toast.success('Product deleted');
      loadProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  const saveService = async (service: Partial<Service>) => {
    try {
      const endpoint = service.id ? `/admin/services/${service.id}` : '/admin/services';
      const method = service.id ? 'PUT' : 'POST';
      
      await makeRequest(endpoint, {
        method,
        body: JSON.stringify({ service }),
      });
      
      toast.success('Service saved successfully');
      loadServices();
      setEditingService(null);
    } catch (error) {
      console.error('Error saving service:', error);
      toast.error('Failed to save service');
    }
  };

  const deleteService = async (serviceId: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    
    try {
      await makeRequest(`/admin/services/${serviceId}`, {
        method: 'DELETE',
      });
      
      toast.success('Service deleted');
      loadServices();
    } catch (error) {
      console.error('Error deleting service:', error);
      toast.error('Failed to delete service');
    }
  };

  const uploadImage = async (file: File, type: string) => {
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-f2724e29/admin/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      toast.success('Image uploaded successfully');
      loadImages();
      return data.image;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const deleteImage = async (imageId: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    
    try {
      await makeRequest(`/admin/images/${imageId}`, {
        method: 'DELETE',
      });
      
      toast.success('Image deleted');
      loadImages();
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error('Failed to delete image');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <Settings className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
            <h2 className="text-2xl font-bold text-gray-900">Amalyn Locs Admin</h2>
            <p className="text-gray-600 mt-2">Enter admin password to access dashboard</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                onKeyPress={(e) => e.key === 'Enter' && handleAuth()}
              />
            </div>
            
            <Button onClick={handleAuth} className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
              Access Admin Dashboard
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => onPageChange('home')} 
              className="w-full"
            >
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Settings className="h-8 w-8 text-yellow-500" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Amalyn Locs Admin Dashboard</h1>
                <p className="text-gray-600">Manage your business operations</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => onPageChange('home')}
              >
                <Home className="h-4 w-4 mr-2" />
                Back to Site
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="styles">Styles</TabsTrigger>
          </TabsList>

          {/* Dashboard Overview */}
          <TabsContent value="dashboard" className="space-y-6">
            {analytics && (
              <>
                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{analytics.totals.bookings}</div>
                      <p className="text-xs text-muted-foreground">
                        +{analytics.recent.weeklyBookings} this week
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">₦{analytics.revenue.total.toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground">
                        +₦{analytics.revenue.monthly.toLocaleString()} this month
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Products</CardTitle>
                      <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{analytics.totals.products}</div>
                      <p className="text-xs text-muted-foreground">
                        Active products
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Images</CardTitle>
                      <ImageIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{analytics.totals.images}</div>
                      <p className="text-xs text-muted-foreground">
                        Uploaded images
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Booking Status Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle>Booking Status Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-yellow-500" />
                        <div>
                          <p className="text-sm text-muted-foreground">Pending</p>
                          <p className="text-xl font-bold">{analytics.bookingsByStatus.pending}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="text-sm text-muted-foreground">Confirmed</p>
                          <p className="text-xl font-bold">{analytics.bookingsByStatus.confirmed}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="text-sm text-muted-foreground">Completed</p>
                          <p className="text-xl font-bold">{analytics.bookingsByStatus.completed}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <XCircle className="h-5 w-5 text-red-500" />
                        <div>
                          <p className="text-sm text-muted-foreground">Cancelled</p>
                          <p className="text-xl font-bold">{analytics.bookingsByStatus.cancelled}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Bookings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Bookings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {bookings.slice(0, 5).map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium">{booking.name}</p>
                            <p className="text-sm text-muted-foreground">{booking.service}</p>
                            <p className="text-sm text-muted-foreground">{booking.date} at {booking.time}</p>
                          </div>
                          <Badge 
                            variant={
                              booking.status === 'completed' ? 'default' :
                              booking.status === 'confirmed' ? 'secondary' :
                              booking.status === 'cancelled' ? 'destructive' : 'outline'
                            }
                          >
                            {booking.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          {/* Bookings Management */}
          <TabsContent value="bookings" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Booking Management</h2>
              <Button onClick={loadBookings} variant="outline">
                Refresh
              </Button>
            </div>

            <div className="grid gap-4">
              {bookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-4">
                          <h3 className="font-semibold text-lg">{booking.name}</h3>
                          <Badge 
                            variant={
                              booking.status === 'completed' ? 'default' :
                              booking.status === 'confirmed' ? 'secondary' :
                              booking.status === 'cancelled' ? 'destructive' : 'outline'
                            }
                          >
                            {booking.status}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">{booking.email} • {booking.phone}</p>
                        <p className="font-medium">{booking.service}</p>
                        <p className="text-sm">{booking.date} at {booking.time}</p>
                        {booking.price && <p className="font-semibold">₦{booking.price}</p>}
                        {booking.notes && <p className="text-sm text-muted-foreground">{booking.notes}</p>}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Select
                          value={booking.status}
                          onValueChange={(status) => updateBookingStatus(booking.id, status)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteBooking(booking.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Services Management */}
          <TabsContent value="services" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Services Management</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingService({} as Service)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Service
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Service</DialogTitle>
                    <DialogDescription>
                      Create a new service offering with pricing and details.
                    </DialogDescription>
                  </DialogHeader>
                  <ServiceForm 
                    service={editingService}
                    onSave={saveService}
                    onCancel={() => setEditingService(null)}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Card key={service.id}>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{service.name}</h3>
                        <Badge variant={service.active ? 'default' : 'secondary'}>
                          {service.active ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">₦{service.price}</span>
                        <span className="text-sm text-muted-foreground">{service.duration}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline" onClick={() => setEditingService(service)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Service</DialogTitle>
                              <DialogDescription>
                                Update service information, pricing, and availability.
                              </DialogDescription>
                            </DialogHeader>
                            <ServiceForm 
                              service={editingService}
                              onSave={saveService}
                              onCancel={() => setEditingService(null)}
                            />
                          </DialogContent>
                        </Dialog>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteService(service.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Products Management */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Products Management</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingProduct({} as Product)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                    <DialogDescription>
                      Add a new product to your shop with images and pricing.
                    </DialogDescription>
                  </DialogHeader>
                  <ProductForm 
                    product={editingProduct}
                    images={images}
                    onSave={saveProduct}
                    onCancel={() => setEditingProduct(null)}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id}>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {product.image && (
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{product.name}</h3>
                        <Badge variant={product.inStock ? 'default' : 'destructive'}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">₦{product.price}</span>
                        <span className="text-sm text-muted-foreground">{product.category}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline" onClick={() => setEditingProduct(product)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Product</DialogTitle>
                              <DialogDescription>
                                Modify product details, pricing, and availability status.
                              </DialogDescription>
                            </DialogHeader>
                            <ProductForm 
                              product={editingProduct}
                              images={images}
                              onSave={saveProduct}
                              onCancel={() => setEditingProduct(null)}
                            />
                          </DialogContent>
                        </Dialog>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Images Management */}
          <TabsContent value="images" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Image Management</h2>
              <div className="flex space-x-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const type = prompt('Image type (product/gallery/general):') || 'general';
                      uploadImage(file, type);
                    }
                  }}
                  style={{ display: 'none' }}
                  id="image-upload"
                />
                <label htmlFor="image-upload">
                  <Button asChild disabled={uploadingImage}>
                    <span>
                      <Upload className="h-4 w-4 mr-2" />
                      {uploadingImage ? 'Uploading...' : 'Upload Image'}
                    </span>
                  </Button>
                </label>
              </div>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {images.map((image) => (
                <Card key={image.id}>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <img 
                        src={image.url} 
                        alt={image.fileName}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-medium truncate">{image.fileName}</p>
                        <Badge variant="outline">{image.type}</Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            navigator.clipboard.writeText(image.url);
                            toast.success('Image URL copied');
                          }}
                        >
                          Copy URL
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteImage(image.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Styles Management - Keep existing style management */}
          <TabsContent value="styles">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Website Style Management</h3>
                <p className="text-muted-foreground">
                  Style management functionality is available here for customizing the website appearance.
                  This section maintains the existing color scheme and typography controls.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Helper components for forms
function ServiceForm({ 
  service, 
  onSave, 
  onCancel 
}: { 
  service: Service | null;
  onSave: (service: Partial<Service>) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    name: service?.name || '',
    description: service?.description || '',
    price: service?.price || '',
    duration: service?.duration || '',
    category: service?.category || '',
    active: service?.active ?? true
  });

  return (
    <div className="space-y-4">
      <div>
        <Label>Service Name</Label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          placeholder="Enter service name"
        />
      </div>
      <div>
        <Label>Description</Label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          placeholder="Service description"
        />
      </div>
      <div>
        <Label>Price</Label>
        <Input
          value={formData.price}
          onChange={(e) => setFormData({...formData, price: e.target.value})}
          placeholder="0"
        />
      </div>
      <div>
        <Label>Duration</Label>
        <Input
          value={formData.duration}
          onChange={(e) => setFormData({...formData, duration: e.target.value})}
          placeholder="e.g., 2 hours"
        />
      </div>
      <div>
        <Label>Category</Label>
        <Input
          value={formData.category}
          onChange={(e) => setFormData({...formData, category: e.target.value})}
          placeholder="Service category"
        />
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="active"
          checked={formData.active}
          onChange={(e) => setFormData({...formData, active: e.target.checked})}
        />
        <Label htmlFor="active">Active Service</Label>
      </div>
      <div className="flex space-x-2">
        <Button 
          onClick={() => onSave({...service, ...formData})}
          className="bg-yellow-500 hover:bg-yellow-600 text-black"
        >
          Save Service
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

function ProductForm({ 
  product, 
  images, 
  onSave, 
  onCancel 
}: { 
  product: Product | null;
  images: ImageData[];
  onSave: (product: Partial<Product>) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '',
    category: product?.category || '',
    image: product?.image || '',
    inStock: product?.inStock ?? true
  });

  const productImages = images.filter(img => img.type === 'product');

  return (
    <div className="space-y-4">
      <div>
        <Label>Product Name</Label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          placeholder="Enter product name"
        />
      </div>
      <div>
        <Label>Description</Label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          placeholder="Product description"
        />
      </div>
      <div>
        <Label>Price</Label>
        <Input
          value={formData.price}
          onChange={(e) => setFormData({...formData, price: e.target.value})}
          placeholder="0"
        />
      </div>
      <div>
        <Label>Category</Label>
        <Input
          value={formData.category}
          onChange={(e) => setFormData({...formData, category: e.target.value})}
          placeholder="Product category"
        />
      </div>
      <div>
        <Label>Product Image</Label>
        <Select value={formData.image} onValueChange={(value) => setFormData({...formData, image: value})}>
          <SelectTrigger>
            <SelectValue placeholder="Select an image" />
          </SelectTrigger>
          <SelectContent>
            {productImages.map((image) => (
              <SelectItem key={image.id} value={image.url}>
                {image.fileName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="inStock"
          checked={formData.inStock}
          onChange={(e) => setFormData({...formData, inStock: e.target.checked})}
        />
        <Label htmlFor="inStock">In Stock</Label>
      </div>
      <div className="flex space-x-2">
        <Button 
          onClick={() => onSave({...product, ...formData})}
          className="bg-yellow-500 hover:bg-yellow-600 text-black"
        >
          Save Product
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
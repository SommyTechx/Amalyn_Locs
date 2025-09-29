import { useState, useEffect } from "react";

import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { getUnsplash, getUnsplashImage } from "../utils/unsplash";
import {
  ShoppingCart,
  Search,
  Filter,
  Star,
  Heart,
  Package,
  Truck,
  Shield,
  CreditCard,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner@2.0.3";

export function Shop() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [heroImage, setHeroImage] = useState("");
  const [productImages, setProductImages] = useState<{ [key: string]: string }>(
    {}
  );

  useEffect(() => {
    const loadImages = async () => {
      try {
        // Load hero image
        const heroUrl = await getUnsplash(
          "african woman hair products shopping"
        );
        setHeroImage(heroUrl);

        // Load product images
        const imagePromises = products.map(async (product, index) => {
          const searchTerms = [
            "natural hair products shampoo",
            "hair oil bottle",
            "styling gel jar",
            "silk hair bonnet",
            "cleansing shampoo bottle",
            "hair spray bottle",
            "wooden hair comb",
            "satin pillowcase",
          ];
          const imageUrl = await getUnsplashImage(
            searchTerms[index] || "hair care products"
          );
          return { id: product.id, imageUrl };
        });

        const images = await Promise.all(imagePromises);
        const imageMap = images.reduce((acc, { id, imageUrl }) => {
          acc[id] = imageUrl;
          return acc;
        }, {} as { [key: string]: string });

        setProductImages(imageMap);
      } catch (error) {
        console.error("Error loading images:", error);
      }
    };

    loadImages();
  }, []);

  const categories = [
    { id: "all", name: "All Products", icon: Package },
    { id: "shampoos", name: "Shampoos", icon: Sparkles },
    { id: "oils", name: "Oils & Treatments", icon: Heart },
    { id: "accessories", name: "Accessories", icon: Shield },
    { id: "tools", name: "Styling Tools", icon: CreditCard },
  ];

  const products = [
    {
      id: "1",
      name: "Natural Loc Shampoo",
      price: 3500,
      originalPrice: 4000,
      category: "shampoos",
      description:
        "Gentle cleansing shampoo formulated specifically for healthy locs. Made with natural ingredients.",
      features: ["Sulfate-free", "Natural ingredients", "pH balanced"],
      rating: 4.8,
      reviews: 124,
      inStock: true,
      featured: true,
      badge: "Best Seller",
    },
    {
      id: "2",
      name: "Premium Loc Oil",
      price: 4500,
      originalPrice: 5200,
      category: "oils",
      description:
        "Nourishing oil blend with jojoba, coconut, and essential oils for strong, healthy locs.",
      features: ["100% Natural", "Lightweight", "Non-greasy"],
      rating: 4.9,
      reviews: 89,
      inStock: true,
      featured: true,
      badge: "Premium",
    },
    {
      id: "3",
      name: "Loc Holding Gel",
      price: 2500,
      originalPrice: 3000,
      category: "tools",
      description:
        "Strong hold gel for styling and maintenance without buildup or flaking.",
      features: ["Strong hold", "No flaking", "Easy wash-out"],
      rating: 4.7,
      reviews: 67,
      inStock: true,
      featured: false,
      badge: null,
    },
    {
      id: "4",
      name: "Silk Bonnet",
      price: 1500,
      originalPrice: 2000,
      category: "accessories",
      description:
        "Protective silk bonnet for overnight care. Reduces friction and maintains moisture.",
      features: ["100% Silk", "Adjustable", "Breathable"],
      rating: 4.6,
      reviews: 203,
      inStock: true,
      featured: false,
      badge: null,
    },
    {
      id: "5",
      name: "Residue-Free Shampoo",
      price: 3000,
      originalPrice: 3500,
      category: "shampoos",
      description:
        "Deep cleansing shampoo that removes buildup while maintaining moisture balance.",
      features: ["Deep cleansing", "Residue-free", "Moisturizing"],
      rating: 4.5,
      reviews: 156,
      inStock: true,
      featured: false,
      badge: null,
    },
    {
      id: "6",
      name: "Loc Accelerator Spray",
      price: 2800,
      originalPrice: 3200,
      category: "oils",
      description:
        "Natural spray that speeds up the locking process with organic botanicals.",
      features: ["Organic", "Fast-acting", "Pleasant scent"],
      rating: 4.4,
      reviews: 78,
      inStock: false,
      featured: false,
      badge: "Coming Soon",
    },
    {
      id: "7",
      name: "Wooden Loc Comb",
      price: 1200,
      originalPrice: 1500,
      category: "tools",
      description:
        "Handcrafted wooden comb perfect for gentle styling and sectioning.",
      features: ["Handcrafted", "Anti-static", "Durable"],
      rating: 4.8,
      reviews: 92,
      inStock: true,
      featured: false,
      badge: null,
    },
    {
      id: "8",
      name: "Satin Pillowcase",
      price: 2200,
      originalPrice: 2800,
      category: "accessories",
      description:
        "Smooth satin pillowcase that protects locs while you sleep.",
      features: ["Satin finish", "Hair-friendly", "Machine washable"],
      rating: 4.7,
      reviews: 145,
      inStock: true,
      featured: false,
      badge: null,
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const addToCart = (productId: string) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
    toast.success("Product added to cart!");
  };

  const getTotalCartItems = () => {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  };

  const handleCheckout = () => {
    if (getTotalCartItems() === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const cartItems = Object.entries(cart)
      .filter(([_, quantity]) => quantity > 0)
      .map(([productId, quantity]) => {
        const product = products.find((p) => p.id === productId);
        return `${product?.name} x${quantity} - ₦${(
          (product?.price || 0) * quantity
        ).toLocaleString()}`;
      })
      .join("\n");

    const totalAmount = Object.entries(cart).reduce(
      (total, [productId, quantity]) => {
        const product = products.find((p) => p.id === productId);
        return total + (product?.price || 0) * quantity;
      },
      0
    );

    const whatsappMessage = encodeURIComponent(
      `Hello! I would like to purchase these items:\n\n${cartItems}\n\nTotal: ₦${totalAmount.toLocaleString()}\n\nPlease confirm my order and provide payment details. Thank you!`
    );

    window.open(
      `https://wa.me/2348169887054?text=${whatsappMessage}`,
      "_blank"
    );
  };

  const getDiscountPercentage = (original: number, current: number) => {
    return Math.round(((original - current) / original) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 bg-gradient-to-r from-black to-gray-900 text-white">
        {heroImage && (
          <div className="absolute inset-0">
            <ImageWithFallback
              src={heroImage}
              alt="Hair products shop"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 hero-overlay"></div>
          </div>
        )}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 hero-content">
            Amalyn Locs Shop
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-gray-200 hero-content max-w-3xl mx-auto">
            Premium loc care products crafted for healthy, beautiful locs.
            Quality guaranteed.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto hero-content">
            <div className="flex items-center justify-center">
              <Shield className="h-6 sm:h-8 w-6 sm:w-8 text-yellow-400 mr-2 sm:mr-3 flex-shrink-0" />
              <span className="text-base sm:text-lg">Authentic Products</span>
            </div>
            <div className="flex items-center justify-center">
              <Truck className="h-6 sm:h-8 w-6 sm:w-8 text-yellow-400 mr-2 sm:mr-3 flex-shrink-0" />
              <span className="text-base sm:text-lg">Fast Delivery</span>
            </div>
            <div className="flex items-center justify-center sm:col-span-2 md:col-span-1">
              <Heart className="h-6 sm:h-8 w-6 sm:w-8 text-yellow-400 mr-2 sm:mr-3 flex-shrink-0" />
              <span className="text-base sm:text-lg">Customer Care</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Search and Filter */}
        <div className="flex flex-col gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-3 text-base sm:text-lg border-2 border-gray-200 focus:border-black"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full sm:w-56 border-2 border-gray-200 focus:border-black">
                <Filter className="h-5 w-5 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    <div className="flex items-center">
                      <category.icon className="h-4 w-4 mr-2" />
                      {category.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              onClick={handleCheckout}
              className="bg-black hover:bg-gray-800 text-yellow-400 px-4 sm:px-6 py-3 relative w-full sm:w-auto"
              size="lg"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Cart{" "}
              {getTotalCartItems() > 0 && (
                <Badge className="ml-2 bg-yellow-400 text-black">
                  {getTotalCartItems()}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Featured Products */}
        {products.some((p) => p.featured) && (
          <div className="mb-12 sm:mb-16">
            <div className="flex items-center mb-6 sm:mb-8">
              <Sparkles className="h-6 sm:h-8 w-6 sm:w-8 text-yellow-500 mr-2 sm:mr-3 flex-shrink-0" />
              <h2 className="text-2xl sm:text-3xl font-bold">
                Featured Products
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {products
                .filter((p) => p.featured)
                .map((product) => (
                  <Card
                    key={product.id}
                    className="modern-card hover:shadow-xl transition-all duration-300 border-2 border-yellow-400/20 hover:border-yellow-400"
                  >
                    <CardContent className="p-0">
                      <div className="relative">
                        <ImageWithFallback
                          src={productImages[product.id] || ""}
                          alt={product.name}
                          className="w-full h-64 object-cover rounded-t-lg"
                        />

                        {product.badge && (
                          <Badge className="absolute top-4 left-4 bg-yellow-400 text-black font-semibold">
                            {product.badge}
                          </Badge>
                        )}

                        {product.originalPrice > product.price && (
                          <Badge className="absolute top-4 right-4 bg-red-500 text-white">
                            -
                            {getDiscountPercentage(
                              product.originalPrice,
                              product.price
                            )}
                            %
                          </Badge>
                        )}

                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute bottom-4 right-4 bg-white/90 hover:bg-white shadow-lg"
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {product.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {product.features.map((feature, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {feature}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center mb-4">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(product.rating)
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 ml-2">
                            {product.rating} ({product.reviews} reviews)
                          </span>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-black">
                              ₦{product.price.toLocaleString()}
                            </span>
                            {product.originalPrice > product.price && (
                              <span className="text-lg text-gray-500 line-through">
                                ₦{product.originalPrice.toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>

                        <Button
                          onClick={() => addToCart(product.id)}
                          disabled={!product.inStock}
                          className="w-full bg-black hover:bg-gray-800 text-yellow-400 py-3"
                          size="lg"
                        >
                          {product.inStock ? (
                            <>
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              Add to Cart
                            </>
                          ) : (
                            "Out of Stock"
                          )}
                        </Button>

                        {cart[product.id] && (
                          <div className="mt-3 text-center">
                            <Badge className="bg-green-100 text-green-800">
                              {cart[product.id]} in cart
                            </Badge>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {/* All Products */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
            All Products ({filteredProducts.length})
          </h2>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 sm:py-16">
              <Package className="h-12 sm:h-16 w-12 sm:w-16 text-gray-400 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">
                No products found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="modern-card hover:shadow-lg transition-all duration-300"
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <ImageWithFallback
                        src={productImages[product.id] || ""}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />

                      {product.badge && (
                        <Badge className="absolute top-2 left-2 bg-yellow-400 text-black text-xs">
                          {product.badge}
                        </Badge>
                      )}

                      {!product.inStock && (
                        <Badge className="absolute top-2 left-2 bg-gray-500 text-white text-xs">
                          Out of Stock
                        </Badge>
                      )}

                      {product.originalPrice > product.price && (
                        <Badge className="absolute top-2 right-2 bg-red-500 text-white text-xs">
                          -
                          {getDiscountPercentage(
                            product.originalPrice,
                            product.price
                          )}
                          %
                        </Badge>
                      )}
                    </div>

                    <div className="p-4">
                      <h3 className="font-bold mb-2 line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="flex items-center mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-2">
                          ({product.rating})
                        </span>
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <span className="text-lg font-bold text-black">
                            ₦{product.price.toLocaleString()}
                          </span>
                          {product.originalPrice > product.price && (
                            <span className="text-sm text-gray-500 line-through ml-2">
                              ₦{product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>

                      <Button
                        onClick={() => addToCart(product.id)}
                        disabled={!product.inStock}
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black"
                        size="sm"
                      >
                        {product.inStock ? "Add to Cart" : "Out of Stock"}
                      </Button>

                      {cart[product.id] && (
                        <div className="mt-2 text-center">
                          <Badge className="bg-green-100 text-green-800 text-xs">
                            {cart[product.id]} in cart
                          </Badge>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Shipping & Service Info */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          <Card className="modern-card text-center p-4 sm:p-6">
            <Truck className="h-8 sm:h-10 md:h-12 w-8 sm:w-10 md:w-12 text-yellow-500 mx-auto mb-3 sm:mb-4" />
            <h3 className="font-bold mb-2 text-sm sm:text-base">
              Free Delivery
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">
              Free shipping within Enugu for orders ₦10,000+
            </p>
          </Card>

          <Card className="modern-card text-center p-4 sm:p-6">
            <Shield className="h-8 sm:h-10 md:h-12 w-8 sm:w-10 md:w-12 text-yellow-500 mx-auto mb-3 sm:mb-4" />
            <h3 className="font-bold mb-2 text-sm sm:text-base">
              Authentic Products
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">
              100% genuine products with quality guarantee
            </p>
          </Card>

          <Card className="modern-card text-center p-4 sm:p-6">
            <CreditCard className="h-8 sm:h-10 md:h-12 w-8 sm:w-10 md:w-12 text-yellow-500 mx-auto mb-3 sm:mb-4" />
            <h3 className="font-bold mb-2 text-sm sm:text-base">
              Secure Payment
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">
              Bank transfer or cash on delivery available
            </p>
          </Card>

          <Card className="modern-card text-center p-4 sm:p-6">
            <Heart className="h-8 sm:h-10 md:h-12 w-8 sm:w-10 md:w-12 text-yellow-500 mx-auto mb-3 sm:mb-4" />
            <h3 className="font-bold mb-2 text-sm sm:text-base">
              Customer Care
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">
              24/7 support via WhatsApp and phone
            </p>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="modern-card text-center p-8 bg-gradient-to-r from-black to-gray-900 text-white">
          <h2 className="text-3xl font-bold mb-4">Need Help Choosing?</h2>
          <p className="text-xl mb-6 text-gray-300">
            Our loc care specialists are here to help you find the perfect
            products
          </p>
          <Button
            onClick={() => window.open("https://wa.me/2348169887054", "_blank")}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 text-lg"
          >
            <ArrowRight className="h-5 w-5 mr-2" />
            Chat with Expert
          </Button>
        </Card>
      </div>
    </div>
  );
}

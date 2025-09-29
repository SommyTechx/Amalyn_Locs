import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Initialize storage buckets on startup
async function initializeStorage() {
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    
    const bucketsToCreate = ['make-f2724e29-images', 'make-f2724e29-products', 'make-f2724e29-gallery'];
    
    for (const bucketName of bucketsToCreate) {
      const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
      if (!bucketExists) {
        await supabase.storage.createBucket(bucketName, { public: false });
        console.log(`Created bucket: ${bucketName}`);
      }
    }
  } catch (error) {
    console.error('Error initializing storage:', error);
  }
}

// Initialize storage on startup
initializeStorage();

// Health check endpoint
app.get("/make-server-f2724e29/health", (c) => {
  return c.json({ status: "ok" });
});

// Admin routes for style management
app.get("/make-server-f2724e29/admin/styles", async (c) => {
  try {
    const styles = await kv.getByPrefix("style:");
    return c.json({ styles: styles || [] });
  } catch (error) {
    console.error("Error fetching styles:", error);
    return c.json({ error: "Failed to fetch styles" }, 500);
  }
});

app.post("/make-server-f2724e29/admin/styles", async (c) => {
  try {
    const { style } = await c.req.json();
    
    if (!style || !style.name) {
      return c.json({ error: "Style name is required" }, 400);
    }

    // Save the style
    await kv.set(`style:${style.id}`, style);
    
    return c.json({ success: true, message: "Style saved successfully" });
  } catch (error) {
    console.error("Error saving style:", error);
    return c.json({ error: "Failed to save style" }, 500);
  }
});

app.post("/make-server-f2724e29/admin/styles/activate", async (c) => {
  try {
    const { styleId } = await c.req.json();
    
    if (!styleId) {
      return c.json({ error: "Style ID is required" }, 400);
    }

    // Get all styles and deactivate them
    const styles = await kv.getByPrefix("style:");
    const updatePromises = styles.map(async (style) => {
      const updatedStyle = { ...style, isActive: style.id === styleId };
      return kv.set(`style:${style.id}`, updatedStyle);
    });

    await Promise.all(updatePromises);

    // Set the active style in a separate key for quick access
    const activeStyle = styles.find(s => s.id === styleId);
    if (activeStyle) {
      await kv.set("active-style", { ...activeStyle, isActive: true });
    }
    
    return c.json({ success: true, message: "Style activated successfully" });
  } catch (error) {
    console.error("Error activating style:", error);
    return c.json({ error: "Failed to activate style" }, 500);
  }
});

app.get("/make-server-f2724e29/active-style", async (c) => {
  try {
    const activeStyle = await kv.get("active-style");
    return c.json({ style: activeStyle });
  } catch (error) {
    console.error("Error fetching active style:", error);
    return c.json({ error: "Failed to fetch active style" }, 500);
  }
});

app.delete("/make-server-f2724e29/admin/styles/:id", async (c) => {
  try {
    const styleId = c.req.param("id");
    await kv.del(`style:${styleId}`);
    
    return c.json({ success: true, message: "Style deleted successfully" });
  } catch (error) {
    console.error("Error deleting style:", error);
    return c.json({ error: "Failed to delete style" }, 500);
  }
});

// Booking management routes
app.get("/make-server-f2724e29/admin/bookings", async (c) => {
  try {
    const bookings = await kv.getByPrefix("booking:");
    return c.json({ bookings: bookings || [] });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return c.json({ error: "Failed to fetch bookings" }, 500);
  }
});

app.post("/make-server-f2724e29/admin/bookings/:id/status", async (c) => {
  try {
    const bookingId = c.req.param("id");
    const { status } = await c.req.json();
    
    const booking = await kv.get(`booking:${bookingId}`);
    if (!booking) {
      return c.json({ error: "Booking not found" }, 404);
    }
    
    const updatedBooking = { ...booking, status, updatedAt: new Date().toISOString() };
    await kv.set(`booking:${bookingId}`, updatedBooking);
    
    return c.json({ success: true, booking: updatedBooking });
  } catch (error) {
    console.error("Error updating booking status:", error);
    return c.json({ error: "Failed to update booking status" }, 500);
  }
});

app.delete("/make-server-f2724e29/admin/bookings/:id", async (c) => {
  try {
    const bookingId = c.req.param("id");
    await kv.del(`booking:${bookingId}`);
    
    return c.json({ success: true, message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    return c.json({ error: "Failed to delete booking" }, 500);
  }
});

// Product/Service management routes
app.get("/make-server-f2724e29/admin/products", async (c) => {
  try {
    const products = await kv.getByPrefix("product:");
    return c.json({ products: products || [] });
  } catch (error) {
    console.error("Error fetching products:", error);
    return c.json({ error: "Failed to fetch products" }, 500);
  }
});

app.post("/make-server-f2724e29/admin/products", async (c) => {
  try {
    const { product } = await c.req.json();
    
    if (!product || !product.name) {
      return c.json({ error: "Product name is required" }, 400);
    }

    const productId = product.id || Date.now().toString();
    const productToSave = {
      ...product,
      id: productId,
      createdAt: product.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await kv.set(`product:${productId}`, productToSave);
    
    return c.json({ success: true, product: productToSave });
  } catch (error) {
    console.error("Error saving product:", error);
    return c.json({ error: "Failed to save product" }, 500);
  }
});

app.put("/make-server-f2724e29/admin/products/:id", async (c) => {
  try {
    const productId = c.req.param("id");
    const { product } = await c.req.json();
    
    const existingProduct = await kv.get(`product:${productId}`);
    if (!existingProduct) {
      return c.json({ error: "Product not found" }, 404);
    }
    
    const updatedProduct = {
      ...existingProduct,
      ...product,
      id: productId,
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`product:${productId}`, updatedProduct);
    
    return c.json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    return c.json({ error: "Failed to update product" }, 500);
  }
});

app.delete("/make-server-f2724e29/admin/products/:id", async (c) => {
  try {
    const productId = c.req.param("id");
    await kv.del(`product:${productId}`);
    
    return c.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return c.json({ error: "Failed to delete product" }, 500);
  }
});

// Image upload routes
app.post("/make-server-f2724e29/admin/upload", async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string; // 'product', 'gallery', or 'general'
    
    if (!file) {
      return c.json({ error: "No file provided" }, 400);
    }

    const bucket = `make-f2724e29-${type === 'product' ? 'products' : type === 'gallery' ? 'gallery' : 'images'}`;
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = `${type}/${fileName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return c.json({ error: "Failed to upload file" }, 500);
    }

    // Get signed URL for the uploaded file
    const { data: signedUrl } = await supabase.storage
      .from(bucket)
      .createSignedUrl(filePath, 365 * 24 * 60 * 60); // 1 year expiry

    // Save image metadata to KV store
    const imageData = {
      id: Date.now().toString(),
      fileName,
      filePath,
      bucket,
      url: signedUrl?.signedUrl,
      type,
      uploadedAt: new Date().toISOString()
    };
    
    await kv.set(`image:${imageData.id}`, imageData);

    return c.json({ success: true, image: imageData });
  } catch (error) {
    console.error("Error uploading image:", error);
    return c.json({ error: "Failed to upload image" }, 500);
  }
});

app.get("/make-server-f2724e29/admin/images", async (c) => {
  try {
    const type = c.req.query('type');
    const images = await kv.getByPrefix("image:");
    
    let filteredImages = images || [];
    if (type) {
      filteredImages = filteredImages.filter(img => img.type === type);
    }
    
    return c.json({ images: filteredImages });
  } catch (error) {
    console.error("Error fetching images:", error);
    return c.json({ error: "Failed to fetch images" }, 500);
  }
});

app.delete("/make-server-f2724e29/admin/images/:id", async (c) => {
  try {
    const imageId = c.req.param("id");
    const image = await kv.get(`image:${imageId}`);
    
    if (!image) {
      return c.json({ error: "Image not found" }, 404);
    }

    // Delete from storage
    await supabase.storage
      .from(image.bucket)
      .remove([image.filePath]);

    // Delete from KV store
    await kv.del(`image:${imageId}`);
    
    return c.json({ success: true, message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    return c.json({ error: "Failed to delete image" }, 500);
  }
});

// Analytics routes
app.get("/make-server-f2724e29/admin/analytics", async (c) => {
  try {
    const bookings = await kv.getByPrefix("booking:");
    const products = await kv.getByPrefix("product:");
    const images = await kv.getByPrefix("image:");
    const reviews = await kv.getByPrefix("review:");
    
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1);
    const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const recentBookings = (bookings || []).filter(booking => 
      new Date(booking.createdAt || booking.date) > lastMonth
    );
    
    const weeklyBookings = (bookings || []).filter(booking => 
      new Date(booking.createdAt || booking.date) > lastWeek
    );
    
    const analytics = {
      totals: {
        bookings: bookings?.length || 0,
        products: products?.length || 0,
        images: images?.length || 0,
        reviews: reviews?.length || 0
      },
      recent: {
        monthlyBookings: recentBookings.length,
        weeklyBookings: weeklyBookings.length
      },
      bookingsByStatus: {
        pending: (bookings || []).filter(b => b.status === 'pending').length,
        confirmed: (bookings || []).filter(b => b.status === 'confirmed').length,
        completed: (bookings || []).filter(b => b.status === 'completed').length,
        cancelled: (bookings || []).filter(b => b.status === 'cancelled').length
      },
      revenue: {
        total: (bookings || [])
          .filter(b => b.status === 'completed')
          .reduce((sum, b) => sum + (parseFloat(b.price) || 0), 0),
        monthly: recentBookings
          .filter(b => b.status === 'completed')
          .reduce((sum, b) => sum + (parseFloat(b.price) || 0), 0)
      }
    };
    
    return c.json({ analytics });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return c.json({ error: "Failed to fetch analytics" }, 500);
  }
});

// Public booking route for customers
app.post("/make-server-f2724e29/bookings", async (c) => {
  try {
    const { booking } = await c.req.json();
    
    if (!booking || !booking.name || !booking.phone || !booking.service) {
      return c.json({ error: "Name, phone, and service are required" }, 400);
    }

    const bookingId = booking.id || Date.now().toString();
    const bookingToSave = {
      ...booking,
      id: bookingId,
      status: 'pending',
      createdAt: booking.createdAt || new Date().toISOString()
    };

    await kv.set(`booking:${bookingId}`, bookingToSave);
    
    return c.json({ success: true, booking: bookingToSave });
  } catch (error) {
    console.error("Error saving booking:", error);
    return c.json({ error: "Failed to save booking" }, 500);
  }
});

// Services management routes
app.get("/make-server-f2724e29/admin/services", async (c) => {
  try {
    const services = await kv.getByPrefix("service:");
    return c.json({ services: services || [] });
  } catch (error) {
    console.error("Error fetching services:", error);
    return c.json({ error: "Failed to fetch services" }, 500);
  }
});

app.post("/make-server-f2724e29/admin/services", async (c) => {
  try {
    const { service } = await c.req.json();
    
    if (!service || !service.name) {
      return c.json({ error: "Service name is required" }, 400);
    }

    const serviceId = service.id || Date.now().toString();
    const serviceToSave = {
      ...service,
      id: serviceId,
      createdAt: service.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await kv.set(`service:${serviceId}`, serviceToSave);
    
    return c.json({ success: true, service: serviceToSave });
  } catch (error) {
    console.error("Error saving service:", error);
    return c.json({ error: "Failed to save service" }, 500);
  }
});

app.put("/make-server-f2724e29/admin/services/:id", async (c) => {
  try {
    const serviceId = c.req.param("id");
    const { service } = await c.req.json();
    
    const existingService = await kv.get(`service:${serviceId}`);
    if (!existingService) {
      return c.json({ error: "Service not found" }, 404);
    }
    
    const updatedService = {
      ...existingService,
      ...service,
      id: serviceId,
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`service:${serviceId}`, updatedService);
    
    return c.json({ success: true, service: updatedService });
  } catch (error) {
    console.error("Error updating service:", error);
    return c.json({ error: "Failed to update service" }, 500);
  }
});

app.delete("/make-server-f2724e29/admin/services/:id", async (c) => {
  try {
    const serviceId = c.req.param("id");
    await kv.del(`service:${serviceId}`);
    
    return c.json({ success: true, message: "Service deleted successfully" });
  } catch (error) {
    console.error("Error deleting service:", error);
    return c.json({ error: "Failed to delete service" }, 500);
  }
});

Deno.serve(app.fetch);
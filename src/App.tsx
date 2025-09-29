import { useState, useEffect } from "react";
import { initializeStyles } from "./utils/style-manager";
import { Navigation } from "./components/navigation";
import { Homepage } from "./components/homepage";
import { Services } from "./components/services";
import { Booking } from "./components/booking";
import { Shop } from "./components/shop";
import { Gallery } from "./components/gallery";
import { About } from "./components/about";
import { Contact } from "./components/contact";
import { Admin } from "./components/admin";
import { Reviews } from "./components/reviews";
import { SocialFeed } from "./components/social-feed";
import { ConsultationTool } from "./components/consultation-tool";
import { LiveChat } from "./components/live-chat";
import { Blog } from "./components/blog";


import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  // Initialize styles on app load
  useEffect(() => {
    initializeStyles();
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Homepage onPageChange={setCurrentPage} />;
      case "services":
        return <Services onPageChange={setCurrentPage} />;
      case "booking":
        return <Booking />;
      case "shop":
        return <Shop />;
      case "gallery":
        return <Gallery />;
      case "about":
        return <About onPageChange={setCurrentPage} />;
      case "contact":
        return <Contact />;
      case "admin":
        return <Admin onPageChange={setCurrentPage} />;
      case "reviews":
        return <Reviews onPageChange={setCurrentPage} />;
      case "social":
        return <SocialFeed />;
      case "consultation":
        return (
          <ConsultationTool onPageChange={setCurrentPage} />
        );
      case "blog":
        return <Blog onPageChange={setCurrentPage} />;


      default:
        return <Homepage onPageChange={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      {renderPage()}

      {/* Footer */}
      <footer className="bg-black text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className="text-xl sm:text-2xl mb-3 sm:mb-4 text-white">
                Amalyn Locs
              </h3>
              <p className="text-gray-300 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                Authentic African dreadlock culture.
                Professional styling, premium products,
                exceptional service.
              </p>
              <div className="text-xs sm:text-sm text-gray-400">
                <p>Premium loc care specialists</p>
                <p>Celebrating African heritage</p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-base sm:text-lg mb-3 sm:mb-4 text-yellow-500">
                Quick Links
              </h4>
              <div className="space-y-1 sm:space-y-2">
                {[
                  { id: "home", label: "Home" },
                  { id: "services", label: "Services" },
                  { id: "booking", label: "Book Now" },
                  { id: "gallery", label: "Gallery" },
                ].map((link) => (
                  <button
                    key={link.id}
                    onClick={() => setCurrentPage(link.id)}
                    className="block text-gray-300 hover:text-yellow-500 transition-colors text-sm sm:text-base"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-base sm:text-lg mb-3 sm:mb-4 text-yellow-500">
                Services
              </h4>
              <div className="space-y-1 sm:space-y-2 text-gray-300 text-sm sm:text-base">
                <p>Starter Locs</p>
                <p>Retwist & Maintenance</p>
                <p>Loc Styling</p>
                <p>Coloring</p>
                <p>Deep Cleansing</p>
                <p>Consultation</p>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-base sm:text-lg mb-3 sm:mb-4 text-yellow-500">
                Contact Info
              </h4>
              <div className="space-y-1 sm:space-y-2 text-gray-300 text-sm sm:text-base">
                <p>📞 +234 816 988 7054</p>
                <p>📧 info@amalynlocs.com</p>
                <p>⭐ Premium Service</p>
                <p>💬 WhatsApp Available</p>
              </div>
              <div className="mt-3 sm:mt-4">
                <button
                  onClick={() =>
                    window.open(
                      "https://wa.me/2348169887054",
                      "_blank",
                    )
                  }
                  className="bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 rounded transition-colors text-sm sm:text-base w-full sm:w-auto"
                >
                  Chat on WhatsApp
                </button>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
              © 2024 Amalyn Locs. All rights reserved.
            </p>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <p className="text-gray-400 text-xs sm:text-sm text-center">
                Celebrating African Hair Culture
              </p>
              <button
                onClick={() => setCurrentPage("admin")}
                className="text-gray-600 text-xs hover:text-gray-400 transition-colors"
                style={{ opacity: 0.3 }}
              >
                ⚙️
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Live Chat Widget */}
      <LiveChat onPageChange={setCurrentPage} />



      <Toaster />
    </div>
  );
}
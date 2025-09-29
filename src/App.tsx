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
  const [navHeight, setNavHeight] = useState(0);

  // ✅ Measure navbar height
  useEffect(() => {
    initializeStyles();

    const navbar = document.getElementById("navbar");
    if (navbar) setNavHeight(navbar.offsetHeight);

    const handleResize = () => {
      if (navbar) setNavHeight(navbar.offsetHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
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
        return <ConsultationTool onPageChange={setCurrentPage} />;
      case "blog":
        return <Blog onPageChange={setCurrentPage} />;
      default:
        return <Homepage onPageChange={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-white" style={{ paddingTop: navHeight }}>
      {/* ✅ Pass id to Navigation for measurement */}
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      {renderPage()}

      {/* Footer */}
      <footer className="bg-black text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* ... footer content ... */}
        </div>
      </footer>

      {/* Live Chat Widget */}
      <LiveChat onPageChange={setCurrentPage} />
      <Toaster />
    </div>
  );
}

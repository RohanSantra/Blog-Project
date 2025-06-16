// src/components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Reset scroll to top-left corner
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

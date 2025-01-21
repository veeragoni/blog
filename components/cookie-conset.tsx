// components/CookieConsent.tsx
'use client';
import CookieConsent from "react-cookie-consent";
import { setCookie, hasCookie } from 'cookies-next';
import { useEffect } from 'react';

// Function to initialize GA based on consent
const initializeGA = () => {
  // Initialize GA4 with Consent Mode
  window.gtag('consent', 'update', {
    'analytics_storage': 'granted',
    'ad_storage': 'denied'
  });
};

export default function CustomCookieConsent() {
  useEffect(() => {
    // Check if consent was previously given
    if (hasCookie('analytics_cookies')) {
      initializeGA();
    }
  }, []);

  const handleAcceptAll = () => {
    setCookie("functional_cookies", "true");
    setCookie("analytics_cookies", "true");
    setCookie("personal_cookies", "true");
    initializeGA();
  };

  const handleEssentialOnly = () => {
    setCookie("functional_cookies", "true");
    setCookie("analytics_cookies", "false");
    setCookie("personal_cookies", "false");
    // Deny analytics tracking
    window.gtag('consent', 'update', {
      'analytics_storage': 'denied',
      'ad_storage': 'denied'
    });
  };

  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept all cookies"
      enableDeclineButton
      declineButtonText="No personal cookies"
      onAccept={handleAcceptAll}
      onDecline={handleEssentialOnly}
      style={{
        background: "#ffffff",
        color: "#000000",
        padding: "20px",
        boxShadow: "0 -2px 10px rgba(0,0,0,0.1)"
      }}
      buttonStyle={{
        background: "#0052CC",
        color: "#ffffff",
        borderRadius: "4px",
        padding: "10px 20px"
      }}
      declineButtonStyle={{
        background: "#ffffff",
        color: "#0052CC",
        border: "1px solid #0052CC",
        borderRadius: "4px",
        padding: "10px 20px"
      }}
    >
      <h3 style={{ marginBottom: "10px" }}>Cookies on Our Website</h3>
      <p>
        We use functional and analytical cookies to give you the best experience 
        on our website. Our optional cookies ensure that content and advertisements 
        are relevant to your personal interests.{" "}
        <a href="/cookie-policy" style={{ color: "#0052CC" }}>
          More about cookies
        </a>
      </p>
    </CookieConsent>
  );
}

"use client";
import { useEffect } from "react";
import CookieConsent from "react-cookie-consent";
import Script from "next/script";

const GA_MEASUREMENT_ID = "G-9YHS24HY6J";

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

const CookieConsentComponent = () => {
  useEffect(() => {
    // Initialize dataLayer and gtag first
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
    
    // Set default consent before any config
    window.gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied"
    });

    // Initial config with page_view disabled
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID, {
      send_page_view: false,
      cookie_flags: "SameSite=None; Secure"
    });
  }, []);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
        id="ga-script"
        onLoad={() => {
          // Ensure gtag exists after script loads
          window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
        }}
      />

      <CookieConsent
        location="bottom"
        buttonText="Accept"
        declineButtonText="Decline"
        cookieName="cookieConsent"
        expires={365}
        enableDeclineButton
        onAccept={() => {
          window.gtag("consent", "update", {
            analytics_storage: "granted",
            ad_storage: "granted"
          });
          // Manually send first page_view
          window.gtag("event", "page_view", {
            page_title: document.title,
            page_location: window.location.href
          });
        }}
        onDecline={() => {
          window.gtag("consent", "update", {
            analytics_storage: "denied"
          });
        }}
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </>
  );
};

export default CookieConsentComponent;
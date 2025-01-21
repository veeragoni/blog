// components/CookieConsent.tsx
"use client";
import React, { useEffect, useState } from "react";
import CookieConsent from "react-cookie-consent";
import Script from "next/script";

const GA_MEASUREMENT_ID = "G-9YHS24HY6J";

const CookieConsentComponent: React.FC = () => {
  const [consentGiven, setConsentGiven] = useState<boolean>(false);

  // Initialize GA with consent defaults
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;
    
    // Set default consent to 'denied' before initialization
    gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
    });
    
    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID);
  }, []);

  // Update consent when user accepts
  useEffect(() => {
    if (consentGiven && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
      });
    }
  }, [consentGiven]);

  return (
    <>
      {/* Load GA script after interactive */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <CookieConsent
        location="bottom"
        buttonText="Accept"
        declineButtonText="Decline"
        cookieName="cookieConsent"
        onAccept={() => setConsentGiven(true)}
        enableDeclineButton
        expires={365}
        // Add style props as needed
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </>
  );
};

export default CookieConsentComponent;
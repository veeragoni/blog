// components/CookieConsent.tsx
"use client";

import React, { useEffect } from "react";
import CookieConsent from "react-cookie-consent";
import { hasCookie, setCookie } from 'cookies-next';

const CookieConsentComponent: React.FC = () => {
  useEffect(() => {
    // Initialize consent mode
    window.gtag('consent', 'default', {
      'analytics_storage': 'denied'
    });

    // Check if consent was previously given
    if (hasCookie('cookieConsent')) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    }
  }, []);

  const handleAccept = () => {
    window.gtag('consent', 'update', {
      'analytics_storage': 'granted'
    });
    setCookie('cookieConsent', 'true');
  };

  const handleDecline = () => {
    window.gtag('consent', 'update', {
      'analytics_storage': 'denied'
    });
    setCookie('cookieConsent', 'false');
  };

  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      declineButtonText="Decline"
      cookieName="cookieConsent"
      style={{ background: "#2B373B" }}
      buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
      expires={365}
      onAccept={handleAccept}
      enableDeclineButton
      onDecline={handleDecline}
    >
      This website uses cookies to enhance the user experience.
    </CookieConsent>
  );
};

export default CookieConsentComponent;

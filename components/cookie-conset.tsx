// components/CookieConsent.tsx
"use client"; // Mark as a Client Component in Next.js 14

import React, { useEffect, useState } from "react";
import CookieConsent from "react-cookie-consent";

const GA_MEASUREMENT_ID = "G-9YHS24HY6J"; // Replace with your GA ID

const CookieConsentComponent: React.FC = () => {
  const [consentGiven, setConsentGiven] = useState<boolean>(false);

  useEffect(() => {
    if (consentGiven) {
      // Load the Google Analytics script
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      script.async = true;
      document.head.appendChild(script);

      // Initialize gtag
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      window.gtag = gtag;

      gtag("js", new Date());
      gtag("config", GA_MEASUREMENT_ID);

      // Update consent
      gtag("consent", "update", {
        analytics_storage: "granted",
      });
    }
  }, [consentGiven]);

  return (
    <>
      <CookieConsent
        location="bottom"
        buttonText="Accept"
        declineButtonText="Decline"
        cookieName="cookieConsent"
        style={{ background: "#2B373B" }}
        buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
        expires={365}
        onAccept={() => {
          setConsentGiven(true);
        }}
        enableDeclineButton
        onDecline={() => {
          console.log("Cookies declined");
        }}
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </>
  );
};

export default CookieConsentComponent;
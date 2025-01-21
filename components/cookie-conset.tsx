// components/CookieConsent.tsx
"use client"; // Mark as a Client Component in Next.js 14

import React, { useEffect, useState } from "react";
import CookieConsent from "react-cookie-consent";
import { GoogleAnalytics } from "@next/third-parties/google";

const CookieConsentComponent: React.FC = () => {
  const [consentGiven, setConsentGiven] = useState<boolean>(false);

  useEffect(() => {
    if (consentGiven) {
      // Initialize Google Analytics
      window.gtag("consent", "update", {
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

      {/* Load Google Analytics only if consent is given */}
      {consentGiven && <GoogleAnalytics gaId="G-9YHS24HY6J" />}
    </>
  );
};

export default CookieConsentComponent;
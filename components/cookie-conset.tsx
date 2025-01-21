// components/CookieConsent.tsx
'use client';
import CookieConsent from "react-cookie-consent";
import { setCookie } from 'cookies-next';

export default function CustomCookieConsent() {
  const handleAcceptAll = () => {
    setCookie("functional_cookies", "true");
    setCookie("analytics_cookies", "true");
    setCookie("personal_cookies", "true");
  };

  const handleEssentialOnly = () => {
    setCookie("functional_cookies", "true");
    setCookie("analytics_cookies", "true");
    setCookie("personal_cookies", "false");
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

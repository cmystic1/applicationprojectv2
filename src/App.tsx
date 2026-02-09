import { useState } from 'react';
import { Routes, Route } from 'react-router-dom'; // Only import Routes and Route, NOT BrowserRouter
import { FaHome, FaUserFriends, FaBell, FaFacebookMessenger, FaSearch, FaVideo, FaStore, FaUsers, FaGamepad, FaClock, FaBookmark, FaChevronDown, FaEllipsisH, FaThumbsUp, FaComment, FaShare, FaPlus } from "react-icons/fa";
import "./App.css";
import DeactivationModal from "./assets/components/facebook";
import Microsoft from "./pages/microsoft/microsoft";

function FacebookPage() {
  const [showModal, setShowModal] = useState(true);

  return (
    <>
      <DeactivationModal isOpen={showModal} onClose={() => setShowModal(false)} />
      <div className="container" style={{background: "#f0f2f5"}}>
        <header className="navbar">
          <div className="nav-left">
            <div className="logo">
              <svg viewBox="0 0 36 36" fill="#1877f2" height="40" width="40">
                <path d="M20.3 36V21.4h4.9l.7-5.7h-5.6v-3.6c0-1.6.5-2.8 2.8-2.8h3V4.2c-.5-.1-2.2-.2-4.2-.2-4.1 0-7 2.5-7 7.1v4h-4.7v5.7h4.7V36h5.4z"></path>
              </svg>
            </div>
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input type="text" placeholder="Search Facebook" className="search-input" />
            </div>
          </div>

          <div className="nav-center">
            <div className="nav-tab nav-tab-active">
              <FaHome className="nav-icon" />
            </div>
            <div className="nav-tab">
              <FaVideo className="nav-icon" />
            </div>
            <div className="nav-tab">
              <FaStore className="nav-icon" />
            </div>
            <div className="nav-tab">
              <FaUsers className="nav-icon" />
            </div>
            <div className="nav-tab">
              <FaGamepad className="nav-icon" />
            </div>
          </div>

          <div className="nav-right">
            <div className="nav-icon-button">
              <div className="icon-circle">
                <FaPlus className="small-icon" />
              </div>
            </div>
            <div className="nav-icon-button">
              <div className="icon-circle">
                <FaFacebookMessenger className="small-icon" />
              </div>
            </div>
            <div className="nav-icon-button">
              <div className="icon-circle">
                <FaBell className="small-icon" />
              </div>
            </div>
            <div className="profile-pic">
              <div className="avatar">CL</div>
            </div>
          </div>
        </header>

        <div className="main-container" style={{background: "#f0f2f5"}}>
          <aside className="left-sidebar">
            <div className="sidebar-item">
              <div className="avatar-small">CL</div>
              <span className="sidebar-text">Carl Lester</span>
            </div>
            <div className="sidebar-item">
              <FaUserFriends className="sidebar-icon" />
              <span className="sidebar-text">Friends</span>
            </div>
            <div className="sidebar-item">
              <FaClock className="sidebar-icon" />
              <span className="sidebar-text">Memories</span>
            </div>
            <div className="sidebar-item">
              <FaBookmark className="sidebar-icon" />
              <span className="sidebar-text">Saved</span>
            </div>
            <div className="sidebar-item">
              <FaUsers className="sidebar-icon" />
              <span className="sidebar-text">Groups</span>
            </div>
            <div className="sidebar-item">
              <FaVideo className="sidebar-icon" />
              <span className="sidebar-text">Video</span>
            </div>
            <div className="sidebar-item">
              <FaStore className="sidebar-icon" />
              <span className="sidebar-text">Marketplace</span>
            </div>
            <div className="sidebar-item">
              <div className="see-more-circle">
                <FaChevronDown className="small-icon" />
              </div>
              <span className="sidebar-text">See more</span>
            </div>
          </aside>

          <main className="feed">
            <div className="post-creator">
              <div className="post-creator-top">
                <div className="avatar-medium">CL</div>
                <input
                  type="text"
                  placeholder="What's on your mind, Carl?"
                  className="post-input"
                />
              </div>
              <div className="post-creator-divider"></div>
              <div className="post-creator-actions">
                <div className="post-action">
                  <FaVideo className="action-icon-red" />
                  <span>Live video</span>
                </div>
                <div className="post-action">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="#45bd62">
                    <path d="M13.5 2C10.6 2 8.3 4.4 8.3 7.3c0 .3 0 .6.1.9L2 14.6v5.9h5.9l6.4-6.4c.3 0 .6.1.9.1 2.9 0 5.3-2.4 5.3-5.3S16.4 2 13.5 2zm0 2c1.8 0 3.3 1.5 3.3 3.3s-1.5 3.3-3.3 3.3-3.3-1.5-3.3-3.3S11.7 4 13.5 4z" />
                  </svg>
                  <span>Photo/video</span>
                </div>
                <div className="post-action">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="#f7b928">
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm3.5-9c.8 0 1.5-.7 1.5-1.5S16.3 8 15.5 8 14 8.7 14 9.5s.7 1.5 1.5 1.5zm-7 0C9.3 11 10 10.3 10 9.5S9.3 8 8.5 8 7 8.7 7 9.5 7.7 11 8.5 11zm3.5 6.5c2.3 0 4.3-1.3 5.3-3.2H6.7c1 1.9 3 3.2 5.3 3.2z" />
                  </svg>
                  <span>Feeling/activity</span>
                </div>
              </div>
            </div>

            <div className="stories-container">
              <div className="story-card">
                <div className="story-image-create">
                  <div className="create-story-plus" style={{ marginBottom: "80px" }}>+</div>
                </div>
                <div className="story-label">Create story</div>
              </div>
              <div className="story-card">
                <div className="story-image story-bg-1">
                  <div className="story-avatar">DJ</div>
                </div>
                <div className="story-name">Dwayne J.</div>
              </div>
              <div className="story-card">
                <div className="story-image story-bg-2">
                  <div className="story-avatar">JC</div>
                </div>
                <div className="story-name">John Cena</div>
              </div>
              <div className="story-card">
                <div className="story-image story-bg-3">
                  <div className="story-avatar">BL</div>
                </div>
                <div className="story-name">Brock Lesnar</div>
              </div>
              <div className="story-card">
                <div className="story-image story-bg-4">
                  <div className="story-avatar">MC</div>
                </div>
                <div className="story-name">Mark Calaway</div>
              </div>
            </div>

            <div className="post">
              <div className="post-header">
                <div className="avatar-medium">SC</div>
                <div className="post-header-info">
                  <div className="post-author">Sarah Chen</div>
                  <div className="post-time">3h · 🌎</div>
                </div>
                <div className="post-options">
                  <FaEllipsisH className="options-icon" />
                </div>
              </div>
              <div className="post-content">
                <p className="post-text">
                  Beautiful sunset at the beach today! 🌅 Feeling grateful for moments like these.
                </p>
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop"
                  alt="sunset"
                  className="post-image"
                />
              </div>
              <div className="post-stats">
                <div className="reactions">
                  <div className="reaction-icon">👍</div>
                  <div className="reaction-icon reaction-heart">❤️</div>
                  <span className="reaction-count">248</span>
                </div>
                <div className="post-counts">
                  <span>42 comments</span>
                  <span>18 shares</span>
                </div>
              </div>
              <div className="post-divider"></div>
              <div className="post-actions">
                <div className="action-button">
                  <FaThumbsUp className="action-icon" />
                  <span>Like</span>
                </div>
                <div className="action-button">
                  <FaComment className="action-icon" />
                  <span>Comment</span>
                </div>
                <div className="action-button">
                  <FaShare className="action-icon" />
                  <span>Share</span>
                </div>
              </div>
            </div>

            <div className="post">
              <div className="post-header">
                <div className="avatar-medium">MT</div>
                <div className="post-header-info">
                  <div className="post-author">Mike Thompson</div>
                  <div className="post-time">5h · 🌎</div>
                </div>
                <div className="post-options">
                  <FaEllipsisH className="options-icon" />
                </div>
              </div>
              <div className="post-content">
                <p className="post-text">
                  Just finished an amazing hike! The view from the top was absolutely worth it 🏔️
                </p>
                <img
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop"
                  alt="mountain"
                  className="post-image"
                />
              </div>
              <div className="post-stats">
                <div className="reactions">
                  <div className="reaction-icon">👍</div>
                  <div className="reaction-icon reaction-wow">😮</div>
                  <span className="reaction-count">312</span>
                </div>
                <div className="post-counts">
                  <span>67 comments</span>
                  <span>29 shares</span>
                </div>
              </div>
              <div className="post-divider"></div>
              <div className="post-actions">
                <div className="action-button">
                  <FaThumbsUp className="action-icon" />
                  <span>Like</span>
                </div>
                <div className="action-button">
                  <FaComment className="action-icon" />
                  <span>Comment</span>
                </div>
                <div className="action-button">
                  <FaShare className="action-icon" />
                  <span>Share</span>
                </div>
              </div>
            </div>

            <div className="post">
              <div className="post-header">
                <div className="avatar-medium">AL</div>
                <div className="post-header-info">
                  <div className="post-author">Alex Rodriguez</div>
                  <div className="post-time">8h · 🌎</div>
                </div>
                <div className="post-options">
                  <FaEllipsisH className="options-icon" />
                </div>
              </div>
              <div className="post-content">
                <p className="post-text">
                  Coffee and code - the perfect combination for a productive Sunday morning ☕💻
                </p>
              </div>
              <div className="post-stats">
                <div className="reactions">
                  <div className="reaction-icon">👍</div>
                  <div className="reaction-icon reaction-heart">❤️</div>
                  <span className="reaction-count">156</span>
                </div>
                <div className="post-counts">
                  <span>23 comments</span>
                  <span>8 shares</span>
                </div>
              </div>
              <div className="post-divider"></div>
              <div className="post-actions">
                <div className="action-button">
                  <FaThumbsUp className="action-icon" />
                  <span>Like</span>
                </div>
                <div className="action-button">
                  <FaComment className="action-icon" />
                  <span>Comment</span>
                </div>
                <div className="action-button">
                  <FaShare className="action-icon" />
                  <span>Share</span>
                </div>
              </div>
            </div>
          </main>

          <aside className="right-sidebar">
            <div className="sidebar-section">
              <div className="section-header">Sponsored</div>
              <div className="sponsored-item">
                <img src="/App/vercel.png" className="sponsored-image" alt="ad" />
                <div>
                  <div className="sponsored-title">Carl Lester illut Portfolio</div>
                  <div className="sponsored-link">portfolio-carllester.vercel.app</div>
                </div>
              </div>
            </div>

            <div className="sidebar-divider"></div>

            <div className="sidebar-section">
              <div className="section-header">Contacts</div>
              <div className="contact-item">
                <div className="avatar-small-wrapper">
                  <div className="avatar-small">EM</div>
                  <div className="online-dot"></div>
                </div>
                <span className="contact-name">Emma Martinez</span>
              </div>
              <div className="contact-item">
                <div className="avatar-small-wrapper">
                  <div className="avatar-small">DB</div>
                  <div className="online-dot"></div>
                </div>
                <span className="contact-name">David Brown</span>
              </div>
              <div className="contact-item">
                <div className="avatar-small">LC</div>
                <span className="contact-name">Lisa Chen</span>
              </div>
              <div className="contact-item">
                <div className="avatar-small-wrapper">
                  <div className="avatar-small">RJ</div>
                  <div className="online-dot"></div>
                </div>
                <span className="contact-name">Robert Johnson</span>
              </div>
              <div className="contact-item">
                <div className="avatar-small">SK</div>
                <span className="contact-name">Sophie Kim</span>
              </div>
              <div className="contact-item">
                <div className="avatar-small-wrapper">
                  <div className="avatar-small">TW</div>
                  <div className="online-dot"></div>
                </div>
                <span className="contact-name">Tom Williams</span>
              </div>
              <div className="contact-item">
                <div className="avatar-small">NP</div>
                <span className="contact-name">Nina Patel</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<FacebookPage />} />
      <Route path="/microsoft" element={<Microsoft />} />
    </Routes>
  );
}

export default App;
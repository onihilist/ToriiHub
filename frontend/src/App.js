import logo from './assets/small-toriihub.png';
import defaultProfilePic from './assets/default-user.jpg';
import './styles/App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Feed from './pages/Feed';
import { FeedPage } from './features/feed';
import { ProfilePage } from './features/profile';
import { MOCK_USER_ID } from './constants/mockUser';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <nav className="toriihub-navbar">

          <Link to="/">
            <img src={logo} className="toriihub-navbar-logo" alt="logo"/>
          </Link>

          <div className="toriihub-navbar-links">
            <Link to="/" className="toriihub-navbar-link">Home</Link>
            <Link to="/about" className="toriihub-navbar-link">About</Link>
            <Link to={`/profile/${MOCK_USER_ID}`} className="toriihub-navbar-link">Profile</Link>
          </div>

          <div className="toriihub-navbar-login-section">
            <button className="toriihub-navbar-login-button">Login</button>
            <Link to={`/profile/${MOCK_USER_ID}`}>
              <img src={defaultProfilePic} className="toriihub-navbar-profile-pic" alt="profile"/>
            </Link>
          </div>

        </nav>
        <br />
        <Routes>
          <Route path="/" element={<FeedPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="*" element={<h1>404 - Page not found</h1>} />
        </Routes>
      </header>
    </div>
  );
}

export default App;

import logo from './assets/small-toriihub.png';
import defaultProfilePic from './assets/default-user.jpg';
import './styles/App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Feed from './pages/Feed';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <nav className="toriihub-navbar">

          <img src={logo} className="toriihub-navbar-logo" alt="logo"/>

          <div className="toriihub-navbar-links">
            <a href="#" className="toriihub-navbar-link">Home</a>
            <a href="#" className="toriihub-navbar-link">About</a>
            <a href="#" className="toriihub-navbar-link">Contact</a>
          </div>

          <div className="toriihub-navbar-login-section">
            <button className="toriihub-navbar-login-button">Login</button>
            <img src={defaultProfilePic} className="toriihub-navbar-profile-pic" alt="profile"/>
          </div>

        </nav>
        <Routes>
          <Route path="/about" element={<Feed />} />
          <Route path="*" element={<h1>404 - Page not found</h1>} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
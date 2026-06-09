import logo from '../assets/small-toriihub.png';
import defaultProfilePic from '../assets/default-user.jpg';
import '../styles/App.css';
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="toriihub-feed-page">
        <div className="toriihub-feed-post">
            <p className="toriihub-feed-post-username">Username</p>
            <p className="toriihub-feed-post-content">This is a sample post content. It can be as long as you want, and it will wrap properly within the post container.</p>
        </div>
    </div>
  );
}

export default App;
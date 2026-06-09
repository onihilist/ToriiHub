import logo from '../assets/small-toriihub.png';
import defaultProfilePic from '../assets/default-user.jpg';
import '../styles/App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Posts from '../components/Posts';

function App() {
  return (
    <div className="toriihub-feed-page">
        <div className="toriihub-feed-post">
            <Posts />
        </div>
    </div>
  );
}

export default App;
import '../styles/App.css';
import Posts from '../components/Posts';

function Feed() {
  return (
    <div className="toriihub-feed-page">
        <div className="toriihub-feed-post">
            <Posts />
        </div>
    </div>
  );
}

export default Feed;

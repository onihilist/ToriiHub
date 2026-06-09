import React, { useState, useEffect } from "react";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/posts");
        // After I should use that for authenticated requests:
        //const response = await fetch("http://localhost:8080/api/posts", {
        //    headers: {
        //        "Authorization": `Bearer ${token}`,
        //        "Content-Type": "application/json",
        //   },
        //});
        if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} style={styles.card}>
          <div style={styles.header}>
            <strong>{post.authorName}</strong>
            <span style={styles.date}>
              {new Date(post.createdAt).toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          <p style={styles.content}>{post.content}</p>

          {post.attachments.length > 0 && (
            <div>
              {post.attachments.map((att, i) => (
                <span key={i}>{att}</span>
              ))}
            </div>
          )}

          <div style={styles.footer}>
            <span>❤️ {post.likes}</span>
            <span>🔁 {post.reposts}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "12px",
    fontFamily: "sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
  },
  date: {
    color: "#888",
    fontSize: "0.85em",
  },
  content: {
    margin: "8px 0",
  },
  footer: {
    display: "flex",
    gap: "16px",
    color: "#555",
    fontSize: "0.9em",
  },
};
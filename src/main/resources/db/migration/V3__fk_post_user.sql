ALTER TABLE posts
    RENAME COLUMN author TO author_name;

ALTER TABLE posts
    ADD COLUMN user_id UUID,
    ADD CONSTRAINT fk_posts_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE;
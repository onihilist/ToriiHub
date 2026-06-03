CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author VARCHAR(100) NOT NULL,
    content VARCHAR(650) NOT NULL,
    attachments TEXT[],
    likes INT CHECK (likes >= 0),
    reposts INT CHECK (reposts >= 0),
    comments VARCHAR(300)[],
    created_at TIMESTAMP DEFAULT NOW()
);
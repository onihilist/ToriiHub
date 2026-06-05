CREATE TABLE users (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email       VARCHAR(255) NOT NULL UNIQUE,
    username    VARCHAR(100) NOT NULL,
    password    VARCHAR(255) NOT NULL,
    role        VARCHAR(50)  NOT NULL DEFAULT 'MEMBER',
    created_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE posts (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID NOT NULL,
    author_name VARCHAR(100),
    content     VARCHAR(650) NOT NULL,
    attachments TEXT[],
    likes       INT NOT NULL DEFAULT 0,
    reposts     INT NOT NULL DEFAULT 0,
    created_at  TIMESTAMP DEFAULT NOW(),

    CONSTRAINT fk_posts_user
        FOREIGN KEY (user_id)
            REFERENCES users(id)
            ON DELETE CASCADE
);

CREATE TABLE comments (
        id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        post_id     UUID NOT NULL,
        user_id     UUID NOT NULL,
        attachments TEXT[],
        likes       INT NOT NULL DEFAULT 0,
        reposts     INT NOT NULL DEFAULT 0,
        content     VARCHAR(300) NOT NULL,
        created_at  TIMESTAMP DEFAULT NOW(),

        CONSTRAINT fk_comments_post
            FOREIGN KEY (post_id)
                REFERENCES posts(id)
                ON DELETE CASCADE,

        CONSTRAINT fk_comments_user
            FOREIGN KEY (user_id)
                REFERENCES users(id)
                ON DELETE CASCADE
);

CREATE TABLE likes (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id     UUID NOT NULL,
    user_id     UUID NOT NULL,
    created_at  TIMESTAMP DEFAULT NOW(),

    CONSTRAINT fk_likes_post
        FOREIGN KEY (post_id)
            REFERENCES posts(id)
            ON DELETE CASCADE,

    CONSTRAINT fk_likes_user
        FOREIGN KEY (user_id)
            REFERENCES users(id)
            ON DELETE CASCADE,

    CONSTRAINT uq_likes_post_user
        UNIQUE (post_id, user_id)
);

CREATE TABLE reposts (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id     UUID NOT NULL,
    user_id     UUID NOT NULL,
    created_at  TIMESTAMP DEFAULT NOW(),

    CONSTRAINT fk_reposts_post
        FOREIGN KEY (post_id)
            REFERENCES posts(id)
            ON DELETE CASCADE,

    CONSTRAINT fk_reposts_user
        FOREIGN KEY (user_id)
            REFERENCES users(id)
            ON DELETE CASCADE,

    CONSTRAINT uq_reposts_post_user
        UNIQUE (post_id, user_id)
);

CREATE TABLE followers (
    follower_id UUID NOT NULL,
    following_id UUID NOT NULL,
    created_at  TIMESTAMP DEFAULT NOW(),

    CONSTRAINT pk_followers
        PRIMARY KEY (follower_id, following_id),

    CONSTRAINT fk_follower
        FOREIGN KEY (follower_id)
            REFERENCES users(id)
            ON DELETE CASCADE,

    CONSTRAINT fk_following
        FOREIGN KEY (following_id)
            REFERENCES users(id)
            ON DELETE CASCADE,

    CONSTRAINT chk_no_self_follow
        CHECK (follower_id != following_id)
    );

CREATE TABLE tandem_sessions (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    host_id         UUID NOT NULL,
    guest_id        UUID,
    native_language VARCHAR(10) NOT NULL,
    target_language VARCHAR(10) NOT NULL,
    status          VARCHAR(50) NOT NULL DEFAULT 'OPEN',
    scheduled_at    TIMESTAMP,
    created_at      TIMESTAMP DEFAULT NOW(),

    CONSTRAINT fk_tandem_host
        FOREIGN KEY (host_id)
            REFERENCES users(id)
            ON DELETE CASCADE,

    CONSTRAINT fk_tandem_guest
        FOREIGN KEY (guest_id)
            REFERENCES users(id)
            ON DELETE SET NULL
);

CREATE TABLE cultural_events (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organizer_id UUID NOT NULL,
    title       VARCHAR(255) NOT NULL,
    description TEXT,
    country     VARCHAR(100),
    price       NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    capacity    INT,
    scheduled_at TIMESTAMP,
    created_at  TIMESTAMP DEFAULT NOW(),

    CONSTRAINT fk_event_organizer
        FOREIGN KEY (organizer_id)
            REFERENCES users(id)
            ON DELETE CASCADE
);

CREATE TABLE event_registrations (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id    UUID NOT NULL,
    user_id     UUID NOT NULL,
    paid        BOOLEAN NOT NULL DEFAULT FALSE,
    created_at  TIMESTAMP DEFAULT NOW(),

    CONSTRAINT fk_registration_event
        FOREIGN KEY (event_id)
            REFERENCES cultural_events(id)
            ON DELETE CASCADE,

    CONSTRAINT fk_registration_user
        FOREIGN KEY (user_id)
            REFERENCES users(id)
            ON DELETE CASCADE,

    CONSTRAINT uq_registration
        UNIQUE (event_id, user_id)
);

CREATE TABLE payments (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL,
    stripe_id       VARCHAR(255) NOT NULL UNIQUE,
    amount          NUMERIC(10, 2) NOT NULL,
    currency        VARCHAR(10) NOT NULL DEFAULT 'EUR',
    status          VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    event_id        UUID,
    created_at      TIMESTAMP DEFAULT NOW(),

    CONSTRAINT fk_payment_user
        FOREIGN KEY (user_id)
            REFERENCES users(id)
            ON DELETE CASCADE,

    CONSTRAINT fk_payment_event
        FOREIGN KEY (event_id)
            REFERENCES cultural_events(id)
            ON DELETE SET NULL
);
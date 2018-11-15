CREATE TABLE Users (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR,
    email       VARCHAR,
    password    VARCHAR
);

CREATE TABLE Posts (
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER REFERENCES Users(id),
    title       VARCHAR,
    content     VARCHAR
);
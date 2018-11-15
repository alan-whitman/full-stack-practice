INSERT INTO Posts
    (user_id, title, content)
VALUES
    (${user_id}, ${title}, ${content});
SELECT * FROM Posts;
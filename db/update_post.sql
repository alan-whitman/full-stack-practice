UPDATE Posts
SET title = ${title}, content = ${content}
WHERE id = ${id};
SELECT * FROM Posts;
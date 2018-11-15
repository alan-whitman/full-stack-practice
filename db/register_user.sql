INSERT INTO Users
    (name, email, password)
VALUES
    (${name}, ${email}, ${password})
RETURNING *;
const app = require('express')();
const massive = require('massive');
const session = require('express-session');
const bodyParser = require('body-parser');
const ac = require('./controllers/auth_controller');
const pc = require('./controllers/posts_controller');
require('dotenv').config();

const { CONNECTION_STRING: cs, SERVER_PORT: port, SESSION_SECRET: ss} = process.env;

app.use(bodyParser.json());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: ss
}));

massive(cs).then(db => {
    app.set('db', db);
    console.log('db connected');
});

app.get('/hi', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/auth/login', ac.login);
app.post('/auth/register', ac.register);
app.get('/auth/logout', ac.logout);
app.get('/auth/currentUSer', ac.getCurrentUser)

app.get('/api/posts', pc.getPosts);
app.post('/api/posts', pc.createPost);
app.put('/api/posts', pc.updatePost);
app.delete('/api/posts/:id', pc.deletePost);


app.listen(port, () => console.log(port));
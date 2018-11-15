const bcrypt = require('bcryptjs');

module.exports = {
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const db = req.app.get('db');
            let user = await db.get_user_by_email(email);
            if (!user[0])
                return res.status(401).send('Email not found.');
            if (!bcrypt.compareSync(password, user[0].password))
                return res.status(403).send('Incorrect password.')
            delete user[0].password;
            req.session.user = user[0];
            return res.status(200).send(req.session.user);
        } catch(err) {
            console.error('login error: ' + err);
            return res.status(500).send('login error: ' + err);
        }
    },
    async register(req, res) {
        try {
            const { email, name, password: newPassword } = req.body;
            const db = req.app.get('db');
            let user = await db.get_user_by_email(email);
            if (user[0])
                return res.status(409).send('Email is already registered.');
            const salt = bcrypt.genSaltSync(10);
            const password = bcrypt.hashSync(newPassword, salt);
            let newUser = await db.register_user({email, name, password});
            delete newUser[0].password;
            req.session.user = newUser[0];
            res.status(200).send(req.session.user);

        } catch(err) {
            console.error('registration error: ' + err);
            return res.status(500).send('registration error: ' + err)
        }
    },
    getCurrentUser(req, res) {
        res.status(200).send(req.session.user);
    },
    logout(req, res) {
        req.session.destroy();
        res.status(200).send('Successfully logged out.');
    }
}
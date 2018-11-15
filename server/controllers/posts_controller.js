module.exports = {
    async getPosts(req, res) {
        try {
            const db = req.app.get('db');
            let posts = await db.get_posts();
            res.status(200).send(posts);
        } catch(err) {
            console.error('Error creating post: ' + err)
            res.status(500).send('Error getting posts: ' + err);
        }
    },
    async createPost(req, res) {
        try {
            const { title, content } = req.body;
            let { id: user_id } = req.session.user ? req.session.user : { id: 1 };
            const db = req.app.get('db');
            let posts = await db.create_post({user_id, title, content});
            res.status(200).send(posts);
        } catch(err) {
            console.error('Error creating post: ' + err)
            res.status(500).send('Error creating post' + err);
        }
    },
    async updatePost(req, res) {
        try {
            const { title, content, id } = req.body;
            const db = req.app.get('db');
            let posts = await db.update_post({title, content, id});
            res.status(200).send(posts);
        } catch(err) {
            console.error('Error updating post: ' + err)
            res.status(500).send('Error updating posts: ' + err);
        }
    },
    async deletePost(req, res) {
        try {
            const { id } = req.params;
            const db = req.app.get('db');
            let posts = await db.delete_post(id);
            res.status(200).send(posts);
        } catch(err) {
            console.error('Error deleting post: ' + err)
            res.status(500).send('Error deleting posts: ' + err);
        }
    }
}
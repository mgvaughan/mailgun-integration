import * as express from 'express';
import db from '../db';

// Current route begins with /api/users
const usersRouter = express.Router();

usersRouter.get('/', async (req, res) => {
    try {
        const users = await db.Users.allUsers();

        const usersWithoutPasswords = users.map(usr => ({
            id: usr.id,
            email: usr.email,
            name: usr.name,
            _created: usr._created
        }))

        res.json(usersWithoutPasswords);
    } catch(e) {
        console.log(e);
        res.send(500).json({ message: "Could not get all users, please check server logs" });
    }
});

usersRouter.get('/:id', async (req, res) => {
    let id = Number(req.params.id);
    try {
        const [user] = await db.Users.oneUser(id)
        res.json(user);
    } catch(e) {
        console.log(e);
        res.send(500).json({ message: "Could not get user, please check server logs" });
    }
});

usersRouter.put('/:id', async (req, res) => {
    let id = Number(Number(req.params.id))

    const { name, email, password } = req.body;

    if (!name || !email || !password) { 
        res.status(400).json({ message: "Please ensure you send an update with the name, email, and passwords updated" });
        return;
    }

    const updateUser = { name, email, password }

    try {
        await db.Users.updateUser(updateUser, id);
        res.status(201).json({ message: "Successfully updated user!" });
    } catch(e) {
        console.log(e);
        res.send(500).json({ message: "Could not update user, please check server logs" });
    }
});

usersRouter.post('/', async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) { 
        res.status(400).json({ message: "Please ensure you send an update with the name, email, and passwords updated" });
        return;
    }

    const newUser = { name, email, password }

    try {
        const results = await db.Users.createUser(newUser);
        res.status(201).json({ message: "Successfully created user!", id: results.insertId });
    } catch(e) {
        console.log(e);
        res.send(500).json({ message: "Could not create user, please check server logs" });
    }
});

usersRouter.delete('/:id', async (req, res) => {
    let id = Number(req.params.id)
    try {
        await db.Users.deleteUser(id)
        res.status(200).json({ message: "Successfully deleted user!" });
    } catch(e) {
        console.log(e);
        res.send(500).json({ message: "Could not delete user, please check server logs" });
    }
});

export default usersRouter;
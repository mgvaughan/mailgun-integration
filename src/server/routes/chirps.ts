import * as express from 'express';
import db from '../db';

// Current route begins with /api/chirps
const chirpsRouter = express.Router();

chirpsRouter.get('/', async (req, res) => {
    try {
        const chirps = await db.Chirps.allChirps()
        res.json(chirps);
    } catch(e) {
        console.log(e);
        res.status(500).json({ message: "Could not get chirps, please check server logs" });
    }
});

chirpsRouter.get('/:id', async (req, res) => {
    let id = Number(req.params.id)
    try {
        const [chirp] = await db.Chirps.oneChirp(id);
        res.json(chirp);
    } catch(e) {
        console.log(e);
        res.status(500).json({ message: "Could not get one chirp, please check server logs" });
    }
});

chirpsRouter.put('/:id', async (req, res) => {
    let id = Number(req.params.id)

    const { content, location } = req.body;

    if (!content || !location) { 
        res.status(400).json({ message: "Please ensure you send an update with both content and location" });
        return;
    }
    try {
        const updateableChirp = { content, location };
        await db.Chirps.updateChirp(updateableChirp, id);
        res.status(201).json({ message: "Successfully updated chirp!" });
    } catch(e) {
        console.log(e);
        res.status(500).json({ message: "Could not update chirp, please check server logs"});
    }
});

chirpsRouter.post('/', async (req, res) => {

    const { content, location } = req.body;

    if (!content || !location) { 
        res.status(400).json({ message: "Please ensure you create a chirp with both content and location" });
        return;
    }    
    try {
        const newChirp = { content, location, userid: 1 };
        const results = await db.Chirps.createChirp(newChirp)
        res.status(201).json({ message: "Chirp was created successfully", id: results.insertId });
    } catch(e) {
        console.log(e);
        res.status(500).json({ message: "Could not create chirp, please check server logs"});
    }
});

chirpsRouter.delete('/:id', async (req, res) => {
    let id = Number(req.params.id)
    try {
        await db.Chirps.deleteChirp(id)
        res.status(200).json({ message: "Successfully deleted chirp!" });
    } catch(e) {
        console.log(e);
        res.status(500).json({ message: "Could not delete chirp, please check server logs"});
    }
});


export default chirpsRouter;
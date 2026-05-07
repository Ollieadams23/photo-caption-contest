const express = require('express');// routes/images.js
const router = express.Router();// Import the 'express' module and create a new router instance. This allows us to define routes for handling HTTP requests related to images.
const db = require('../models');// Import the database models from the 'models' directory. This allows us to interact with the database using Sequelize.



router.get('/:id', async (req, res) => {
    const captions = await db.Caption.findAll({
        where: { imageId: req.params.id }
    });
    if (!captions || captions.length === 0) {
        console.log('No captions found for image ID:', req.params.id);
        return res.status(404).json({ error: 'No captions found for that image ID' });
    }
    res.status(200).json(captions);
});

router.post('/:id', async (req, res) => {
    const { text, userId } = req.body;
    if (!text) {
        console.log('No text provided for caption.');
        return res.status(400).json({ error: 'No text provided for caption' });
    }
    const image = await db.Image.findByPk(req.params.id);
    if (!image) {
        console.log('No image found with ID:', req.params.id);
        return res.status(404).json({ error: 'No image found with that ID' });
    }
    const user = await db.User.findByPk(userId);
    if (!user) {
        console.log('No user found with ID:', userId);
        return res.status(404).json({ error: 'No user found with that ID' });
    }
    // Create a new caption
    const caption = await db.Caption.create({
        text,
        userId,
        imageId: req.params.id
    });
    console.log('Created caption:', caption);
    res.status(201).json(caption);
});

module.exports = router;
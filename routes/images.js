const express = require('express');// routes/images.js
const router = express.Router();// Import the 'express' module and create a new router instance. This allows us to define routes for handling HTTP requests related to images.
const db = require('../models');// Import the database models from the 'models' directory. This allows us to interact with the database using Sequelize.

router.get('/', async (req, res) => {
    const images = await db.Image.findAll();
    console.log('Fetched images:', images);
    if (!images || images.length === 0) {
        console.log('No images found in the database.');
        return res.status(404).json({ error: 'No images found' });
    }
    res.json(images);
});


router.get('/:id', async (req, res) => {
    const image = await db.Image.findByPk(req.params.id);
    if (!image) {
        console.log('No image found with ID:', req.params.id);
        return res.status(404).json({ error: 'No image found with that ID' });
    }
    res.json(image);
});

module.exports = router;

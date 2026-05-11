const express = require('express');// routes/images.js
const router = express.Router();// Import the 'express' module and create a new router instance. This allows us to define routes for handling HTTP requests related to images.
const db = require('../models');// Import the database models from the 'models' directory. This allows us to interact with the database using Sequelize.

/**
 * @swagger
 * /captions/{id}:
 *   get:
 *     summary: Get all captions for an image
 *     tags: [Captions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Image ID
 *     responses:
 *       200:
 *         description: List of captions for the image
 *       404:
 *         description: No captions found for that image ID
 *       500:
 *         description: Internal server error
 */
router.get('/:id', async (req, res) => {
    try {
        const captions = await db.Caption.findAll({
            where: { imageId: req.params.id },
            include: [{
                model: db.User,
                as: 'user',
                attributes: ['username']
            }]
        });
        if (!captions || captions.length === 0) {
            console.log('No captions found for image ID:', req.params.id);
            return res.status(404).json({ error: 'No captions found for that image ID' });
        }
        res.status(200).json(captions);
    } catch (err) {
        console.error('Error fetching captions:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * @swagger
 * /captions/{id}:
 *   post:
 *     summary: Post a caption for an image
 *     tags: [Captions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Image ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *             properties:
 *               text:
 *                 type: string
 *                 example: This is a caption
 *     responses:
 *       201:
 *         description: Caption created
 *       400:
 *         description: No text provided for caption
 *       404:
 *         description: No image or user found with that ID
 */
router.post('/:id', async (req, res) => {
    const {userId} = req.session;
    const { text} = req.body;
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
    res.status(201).sendFile(require('path').join(__dirname, '../private/profile.html'));
});

module.exports = router;
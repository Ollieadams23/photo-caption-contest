const express = require('express');// routes/images.js
const router = express.Router();// Import the 'express' module and create a new router instance. This allows us to define routes for handling HTTP requests related to images.
const db = require('../models');// Import the database models from the 'models' directory. This allows us to interact with the database using Sequelize.

//redis
const redis = require('redis');
const redisClient = redis.createClient();
redisClient.connect()
  .then(() => console.log('Connected to Redis!'))
  .catch((err) => console.error('Redis connection error:', err));



router.get('/', async (req, res) => {
    try {
        // Try to get cached images from redis
        const cachedImages = await redisClient.get('images');
        if (cachedImages) {
            console.log(JSON.parse(cachedImages));
            console.log('Found cached images in Redis');
            return res.status(200).json(JSON.parse(cachedImages));
        }

        // If not cached, fetch from database
        const images = await db.Image.findAll();
        // Map to array of objects with id and image data
        const imagesWithIds = images.map(img => ({ id: img.id, ...img.toJSON() }));
        // Cache the result for 300 seconds (5 minutes)
        await redisClient.set('images', JSON.stringify(imagesWithIds), { EX: 300 });
        res.json(imagesWithIds);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Failed to fetch images' });
    }
});



router.get('/:id', async (req, res) => {
    const imageId = req.params.id;
    try {
        // Try to get the image from Redis cache
        const cachedImage = await redisClient.get(`image:${imageId}`);
        if (cachedImage) {
            console.log(`Found cached image ${imageId} in Redis`);
            return res.json(JSON.parse(cachedImage));
        }
        // If not cached, fetch from DB
        const image = await db.Image.findByPk(imageId);
        if (!image) {
            console.log('No image found with ID:', imageId);
            return res.status(404).json({ error: 'No image found with that ID' });
        }
        // Cache the result for 300 seconds (5 minutes)
        await redisClient.set(`image:${imageId}`, JSON.stringify(image), { EX: 300 });
        res.json(image);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Failed to fetch image' });
    }
});

module.exports = router;

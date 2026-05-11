
const express = require('express');// routes/images.js
const path = require('path');
const router = express.Router();// Import the 'express' module and create a new router instance. This allows us to define routes for handling HTTP requests related to images.
const db = require('../models');// Import the database models from the 'models' directory. This allows us to interact with the database using Sequelize.
const multer = require('multer');
const uploadDir = path.join(__dirname, '../public/images');
const fs = require('fs');

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


// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Use original name with timestamp to avoid collisions
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    cb(null, base + '-' + Date.now() + ext);
  }
});
const upload = multer({ storage });

// Route to add an image (URL or file upload)
router.post('/', upload.single('file'), async (req, res) => {
    let url = req.body.url;
    // If a file was uploaded, set the URL to the local path
    if (req.file) {
        url = '/images/' + req.file.filename;
    }
    if (!url) {
        console.log('No URL or file provided for image.');
        return res.status(400).json({ error: 'No URL or file provided for image' });
    }
    try {
        const image = await db.Image.create({ url });
        res.status(201).json(image);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Failed to add image' });
    }
});


// New route to delete an image by ID


router.delete('/:id', async (req, res) => {
    const imageId = req.params.id;
    try {
        const image = await db.Image.findByPk(imageId);
        if (!image) {
            console.log('No image found with ID:', imageId);
            return res.status(404).json({ error: 'No image found with that ID' });
        }

        // Attempt to delete the file if it's a local file in public/images
        let fileDeleteError = null;
        if (image.url && image.url.startsWith('/images/')) {
            const filePath = path.join(__dirname, '../public', image.url);
            try {
                await fs.promises.unlink(filePath);
                console.log('Deleted image file:', filePath);
            } catch (err) {
                fileDeleteError = err;
                console.log('Failed to delete image file:', filePath, err);
            }
        }

        await image.destroy();
        if (fileDeleteError) {
            return res.status(200).json({ message: 'Image deleted from database, but file was missing or could not be deleted.' });
        } else {
            return res.status(204).json({ message: 'Image deleted successfully' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Failed to delete image' });
    }
});


module.exports = router;

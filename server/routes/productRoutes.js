const express = require('express');
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const { exec } = require('child_process');
const os = require('os');
const Product = require('../models/Product');

const router = express.Router();

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, 'product-' + Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
    }
})

const upload = multer({
    storage: storage,
    limits: {fileSize: 1000000},
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|webp|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Image only!');
        }
    }
});

router.post('/products/add', upload.single('image'), async (req, res) => {
    const {name, price, description } = req.body;

    if (!req.file) {
        return res.status(400).json({ message: 'No image uploaded' });
    }

    const uploadedFilePath = req.file.path;
    const fileExtension = path.extname(req.file.originalname).toLowerCase();
    const isWebP = fileExtension === '.webp';

    let compressedImagePath;

    try {

        if (!isWebP) {

            compressedImagePath = `uploads/product-${Date.now()}-${Math.round(Math.random() * 1E9)}.webp`;

            await sharp(req.file.path)
            .resize(500)
            .webp({ quality: 80})
            .toFile(compressedImagePath);
    
            const deleteCommand = os.platform() === 'win32' ? `del "${uploadedFilePath}"` : `rm "${uploadedFilePath}"`;
    
            exec(deleteCommand, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error deleting file: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.error(`Shell stderr: ${stderr}`);
                    return;
                }
                console.log(`File deleted successfully: ${stdout}`);
            });
            
        } else {
            compressedImagePath = uploadedFilePath;
        }

        const newProduct = new Product({ name, price, description, image: compressedImagePath });
        await newProduct.save();

        res.status(201).json({ message: 'Product succesfully added!'});
    } catch (error) {
        res.status(500).json({ message: 'Error adding product', error})
    }
})

router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json(error.message);
    }
})

module.exports = router;
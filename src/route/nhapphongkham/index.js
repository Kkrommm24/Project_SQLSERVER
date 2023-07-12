const express = require('express');
const router = express.Router();
const db = require('../../models/index');
const slugify = require('slugify');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Thêm phần mở rộng tệp
  }
});

const upload = multer({ storage: storage });

router.get('/', (req, res) => {
  res.render('nhapphongkham', { successMessage: null, errorMessage: null });
});

router.post('/', upload.single('image'),(req, res) => {
  const { name, address, description } = req.body;
  const slug = slugify(name, { lower: true, strict: true });
  const imagePath = '/uploads/' + req.file.filename;

  db.Clinic.create({
    name: name,
    address: address,
    description: description,
    slug: slug,
    image: imagePath, // Thêm dòng này
  })
  
  .then(() => {
    res.redirect('/clinic/' + slug);
  })
  .catch((error) => {
    console.log(error);
    res.render('nhapphongkham.ejs', { successMessage: null, errorMessage: 'Đã xảy ra lỗi. Vui lòng thử lại sau.' });
  });
});

router.get('/suaphongkham', (req, res) => {
  // TODO: Render a form for the user to enter new clinic information
});
router.put('/suaphongkham', upload.single('image'), (req, res) => {
  // TODO: Call the putClinic function from the controller
});

module.exports = router;

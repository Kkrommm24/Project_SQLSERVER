const express = require('express');
const router = express.Router();
const db = require('../../models/index');

// GET route for /clinic
router.get('/', (req, res) => {
  db.Clinic.findAll()
    .then((clinics) => {
      res.render('clinic', { clinics: clinics });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('An error occurred.');
    });
});

// GET route for /clinic/:slug
router.get('/:slug', (req, res) => {
  const slug = req.params.slug;
  db.Clinic.findOne({ where: { slug: slug } })
    .then((clinic) => {
      if (clinic) {
        res.render('clinic-detail', { clinic: clinic });
      } else {
        res.status(404).send('Clinic not found.');
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('An error occurred.');
    });
});
// GET route for /clinic/edit/:slug
router.get('/edit/:slug', async (req, res) => {
  const slug = req.params.slug;
  const clinic = await db.Clinic.findOne({ where: { slug: slug } });
  if (clinic) {
    // Render a new view for editing the clinic
    res.render('clinic-edit', { clinic: clinic });
  } else {
    res.status(404).send('Clinic not found.');
  }
});
// POST route for /clinic/edit/:slug
router.post('/edit/:slug', async (req, res) => {
  const slug = req.params.slug;
  const { name, address, description } = req.body;
  const clinic = await db.Clinic.findOne({ where: { slug: slug } });
  if (clinic) {
    // Update the clinic with the new content
    clinic.name = name;
    clinic.address = address;
    clinic.description = description;
    clinic.introduction = req.body.introduction;
    clinic.specialty = req.body.specialty;
    clinic.doctors = req.body.doctors;
    clinic.booking = req.body.booking;
    clinic.location = req.body.location;
    await clinic.save();
    res.redirect('/clinic/' + slug);
  } else {
    res.status(404).send('Clinic not found.');
  }
});


module.exports = router;

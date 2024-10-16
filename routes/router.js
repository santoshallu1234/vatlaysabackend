var express = require('express');
const { register, login, getUserProfile,getAllUsers } = require('../controllers/authController');
const {bookAppointment,editAppointment,getUserAppointments,getTherapistAppointments  } = require('../controllers/appointmentController');
const { insertTherapist, getTherapists, getTherapistById } = require('../controllers/therapistController');
const { userInfo } = require('os');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', register);
router.post('/login', login);
router.post('/thereapp',insertTherapist);
router.get('/gettherapist',getTherapists);
router.post('/appoint',bookAppointment);
router.put('/editapp',editAppointment);
router.get('/userappoint',getUserAppointments );
router.post('/profiledata',getUserProfile);
router.get('/users',getAllUsers );
router.get('/therapistappoint',getTherapistAppointments);
router.get('/gettherapistById',getTherapistById);

module.exports = router;

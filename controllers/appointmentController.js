// controllers/appointmentController.js
const Appointment = require('../models/appointmentModel');

// Book an appointment
exports.bookAppointment = async (req, res) => {
  const { therapistId, date ,userId} = req.body;
  console.log(req);
  console.log(therapistId);
  try {
    const newAppointment = new Appointment({
      user: userId,
     // user:"66ea39a10eeb7e093d9eec2f",
      therapist: therapistId,
      date:date,
      status: 'pending',
    });
    await newAppointment.save();

    res.status(201).json(newAppointment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Edit Appointment API
exports.editAppointment = async (req, res) => {
  // Get the appointment ID from params
  const { date, location, status,appid } = req.body;
  //console.log(appid);
  const  appointmentId  = appid;   // Get new values from the request body
 //  console.log(req.params);
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId, 
      { date, location, status },
      { new: true }  // Returns the updated document
    );
    if (!updatedAppointment) {
      return res.status(404).json({ msg: 'Appointment not found' });
    }

    res.status(200).json(updatedAppointment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get appointments for the logged-in user
exports.getUserAppointments = async (req, res) => {
    const {userId} = req.query;
    //console.log(req);
    //console.log(userId);
  try {
    const appointments = await Appointment.find({ user: userId }).populate('therapist');
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get all appointments for a specific therapist
exports.getTherapistAppointments = async (req, res) => {
  //const { therapistId } = req.params;
  //const {therapistId}= req.body;
  
 const { therapistId } = req.query;
 console.log(req.query);
  try {
    const appointments = await Appointment.find({ therapist: therapistId }).populate('user');
    //console.log(appointments);
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

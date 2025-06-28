import User from '../models/UserSchema.js';
import Doctor from '../models/DoctorSchema.js';
import Booking from '../models/BookingSchema.js';
import Stripe from 'stripe';

export const getCheckoutSession = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.doctorId);
    const user = await User.findById(req.userId);

    if (!doctor || !user) {
      return res.status(404).json({ success: false, message: 'Doctor or User not found' });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_SITE_URL}/doctors/${doctor.id}`,
      customer_email: user.email,
      client_reference_id: req.params.doctorId,
      line_items: [
        {
          price_data: {
            currency: 'inr',
            unit_amount: doctor.ticketPrice * 100,
            product_data: {
              name: `Appointment with Dr. ${doctor.name}`,
              description: doctor.bio,
              images: [doctor.photo],
            },
          },
          quantity: 1,
        },
      ],
    });

    const booking = new Booking({
      doctor: doctor._id,
      user: user._id,
      ticketPrice: doctor.ticketPrice,
      session: session.id,
    });

    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Session created successfully',
      url: session.url,
    });
  } catch (err) {
    console.error('Stripe error:', err);
    res.status(500).json({
      success: false,
      message: 'Error creating checkout session',
    });
  }
};

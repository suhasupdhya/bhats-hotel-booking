const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS?.replace(/\s+/g, '')
    }
});

const sendBookingRequestEmail = async (bookingData) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'supadhya2005@gmail.com',
            replyTo: bookingData.email,
            subject: `New Booking Request: ${bookingData.bookingId}`,
            html: `
                <h2>New Booking Request Received</h2>
                <p><strong>Status:</strong> ${bookingData.status}</p>
                <hr>
                <h3>Guest Details</h3>
                <p><strong>Name:</strong> ${bookingData.firstName} ${bookingData.lastName}</p>
                <p><strong>Email:</strong> ${bookingData.email}</p>
                <p><strong>Phone:</strong> ${bookingData.phone}</p>
                
                <h3>Booking Details</h3>
                <p><strong>Booking ID:</strong> ${bookingData.bookingId}</p>
                <p><strong>Room Type:</strong> ${bookingData.roomType}</p>
                <p><strong>Check-in:</strong> ${new Date(bookingData.checkIn).toLocaleDateString()}</p>
                <p><strong>Check-out:</strong> ${new Date(bookingData.checkOut).toLocaleDateString()}</p>
                <p><strong>Guests:</strong> ${bookingData.guests}</p>
                <p><strong>Nights:</strong> ${bookingData.nights}</p>
                <p><strong>Total Price:</strong> $${bookingData.totalPrice}</p>
                <p><strong>Special Requests:</strong> ${bookingData.specialRequests || 'None'}</p>
                <hr>
                <p><em>Reply to this email to contact the guest directly.</em></p>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};

module.exports = { sendBookingRequestEmail };

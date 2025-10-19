const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event, context) => {
    console.log('Function submit-contact invoked.'); // Added log
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }

    try {
        const data = JSON.parse(event.body);
        const { name, email, subject, service, message } = data;

        const msg = {
            to: process.env.TO_EMAIL, // Your email address where you want to receive messages
            from: process.env.FROM_EMAIL, // Your verified SendGrid sender email
            subject: `Buildr Contact Form: ${subject} (Service: ${service})`,
            html: `
                <strong>Name:</strong> ${name}<br>
                <strong>Email:</strong> ${email}<br>
                <strong>Subject:</strong> ${subject}<br>
                <strong>Service:</strong> ${service}<br>
                <strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}
            `,
        };

        await sgMail.send(msg);

        console.log('Email sent successfully!');

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Message sent successfully!' }),
        };
    } catch (error) {
        console.error('Error sending email:', error.response ? error.response.body : error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to send message. Please try again later.' }),
        };
    }
};
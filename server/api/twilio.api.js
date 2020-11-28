require('dotenv').config();

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const number = process.env.TWILIO_NUMBER;
const twilio = require('twilio')(accountSid, authToken);

module.exports = (usernumber) => {
  twilio.messages.create({
    body: 'Hello and welcome to Barkpoint!',
    from: number,
    to: usernumber,
  });
};

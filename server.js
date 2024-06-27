import env from "dotenv";
import express from "express"
import bodyParser from 'body-parser';
import twilio from 'twilio';

env.config();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

app.post('/whatsapp', (req, res) => {
  const incomingMessage = req.body.Body.toLowerCase();
  const from = req.body.From;

  if (incomingMessage === 'hello') {
    twilioClient.messages.create({
      body: 'Hi there! How can I help you today?',
      from: process.env.TWILIO_PHONE_NUMBER,
      to: from
    })
    .then(message => console.log(`Message sent: ${message.sid}`))
    .catch(err => console.error('Error sending message:', err));
  }

  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

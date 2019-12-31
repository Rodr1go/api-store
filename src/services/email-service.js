'use strict';

require('dotenv/config');
const sendgrid = require('@sendgrid/mail');

sendgrid.setApiKey(process.env.SENDGRID_KEY);

exports.send = async(to, subject, body) => {
  const msg = {
    to: to,
    from: process.env.EMAIL,
    subject: subject,
    html: body
  };
  sendgrid.send(msg);
}
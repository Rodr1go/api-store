'use strict';

const config = require('../config');
const sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey(config.sendgridkey);

exports.send = async(to, subject, body) => {
  const msg = {
    to: to,
    from: 'rodconcurseiro@gmail.com',
    subject: subject,
    html: body
  };
  sendgrid.send(msg);
}
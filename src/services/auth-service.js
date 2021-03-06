'use strict';

const jwt = require('jsonwebtoken');
require('dotenv/config');

exports.generateToken = async(data) => {
  return jwt.sign(data, process.env.SALT_KEY, { expiresIn: '1d'});
}

exports.decodeToken = async(token) => {
  let data = await jwt.verify(token, process.env.SALT_KEY);
  return data;
}

exports.authorize = (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers['x-access-token'];
  if(!token) {
    res.status(401).json({
      message: 'Acesso restrito'
    });
  } else {
    jwt.verify(token, process.env.SALT_KEY, (error, decoded) => {
      if(error) {
        res.status(401).json({
          message: 'Token inválido'
        });
      } else {
        next();
      }
    });
  }
};

exports.isAdmin = (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers['x-access-token'];

  if(!token) {
    res.status(401).json({
      message: 'Token Inválido'
    });
  } else {
    jwt.verify(token, process.env.SALT_KEY, (error, decoded) => {
      if(error) {
        res.status(401).json({
          message: 'Token Inválido'
        });
      } else {
        if(decoded.roles.includes('admin')) {
          next();
        } else {
          res.status(403).json({
            message: 'Esta funcionalidade é restrita para administrador'
          });
        }
      }
    });
  }
};
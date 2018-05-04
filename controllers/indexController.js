const express = require('express');
const User = require('../models/user');
const async = require('async');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


function index(request, response, next) {
  response.send("Examen segundo parcial.");
};

function login(request, response, next) {
  const email = request.body.email;
  const password = request.body.password;
  async.parallel({
    user: (callback) => {
      User.findOne({
        email: email
      }).exec(callback);
    }
  }, (err, results) => {
    const user = results.user;
    if (user) {
      bcrypt.hash(password, user.salt, function (err, hash) {
        if (hash === user.password) {

          const payload = {
            id: user._id
          };
          //hackthismofo
          let token = jwt.sign(payload, 'c970d077669e040107ab37c0bcc5661f', {
            expiresIn: 1440 * 60
          });

          response.json({
            error: false,
            message: 'Usuario y password ok',
            objs: {
              token
            }
          });
        } else {
          response.json({
            error: true,
            message: 'Usuario y password incorrectos',
            objs: {}
          });
        }
      });
    } else {
      response.json({
        error: true,
        message: 'Usuario y password incorrectos',
        objs: {}
      });
    }
  });
};

module.exports = {
  index,
  login
};

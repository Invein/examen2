const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const async = require('async');

function index(request, response, next) {
  const page = request.params.page ? request.params.page : 1;
  User.paginate({}, {
    page: page,
    limit: 3
  }, (err, objs) => {
    if (err) {
      response.json({
        error: true,
        message: 'no se pudo extraer los usuarios',
        objs: {}
      });
    } else {
      response.json({
        error: false,
        message: 'Lista de Usuarios',
        objs: objs
      });
    }
  });
}

function create(request, response, next) {
  const name = request.body.name;
  const lastName = request.body.lastName;
  const email = request.body.email;
  const password = request.body.password;

  let user = new User();
  user.name = name;
  user.lastName = lastName;
  user.email = email;

  const saltRounds = 10;

  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {

      user.password = hash;
      user.salt = salt;

      user.save((err, obj) => {
        if (err) {
          response.json({
            error: true,
            message: 'Usuario no  Guardado',
            objs: {}
          });
        } else {
          obj.password = null;
          obj.salt = null;
          response.json({
            error: false,
            message: 'usuario Guardado',
            objs: obj
          });
        }
      });
    });
  });



}

function update(request, response, next) {
  const name = request.body.name;
  const lastName = request.body.lastName;
  const email = request.body.email;
}

function remove(request, response, next) {
  const id = request.params.id;
  if (id) {
    User.remove({
      _id: id
    }, function(err) {
      if (err) {
        response.json({
          error: true,
          message: 'Usuario no Eliminado.',
          objs: {}
        });
      } else {
        response.json({
          error: false,
          message: 'Usuario Eliminado.',
          objs: {}
        });
      }
    });
  } else {
    response.json({
      error: true,
      message: 'Usuario no Existe',
      objs: {}
    });
  }
}

module.exports = {
  index,
  create,
  update,
  remove
};

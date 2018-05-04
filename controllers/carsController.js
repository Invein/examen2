const express = require('express');
const Car = require('../models/car');

function index(request, response, next) {
  const page = request.params.page ? request.params.page : 1;
  Car.paginate({}, {
    page: page,
    limit: 3
  }, (err, objs) => {
    if (err) {
      response.json({
        error: true,
        message: 'no se pudieorn mostar los carros',
        objs: {}
      });
    } else {
      response.json({
        error: false,
        message: 'Lista de Carros',
        objs: objs
      });
    }
  });
}

function getOne(request, response, next) {
  const id = request.params.id;
  Car.findById();
}

function create(request, response, next) {
  const model = request.body.model;
  const description = request.body.description;
  const status = request.body.status;
  const color = request.body.color;

  let car = new Car();
  car.model = model;
  car.description = description;
  car.status = status;
  car.color = color;

  car.save((err, obj) => {
    if (err) {
      response.json({
        error: true,
        message: 'carro no  Guardado',
        objs: {}
      });
    } else {
      response.json({
        error: false,
        message: 'Carro Guardado',
        objs: obj
      });
    }
  });
}

function update(request, response, next) {
  const id = request.params.id;
  const model = request.body.model;
  const description = request.body.description;
  const status = request.body.status;
  const color = request.body.color;

  const $set = {};
  model && ($set.model = model);
  description && ($set.description = description);
  status && ($set.status = status);
  color && ($set.color = color);

  Car.update({ _id: id }, { $set }, (err, doc) => {
    if (err) {
      response.json({
        error: true,
        message: 'Carro no actualizado',
        objs: {}
      });
    } else {
      response.json({
        error: false,
        message: 'Carro Actualizado',
        objs: doc
      });
    }
  });
}

function remove(request, response, next) {
  const id = request.params.id;
  if (id) {
    Car.remove({
      _id: id
    }, function (err) {
      if (err) {
        response.json({
          error: true,
          message: 'Carro no Eliminado',
          objs: {}
        });
      } else {
        response.json({
          error: false,
          message: 'Carro Eliminado',
          objs: {}
        });
      }
    });
  } else {
    response.json({
      error: true,
      message: 'Carro no Existe',
      objs: {}
    });
  }
}

module.exports = {
  index,
  getOne,
  create,
  update,
  remove
};

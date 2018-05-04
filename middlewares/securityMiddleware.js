const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');


function verifyToken(request, response, next) {
    const token = request.body.token || request.query.token || request.headers['x-access-token']; 
    if (token) {
        jwt.verify(token, 'c970d077669e040107ab37c0bcc5661f', (err, decoded) => {
            if (err) {
                response.json({
                    error: true,
                    message: 'llave incorrecta',
                    objs: {}
                });
            } else {
                next();
            }
        });
    } else {
        response.json({
            error: true,
            message: 'llave incorrecta',
            objs: {}
        });
    }
}

module.exports = {
    verifyToken
}
/*
 * Copyright (C) 2015 TopCoder Inc., All Rights Reserved.
 */
/**
 * Represents main application file.
 *
 * @version 1.0
 * @author TCSASSEMBLER
 */
"use strict";

var express = require('express'),
    winston = require('winston'),
    expressWinston = require('express-winston'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    BearerStrategy = require('passport-http-bearer').Strategy,
    config = require("./config");

var GiftCardController = require('./controllers/GiftCard');

// Configure the logger for `logserver`
winston.loggers.add('logger', {
    console: {
        level: 'debug',
        timestamp: true,
        handleExceptions: true,
        json: true
    }
});

var logger = winston.loggers.get("logger");

// Mock the user for authorization
var users = [{
    id: 1,
    username: 'bob',
    token: '123456789',
    email: 'bob@example.com'
}, {
    id: 2,
    username: 'joe',
    token: 'abcdefghi',
    email: 'joe@example.com'
}];


function findByToken(token, fn) {
    for (var i = 0, len = users.length; i < len; i++) {
        var user = users[i];
        if (user.token === token) {
            return fn(null, user);
        }
    }
    return fn(null, null);
}


passport.use(new BearerStrategy(
    function(token, done) {
        findByToken(token, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }

            return done(null, user);
        });
    }
));


var app = express();

app.use(bodyParser.json());

// express-winston logger makes sense BEFORE the router.
app.use(expressWinston.logger({
    winstonInstance: logger
}));


app.use(passport.initialize());

var authenticateFun = passport.authenticate('bearer', {
    session: false
});

var router = express.Router();
router.post("/giftCards", authenticateFun, GiftCardController.purchaseGiftCards);
router.get("/users/me/giftCards", authenticateFun, GiftCardController.searchGiftCards);
router.get("/users/me/giftCards/:id", GiftCardController.getGiftCard);
router.post("/users/me/giftCards/:id/resell", authenticateFun, GiftCardController.resellGiftCard);
router.post("/users/me/giftCards/:id/prepareForRedeem", authenticateFun, GiftCardController.prepareGiftCardForRedeem);
router.post("/giftCards/redeem", authenticateFun, GiftCardController.redeemGiftCard);


app.use('/', router);

// error handler
app.use(function(err, req, res, next) {
    winston.error(err.stack || JSON.stringify(err));
    res.statusCode = err.status || 500;
    res.json({
        status: res.statusCode,
        developerMessage: err.message,
        errorCode: err.errorCode || res.statusCode
    });
});

// Initial DB for testing
require('./test_files/initialDB.js')(true);

// Start the server
app.listen(config.WEB_SERVER_PORT);
winston.info('Express server listening on port ' + config.WEB_SERVER_PORT);

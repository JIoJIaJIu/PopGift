'use strict';

/**
 * Create Test Data script
 * This script file reads data from data/data.json file and inserts the colletions into mongo database
 */

var config = require('config');

var BusinessSchema = require('./models/Business').BusinessSchema,
  db = require('./datasource').getDb(config.MONGODB_URL),
  Business = db.model('Business', BusinessSchema);

var GiftCardOfferSchema = require('./models/GiftCardOffer').GiftCardOfferSchema,
  GiftCardOffer = db.model('GiftCardOffer', GiftCardOfferSchema);

var async = require('async');
var data = require('./data/data.json');
var logger = require('./logger').getLogger();

var createBusiness = function(entity, callback) {
  Business.create(entity, callback);
};

var createGiftCardOffer = function(entity, callback) {
  GiftCardOffer.create(entity, callback);
};

exports.initData = function(done) {
  async.waterfall([
    function(cb) {
      async.map(data.businesses, createBusiness, cb);
    },
    function(result, cb) {
      logger.info('Businesses created successfully');
      async.map(data.giftCardOffers, createGiftCardOffer, cb);
    }
  ], function(err) {
    logger.info('Gift card offers created successfully');
    if(err) {
      logger.error('Error creating test data ' + err);
      throw err;
    } else {
      logger.info('Test Data created successfully');
      done();
    }
  });
  
};
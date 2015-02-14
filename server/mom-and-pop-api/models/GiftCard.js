'use strict';

var mongoose = require('../datasource').getMongoose(),
  Schema = mongoose.Schema;

var GiftCardSchema = new Schema({
  ownerId: String,
  businessId: String,
  businessType: String,
  businessAddress: String,
  businessTelephone: String,
  businessPicture: String,
  discount: Number,
  quantity: Number,
  status: {type: String, uppercase: true, enum: ['ACTIVE', 'FOR_RESALE', 'INACTIVE']},
  createdOn: {type: Date, required: true},
  createdBy: String,
  modifiedOn: {type: Date, required: true},
  modifiedBy: String,
  giftCardOfferId: String,
  expirationDate: Date
});

/**
 * Module exports
 */
module.exports = {
  GiftCardSchema: GiftCardSchema
};
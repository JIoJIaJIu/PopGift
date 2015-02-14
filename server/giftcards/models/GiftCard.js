/*
 * Copyright (C) 2015 TopCoder Inc., All Rights Reserved.
 */
/**
 * Represents Gift Card.
 *
 * @version 1.0
 * @author TCSASSEMBLER
 */
"use strict";

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    _ = require('underscore');


//Enum with allowed status for GiftCard
var GiftCardStatus = {
    ACTIVE: 'ACTIVE',
    FOR_RESALE: 'FOR_RESALE',
    INACTIVE: 'INACTIVE'
};

// Define  schema
var GiftCardSchema = new Schema({
    ownerId: {
        type: String,
        required: true
    },
    businessId: {
        type: String,
        required: true
    },
    businessName: {
        type: String,
        required: true
    },
    businessType: {
        type: Number,
        required: true,
        ref: 'BusinessType'
    },
    businessAddress: {
        type: String,
        required: true
    },
    businessPicture: {
        type: String,
        required: true
    },
    businessTelephone: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: false,
        enum: _.values(GiftCardStatus)
    },
    createdOn: {
        type: Date,
        required: false,
        default: Date.now()
    },
    createdBy: {
        type: String,
        required: false
    },
    modifedOn: {
        type: Date,
        required: false,
        default: Date.now()
    },
    modifiedBy: {
        type: String,
        required: false
    },
    giftCardOfferId: {
        type: String,
        required: true
    },
    expirationDate: {
        type: Date,
        required: true
    },
    activationDateTime: {
        type: Date,
        required: true
    },
    endDateTime: {
        type: Date,
        required: true
    }
});

// rename _id to id and remove useless fields when calling toJSON()
GiftCardSchema.options.toJSON = {
    transform: function(doc, ret) {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        delete ret.createdOn;
        delete ret.createdBy;
        delete ret.modifedOn;
        delete ret.modifiedBy;
        return ret;
    }
};

GiftCardSchema.plugin(require('mongoose-paginate'));

// Export the Mongoose model
module.exports = GiftCardSchema;


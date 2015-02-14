/*
 * Copyright (C) 2015 TopCoder Inc., All Rights Reserved.
 */
/**
 * Represents Business Type.
 *
 * @version 1.0
 * @author TCSASSEMBLER
 */
"use strict";

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Define schema
var BusinessTypeSchema = new Schema({
    _id: {
        type: Number,
        required: true,
        index: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    }
});

// rename _id to id and remove useless fields when calling toJSON()
BusinessTypeSchema.options.toJSON = {
    transform: function(doc, ret) {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
};

// Export the Mongoose model
module.exports = BusinessTypeSchema;

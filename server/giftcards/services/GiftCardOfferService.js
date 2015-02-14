/*
 * Copyright (C) 2015 TopCoder Inc., All Rights Reserved.
 */
/**
 * This Mock for GiftCardOfferService.
 *
 * @version 1.0
 * @author TCSASSEMBLER
 */
"use strict";

var GiftCardService = require("../services/GiftCardService");


var GiftCardOfferService = {
    /**
     * Mock method.
     * @param giftCard {GiftCard} the gift card offer
     * @param callback {Function<error:String, result:GiftCard>} the callback function
     */
    purchase: function(giftCard, callback){
        GiftCardService.create(giftCard, callback);
    }

};

module.exports = GiftCardOfferService;

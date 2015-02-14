/*
 * Copyright (C) 2015 TopCoder Inc., All Rights Reserved.
 */
/**
 * Represents controller for Gift Card.
 *
 * @version 1.0
 * @author TCSASSEMBLER
 */
"use strict";

var GiftCardService = require("../services/GiftCardService"),
    GiftCardOfferService = require("../services/GiftCardOfferService");

var GiftCardController = {
    purchaseGiftCards: function(req, res) {
        GiftCardOfferService.purchase(req.body, function(err, giftCard) {
            if (err) {
                res.status(500).json({
                    error: err.message
                });
            } else {
                res.status(201).json(giftCard);
            }
        });
    },

    searchGiftCards: function(req, res) {
        GiftCardService.search(req.query, function(err, giftCards) {
            if (err) {
                res.status(500).json({
                    error: err.message
                });
            } else {
                res.status(200).json(giftCards);
            }
        });
    },


    getGiftCard: function(req, res) {
        GiftCardService.get(req.params.id, function(err, giftCard) {
            if (err) {
                res.status(500).json({
                    error: err.message
                });
            } else if (!giftCard) {
                res.status(404).json('GiftCard is not found with id: '+req.params.id);
            } else {
                res.status(200).json(giftCard);
            }
        });
    },

    resellGiftCard: function(req, res) {
        GiftCardService.resell(req.params.id, req.query.quantityToSell, function(err, giftCardOffer, giftCard) {
            if (err) {
                res.status(500).json({
                    error: err.message
                });
            } else {
                res.status(200).json({"giftCard": giftCard, "giftCardOffer": giftCardOffer});
            }
        });
    },

    prepareGiftCardForRedeem: function(req, res) {
        GiftCardService.prepareForRedeem(req.params.id, req.query.amount, function(err, redeem) {
            if (err) {
                res.status(500).json({
                    error: err.message
                });
            } else if (!redeem) {
                res.status(404).json('GiftCard is not found with id: ' + req.params.id);
            } else {
                res.status(200).json(redeem);
            }
        });
    },

    redeemGiftCard: function(req, res) {
        GiftCardService.redeem(req.query.qrCode, function(err, giftCard) {
            if (err) {
                res.status(500).json({
                    error: err.message
                });
            } else {
                res.status(200).json(giftCard);
            }
        });
    },
    update: function(req, res) {
        GiftCardService.update(req.body, function(err, giftCard) {
            if (err) {
                res.status(500).json({
                    error: err.message
                });
            } else {
                res.status(200).json(giftCard);
            }
        });
    },
};


module.exports = GiftCardController;

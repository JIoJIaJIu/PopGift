/*
 * Copyright (C) 2015 TopCoder Inc., All Rights Reserved.
 */
/**
 * This service provides methods to manage gift card.
 *
 * @version 1.0
 * @author TCSASSEMBLER
 */
"use strict";

var config = require('../config'),
    helper = require('../helpers/helper'),
    _ = require('underscore'),
    async = require('async'),

    crypto = require('crypto'),
    QRCode = require('qrcode');

    var GiftCard = require("../models/index").GiftCard;
    var GiftCardRedeem = require("../models/index").GiftCardRedeem;
    var Business = require("../models/index").Business;
    var BusinessType = require("../models/index").BusinessType;


var GiftCardService = {
    /**
     * Create gift card.
     * @param giftCard {GiftCard} the gift card
     * @param callback {Function<error:Error, result:GiftCard>} the callback function
     */
    create: function(giftCard, callback) {
        var error = {};
        if (!helper.validateRequiredParameter(giftCard, "giftCard", error) ||
            !helper.validateRequiredParameter(giftCard.ownerId, "giftCard.ownerId", error) ||
            !helper.validateRequiredParameter(giftCard.businessId, "giftCard.businessId", error) ||
            !helper.validateRequiredParameter(giftCard.businessName, "giftCard.businessName", error) ||
            !helper.validateRequiredIntParameter(giftCard.businessType, "giftCard.businessType", error) ||
            !helper.validateRequiredParameter(giftCard.businessAddress, "giftCard.businessAddress", error) ||
            !helper.validateRequiredParameter(giftCard.businessPicture, "giftCard.businessPicture", error) ||
            !helper.validateRequiredParameter(giftCard.businessTelephone, "giftCard.businessTelephone", error) ||
            !helper.validateRequiredFloatParameter(giftCard.discount, "giftCard.discount", error) ||
            !helper.validateRequiredIntParameter(giftCard.quantity, "giftCard.quantity", error) ||
            !helper.validateRequiredParameter(giftCard.description, "giftCard.description", error) ||
            !helper.validateRequiredStatusParameter(giftCard.status, "giftCard.status", error) ||
            !helper.validateRequiredParameter(giftCard.giftCardOfferId, "giftCard.giftCardOfferId", error) ||
            !helper.validateRequiredParameter(giftCard.expirationDate, "giftCard.expirationDate", error) ||
            !helper.validateRequiredParameter(giftCard.activationDateTime, "giftCard.activationDateTime", error) ||
            !helper.validateRequiredParameter(giftCard.endDateTime, "giftCard.endDateTime", error)) {
            callback(error.Err);
        } else {
            GiftCard.create(giftCard, callback);
        }
    },


    /**
     * Get gift card.
     * @param id {String} the gift card id
     * @param callback {Function<error:Error, result:GiftCard>} the callback function
     */
    get: function(id, callback){
        GiftCard.findOne({ _id : id}).populate("businessType").exec(callback);
    },


    /**
     * Update gift card.
     * @param giftCard {GiftCard} the gift card
     * @param callback {Function<error:Error, result:GiftCard>} the callback function
     */
    update: function(giftCard, callback) {
        var error = {};
        if(!helper.validateRequiredParameter(giftCard, "giftCard", error) ||
            !helper.validateRequiredParameter(giftCard.id, "giftCard.id", error) ){
            callback(error.Err);
        }else{
            GiftCard.findOne({
                _id: giftCard.id
            }, function(err, existing) {
                if (err) {
                    callback(err);
                } else if (existing !== null) {
                    _.extend(existing, giftCard);
                    existing.save(callback);
                } else {
                    callback(new Error('Gift card not found with id: '+giftCard.id);
                }
            });

        }
    },

    /**
     * Delete gift card.
     * @param id {String} the gift card id
     * @param callback {Function<error:Error, result:GiftCard>} the callback function
     */
    delete: function(id, callback) {
        GiftCard.remove({
            _id: id
        }, callback);
    },

    /**
     * Search gift cards with criteria.
     * @param criteria {Object} the criteria
     * ==== The criteria parameters ===
     * pageSize        {Integer} The page size.
     * pageNumber      {Integer} The page number.
     * sortBy          {String}  The name of the property that will be used to sort the results, default to "id".
     * sortOrder       {String}  The sorting order. Must be one of "Ascending", "Descending", default to "Ascending".
     * businessName    {String}  This is used to partial match business name.
     * businessType    {String}  This is used to partial match business type.
     * businessAddress {String}  This is used to partial match business address.
     * discountRange   {Float[]} This is used to filter by discount range.
     * dateRange       {Date[]}  This is used to filter by date range
     * description     {String}  This is used to partial match description.
     * statuses        {String}  This is used to match status.
     * coordinates     {Float[]} Filter by coordinates in related Business
     * giftCardOfferId {String}  Filter by Filter by coordinates in related Business
     * ===============================
     * @param callback {Function<error:Error, result:SearchResult<GiftCard>>} the callback function
     */
    search: function(criteria, callback) {
        var pageSize = criteria.pageSize || config.DEFAULT_PAGE_SIZE;
        var pageNumber = criteria.pageNumber || 1;
        var orderBy = criteria.sortBy || config.DEFAULT_SORT_BY;
        var order = criteria.sortOrder || config.DEFAULT_SORT_ORDER;

        var error = {};
        if (!helper.validatePageSize(pageSize, error) ||
            !helper.validatePageNumber(pageNumber, error) ||
            !helper.validateOrderBy(orderBy, error) ||
            !helper.validateOrder(order, error) ||
            !helper.validateIntRangeNumber(criteria['availableQuantityRange'], error) ||
            !helper.validateStatus(criteria['statuses'], error) ||
            !helper.validateFloatRangeNumber(criteria['discountRange'], error) ||
            !helper.validateFloatRangeNumber(criteria['coordinates'], error) ||
            !helper.validateRangeDate(criteria['dateRange'], error)) {
            callback(error.Err);
        } else {
            var filter = {};

            if (criteria['businessName']) {
                filter['businessName'] = {
                    "$regex": criteria.businessName
                };
            }

            if (criteria['availableQuantityRange']) {
                var rangeNum = criteria.availableQuantityRange.split(",");
                filter['quantity'] = {};
                filter['quantity']['$gte'] = parseFloat(rangeNum[0]);
                filter['quantity']['$lte'] = parseFloat(rangeNum[1]);
            }

            if (criteria['businessAddress']) {
                filter['businessAddress'] = {
                    "$regex": criteria.businessAddress
                };
            }

            if (criteria['statuses']) {
                var statues = criteria.statuses.split(",");
                for (var i = 0; i < statues.length; i++) {
                    statues[i] = helper.trim(statues[i]);
                }

                filter['status'] = {};
                filter['status']['$in'] = statues;
            }

            if (criteria['discountRange']) {
                var rangeNum2 = criteria.discountRange.split(",");
                filter['discount'] = {};
                filter['discount']['$gte'] = parseFloat(rangeNum2[0]);
                filter['discount']['$lte'] = parseFloat(rangeNum2[1]);
            }

            if (criteria['dateRange']) {
                var dataRanges = criteria.dateRange.split(",");

                filter['createdOn'] = {};
                filter['createdOn']['$gte'] = new Date(dataRanges[0]);
                filter['createdOn']['$lte'] = new Date(dataRanges[1] + " 23:59:59.999");
            }

            if (criteria['description']) {
                filter['description'] = {
                    "$regex": criteria.description
                };
            }

            if (criteria['giftCardOfferId']) {
                filter['giftCardOfferId'] = {
                    "$regex": criteria.giftCardOfferId
                };
            }

            if (orderBy === "id") {
                orderBy = "_id";
            }
            var sortBy = {};
            sortBy[orderBy] = helper.getOrder(order);


            async.waterfall([
                // Get buisness type ids by type name
                function(cb) {
                    if (criteria['businessType']) {
                        BusinessType.find({
                            name: {"$regex": criteria['businessType']}
                        }, cb);
                    } else {
                        cb(null, undefined);
                    }

                },
                function(businessTypes, cb) {
                    if (businessTypes === undefined) {
                        cb(null);
                    } else {
                        var businessTypeIds = _.pluck(businessTypes, '_id');

                        filter['businessType'] = {};
                        filter['businessType']['$in'] = businessTypeIds;

                        cb(null);
                    }
                },
                // Get buisness ids by coordinates
                function(cb) {
                    if (criteria['coordinates']) {
                        var rangeNum3 = criteria.coordinates.split(",");
                        Business.find({
                            coordinates: rangeNum3
                        }, cb);
                    } else {
                        cb(null, undefined);
                    }

                },
                function(businesses, cb) {
                    if (businesses === undefined) {
                        cb(null);
                    } else {
                        var businessIds = _.pluck(businesses, '_id');

                        filter['businessId'] = {};
                        filter['businessId']['$in'] = businessIds;

                        cb(null);
                    }
                },
                function(cb) {
                    if (0 === parseInt(pageNumber)) {
                        GiftCard.find(filter).sort(sortBy).populate("businessType").exec(function(err, items) {
                            if (err) {
                                callback(err);
                            } else {
                                var resultItems = _.map(items, function(item) {
                                    return item.toJSON();
                                });

                                var result = {
                                    totalPages: 1,
                                    pageNumber: 0,
                                    totalRecords: resultItems.length,
                                    items: resultItems
                                };
                                callback(null, result);
                            }
                        });
                    } else {
                        GiftCard.paginate(filter, pageNumber, pageSize, function(err, pageCount, items, itemCount) {
                            if (err) {
                                callback(err);
                            } else {
                                var resultItems = _.map(items, function(item) {
                                    return item.toJSON();
                                });

                                var result = {
                                    totalPages: pageCount,
                                    pageNumber: parseInt(pageNumber),
                                    totalRecords: itemCount,
                                    items: resultItems
                                };
                                callback(null, result);
                            }
                        }, {
                            populate: 'businessType',
                            sortBy: sortBy
                        });

                    }

                }
            ], function(err) {
                callback(err);
            });
        }
    },

    /**
     * Resell gift card.
     * @param id {String} the gift card id
     * @param quantityToSell {Integer} the quantity to sell
     * @param callback {Function<error:Error, giftCardOffer:GiftCardOffer, giftCard:GiftCard>} the callback function
     */
    resell: function(id, quantityToSell, callback) {
        var error = {};
        if (!helper.validateRequiredIntParameter(quantityToSell, "quantityToSell", error)) {
            callback(error.Err);
        } else {

            GiftCard.findOne({
                _id: id
            }, function(err, existing) {
                if (err) {
                    callback(err);
                } else if (existing) {
                    if (existing.quantity < quantityToSell) {
                        callback(new Error("Gift card's quantity is smaller than quantityToSell"));
                    } else {
                        existing.quantity = existing.quantity - quantityToSell;

                        var giftCardOffer = {
                            "businessId": existing.businessId,
                            "businessName": existing.businessName,
                            "businessType": existing.businessType,
                            "businessAddress": existing.businessAddress,
                            "businessPicture": existing.businessPicture,
                            "businessTelephone": existing.businessTelephone,
                            "discount": existing.discount,
                            "description": existing.description,
                            "createdOn": new Date(),
                            "createdBy": existing.createdBy,
                            "modifedOn": new Date(),
                            "modifiedBy": existing.modifiedBy,
                            "availableQuantity": quantityToSell
                        };
                        existing.save(function(err, giftCard) {
                            callback(err, giftCardOffer, giftCard);
                        });
                    }

                } else {
                    callback(new Error('Gift card is not found with id: ' + id));
                }
            });
        }
    },

    /**
     * Prepare data for redeem.
     * @param id {String} the gift card id
     * @param amount {Float} the amount
     * @param callback {Function<error:Error, result:GiftCardRedeem>} the callback function
     */
    prepareForRedeem: function(id, amount, callback) {
        var error = {};
        if (!helper.validateRequiredIntParameter(amount, "amount", error)) {
            callback(error.Err);
        } else {
            var text = crypto.randomBytes(config.QR_CODE_SIZE).toString('hex');

            async.waterfall([
                function(cb) {
                    GiftCard.findOne({
                        _id: id
                    }, cb);
                },
                function(giftCard, cb) {
                    if (!giftCard) {
                        callback(null, null);
                    } else {
                        QRCode.save("./tmp.png", text, cb);
                    }
                },
                function(bytes) {
                    var redeem = {
                        giftCardId: id,
                        amount: amount,
                        redeemQRCode: text,
                        redeemQRCodePicture: bytes.toString(),
                        redeemed: false,
                        timestamp: Date.now(),
                        redeemedAmount: config.DEFAULT_REDEEME_AMOUNT
                    };
                    GiftCardRedeem.create(redeem, callback);
                }
            ], function(err) {
                callback(err);
            });
        }
    },

    /**
     * Redeem method
     * @param qrCode {String} the qrCode
     * @param callback {Function<error:Error, result:GiftCard>} the callback function
     */
    redeem: function(qrCode, callback) {
        var error = {};
        if (!helper.validateRequiredParameter(qrCode, "qrCode", error)) {
            callback(error.Err);
        } else {
            async.waterfall([
                function(cb) {
                    GiftCardRedeem.findOne({
                        redeemQRCode: qrCode
                    }, cb);
                },
                function(giftCardRedeem, cb) {
                    if (!giftCardRedeem) {
                        cb(new Error("GiftCardRedeem is not exist with qrCode: " + qrCode));
                    }else{
                        GiftCard.findOne({
                            _id: giftCardRedeem.giftCardId
                        }, function(err, item) {
                            cb(err, item, giftCardRedeem);
                        });
                    }
                },
                function(giftCard, giftCardRedeem) {
                    if (!giftCard) {
                        callback(new Error("GiftCard is not exist with id in giftCardRedeem"));
                    }else{
                        if (giftCard.quantity < giftCardRedeem.amount) {
                            callback(new Error("giftCard.quantity is not enough"));
                        } else if (giftCardRedeem.redeemedAmount < giftCardRedeem.amount) {
                            callback(new Error("giftCardRedeem.redeemedAmount is not enough"));
                        } else {
                            if (giftCard.quantity === giftCardRedeem.amount) {
                                _.extend(giftCard, {
                                    quantity: 0,
                                    status: "INACTIVE"
                                });
                            } else {
                                _.extend(giftCard, {
                                    quantity: giftCard.quantity - giftCardRedeem.amount
                                });
                            }

                            _.extend(giftCardRedeem, {
                                redeemedAmount: giftCardRedeem.redeemedAmount - giftCardRedeem.amount
                            });


                            giftCardRedeem.save(function(err, rt) {
                                if (err) {
                                    callback(err, null);
                                } else {
                                    giftCard.save(callback);
                                }
                            });
                        }
                    }
                }
            ], function(err) {
                callback(err);
            });
        }
    },

    /**
     * Get total Redeemed amount for ownerId
     * @param id {String} the owner Id
     * @param callback {Function<error:Error, result:Number>} the callback function
     */
    getTotalRedeemedAmount: function(id, callback) {
        var error = {};
        if (!helper.validateRequiredParameter(id, "id", error)) {
            callback(error.Err);
        } else {
            async.waterfall([
                function(cb) {
                    GiftCard.find({
                        ownerId: id
                    }, cb);
                },
                function(giftCards, cb) {
                    if (!giftCards) {
                        cb(new Error("GiftCard is not exist with ownerId: " + id));
                    }
                    var ids = _.pluck(giftCards, "_id");

                    GiftCardRedeem.find({
                        'giftCardId': {
                            $in: ids
                        }
                    }, cb);
                },
                function(giftCardRedeems) {
                    if (!giftCardRedeems) {
                        callback(new Error("GiftCardRedeem is not exist with giftCard ids with provided ownerId"));
                    }

                    var result = 0;
                    _.each(giftCardRedeems, function(elem) {
                        result += elem.redeemedAmount;
                    });
                    callback(null, result);

                }
            ], function(err) {
                callback(err);
            });
        }
    }

};

module.exports = GiftCardService;

/*
 * Copyright (C) 2015 TopCoder Inc., All Rights Reserved.
 */
"use strict";

/**
 * This module contains helper functions.
 *
 * @author TCSASSEMBLER
 * @version 1.0
 */

var GIFT_CARD_STATUS = {
    ACTIVE: 'ACTIVE',
    FOR_RESALE: 'FOR_RESALE',
    INACTIVE: 'INACTIVE'
};

var helper = {};

helper.getOrder = function(order) {
    return order === 'Ascending' ? 1 : -1;
};


helper.validatePageSize = function(pageSize, error) {
    pageSize = parseInt(pageSize);
    if (isNaN(pageSize) || pageSize < 1) {
        error.Err = new Error("pageSize should be positive integer.");
        return false;
    }

    return true;
};


helper.validatePageNumber = function(pageNumber, error) {
    pageNumber = parseInt(pageNumber);
    if (isNaN(pageNumber) || pageNumber < 0) {
        error.Err = new Error("pageNumber should be non-negative integer.");
        return false;
    }

    return true;
};


helper.validateOrderBy = function(orderBy, error) {
    var allowed = ['id', 'ownerId', 'businessId', 'businessName', 'businessAddress',
        'businessPicture', 'businessTelephone', 'discount', 'quantity', 'status',
        'giftCardOfferId', 'expirationDate', 'activationDateTime', 'endDateTime'];

    if (allowed.indexOf(orderBy) === -1) {
        error.Err = new Error("sortBy should be in: [" + allowed.join(', ') + "]");
        return false;
    }

    return true;
};


helper.validateOrder = function(order, error) {
    var allowed = ['Ascending', 'Descending'];
    if (allowed.indexOf(order) === -1) {
        error.Err = new Error("sortOrder should be in: [" + allowed.join(', ') + "]");
        return false;
    }

    return true;
};


helper.validateStatus = function(statuses, error) {
    if (statuses === undefined) {
        return true;
    }

    var items = statuses.split(",");

    for (var i = 0; i < items.length; i++) {
        if (!GIFT_CARD_STATUS[helper.trim(items[i])]) {
            error.Err = new Error("Status must be in [ACTIVE, FOR_RESALE, INACTIVE], and array format should be xxx,xxx,xxx");
            return false;
        }
    }

    return true;
};


helper.trim = function(str) {
    return String(str).replace(/^\s+|\s+$/g, '');
};


helper.validateFloatRangeNumber = function(rangeNumbers, error) {
    if (rangeNumbers === undefined) {
        return true;
    }

    var nums = rangeNumbers.split(",");
    if (nums.length !== 2) {
        error.Err = new Error("Range number format should be like: xxx,xxx");
        return false;
    }

    var num1 = parseFloat(nums[0]);
    var num2 = parseFloat(nums[1]);

    if (isNaN(num1) || isNaN(num2)) {
        error.Err = new Error("Range number should be valid float.");
        return false;
    }

    return true;
};


helper.validateIntRangeNumber = function(rangeNumbers, error) {
    if (rangeNumbers === undefined) {
        return true;
    }

    var nums = rangeNumbers.split(",");
    if (nums.length !== 2) {
        error.Err = new Error("Range number format should be like: xxx,xxx");
        return false;
    }

    var num1 = parseInt(nums[0]);
    var num2 = parseInt(nums[1]);

    if (isNaN(num1) || isNaN(num2)) {
        error.Err = new Error("Range number should be valid int.");
        return false;
    }

    return true;
};


helper.validateRangeDate = function(rangeDates, error) {
    if (rangeDates === undefined) {
        return true;
    }

    error.Err = new Error("Range date format should be like: YYYY-MM-DD,YYYY-MM-DD");

    var dates = rangeDates.split(",");
    if (dates.length !== 2) {
        return false;
    }

    var dateFormat = /(\d{4})-(\d{1,2})-(\d{1,2})/;
    if (dateFormat.exec(dates[0]) && dateFormat.exec(dates[1])) {
        var d1 = new Date(dates[0]);
        var d2 = new Date(dates[1]);

        if (d1.toString() !== 'Invalid Date' && d2.toString() !== 'Invalid Date') {
            if(d1 <= d2){
                return true;
            }

            error.Err = new Error("StartDate should be before EndDate");
            return false;
        }
    }

    return false;
};


helper.validateRequiredParameter = function(paramValue, paramName, error) {
    if (!paramValue) {
        error.Err = new Error("Required query parameter '" + paramName + "' is missing.");
        return false;
    }

    return true;
};

helper.validateRequiredIntParameter = function(paramValue, paramName, error) {
    if (!helper.validateRequiredParameter(paramValue, paramName, error)) {
        return false;
    }

    if (isNaN(parseInt(paramValue))) {
        error.Err = new Error(paramName + " should be an Integer but '" + paramValue + "' was provided.");
        return false;
    }

    return true;
};


helper.validateRequiredFloatParameter = function(paramValue, paramName, error) {
    if (!helper.validateRequiredParameter(paramValue, paramName, error)) {
        return false;
    }

    if (isNaN(parseFloat(paramValue))) {
        error.Err = new Error(paramName + " should be an Float but '" + paramValue + "' was provided.");
        return false;
    }

    return true;
};


helper.validateRequiredStatusParameter = function(paramValue, paramName, error) {
    if (!helper.validateRequiredParameter(paramValue, paramName, error)) {
        return false;
    }

    if (!GIFT_CARD_STATUS[helper.trim(paramValue)]) {
        error.Err = new Error(paramName + " must be in [ACTIVE, FOR_RESALE, INACTIVE]");
        return false;
    }

    return true;
};


module.exports = helper;

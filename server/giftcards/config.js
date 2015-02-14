/*
 * Copyright (C) 2015 TopCoder Inc., All Rights Reserved.
 */
/**
 * Represents configuration file.
 *
 * @version 1.0
 * @author TCSASSEMBLER
 */
"use strict";

module.exports = {

    //The MongoDB URL.
    MONGODB_URL: "mongodb://127.0.0.1:27017/project-mom",

    //The MongoDB connection pool size.
    MONGODB_CONNECTION_POOL_SIZE: 50,

    //The port number for API.
    WEB_SERVER_PORT: process.env.PORT || 3000,

    //The default sort by
    DEFAULT_SORT_BY: "id",

    //The default sort order
    DEFAULT_SORT_ORDER: "Ascending",

    //The default page size per page
    DEFAULT_PAGE_SIZE: 5,

    //The QR code size
    QR_CODE_SIZE: 16,

    //Default redeeme amount
    DEFAULT_REDEEME_AMOUNT: 20

};

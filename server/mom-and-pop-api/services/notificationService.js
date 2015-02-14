'use strict';

/**
 * Notification service
 */

/**
 * Send the notificaiton mail to user email address
 * @param     {String}        user email address
 * @param     {String}        reset password token
 */
exports.notifyUserOfPassword = function(email, token, callback) {
  // do something send notification mail. Currently it is dummy method
  // return null for error so that operation is successfull
  callback(null);
};
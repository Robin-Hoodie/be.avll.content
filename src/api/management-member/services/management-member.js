'use strict';

/**
 * management-member service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::management-member.management-member');

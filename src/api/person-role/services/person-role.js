'use strict';

/**
 * person-role service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::person-role.person-role');

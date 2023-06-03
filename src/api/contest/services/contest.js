'use strict';

/**
 * contest service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::contest.contest');

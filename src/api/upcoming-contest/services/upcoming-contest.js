'use strict';

/**
 * upcoming-contest service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::upcoming-contest.upcoming-contest');

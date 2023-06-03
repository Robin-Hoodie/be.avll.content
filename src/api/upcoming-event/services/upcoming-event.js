'use strict';

/**
 * upcoming-event service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::upcoming-event.upcoming-event');

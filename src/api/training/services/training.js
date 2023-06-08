'use strict';

/**
 * training service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::training.training');

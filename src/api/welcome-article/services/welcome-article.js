'use strict';

/**
 * welcome-article service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::welcome-article.welcome-article');

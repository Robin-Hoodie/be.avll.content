'use strict';

/**
 * welcome-article controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::welcome-article.welcome-article');

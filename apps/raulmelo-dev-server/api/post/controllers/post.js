'use strict';
const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  /**
   * This is the Draft system.
   *
   * I enforce to ONLY send posts which has "published" status
   * when the route find all or find one be called
   * https://strapi.io/documentation/v3.x/guides/draft.html#get-the-data-back
   */
  async find(ctx) {
    let entities;

    ctx.query = {
      ...ctx.query,
      status: 'Published',
    };

    if (ctx.query._q) {
      entities = await strapi.services.post.search(ctx.query);
    } else {
      entities = await strapi.services.post.find(ctx.query);
    }

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.post }),
    );
  },
};

/* eslint-env node */

module.exports = {
  description: 'Adds the required extension to the resolver',

  normalizeEntityName(entityName) {
    return entityName || 'special-entity-name';
  }
};

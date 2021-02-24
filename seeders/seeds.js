'use strict';
const models = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const northAmerica = await models.continent.create({
      name: 'North America',
      size: 9540000
    })

    await northAmerica.createCountry({
      name: 'Canada',
      founded: 1867,
      population: 37000000
    })

    await northAmerica.createCountry({
      name: 'Mexico',
      founded: 1810,
      population: 127000000
    })

    const southAmerica = await models.continent.create({
      name: 'South America',
      size: 6890000
    })

    await southAmerica.createCountry({
      name: 'Brazil',
      founded: 1822,
      population: 211000000
    })

    await southAmerica.createCountry({
      name: 'Chile',
      founded: 1818,
      population: 19000000
    })
  },

  down: async (queryInterface, Sequelize) => {
    await models.country.destroy({ where: {} })
    await models.continent.destroy({ where: {} })
  }
};
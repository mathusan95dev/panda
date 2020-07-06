'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrgSchema extends Schema {
  up () {
    this.create('orgs', (table) => {
      table.increments()
      table.text('name').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('orgs')
  }
}

module.exports = OrgSchema

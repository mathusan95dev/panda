'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RecipentIdSchema extends Schema {
  up () {
    this.table('messages', (table) => {
      table.integer('recipient_id').unsigned().notNullable().references('id').inTable('users')
    })
  }

  down () {
    this.table('messages', (table) => {
      table.dropColumn('recipient_id')
    })
  }
}

module.exports = RecipentIdSchema

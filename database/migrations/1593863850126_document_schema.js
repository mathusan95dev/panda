'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DocumentSchema extends Schema {
  up () {
    this.create('documents', (table) => {
      table.increments()
      table.integer('message_id').notNullable().unsigned().references('id').inTable('messages')
      table.integer('message_item_id').notNullable().unsigned().references('id').inTable('message_items')
      table.text('no_of_pages').nullable()
      table.integer('type_id').nullable()
      table.integer('size').nullable()
      table.boolean('pdf_generated').nullable()
      table.text('pdf_path').nullable()
      table.text('doc_path').nullable()
      table.timestamp('date_created').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('documents')
  }
}

module.exports = DocumentSchema

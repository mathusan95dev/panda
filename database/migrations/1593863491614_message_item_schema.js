'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MessageItemSchema extends Schema {
  up () {
    this.create('message_items', (table) => {
      table.increments()
      table.integer('message_id').notNullable().unsigned().references('id').inTable('messages')
      table.time('time').nullable()
      table.text('message').nullable()
      table.integer('type_id').nullable()
      table.integer('doc_id').unsigned().nullable()
      table.boolean('is_deleted').nullable()
      table.boolean('is_read').nullable()
      table.boolean('is_retracted').nullable()
      table.boolean('is_zapped').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('message_items')
  }
}

module.exports = MessageItemSchema

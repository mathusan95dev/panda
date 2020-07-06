'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MessageSchema extends Schema {
  up () {
    this.create('messages', (table) => {
      table.increments()
      table.integer('session_id').unsigned()
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users')
      table.text('subject').nullable()
      table.text('message').nullable()
      table.boolean('is_read').nullable()
      table.boolean('is_deleted').nullable()
      table.boolean('is_retracted').nullable()
      table.integer('type_id').nullable()
      table.json('options').nullable()
      table.integer('recepient_id').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('messages')
  }
}

module.exports = MessageSchema

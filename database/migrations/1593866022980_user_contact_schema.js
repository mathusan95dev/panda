'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserContactSchema extends Schema {
  up () {
    this.create('user_contacts', (table) => {
      table.increments()
      table.integer('user_id').notNullable().unsigned().references('id').inTable('users')
      table.text('title').nullable()
      table.text('first_name').notNullable()
      table.text('last_name').notNullable()
      table.text('email_address').notNullable()
      table.text('country_code').notNullable()
      table.text('mobile').notNullable()
      table.boolean('app_user').nullable()
      table.integer('status').nullable()
      table.integer('added_by').unsigned().nullable()
      table.integer('org_id').notNullable().unsigned().references('id').inTable('orgs')
      table.timestamps()
    })
  }

  down () {
    this.drop('user_contacts')
  }
}

module.exports = UserContactSchema

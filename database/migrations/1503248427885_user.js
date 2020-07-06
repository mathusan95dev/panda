'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.text('phone').notNullable()
      table.integer('has_preferences').notNullable()
      table.integer('security_questions').notNullable()
      table.text('geolocation').notNullable()
      table.text('profile_image').nullable()
      table.integer('organization_id').unsigned().nullable()
      table.integer('client_id').nullable().unsigned()
      table.text('verified_token').nullable()
      table.integer('verified').notNullable()
      table.integer('status').notNullable()
      table.integer('failed_login_attempts').notNullable().defaultTo(0)
      table.timestamp('last_failed_login').nullable()
      table.timestamp('last_login').notNullable()
      table.timestamp('verified_date').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema

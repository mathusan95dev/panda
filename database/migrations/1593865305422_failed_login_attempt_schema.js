'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FailedLoginAttemptSchema extends Schema {
  up () {
    this.create('failed_login_attempts', (table) => {
      table.increments()
      table.string('ip').nullable()
      table.integer('no_of_attempts').nullable()
      table.timestamp('start_time').nullable()
      table.timestamp('last_attempt_time').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('failed_login_attempts')
  }
}

module.exports = FailedLoginAttemptSchema

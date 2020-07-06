'use strict'


/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

Route.group(() => {

Route.post('/user/register', 'AuthController.register')
Route.post('/user/login', 'AuthController.login')


}).prefix('api').formats(['json'])




// auth middleware protected routes
Route.group(() => {
    // logout route
    Route.get('user/logout/:id','AuthController.logout')
    
}).middleware(['auth:user']).prefix('api').formats(['json'])

Route.get('api/user/:id/reset-password','AuthController.resetpassword')


//admin controlled routes api
Route.delete('api/user/:id','UserController.destroy')
Route.put('api/user/:id','UserController.update')
Route.post('api/user/create','UserController.create')



//message controller routes api
Route.delete('api/message/:id','MessageController.destroy')
Route.post('api/messages','MessageController.create')
Route.get('api/message/:id','MessageController.show')
Route.put('api/message/:id','MessageController.update')


//orgcontrolller routes api
Route.post('api/orgs','OrgController.create')
Route.put('api/org/:id','OrgController.update')
Route.get('api/org/:id','OrgController.show')
Route.delete('api/org/:id','OrgController.destroy')


//logController routes api
Route.post('api/logs','LogController.create')
Route.put('api/log/:id','LogController.update')
Route.get('api/log/:id','LogController.show')
Route.delete('api/log/:id','LogController.destroy')

//list of messages related to user
Route.get('api/user/:id/messages','MessageController.list_of_messages')

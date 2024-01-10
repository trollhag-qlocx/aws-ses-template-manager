'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', ({ view }) => {
  return view.render('index')
});

Route.get('/update-template', ({ view }) => {
  return view.render('update-template')
});

Route.get('/create-template', ({ view }) => {
  return view.render('create-template')
});

Route.get('download-template/:TemplateName', 'SesTemplateController.downloadTemplate');
Route.get('list-templates', 'SesTemplateController.listTemplates');
Route.get('get-template/:TemplateName', 'SesTemplateController.getTemplate');
Route.post('create-template', 'SesTemplateController.createTemplate');
Route.put('update-template', 'SesTemplateController.updateTemplate');
Route.delete('delete-template/:TemplateName', 'SesTemplateController.deleteTemplate');
Route.post('send-template', 'SesTemplateController.sendTemplate').middleware('throttle:30');

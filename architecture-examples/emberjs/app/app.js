import Resolver from 'resolver';
import EditTodoView from 'appkit/views/edit-todo';
import pluralizeHelper from 'appkit/helpers/pluralize';

var Todos = Ember.Application.extend({
  LOG_ACTIVE_GENERATION: true,
  LOG_MODULE_RESOLVER: true,
  LOG_TRANSITIONS: true,
  LOG_TRANSITIONS_INTERNAL: true,
  LOG_VIEW_LOOKUPS: true,
  modulePrefix: 'appkit', // TODO: loaded via config
  Resolver: Resolver['default']
});

Ember.Handlebars.helper('edit-todo', EditTodoView);
Ember.Handlebars.helper('pluralize', pluralizeHelper);

export default Todos;

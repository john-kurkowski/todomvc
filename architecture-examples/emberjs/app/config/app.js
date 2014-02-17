'use strict';

var config = {
    LOG_TRANSITIONS: true,
    LOG_TRANSITIONS_INTERNAL: false
  },
  Todos = Ember.Application.create(config);

Todos.ApplicationAdapter = DS.LSAdapter.extend({
	namespace: 'todos-emberjs'
});

module.exports = Todos;

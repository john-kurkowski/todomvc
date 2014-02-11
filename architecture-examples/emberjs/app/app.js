/*global Ember, DS, Todos:true */
window.Todos = Ember.Application.create();

require("helpers/*");
require("modules/index/*");
require("router");

Todos.ApplicationAdapter = DS.LSAdapter.extend({
	namespace: 'todos-emberjs'
});

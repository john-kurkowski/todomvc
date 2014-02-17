export default Ember.Route.extend({
	setupController: function () {
		this.controllerFor('todos').set('filteredTodos', this.modelFor('todos'));
	}
});


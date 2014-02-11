Emberjs.IndexRoute = Ember.Route.extend({
  setupController: function (controller) {
    controller.set("content", Emberjs.IndexModel.find());
  }
});


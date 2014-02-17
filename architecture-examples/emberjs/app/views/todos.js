export default Ember.View.extend({
	focusInput: function () {
		this.$('#new-todo').focus();
	}.on('didInsertElement')
});

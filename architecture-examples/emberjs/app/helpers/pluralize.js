export default function (singular, count) {
	/* From Ember-Data */
	var inflector = new Ember.Inflector(Ember.Inflector.defaultRules);

	return count === 1 ? singular : inflector.pluralize(singular);
};

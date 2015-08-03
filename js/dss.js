/*!
 * Villa DSS.JS v0.5.5 (http://getvilla.org/)
 * Copyright 2013-2015 Noibe Developers
 * Licensed under MIT (https://github.com/noibe/villa/blob/master/LICENSE)
 */

var runPropertyModel = function(a) {
	if (a instanceof Array) {
		var property = {};
		property.name = a[0];
		if (typeof a[1] === 'string') {
			property.value = a[1];
			if (a[2]) property.important = true;
		} else if (typeof a[2] === 'string') {
			property.important = true;
			property.value = a[2];
		}
		return property;
	} else return a;
};

var runPropertiesModel = function(a) {
	var properties = [];
	for (var i = a.length; i--; )
		properties.push(runPropertyModel(a[i]));
	return properties;
};

var runRuleModel = function(a) {
	var rule = {};

	if (a instanceof Array) {
		rule.selector = a[0];
		rule.properties = runPropertiesModel(a[1]);
	} else {
		rule.selector = a.selector;
		rule.properties = runPropertiesModel(a.properties);
	}

	return rule;
};

var runScopeModel = function(a) {

	if (!(a instanceof Array)) {

		if (a.type && a.rules) {

			console.log('scope here');

			return false;

		} else return runRuleModel(a);  // is a object rule

	} else return runRuleModel(a);      // is a array rule

};

var runStyleSheetModel = function(a) {

	var Style = [];

	if (a instanceof Array) {

		if (!(typeof a[0] === 'string'))
			for (var i = a.length; i--; )
				Style.push(runScopeModel(a[i]));
		else Style.push(runRuleModel(a));

	} else if (a.selector) Style.push(a);

	if (Style.length) return Style;
	return false;

};

var buildStyleString = function(a) {
	return false;
};

var addStyle = function(a) {
	console.log(runStyleSheetModel(a));
};


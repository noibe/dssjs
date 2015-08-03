/*!
 * Villa DSS.JS v0.5.5 (http://getvilla.org/)
 * Copyright 2013-2015 Noibe Developers
 * Licensed under MIT (https://github.com/noibe/villa/blob/master/LICENSE)
 */

var runPropertyModel = function(property) {
	if (property instanceof Array) {
		var a = {};
		a.name = property[0];
		if (property[1] instanceof String) {
			a.value = property[1];
			if (property[2]) a.important = true;
		} else if (property[2] instanceof String) {
			a.important = true;
			a.value = property[2];
		}
		return a;
	} else return property;
};

var runProperties = function(properties) {
	var a = [];
	for (var i = properties.length; i--; )
		a.push(runPropertyModel(properties[i]));
	return a;
};

var runRuleModel = function(a) {
	var rule = {};

	if (a instanceof Array) {
		rule.selector = a[0];
		rule.properties = runProperties(a[1]);
	} else {
		rule.selector = a.selector;
		rule.properties = runProperties(a.properties);
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

		if (!(a[0] instanceof String)) {

			for (var i = a.length; i--; )
				Style.push(runScopeModel(a[i]));

		} else Style.push(a);

	} else if (a.selector) Style.push(a);

	if (Style.length) return Style;
	return false;

};

var addStyle = function(a) {
	console.log(runStyleSheetModel(a));
};


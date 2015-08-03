/*!
 * Villa DSS.JS v0.5.0 (http://getvilla.org/)
 * Copyright 2013-2015 Noibe Developers
 * Licensed under MIT (https://github.com/noibe/villa/blob/master/LICENSE)
 */

var runPropertyModel = function(property) {
	if (property instanceof Array) {
		var a = {};
		a.name = property[0];
		if (typeof property[1] === 'string') {
			a.value = property[1];
			if (property[2]) a.important = true;
		} else if (typeof property[2] === 'string') {
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


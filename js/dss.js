/*!
 * Villa DSS.JS v0.8.5 (http://getvilla.org/)
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

			var scope = [];
			if (a.rules instanceof Array) {
				for (var i = a.rules.length; i--; )
					scope.push(runRuleModel(a.rules[i]));
				return {
					type: a.type,
					features: a.features,
					rules: scope
				};
			}

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

var debugStyleSheet = function(a) {
	return runStyleSheetModel(a);
};

var buildPropertyString = function(a) {
	var s = a.name;
	s += ': ' + a.value;
	if (a.important) s += ' !important;'; else s+= ';';
	return s;
};

var buildRuleString = function(a) {
		var p = a.properties,
			s = a.selector,
			r = '';

		for (var i = p.length; i--;)
			r += buildPropertyString(p[i]);

		return {
			selector: s,
			rules: r
		};
};

var buildScopeString = function(a) {
	var s = '@' + a.type + ' ' + a.features + ' { ';

	for (var i = a.rules.length; i--; ) {
		var r = buildRuleString(a.rules[i]);
		s += (r.selector + ' { ' + r.rules + ' } ');
	}

	return s + ' }';
};

var buildStyleString = function(a) {
	var s = [];
	for (var i = a.length; i--; )
		if (!a[i].type && !a[i].rules)      // is rule model
			s.push(buildRuleString(a[i]));
		else {                              // is scope model
			s.push(buildScopeString(a[i]));
		}
	return s;
};

var addRule = function(a) {
	var styleEl = document.createElement('style'),
		s;

	// Append style element to head
	document.head.appendChild(styleEl);

	// Grab style sheet
	s = styleEl.sheet;

	var s = document.styleSheets[0];
	for (var i = a.length; i--; ) {
		if (typeof a[i] === 'string') {
			if ("insertRule" in s) {    // adding scope
				s.insertRule(a[i], 0);
			}
		} else if ("insertRule" in s) {
			s.insertRule(a[i].selector + ' { ' + a[i].rules + ' } ', 0);
		} else if ("addRule" in s) {
			s.addRule(a[i].selector, a[i].rules);
		}
	}
};

var addStyle = function(a, d) {
	if (d) a = debugStyleSheet(a);
	addRule(buildStyleString(a));
};


/*!
 * Villa DSS.JS v0.5.0 (http://getvilla.org/)
 * Copyright 2013-2015 Noibe Developers
 * Licensed under MIT (https://github.com/noibe/villa/blob/master/LICENSE)
 */

var s = document.styleSheets[0];

var propertyModel = [],
	ruleModel = [],
	styleSheetModel = [];

// Macro Object Model
propertyModel.push(
	{
		name: 'background-color',
		important: true,
		value: 'red'
	},
	{
		name: 'color',
		value: 'blue'
	}
);

// Object
propertyModel.push(
	{name: 'background-color', important: 1, value: 'red'},
	{name: 'color', value: 'blue'}
);

// Object with simple important param
propertyModel.push(
	{
		'background-color': ['red', 1]
	},
	{
		'color': 'blue'
	}
);

// Object with simple important param (prototype)
propertyModel.push(
	{'background-color': ['red']},
	{'color': 'blue'}
);

// Array
propertyModel.push(
	['background-color', 'red', 1],
	['color', 'blue']
);

// Array with simple important param
propertyModel.push(
	['background-color', ['red']],
	['color', 'blue']
);

// Object Model
ruleModel.push(
	{
		selector: 'body',   // Selector
		properties: [
			{
				name: 'background-color',
				important: true,
				value: 'red'
			},
			{
				name: 'color',
				value: 'blue'
			}
		]
	}
);

// Array Model
ruleModel.push(
	[
		'body',             // Selector
		[
			[
				'background-color',
				true,
				'red'
			],
			[
				'color',
				'blue'
			]
		]
	]
);

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

var styles = [];

for (var i = ruleModel.length; i--; )
	styles.push(runRuleModel(ruleModel[i]));

console.log(styles);

function addCSSRule(sheet, selector, rules, index) {
	if ("insertRule" in sheet) {
		sheet.insertRule(selector + "{" + rules + "}", index);
	}
	else if ("addRule" in sheet) {
		sheet.addRule(selector, rules, index);
	}
}

// Use it!
addCSSRule(s, "body", "background-color: red");
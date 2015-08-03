/*!
 * Villa DSS.JS v0.1.0 (http://getvilla.org/)
 * Copyright 2013-2015 Noibe Developers
 * Licensed under MIT (https://github.com/noibe/villa/blob/master/LICENSE)
 */

var s = document.styleSheets[0];

var ruleProto01 = {
	selector: 'body',
	properties: [
		{
			property: 'background-color',
			important: 'true',
			value: 'red'
		},
		{
			property: 'color',
			value: 'blue'
		}
	]
};

var ruleProto02 = [
	'body',
	[
		[
			'background-color',
			'red'
		],
		[
			'color',
			'blue'
		]
	]
];

function addCSSRule(sheet, selector, rules, index) {
	if("insertRule" in sheet) {
		sheet.insertRule(selector + "{" + rules + "}", index);
	}
	else if("addRule" in sheet) {
		sheet.addRule(selector, rules, index);
	}
}

// Use it!
addCSSRule(s, "body", "background-color: red");
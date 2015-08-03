/*!
 * Villa DSS.JS Tests v0.0.0 (http://getvilla.org/)
 * Copyright 2013-2015 Noibe Developers
 * Licensed under MIT (https://github.com/noibe/villa/blob/master/LICENSE)
 */

var ruleModel = [];

// Object Model
ruleModel.push(
	{
		selector: 'body',
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
		'body',
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

var styles = [];

for (var i = ruleModel.length; i--; )
	styles.push(runRuleModel(ruleModel[i]));

addStyle(styles);

/*
	InsertRule tests
 */

var s = document.styleSheets[0];

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
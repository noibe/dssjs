/*!
 * Villa DSS.JS Tests v0.0.0 (http://getvilla.org/)
 * Copyright 2013-2015 Noibe Developers
 * Licensed under MIT (https://github.com/noibe/villa/blob/master/LICENSE)
 */

var styles = [];

/*for (var i = ruleModel.length; i--; )
	styles.push(runRuleModel(ruleModel[i]));*/

//addStyle(styles);
//addStyle(styleSheetModel);
addStyle(ruleModel[1]);

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
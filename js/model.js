/*!
 * Villa DSS.JS Model v0.9.0 (http://getvilla.org/)
 * Copyright 2013-2015 Noibe Developers
 * Licensed under MIT (https://github.com/noibe/villa/blob/master/LICENSE)
 */

var propertyModel = [],
	ruleModel = [],
	scopeModel = [];

// Macro Object Model
propertyModel.push(
	{
		important: true,
		name: 'background-color',
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
				important: true,
				name: 'background-color',
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

scopeModel.push(
	{
		type: 'media',                      // the interpreter needs to test the type param
		features: '(max-width: 600px)',     // if has type, it read the features
		rules: [
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
			],
			{
				selector: 'body',
				properties: [
					{
						important: true,
						name: 'background-color',
						value: 'red'
					},
					{
						name: 'color',
						value: 'blue'
					}
				]
			}
		]
	}
);

styleSheetModel =
[
	{
		selector: 'selectorOne',
		properties: [
			{
				important: true,
				name: 'selectorOnePropertyTwo',
				value: 'red'
			},
			{
				name: 'selectorOnePropertyTwo',
				value: 'blue'
			}
		]
	},
	{
		type: 'media',
		features: '(max-width: 600px)',
		rules: [
			[
				'selectorTwo',
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
			],
			{
				selector: 'selectorThree',
				properties: [
					{
						important: true,
						name: 'background-color',
						value: 'red'
					},
					{
						name: 'color',
						value: 'blue'
					}
				]
			}
		]
	},
	[
		'selectorFour',
		[
			[
				'selectorFourPropertyOne',
				true,
				'red'
			],
			[
				'selectorFourPropertyTwo',
				'blue'
			]
		]
	]
];
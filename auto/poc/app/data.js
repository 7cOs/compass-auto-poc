
var data = {
	ci: {
		id: 'ci',
		cnId: 'cnCi',
		title: 'QE - Test Case Executor (CI-POC)',
		header: {
			id: 'cnCiHeader',
			contents: {
				id: 'ciHeaderContents',
				procId: 'QE Automation',
				procName: 'Test Case Executor (CI-POC)',
				procDef: '[ci-poc=client-interface:proof-of-concept]'
			}
		},
		actions: {
			id:'cnCiActionsMain',
			cntId: 'cnCiActionsTbl',
			items: [{
				id: 'lnkExtractTestCases',
				cls: 'action',
				ico: null,
				text: 'Extract Test Case...',
				display: false
			}, {
				id: 'lnkSelectTestCase',
				cls: 'action',
				ico: null,
				text: 'Select Test Case...'
			}, {
				id: 'lnkExecTest',
				cls: 'action',
				ico: null,
				text: 'Execute Test...'
			}],
			color: {
				def: 'rgb(154,205,50)',
				hgh: 'rgb(255,255,255)'
			}
		},
		main: {
			id: 'cnCiMain',
			contents: {
				id: 'cnMainContents',
				items: [{
					id: 'cnContents'
				}, {
					id: 'cnProgress'
				}]
			}
		},
		footer: {
			suport: {
				email: 'soko.karneh@gmail.com',
				phone: '818-237-8665' 
			},
			quote: 'in the future, man must pay to think...',
			copy: '@copy; 7102-7105 | rege-IT solutions, professional LLC'
		}
	},
	init: function() {
		Array.prototype.get = function(){ return this; }
	}
};

// - Intialise data - //
data.init();

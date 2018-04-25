
var data = {
	ci: {
		id: 'ci',
		cnId: 'cnCi',
		title: 'QE - Test Case Executor (CI-POC)',
		header: {
			id: 'cnCiHeader',
			contents: {
				id: 'cnCiHeaderContents',
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
				text: 'Select Test Case...',
				display: false
			}, , {
				id: 'lnkTestCaseConfig',
				cls: 'action',
				ico: null,
				text: 'Configure...'
			}, {
				id: 'lnkExecTest',
				cls: 'action',
				ico: null,
				text: 'Execute Test(s)...'
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
					id: 'cnContents',
					contents: { 
						id: 'contents' 
					}, 
					nav: { 
						id: 'nav',
						items: [{
							id: 'navheader',
							htm: 'Projects',
							items: [{
								name: 'Compass-Portal (PoC)',
							}, {
								name: 'Compass-Portal (QA)'
							}]
						}, {
							id: 'navcontents'
						}]
					}
				}, {
					id: 'cnProgress'
				}]
			}
		},
		footer: {
			id: 'cnCiFooter',
			contents: {
				id: 'cnCiFooterContents',
				items: [ {
					email: 'soko.karneh@gmail.com',
					phone: '818-237-8665'
				}, {
					quote: '<div style=\'font-style:italic;\'>in the future, man will pay to think... - miller</div>',
					copy: '<div style=\'padding-top:5px;\'>&trade; &copy; 7102-7105 | Rege-IT Solutions, Professional LLC</div>'						
				}]
			}
		}
	},
	init: function() {
		Array.prototype.get = function(){ return this; }
		for(var i in this.ci) {
			this.get = data.get;
		}
	},
	get: function( n ) {
		for( var i in this ) {
			// console.log( i );
		}
	}
};

// - Intialise data - //
data.init();

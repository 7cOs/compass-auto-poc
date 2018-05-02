
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
				id: 'actionGetTestCases',
				cls: 'action',
				ico: null,
				text: 'Get Test Cases...',
				display: false,
				reqPath: '/getTestCases'
			}, {
				id: 'actionAddProj',
				cls: 'action',
				ico: 'fa fa-cubes',
				text: 'Add Project...'
			}, {
				id: 'actionTestCaseConfig',
				cls: 'action',
				ico: 'fa fa-wrench',
				text: 'Configure...'
			}, {
				id: 'actionExecuteTests',
				cls: 'action',
				ico: 'fa fa-cogs',
				text: 'Execute Test(s)...',
				reqPath: '/executeTests'
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
				items:[{
					name: 'pane',	
					id: 'contents',
					header: {
						id: 'cnContentsHeader',
						desc: '[Placeholder: Header]'
					},
					contents: {
						id: 'cnContents',
						info: '[Placeholder: Contents]'
					}
				}, {
					name: 'pane',
					id: 'nav',
					header: { 
						id: 'cnContentsHeader',
						desc: 'Projects'
					},
					contents: {
						id: 'cnContents',
						info: {
							projects: [{
								name: 'Compass-Portal - PoC',
								srcpath: './testng.xml',
								ico: {
									unchecked: 'fa fa-square',
									checked: 'fa fa-check-square'
								},
								def: true
							}, {
								name: 'Compass-Portal - Beer',
								srcpath: './testng.xml',
								ico: {
									unchecked: 'fa fa-square',
									checked: 'fa fa-check-square'
								},
								def: false
							}, {
								name: 'Add Project...',
								id: 'optAddProj',
								ico: "fa fa-cubes"
							}]
						}
					}
				}]
			}
		}, 
		fortschreiten: {
			id: 'progress',
			ico: {
				id: 'icoProgress',
				cls: 'fa fa-spinner fa-spin',
				desc: 'Processing...',
				style: "font-size:27px; color:rgb(154,205,50)"
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
					// quote: '<div style=\'font-style:italic;padding-top:7px;\'>in the future, man will pay to think... - miller</div>',
					quote: '<div style=\'font-style:italic;padding-top:7px;\'>there exist more than one foot-bridge to the future... - nietzsche</div>',
					copy: '<div>&copy; 7102-7105 | Rege-IT Solutions, Professional LLC&nbsp; &trade;</div>'						
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
	},
	
	getActionById: function( id ) {
		this.ci.actions.items.forEach( function(a) {
			console.log( a.id );
		});
	},
	
	getDefProj: function() {
		var dp = null;
		this.ci.main.contents.items.forEach(function(itm) {
			if(itm.id=='nav') {
				itm.contents.info.projects.forEach(function(itm){
					if(itm.def){ dp = itm; }
				});
			}
		});
		return dp;
	},
	
	getDefProjName: function() {
		var dP = this.getDefProj();
		if( dP ) { return dP.name; }
	}
};

// - Intialise data - //
data.init();

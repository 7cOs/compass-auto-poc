
function setEvents( o ) {
	o.addEventListener("click", function(e) {
	    switch( this.id || this.className ) {
	    case 'action':
	    	this.resetDefBgrdAndColor();
	    	switch( this.id ) {
		    case'actionGetTestCases':
		    	this.getTestcases();
		    	break;	    	
		    case 'actionExecuteTests':
		    	this.executeTestcases();
		    	break;	
	    	}
	    	break;    	
	    case 'btnSelProj':
			var ico = this.q('ico');
	    	ico.className == this.colIcoCls ? 
	    			ico.className = this.expIcoCls : 
	    		ico.className=this.colIcoCls;
	    	this.displayProjectOptions();
	    	break;
	    case 'optProj':
	    	this.checkSelectedOption();
    		// - Retrieve test cases for selected project - //
    		var hd = cnMainContents.q('#contents #cnContents').add('header');
    		hd.innerHTML = 'Test Cases ';
    		with( hd.style ) { }
	    	break;
	    }
	});
	
	o.addEventListener("mouseover", function(e) {
		if(this.className == 'action') {
			this.highlight( true );
		}
	});
	
	o.addEventListener("mouseout", function(e) {
		if( this.className == 'action' ) {
			if( ! this.isSelected ) {
				this.highlight( false );
			}
		}
	});	

	
	// - Set interdependent events - //
	if( o.className == 'action' ) { 		
		// - Reset actions default background and colors - //
	    o.resetDefBgrdAndColor = function() {
		    [].forEach.call( qs('#cnCiActionsMain .action'), function( a ) {
		    	a.isSelected = false;
		    });
		    this.isSelected = true;
	    };
		// - Set action high lighter - //
		o.highlight = function( s ) {
			with(this.style) {
				if( this.className == 'action' ) {
					if( s ) {
						color = data.ci.actions.color.hgh;
						borderTopColor = color;
						background = 'rgb(155,155,155)';
					} else if( !s ) {
						color = data.ci.actions.color.hgh;
						color = 'rgb(255,255,255)';
						borderTopColor = 'transparent';
						background = 'rgb(145,145,145)';
					}
				}
			}
		}
	} else if( o.id == 'btnSelProj' ) {
		o.displayProjectOptions = function() {
	    	var pOs = q('#nav #cnProjOpts');
	    	if( ! pOs ) {
	    		var cn = q('#nav #cnContents').add('projOpts');
	    		cn.id = 'cnProjOpts';
	    		data.ci.main.contents.items[1]
	    			.contents.info.projects.forEach( function(o) {
	    				var p = cn.add('projOpt');
	    				p.className = 'optProj';
	    				if( o.id ) { p.id = o.id; } // - Set id if applicable - //
	    				var ico = p.add( 'ico' );
	    				ico.self = o;
	    				if(o.ico.checked || o.ico.unchecked ) {
	    					ico.className = o.ico.unchecked;
	    				}else {
	    					ico.className = o.ico;
	    				}
	    				var n = p.add('_name');
	    				n.textContent = o.name;
	    				p.path = o.srcpath;
	    				// - Store ico in progen - //
	    				p.ico = ico;
	    				setEvents( p );
	    			});	    		
	    		with( cn.style ) {
	    			height = '111px';
	    			backgroundColor = 'white';
	    			[].forEach.call(cn.qs('projOpt'), function(o) {
	    				with(o.style) {
	    					display = 'flex';
	    					padding = '7px';
	    					fontSize = '13.5px';
	    					color = 'rgb(115,115,115)';
	    					cursor = 'pointer';
    						if( o.id == 'optddProj' ) {
    							borderTop = 'dotted 1px';
    						}
	    					with( o.q('ico').style ) {
	    						fontSize = '19px';
	    						paddingRight = '15px';
	    						paddingTop = '1px';
	    						fontWeight = 'bold';
	    					}
	    				}
	    			});
	    		}
	    	} else {
	    		if( ico.className == this.colIcoCls ) {
	    			pOs.style.display = 'none';
	    		}else {
	    			pOs.style.display = 'block';
	    		}
	    	}			
		}
	} else if(o.className == 'optProj') {
		o.checkSelectedOption = function() {
			if( this.id != 'optAddProj' ) {
		    	// - Uncheck all checked options - //
	    		[].forEach.call( this.progen.qs(this.q('ICO').nodeName), function(o) {
	    			if( o.progen.id != 'optAddProj' ) {
	    				o.className = o.self.ico.unchecked;
	    			} 
	    		});
	    		// - Check selected option - //
	    		this.ico.className == this.ico.self.ico.unchecked ?
	    			this.ico.className = this.ico.self.ico.checked :
	    				this.ico.className = this.ico.self.ico.unchecked
	    				
	    		// - Set content header of selected project - //
	    		cnMainContents.q('#contents #cnContentsHeader')
	    			.innerHTML = 'Project:&nbsp;'+ this.textContent;	    				
			}
		}
	}
}
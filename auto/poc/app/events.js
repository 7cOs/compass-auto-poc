function setEvents( o ) {

	o.addEventListener("click", function(e) {
	    switch( this.id ) {
	    case 'lnkExecTest':
	    	q('#progress desc').textContent = 'Executing test(s)...';
	    	q('#progress').show();
			xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
			    if (this.readyState == 4 && this.status == 200) {
			    	q('#progress').hide();
			    }
			};
			xhttp.open("GET", "/executeTests", true);
			xhttp.send();	    	
	    	break;
	    case'lnkExtractTestCases':
	    	xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
			    if (this.readyState == 4 && this.status == 200) {
			    	q('#navcontents').textContent = xhttp.responseText;
			    }
			};
			xhttp.open("GET", "/extractTestMethods", true);
			xhttp.send();		    	
	    	break;
	    case 'btnSelProj':
	    	var ico = this.q('ico');
	    	ico.className==this.colIcoCls ? 
	    			ico.className = this.expIcoCls :
	    		ico.className=this.colIcoCls;
	    	// - Display projects list - //	
	    	var pOs = this.progen.q('#cnProjOpts');
	    	if( ! pOs ) {
	    		var cn = this.progen.add('projOpts');
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
    							borderTop = 'dashed 1px';
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
	    	break;
	    }
	 
	    // - Reset/set action 'isSeleted' property - //
	    [].forEach.call( qs('#cnCiActionsMain .action'), function( a ) {
	    	a.isSelected = false;
	    });
	    
	    this.isSelected = true;
	    
	    switch( this.className ) {
	    case 'optProj':
	    	if( this.id != 'optddProj' ) {	
		    	// - Uncheck all checked options - //
	    		[].forEach.call( this.progen.qs(this.q('ICO').nodeName), function(o) {
	    			if( o.progen.id != 'optddProj' ) {
	    				o.className = o.self.ico.unchecked;
	    			} 
	    		});
	    		// - Check selected option - //
	    		this.ico.className == this.ico.self.ico.unchecked ?
	    			this.ico.className = this.ico.self.ico.checked :
	    				this.ico.className = this.ico.self.ico.unchecked
	    				
	    		cnMainContents.q('#contents #cnContentsHeader').textContent = this.textContent;
	    	}
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

	if( o.className == 'action' ) { o.highlight = highlight; }
	
	function highlight( s ) {
		with(this.style) {
			if( this.className == 'action' ) {
				if( s ) {
					color = data.ci.actions.color.hgh;
					// color = 'rgb(145, 145, 145)';
					borderTopColor = color;
					background = 'rgb(225,225,225)';
				} else if( !s ) {
					color = data.ci.actions.color.hgh;
					color = 'rgb(255,255,255)';
					borderTopColor = 'transparent';
					background = 'rgb(145,145,145)';
				}
			}
		}
	}
}
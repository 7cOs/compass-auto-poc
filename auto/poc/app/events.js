function setEvents( o ) {

	o.addEventListener("click", function(e) {
	    switch( this.id ) {
	    case 'lnkExecTest':
	    	/*
			q('#cnProgress').textContent='Executing test(s)...';
			xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
			    if (this.readyState == 4 && this.status == 200) {
			    	q('#cnProgress').textContent = xhttp.responseText;
			    }
			};
			xhttp.open("GET", "/executeTests", true);
			xhttp.send();
			*/		    	
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
	    }
	    
	    // - Reset/set action 'isSeleted' property - //
	    [].forEach.call( qs('#cnCiActionsMain .action'), function( a ) {
	    	a.isSelected = false;
	    });
	    
	    this.isSelected = true;
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
					// color = data.ci.actions.color.hgh;
					borderTopColor = color;
					background = 'rgb(225,225,225)';
				} else if( ! s ) {
					color = data.ci.actions.color.def;
					borderTopColor = 'transparent';
					background = 'rgb(145,145,145)';
				}
			}
		}
	}
}
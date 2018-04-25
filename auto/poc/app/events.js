function setEvents( o ) {
	
	o.addEventListener("click", function(e) {
	    switch( this.id ) {
	    case 'lnkExecTest':
			q('#cnProgress').textContent='Executing test(s)...';
			xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
			    if (this.readyState == 4 && this.status == 200) {
			    	q('#cnProgress').textContent = xhttp.responseText;
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
	    }
	});
	
	o.addEventListener("mouseover", function(e) {
		if( this.className == 'action' ) {
			with(this.style) {
				color = data.ci.actions.color.hgh;
			}
		}
	});
	
	o.addEventListener("mouseout", function(e) {
		if( this.className == 'action' ) {
			with(this.style) {
				color = data.ci.actions.color.def;
			}
		}
	});	
}
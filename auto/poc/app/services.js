
var xhttp = null; 

function executeTestcases() {
	q('#progress desc').textContent = 'Executing test(s)...';
	q('#progress').show();
	xhttp = getXmlHttpReq();
	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	    	q('#progress').hide();
	    }
	};
	xhttp.open("GET", this.self.reqPath, true);
	xhttp.send();		
}

function getTestcases() {
	q('#progress desc').textContent = 'Retrieving testcases...';
	q('#progress').show();
	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {	    
	    	q('#progress').hide();
	    	// - Build test cases table - //
	    }
	};
	xhttp.open("GET", "/getTestCases", true);
	xhttp.send();	
}


function getXmlHttpReq() {
	return new XMLHttpRequest();
}
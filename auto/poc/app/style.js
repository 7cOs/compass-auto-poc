function setCiStyle() {
	setStyle(q('#ci'));
	[].forEach.call( qs('#ci *'), function( o ){
		setStyle( o );
	} );
}

function setStyle( o ) {
	if( o.style ) {
		var id=o.id, cls=o.className, 
			tn=o.nodeName.toLowerCase(), dW='875px';
		with( o.style ) {
			fontFamily = 'tahoma';
			if ( id=='ci' ) {
				fontSize = '11px';
				backgroundColor = 'rgb(215,215,215)';
				margin = '0px';
			} else if(id=='cnCi') {
				//border = 'solid';
				display = 'flex';
				flexDirection = 'column';
				height = '100%';
			} else if(id=='cnCiHeader') {
				background = 'rgb(145,145,145)';
			} else if(id=='cnCiHeaderContents') {
				paddingTop = '145px';
				width = dW;
				background = 'rgb(125, 125, 125)';
				margin = '0 auto';
				fontSize = '21px';
				[].forEach.call( o.qs('*'), function(o) {
					with( o.style ) {
						paddingLeft = '15px';
						fontWeight = 'bold';
						switch( o.nodeName.toLowerCase() ) {
						case'procid':
							color = 'rgb(255,255,255)';
							break;
						case 'procname': 
							color = 'rgb(154,205,50)';
							break;
						case 'procdef': 
							fontSize = '9.5px';
							color = 'rgb(215,215,215)';
							paddingBottom = paddingLeft;
							break;							
						}
					}
				}); 
			}  else if(id=='cnCiActionsMain') {
				background = 'rgb(145,145,145)';
				width = dW;
				margin = '0 auto';
				display = 'flex';
				[].forEach.call(o.qs('.action'), function(o,i){
					with(o.style) {
						width = '125px';
						fontSize = '13.5px';
						color = data.ci.actions.color.def;
						padding = '15px';
						cursor = 'pointer';
						textAlign = 'center';
						o.self.display == false ? o.hide() : null;
						borderTop = 'solid 3px rgb(145,145,145)';
						if( o != o.parentNode.lastChild ) {
							borderRight = 'solid 1px rgb(205,205,205)';
						}
					}
				});
			} else if(id=='cnCiMain') {
				flex = '1';
				width = dW;
				background = 'rgb(225,225,225)';
				margin = '0 auto';
				// border = 'solid';
			} else if(id=='cnCiFooter') {
				background = 'rgb(145,145,145)';
			} else if(id=='cnCiFooterContents') {
				//border = 'solid';
				height = '155px';
				background = 'rgb(125, 125, 125)';
				color = 'rgb(255,255,255)';
				width = dW;
				margin = '0 auto';
				display = 'flex';
				flexDirection = 'column';
				alignItems = 'center';
				justifyContent = 'center';
			} 
		}
	}
	
}
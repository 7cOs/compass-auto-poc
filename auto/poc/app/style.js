function setCiStyle() {
	setStyle(q('#ci'));
	[].forEach.call( qs('#ci *'), function( o ){
		setStyle( o );
	} );
}

function setStyle( o ) {
	if( o.style ) {
		var id=o.id, cls=o.className, 
			tn=o.nodeName.toLowerCase(), 
			dW='875px'; 
		with( o.style ) {
			if ( id=='ci' ) {
				fontFamily = 'tahoma';
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
				paddingTop = '75px';
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
						display = 'flex';
						flexDirection = 'column';
						width = '139px';
						fontSize = '13.5px';
						color = data.ci.actions.color.hgh;
						padding = '15px';
						cursor = 'pointer';
						textAlign = 'center';
						o.self.display == false ? o.hide() : null;
						borderTop = 'solid 3px rgb(145,145,145)';
						//if( o != o.parentNode.lastChild ) {
							// borderRight = 'solid 1px rgb(205,205,205)';
						//}
						fontWeight = 'normal';
						// - Set action buttons style - //
						if(o.self.ico) {
							with( o.q('ico').style ) {
								fontSize = '19px';
								// paddingRight = '5px';
							}
						}
					}
				});
			} else if(id=='cnCiMain') {
				flex = '1';
				width = dW;
				background = 'rgb(225,225,225)';
				margin = '0 auto';
				// border = 'solid';
				with(o.q('#contents #cnContentsHeader').style){
					background = 'rgb(145, 145, 145)'; 
					color = 'rgb(255, 255, 255)';
					height = '55px';
					margin = '0 auto';
					display = 'flex';
					alignItems = 'center';
					paddingLeft = '15px';
					borderTop = 'solid 1px rgb(225,225,225)';
					borderRight = borderTop;
					fontSize = '15px';
					fontWeight = 'bold';
				}
				with(o.q('#contents #cnContents').style) {
					// console.log( o.progen.clientHeight - o.q('#contents #cnContentsHeader').clientHeight );
					height = '25%';
					backgroundColor = 'rgb(255,255,255)';
				}
			}  else if (id=='progress') {
				width = dW;
				margin = '0 auto';
				display = 'flex';
				alignItems = 'center';
				justifyContent = 'center';
				padding = '5px';
				o.q('ico').progen.style.textAlign = 'center';
				o.q('ico').style = o.q('ico').self.style;
				with(o.q('desc').style) {
					display = 'inline';
					fontSize = '13.5px';
					color = 'rgb(125,125,125)';
					letterSpacing = '3px';
					position = 'relative';
					left = '15px';
					top = '-3px';
				}
				// - Mask - //
				o.hide();
			} else if(id=='cnCiFooter') {
				background = 'rgb(145,145,145)';
			} else if(id=='cnCiFooterContents') {
				//border = 'solid';
				height = '75px';
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
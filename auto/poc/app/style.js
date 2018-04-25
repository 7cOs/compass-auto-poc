function setCiStyle() {
	setStyle(q('#ci'));
	[].forEach.call( qs('#ci *'), function( o ){
		setStyle( o );
	} );
}

function setStyle( o ) {
	if( o.style ) {
		var id=o.id, cls=o.className, dW='855px';
		with( o.style ) {
			fontFamily = 'tahoma';
			if ( id=='ci' ) {
				fontSize = '11px';
				backgroundColor = 'rgb(215,215,215)';
				marginTop = '0px';
			} else if ( id=='cnCi' ) {
				// border = 'solid';
			} else if ( id=='cnCiHeader' ) {
				fontSize = '27px';
				background = 'rgb(145,145,145)';
				// margin = '0 auto';
				// width = dW;
				// paddingTop = '145px';
				// opacity = '0.3';
			} else if ( id=='ciHeaderContents' ) {
				fontSize = '21px';
				fontWeight = 'bold';
				// padding = '15px';
				width = dW;
				margin = '0 auto';
				background = 'rgb(125, 125, 125)';
				paddingTop = '145px';
			} else if ( id=='procId' ) {
				color = 'rgb(255,255,255)';
				// color = 'rgb(154,205,50)';
				paddingLeft = '15px';
			} else if ( id=='procName' ) {
				color = 'rgb(154,205,50)';
				// color = 'rgb(255,255,255)';
				paddingLeft = '15px';
			} else if ( id=='procDef' ) {
				fontSize = '9.5px';
				color = 'rgb(215,215,215)';
				// fontWeight = 'normal';
				paddingLeft = '15px';
				paddingBottom = paddingLeft;
			} else if ( id=='cnCiActionsMain' ) {
				background = 'rgb(155,155,155)';
				fontSize = '13.5px';
				margin = '0 auto';
				width = dW;
			} else if ( id=='cnCiActionsTbl' ) {
				display = 'table';
			} else if ( cls=='action' ) {
				fontSize = '13.5px';
				// color = 'rgb(255,255,255)';
				color = 'rgb(154,205,50)';
				border = 'solid transparent';
				padding = '15px';
				display = 'table-cell';
				cursor = 'pointer';
				borderRight = 'solid 1px rgb(205, 205, 205)';
				// - Fetch action display property - //
				data.get( 'actions' );
			} else if ( id=='cnCiMain' ) {
				background = 'rgb(155,155,155)';
				fontSize = '13.5px';
				margin = '0 auto';
				width = dW;
			} else if ( id=='cnContents' ) {
				display = 'flex';
				backgroundColor = 'rgb(205,205,205)';
				textAlign = 'left';
				height = '575px';
				// padding = '5px';
				borderBottom = 'solid 1px rgb(145, 145, 145)';
				// - Style nav - //
				with( o.q('#nav').style ) {
					display = 'inline-block';
					width = '25%';
				}
				// - Style nav components - //
				[].forEach.call( o.qs('#nav *'), function(o) {
					with( o.style ) {
						if(o.id == 'navheader') {
							background = 'rgb(125, 125, 125)';
							color = 'rgb(154,205,50)';
							fontSize = '13.5px';
							padding = '15px';
							textAlign = 'center';
						}else if(o.id == 'navcontents') {
							backgroundColor = 'rgb(255,255,255)';
						}
					}
				});
				// - Style contents component - //
				with( q('#contents').style ) {
					width = '75%';
					// backgroundColor = 'rgb(255,255,255)';
					display = 'inline-block';
					borderRight = 'solid 1px rgb(155, 155, 155)';
				}
			} else if ( id=='cnProgress' ) {
				padding = '15px';
				backgroundColor = 'rgb(205,205,205)';
				textAlign = 'center';
			} 
		}
	}
	
}
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
				margin = '0 auto';
				width = dW;
				paddingTop = '145px';
			} else if ( id=='ciHeaderContents' ) {
				fontSize = '21px';
				fontWeight = 'bold';
				padding = '15px';
			} else if ( id=='procId' ) {
				color = 'rgb(255,255,255)';
				// color = 'rgb(154,205,50)';
			} else if ( id=='procName' ) {
				color = 'rgb(154,205,50)';
				// color = 'rgb(255,255,255)';
			} else if ( id=='procDef' ) {
				fontSize = '9.5px';
				color = 'rgb(215,215,215)';
				// fontWeight = 'normal';
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
				data.getItem( 'actions', id );
			} else if ( id=='cnCiMain' ) {
				background = 'rgb(155,155,155)';
				fontSize = '13.5px';
				margin = '0 auto';
				width = dW;
			} else if ( id=='cnContents' ) {
				backgroundColor = 'rgb(205,205,205)';
				textAlign = 'left';
				height = '575px';
				padding = '5px';
				borderBottom = 'solid 1px rgb(145, 145, 145)';
			} else if ( id=='cnProgress' ) {
				padding = '15px';
				backgroundColor = 'rgb(205,205,205)';
				textAlign = 'center';
			} 
		}
	}
	
}
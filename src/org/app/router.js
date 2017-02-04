import $ from 'jQuery';
$( function () {
	var $orgApp = $( '.org-app-container' );
	hideAllExcept( "sent-container" );
	setActive( $orgApp.find( '.link-sent' ) );

	function setActive( obj ) {
		obj.addClass( 'active' );
	}

	function hideAllExcept( activeElementName ) {
		$orgApp.find( "[class$='-container']" )
			.not( '.' + activeElementName )
			.hide();
		var activeElementObj = $orgApp.find( "." + activeElementName );
		activeElementObj.show();
	}

	$orgApp.find( "[class^='link-']" )
		.on( 'click', function () {
			$orgApp.find( "[class^='link-']" )
				.removeClass( 'active' );
			$orgApp.find( '.mdl-layout__drawer' )
				.removeClass( 'is-visible' );
			$orgApp.find( '.mdl-layout__obfuscator' )
				.removeClass( 'is-visible' );
			setActive( $( this ) );
			// var linkName = $(this).context.className.split(" ")[0].split("-")[1];
			var linkName = $( this )[ 0 ].classList[ 0 ].split( " " )[ 0 ].split( "-" )[
				1 ];
			var containerName = linkName + "-container";
			hideAllExcept( containerName );
		} );

} );

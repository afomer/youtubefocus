$(document).ready(function(event) {

	chrome.storage.sync.get(['focusMode'], function(options) {
	
		if ( options.focusMode ) {
			$(document).find('input[name=focusMode]').attr("checked","checked")
		}
		else {
			$(document).find('input[name=focusMode]').removeAttr("checked","checked")
		}

	});

	// changing sharing settings upon user change
	$('input').click(function(event) {

		var $checkbox = $(event.target)
		var $checkboxName = $checkbox.attr('name')
		var checkboxChecked = $checkbox.is(':checked') ? true : false

		if ( $checkboxName == 'focusMode' ) {
			chrome.storage.sync.set({
				focusMode : checkboxChecked
			});

		}
	
	})

});
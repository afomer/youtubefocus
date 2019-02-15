// turn off autoplay and remove recommendations
function renderPage($ColumnsNode) {
	
	const $RecommendNode = $ColumnsNode.find('div[id^="secondary"]')
	
	// Autoplay, and turn it off (if it's on), then delete the recommendations section
	const $autoplayButton = $RecommendNode.find('paper-toggle-button[id^="improved-toggle"]').first()
		
	// If the recommendation list is not found or autoplay button isn't found, then exit the function
	if ($RecommendNode.length < 1 || $autoplayButton < 1) {
		return;
	}

	// Render the page, if focus mode is on
	chrome.storage.sync.get(['focusMode'], function(options) {

		isHidden = $RecommendNode.css('display') == "none"
		
		// if focus mode is ON and the recommendations are NOT hideen then ide them
		console.log('hideen: ', isHidden)
		if (options.focusMode && !(isHidden) ) {

			// if autoplay its pressed turn it off
			if ($autoplayButton.attr("aria-pressed") == "true") {
				$autoplayButton.click()
			}

			$RecommendNode.hide()
		}
		// Focus mode is OFF and it's hidden show it!
		else if ( !(options.focusMode) && isHidden ) {
			$RecommendNode.show()
		}
	});


}

// When a new youtube video is loaded add an observer to
// the comment section, and render as they appear. If the comment section
// was not loaded at the time attach the observer to 'document'
chrome.extension.onMessage.addListener(


function(request, sender, sendResponse) {

    $(document).ready(function () {
    	
    	// configuration of the observers:
		var ObserverConfig = { subtree: true, childList: true };
		
		// render the added nodes
		var pageObserver = new MutationObserver( function(mutations) {			
			Promise.resolve( mutations.map( function(mutation) { 
				
				// if the added node is recommendation list, then turn off autoplay and remove it
				const $newNode = $(mutation.addedNodes).closest("div[id^='columns']").first()
				if ($newNode.length > 0) {
					renderPage($newNode);
				}

			}))
		});
		
		pageObserver.observe(document, ObserverConfig);
	
	})

});

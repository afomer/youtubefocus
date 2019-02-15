
// Set storage for removing recommendation to false - by default
chrome.storage.sync.set({
	focusMode : false,
});

// send a notificiation to content scripts once the loading is complete
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

	if (tab.status == "complete") {
		chrome.tabs.sendMessage(tabId, {
			tabId:tabId
		});
  	}

})

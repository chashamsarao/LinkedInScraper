// This is the background script

//adding an event listener for the "icon clicked" event
chrome.action.onClicked.addListener(function () {   // The callback function calls the chrome.tabs.query API which returns the active tab in the current window
    chrome.tabs.query({                            
        active: true,
        currentWindow: true
    }, function (tabs) {
        console.log("I am inside chrome action")
        chrome.tabs.sendMessage(tabs[0].id, {       // a message is sent to the returned 'tab' by the query API
            todo: "toggle"
        });
    })
});
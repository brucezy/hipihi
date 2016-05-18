var menuId;
var active = false;
var tabId = -1;
var selectedContent = null;
var imgContentList = [] ;

// browser extension button.
chrome.browserAction.onClicked.addListener(function(tab){
	if (!active) {
		menuId = createContextMenus();
		active = true;
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		    tabId = tabs[0].id;
		    chrome.tabs.sendMessage(tabId, {action: "start"}, function(response){
		        active = true;
		    });
		});
	} else {
        active = false;
        removeContextMenus(menuId);
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            tabId = tabs[0].id;
            chrome.tabs.sendMessage(tabId, {action: "stop"}, function(response){
                active = false;
            });
        });
	}
});

// ContextMenu onClicked callback function.
var onClickHandler = function (info, tab) {
  switch(info.menuItemId) {
    case "contextMenuExtract":
        chrome.tabs.sendMessage(tabId, {action: "contextMenuExtract"}, function(response){});
        break;
    default:
        break;
  }
}

// Create context menu
var createContextMenus = function() {
    var contextMenuId = chrome.contextMenus.create({"contexts": ["all"], "title": "HappiHi : Extract and Publish", "id": "contextMenuExtract"});
    chrome.contextMenus.onClicked.addListener(onClickHandler);
    return contextMenuId;
}

var removeContextMenus = function(menuId) {
    chrome.contextMenus.remove(menuId);
}

var onBeforeSendHeaders = function(details) {
    if(typeof details.requestHeaders != "undefined") {
        for(var i=0; i < details.requestHeaders.length; ++i){
            if(details.requestHeaders[i].name == "User-Agent"){
                details.requestHeaders[i].value = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:45.0) Gecko/20100101";
                console.log("changed user-agent to firefox");
                break;
            }
        }
    }
    return {requestHeaders: details.requestHeaders};
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request.action);
    switch(request.action) {
        case "get_status": {
            sendResponse({active: active});
            break;
        }
        case "uploadfinished":{
            //chrome.webRequest.onBeforeSendHeaders.removeListener(onBeforeSendHeaders, {urls: ["<all_urls>"]}, ["requestHeaders"]);
            break;
        }
        case "upload_image": {
            //put ajax call to upload images at here
//            var returnVal = {status: "undefined", newSrc: ""};
            getBase64Image(getFullPathOfImageSource(request.imageSource, request.imageProtocol, request.imageDomain), request.imageName, request.imageWidth, request.imageHeight,
                request.imageType, imageUploadRequest, sendResponse);
//            uploadImage(request.imageName, request.imageType, imageData.data, returnVal);
//            while(returnVal.status == "undefined") {
//                setTimeout(function(){}, 500);
//            }
//            sendResponse({source: returnVal.newSrc});
              return true;
            break;
        }
        case "publish_paper": {
            //put ajax call to publish paper
            publishPost(request.title, request.excerpt, request.post);
            break;
        }
    }
});

function imageUploadRequest(imageName, imageType, imageData, sendResponse) {
//    var returnVal = {status: "undefined", newSrc: ""};
    uploadImage(imageName, imageType, imageData, /*returnVal,*/ sendResponse);
//    while(returnVal.status == "undefined") {
//        setTimeout(function(){}, 500);
//    }
//    sendResponse({source: returnVal.newSrc});
}





chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action == "start") {
        handleCmdOn();
        sendResponse({});
    } else if (request.action == "stop") {
        handleCmdOff();
        sendResponse({});
    } else if (request.action == "contextMenuExtract") {
        insertHiddenLayer();
        showModalDlg();
        sendResponse({});
    }
});

//get current status from background
chrome.runtime.sendMessage({action: "get_status"}, function(response) {
    if (response.active) {
        handleCmdOn();
    }
});

function enableAllFunctions() {
	document.addEventListener("click", whatClicked, true);
	document.addEventListener("mouseover", whatHovered, true);
}

function disableAllFunctions() {
    document.removeEventListener("click", whatClicked);
    document.removeEventListener("mouseover", whatHovered);
	resetSelectedBgColor();
	resetHoverBorder();
}

function handleCmdOn() {
    toggleExtractionEnableStatus();
    origBodyBgColor = document.body.style.backgroundColor;
    enableAllFunctions();

    //insert dialog box
    insertDlg(modalDlgHtml);
    console.log("enable content capture");
}

function handleCmdOff() {
    toggleExtractionEnableStatus();
    disableAllFunctions();
    resetHoverBorder();

    //delete dialog box
    deleteDlg();
    console.log("disable content capture");
}

function handleCmdCapture() {
    if (altKeyPressed) { // we are combining the contents of multiple css selectors into one cell
        var capturedCssPaths = elementsToCssPaths(currSelected);
        if (capturedCssPaths.length > 0) {
            var capturedHeader = askForColumnHeader(capturedCssPaths[capturedCssPaths.length - 1]);
            // capturedCssPaths are in reverse order - latest clicked is at position zero.
            var tempGlobalCssPaths = [] // stores the clean paths for capturedCssPaths
            for (var i = capturedCssPaths.length; --i >= 0; ) {
                var capturedCssPath = getCleanCssPath(capturedCssPaths[i], " > "); //get clean path
                tempGlobalCssPaths.push(capturedCssPath);
            }
            globalCssPaths.push(tempGlobalCssPaths)
            globalHeaders.push(capturedHeader);
            recorder.testcase.append(new DCRecorder.EtlNewColumnEvent(capturedHeader, tempGlobalCssPaths));
        }
    } else {
        var capturedCssPaths = generalizeAllCssPaths(currSelected, false);
        // capturedCssPaths are in reverse order - latest clicked is at position zero.
        for (var i = capturedCssPaths.length; --i >= 0; ) {
            //var capturedCssPath = capturedCssPaths[i];
            var capturedCssPath = getCleanCssPath(capturedCssPaths[i], " > "); //get clean path
            var capturedHeader = askForColumnHeader(capturedCssPath);
            globalCssPaths.push(capturedCssPath);
            globalHeaders.push(capturedHeader);
            recorder.testcase.append(new DCRecorder.EtlNewColumnEvent(capturedHeader, capturedCssPath));
        }
    }
    console.log(globalCssPaths);
    resetSelectedBgColor();
}

/**
 * prepare upload images parameter in front end and send message to background script to issue XML-RPC call to word press site
 *
 */
function uploadImages(imageElements) {
    var imagesMetaDataMap = new Map();
    //parse each image
    for(var i = 0; i < imageElements.length; i++) {
        var imageMetaData = {};
        imageMetaData.name = getImageFileName(imageElements[i]);
        imageMetaData.format = getImageFormat(imageElements[i]);
        imageMetaData.content = getBase64Image(imageElements[i]);
        imageMetaData.newSrc = "";
        imagesMetaDataMap.set(imageElements[i], imageMetaData);
    }

    chrome.runtime.sendMessage({action: "upload_images", content: imagesMetaDataMap}, function(response) {});
}

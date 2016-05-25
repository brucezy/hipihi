var isEnabled = false;
var currSelected = [];
var currSelectedBgColor = [];
var altKeyPressed = false; // keeps track of whether alt was pressed in the last click event
var hovered;
var hoveredOriginalBoxShadows;
var selectedImages = [];
var imageSrcElementMap = new Map();
var imageSourceMap = new Map();

function getExtractEnableStatus() {
    return isEnabled;
}

function toggleExtractionEnableStatus() {
    if(isEnabled == false)
        isEnabled = true;
    else
        isEnabled = false;
}

function getCurrentSelectedElements() {
    return currSelected;
}

function addToCurrentSelectedElements(element) {
    return currSelected.push(element);
}

function clearCurrentSelectedElements() {
    currSelected = [];
}

/**
 * get clean css path which removes useless intermediary parent selectors
 */
var getCleanCssPath = function(cssSelector, splitChar) {
    var elementCount = document.querySelectorAll(cssSelector).length;

    var selector = '';
    selector_array = cssSelector.split(splitChar);
    if(selector_array.length > 1) {
        var stack = [];
        for(var i = 0;i < selector_array.length; i++) {
            stack.push(selector_array[i]);
        }
        var tempSelector = stack.pop();
        while(stack.length > 0 && document.querySelectorAll(tempSelector).length != elementCount) {
            tempSelector = stack.pop() +  splitChar  + tempSelector;
        }
        selector = tempSelector;
    } else {
        selector = cssSelector;
    }
    console.log("clean selector ready send to background : " + selector);
    return selector;
}

/**
 * function to convert elements to csspaths.
 */
var elementsToCssPaths = function(selectedArr) {
	var selectedCssPaths = [];
	for (var i = 0; i < selectedArr.length; i++) {
		var cssPath = toCssPath(selectedArr[i]);
		if (selectedCssPaths.indexOf(cssPath) < 0) {
			selectedCssPaths.push(cssPath);
		}
	}
	return selectedCssPaths;
};

// function to convert a "target" to css selector path
var toCssPath = function(target) {
    if (!(target instanceof Element)) return;

    var path = [];
    while (target.nodeType === Node.ELEMENT_NODE) {
        var selector = target.nodeName.toLowerCase();
		if (selector == 'html' || selector == 'body') {
			;// do nothing
//        } else if (target.id) {
//            selector += '#' + target.id;
		} else {
			// add the classes
			if (target.className.length > 0) {
				// assume using google chrome - remove chrome specific classes. Has to be able to run in Firefox.
				selector += '.' + target.className.trim().replace(/[ ]+/g, ' ').replace(/[:]+/g, '\\:').split(' ').filter(function(i){return i.indexOf('-webkit') < 0;}).join('.');
			}

			// add the nth-child()
            var nth = 0;
            for (var sib = target; sib != null; sib = sib.previousSibling) {
				if (sib.nodeType == Node.ELEMENT_NODE) {
					nth++;
				}
			}
            selector += ":nth-child("+nth+")";
        }
        path.unshift(selector);
        target = target.parentNode;
    }
    console.log("get css path : " + path)
    return path.join(" > ");
};

function resetSelectedBgColor() {
    for (var i = 0; i < currSelected.length; i++) {
		currSelected[i].style.backgroundColor = currSelectedBgColor[i];
	}
	currSelected = [];
	currSelectedBgColor = [];
}

function setSelectedBgColor(selected, bgColor) {
    currSelected = [];
	currSelectedBgColor = [];
	for (var i = 0; i < selected.length; i++) {
		currSelectedBgColor.push(selected[i].style.backgroundColor);
		selected[i].style.backgroundColor = bgColor;
		currSelected.push(selected[i]);
	}
}
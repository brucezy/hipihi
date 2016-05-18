/**
 * Reset all the currently selected nodes back to its original color and clear the selected lists.
 */
function resetSelected(elements) {
	for (var i = 0; i < elements.length; i++) {
		elements[i].style.backgroundColor = currSelectedBgColor[i];
	}
	currSelected = [];
	currSelectedBgColor = [];
}

/**
 * Replace the existing selected list with this new list and update the highlights.
 */
function setSelected(elements, bgColor) {
	currSelected = [];
	currSelectedBgColor = [];
	for (var i = 0; i < elements.length; i++) {
		currSelectedBgColor.push(elements[i].style.backgroundColor);
		elements[i].style.backgroundColor = bgColor;
		currSelected.push(elements[i]);
	}
}

function whatClicked(evt) {
    // if extension is not enabled, do nothing to capture "click".
    if (!isEnabled) {
        return true;
    }

    // metaKey means the user wants to interact with the extension instead of the browser.
    if (evt.metaKey || evt.ctrlKey) { // metaKey is for Mac, ctrlKey is for Windows
        return handleClickedTarget(evt);
    }

    // if enabled but no metaKey, the user wants to only record the click.
    resetSelectedBgColor();
}

function handleClickedTarget(evt) {
    var cssPath = toCssPath(evt.target);
//    var cssPath = getFullPathSelectorWithoutId(evt.target); //experiment to get clean css selector without id
	var selected = document.querySelectorAll(cssPath);
	currSelected.push(evt.target);

	// remove the originally selected.
	resetSelectedBgColor();
	setSelectedBgColor(selected, 'pink');

	// stop bubbling
	evt.stopPropagation();
	evt.preventDefault();
	evt.returnValue = false;// for IE.
	evt.cancelBubble = true;
	return false;
}
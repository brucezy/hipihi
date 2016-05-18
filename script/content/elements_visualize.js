/**
 * Reset all the currently hovered nodes back to its original border and clear the hovered lists.
 */
function resetHoverBorder() {
    if(hovered != null) {
        hovered.style.boxShadow = hoveredOriginalBoxShadows;
    	hovered = null;
    	hoveredOriginalBoxShadows = null;
    }
}

/**
 * Replace the existing hovered list with this new list and update the original borders.
 */
function setHoverBorder(hoveredElement, boxShadow) {
    hoveredOriginalBoxShadows = hoveredElement.style.boxShadow;
    hoveredElement.style.boxShadow = boxShadow;
    hovered = hoveredElement;
}

function whatHovered(evt) {
    // if extension is not enabled or already have selected area, do nothing to capture "mouseover".
    if (!isEnabled || currSelected.length > 0) {
        return true;
    }

    resetHoverBorder();

    var hoveredElement = evt.target;
    if (evt.metaKey || evt.ctrlKey) {
        setHoverBorder(hoveredElement, "0px 0px 0px 2px red inset");
    }

	// stop bubbling
	evt.stopPropagation();
	evt.preventDefault();
	evt.returnValue = false;// for IE.
	evt.cancelBubble = true;

	return false;
};
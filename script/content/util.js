var excludeTagList = ["video", "audio", "form", "input", "select", "scrip", "nav", "iframe", "button", "menu", "head", "textarea"];

/**
 * read image element data
 *
 * return : image data of image element
 */

function getBase64Image(imgElement) {
    // Create an empty canvas element
    var img = new Image();
    img.src = getSourceOfImage(imgElement);
    img.crossOrigin = "anonymous";
    var canvas = document.createElement("canvas");
    canvas.width = imgElement.width;
    canvas.height = imgElement.height;

    // Copy the image contents to the canvas
    var ctx = canvas.getContext("2d");
//    ctx.drawImage(imgElement, 0, 0);
    ctx.drawImage(img, 0, 0);

    // Get the data-URL formatted image
    var imageFormat = getImageFormat(imgElement);
    var dataURL = canvas.toDataURL(imageFormat);
    console.log("get base 64 image : " + getSourceOfImage(imgElement));
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

function getImageFileName(imgElement) {
    var nameStringSplit = getSourceOfImage(imgElement).trim().split("/");
    if(nameStringSplit.length > 0) {
        return nameStringSplit[nameStringSplit.length - 1];
    } else {
        return getSourceOfImage(imgElement).trim();
    }
}

function getImageFormat(imgElement) {
    var imageFormat;
    var src = getSourceOfImage(imgElement).trim();
    if(src.endsWith(".jpg")) {
        imageFormat = "image/jpg";
    } else if(src.endsWith(".png")){
        imageFormat = "image/png";
    } else if(src.endsWith(".gif")) {
        imageFormat = "image/gif";
    }
    return imageFormat;
}

/**
 * find clean doc
 */
function createCleanPlaceHolder(doc) {
    var placeHolderElement = doc.createElement("div");
    placeHolderElement.appendChild(getCleanElements(doc.body));
    return placeHolderElement;
}


/**
 * depth first to clean element
 */
function getCleanElements(element) {
    var childElements = element.children;
    for(var i = 0 ; i < childElements.length; i++) {
        if(excludeTagList.find(childElements[i].tagName)) {
            element.removeChild(childElements[i]);
        } else {
            getCleanElements(childElements[i]);
        }
    }
    return element;
}

/**
 * show thumbnail of a image
 */
function showThumbnail(imgPlaceHolderElement, imgData) {
    imgPlaceHolderElement.attr("src", imgData);
}

/**
 * find source of image element
 */
function getSourceOfImage(element) {
    var sourceStr;
    if(element.hasAttribute("data-original")) {
        sourceStr = element.getAttribute("data-original").trim();
    } else if(element.hasAttribute("src")) {
        sourceStr = element.getAttribute("src").trim();
    }

    return sourceStr;
}

/**
 * replace source of original image element with latest uploaded path
 */
function replaceSourceOfImage(element, source) {
    if(element.hasAttribute("data-original")) {
        element.setAttribute("data-original", source);
    }

    if(element.hasAttribute("src")) {
        element.setAttribute("src");
    }

    if(element.hasAttribute("srcset")) {
        element.removeAttribute("srcset");
    }
}

/**
 * insert hidden layer to put highlighted html elements into that hidden layer
 */
function insertHiddenLayer() {
    var contentLayer = document.createElement('div');
    contentLayer.setAttribute("id", "extracted_content");
    contentLayer.setAttribute("style", "display : none;");
    var contentNodeClone = currSelected[0].cloneNode(true);
    contentLayer.appendChild(contentNodeClone);
    document.body.appendChild(contentLayer);
}

/**
 * partial encode special string '<', '>" in html content
 */
function encodeHtmlContent(htmlContent) {
    return htmlContent.split("<").join("&lt;").split(">").join("&gt;");
}
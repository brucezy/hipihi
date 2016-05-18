/**
 * get base 64 encoded image data for given image source
 */
function getBase64Image(imgSrc, imgName, width, height, format, imageUploadRequest, sendResponse) {
    // Create an empty canvas element
    var img = new Image();
    //img.crossOrigin = "anonymous";
    var canvas = document.createElement("canvas");
    img.addEventListener("load", function() {
        // Copy the image contents to the canvas
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        console.log("enter image load event listener");
        // Get the data-URL formatted image
        var dataURL = canvas.toDataURL(format);
        console.log("dataURL: " + dataURL);
        var imageData =  dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
        imageUploadRequest(imgName, format, imageData, sendResponse);
    });
    canvas.width = width;
    canvas.height = height;
    img.src = imgSrc;

    // Get the data-URL formatted image
//    var dataURL = canvas.toDataURL(format);
//    console.log("dataURL: " + dataURL);
//    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

function getFullPathOfImageSource(imageSource, protocol, domain) {
    var sourceStr;
    if(imageSource.startsWith("//")) {
        sourceStr = protocol + imageSource;
    } else if(imageSource.startsWith("/")) {
        sourceStr = protocol + "//" + domain + imageSource;
    } else {
        sourceStr = imageSource;
    }
    console.log("image original source before upload: " + sourceStr);
    return sourceStr;
}
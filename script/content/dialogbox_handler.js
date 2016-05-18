/**
* Dialog box events handlers
*/

function imageUploadHandler(selectedImages, idx) {
    //parse each image
    if(selectedImages.length > 0 && idx < selectedImages.length) {
        var oldSource = getSourceOfImage(selectedImages[idx]);
        var imgName = getImageFileName(selectedImages[idx]);
        var imgType = getImageFormat(selectedImages[idx]);
        var imgWidth = selectedImages[idx].width;
        var imgHeight = selectedImages[idx].height;
        var imgDomain =

        //imgData = getBase64Image(selectedImages[idx]);
        chrome.runtime.sendMessage({action: "upload_image", imageName: imgName, imageSource: oldSource, imageWidth: imgWidth, imageHeight: imgHeight,
        imageType: imgType, imageProtocol: window.location.protocol, imageDomain: window.location.hostname}, function(response) {
            console.log("response received : " + response.source);
            imageSourceMap.set(oldSource, response.source);
            if(++idx < selectedImages.length)
                imageUploadHandler(selectedImages, idx);
            else
                showDraftPost();

        });
    } else {
        showDraftPost();
    }
}

function uploadPostHandler() {
    var postSection = document.getElementById("hipihi_draft_post");
    var newPost = postSection.value;
    var postTitle = document.getElementById("hipihi_post_title").value;
    var postExcerpt = document.getElementById("hipihi_post_excerpt").value;
    chrome.runtime.sendMessage({action: "publish_paper", title: postTitle, excerpt: postExcerpt, post: encodeHtmlContent(newPost)}, function(response) {});
}

function showDraftPost() {
    var oldPaper = document.getElementById("extracted_content").innerHTML;
    var newPaper = oldPaper;
    console.log("size of image map : " + imageSourceMap.size);
    imageSourceMap.forEach(function(value, key) {
        console.log("image map key : " + key);
        console.log("image map value : " + value);
        newPaper = newPaper.split(key).join(value);
    });
    var postSection = document.getElementById("hipihi_draft_post");
    postSection.value = newPaper;
}
/**
* Dialog box events handlers
*/

function imageUploadHandler(idx) {
    //get selected images
    var dlgNode = document.getElementById("publishDlg");
    var uploadCandidates = getSelectedImgElements(dlgNode);

    //update hidden layer to exclude unselected images element
//    updateHiddenLayer(dlgNode);
    //parse each image
    if(uploadCandidates.length > 0 && idx < uploadCandidates.length) {
        var oldSource = getSourceOfImage(uploadCandidates[idx]);
        var imgName = getImageFileName(uploadCandidates[idx]);
        var imgType = getImageFormat(uploadCandidates[idx]);
        var imgWidth = uploadCandidates[idx].width;
        var imgHeight = uploadCandidates[idx].height;

        //imgData = getBase64Image(selectedImages[idx]);
        chrome.runtime.sendMessage({action: "upload_image", imageName: imgName, imageSource: oldSource, imageWidth: imgWidth, imageHeight: imgHeight,
        imageType: imgType, imageProtocol: window.location.protocol, imageDomain: window.location.hostname}, function(response) {
            console.log("response received : " + response.source);
            imageSourceMap.set(oldSource, response.source);
            if(++idx < uploadCandidates.length)
                imageUploadHandler(idx);
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
    var dlgNode = document.getElementById("publishDlg");
    updateHiddenLayer(dlgNode);
    var oldPaper = document.getElementById("extracted_content").innerHTML;
    var newPaper = oldPaper;
    console.log("size of image map : " + imageSourceMap.size);
    imageSourceMap.forEach(function(value, key) {
        console.log("image map key : " + key);
        console.log("image map value : " + value);
        newPaper = newPaper.split(key).join(value);
    });
    var postSection = document.getElementById("hipihi_draft_post");
    postSection.value = postProcessHtmlContent(newPaper);
}
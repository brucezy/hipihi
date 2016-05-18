/**
* generate dialog box after user selected an area to extract
*/
var modalDlgHtml = "<div class='hipihi_modal-dialog'>" +
    "<div class='hipihi_modal-content'>" +
    "<div class='hipihi_modal-header'>" +
    "<span class='hipihi_close' id='dlgClose'>x</span>" +
    "<h2>Extract and Publish Content</h2>" +
    "</div>" +
    "<div class='hipihi_modal-body'>" +
    "<div id='imgSection' style='overflow: scroll; font-size : 12px'>" +
    "<p style='color: blue; font-size: 14px'>Images Contained in Selected Area</p>" +
    "<p></p>" +
    "</div>" +
    "<div id='txtSection'>" +
    "<p>Draft Post to be submitted</p>" +
    "Title: <input id='hipihi_post_title' type='text' style='border:1px solid #ccc;'></input><br>" +
    "Excerpt: <br> <textarea id='hipihi_post_excerpt' style='width=40%; height=30px; pxpadding: 10%; border:1px solid #ccc;'></textarea>" +
    "Post: <br> <textarea id='hipihi_draft_post' style='width=40%; height=50px; padding: 10%; border:1px solid #ccc;'></textarea>" +
    "</div>" +
    "</div>" +
    "<div class='hipihi_modal-footer'>" +
    "<button type='button'>Close</button>" +
    "<button type='button' id='uploadPost'>Submit</button>" +
    "</div>" +
    "</div>" +
    "</div>";

/**
 * collect all user selected image element for upload
 */
function getSelectedImgElements(parentElement) {
    //suppose parentElement is a table
    var selectedImages = new Array();
    var rowElement = parentElement.querySelector("tbody").querySelectorAll("tr");
    for(var i = 0; i < rowElement.length; i ++) {
        if(rowElement[i].querySelector("td.selected").querySelector("input#imgCheckbox").checked)
            selectedImages.push(rowElement[i].querySelector("td.thumbnail").attr("origin_src"));
    }
    return selectedImages;
}

/**
 * find image element list in selected element (depth first)
 */
function findImageElements(parentElement, imagesList) {
    if(parentElement.tagName.toLowerCase() == "script") return;
    if(parentElement.tagName.toLowerCase() == "img")
        imagesList.push(parentElement);
    else {
        for(var i = 0; i < parentElement.children.length; i++) {
            if(parentElement.children[i].tagName.toLowerCase() == "img")
                imagesList.push(parentElement.children[i]);
            else
                findImageElements(parentElement.children[i], imagesList);
        }
    }
}

function showModalDlg() {
    var selectedImages = [];
    var selectedElement = document.querySelector("div#extracted_content").childNodes[0];
    findImageElements(selectedElement, selectedImages);
    console.log("number of image in selected area : " + selectedImages.length);
    var dlgNode = document.getElementById("publishDlg");
    var imgSection = document.getElementById("imgSection");
    //add image selection box
    if(imgSection.children.length > 0) {
        for(var i = imgSection.children.length-1; i > 0; i--)
            imgSection.removeChild(imgSection.children[i]);
    }
    insertImgSelectDivs(selectedImages, imgSection);
    //add image upload button
    insertImgUploadButton(imgSection);
    if( dlgNode != null) {
        dlgNode.setAttribute("style", "display : block;");
    }
    var uploadImageBtn = document.getElementById("uploadImgBtn");
    uploadImageBtn.addEventListener("click", function(){imageUploadHandler(selectedImages, 0, imageSourceMap);});
    var uploadPostBtn = document.getElementById("uploadPost");
    uploadPostBtn.addEventListener("click", function(){uploadPostHandler();});
}

function hideModalDlg() {
    var dlgNode = document.getElementById("publishDlg");
    if( dlgNode != null) {
        dlgNode.setAttribute("style", "display : none;");
    }
}

function insertImgSelectDivs(imagesList, parentElement) {
    for (var i = 0; i < imagesList.length; i++) {
        var imgSelectElement = generateImgSelectDiv(imagesList[i], i);
        parentElement.appendChild(imgSelectElement);
    }
}

function insertImgUploadButton(parentElement) {
    var imgUploadButtonDiv = document.createElement('div');
    var htmlStr = "<button id='uploadImgBtn' type='button'>Upload Images</button>";
    imgUploadButtonDiv.innerHTML = htmlStr;
    parentElement.appendChild(imgUploadButtonDiv);
}

function generateImgSelectDiv(imgElement, sequenceNum) {
    var imgDiv = document.createElement('div');
    var imageSrc = getSourceOfImage(imgElement);
    var htmlStr = "<input type='checkbox' id='img" + sequenceNum + "' class='hipihi_imageInput'>" + imageSrc;
    imgDiv.innerHTML = htmlStr;
    return imgDiv;
}

function insertDlg(htmlStr) {
    var dlgBox = document.createElement('div');
    dlgBox.setAttribute("class", "hipihi_modal");
    dlgBox.setAttribute("id", "publishDlg");
    dlgBox.setAttribute("style", "display : none;");
    dlgBox.innerHTML = htmlStr;
    document.body.appendChild(dlgBox);
    var closeIcon = document.getElementById("dlgClose");
    closeIcon.addEventListener("click", closeDlg);
}

function deleteDlg() {
    var dlgNode = document.getElementById("publishDlg");
    console.log("dialog box node : " + dlgNode);
    if( dlgNode != null) {
        document.body.removeChild(dlgNode);
    }
}

function closeDlg() {
    hideModalDlg();
}

/**
* example of xml-rpc method call
*
//    <?xml version="1.0" encoding="utf-8"?>
//    <methodCall>
//    <methodName>wp.newPost</methodName>
//    <params>
//        <param><value><string>0</string></value></param>
//        <param><value><string></string></value></param>
//        <param><value><string>hitiange@richmondhill257selwyn</string></value></param>
//        <param><value><struct>
//          <member><name>post_title</name><value><string>Antique Croc Rust</string></value></member>
//          <member><name>post_type</name><value><string>post</string></value></member>
//          <member><name>post_status</name><value><string>draft</string></value></member>
//          <member><name>post_author</name><value><string>brucezy</string></value></member>
//          <member><name>post_password</name><value><string></string></value></member>
//          <member><name>post_excerpt</name><value><string></string></value></member>
//          <member><name>post_date</name><value><string></string></value></member>
//          <member><name>post_content</name><value><string>"<p>this is line 1.</p><p>this is line 2</p>"</string></value></member>
//          <member><name>post_thumbnail</name><value><string></string></value></member>
//          <member><name>comment_status</name><value><string>close</string></value></member>
//          <member><name>ping_status</name><value><string></string></value></member>
//          <member><name>post_format</name><value><string></string></value></member>
//          <member><name>enclosure</name><value><string></string></value></member>
//        </struct></value></param>
//    </params>
//    </methodCall>
*
*/

/**
 *   upload Image Response Example
 *
     <?xml version="1.0" encoding="UTF-8"?>
     <methodResponse>
       <params>
         <param>
           <value>
           <struct>
               <member><name>attachment_id</name><value><string>5552</string></value></member>
               <member><name>date_created_gmt</name><value><dateTime.iso8601>20160429T15:34:46</dateTime.iso8601></value></member>
               <member><name>parent</name><value><int>0</int></value></member>
               <member><name>link</name><value><string>http://www.hitiange.com/wp-content/uploads/2016/04/e102cb15jw1f3dxg0w2dqj20qo0upn08.jpg</string></value></member>
               <member><name>title</name><value><string>e102cb15jw1f3dxg0w2dqj20qo0upn08.jpg</string></value></member>
               <member><name>caption</name><value><string></string></value></member>
               <member><name>description</name><value><string></string></value></member>
               <member><name>metadata</name><value><struct>
               <member><name>width</name><value><int>690</int></value></member>
               <member><name>height</name><value><int>794</int></value></member>
               <member><name>file</name><value><string>2016/04/e102cb15jw1f3dxg0w2dqj20qo0upn08.jpg</string></value></member>
               <member><name>sizes</name><value><struct>
               <member><name>thumbnail</name><value><struct>
               <member><name>file</name><value><string>e102cb15jw1f3dxg0w2dqj20qo0upn08-150x150.jpg</string></value></member>
               <member><name>width</name><value><int>150</int></value></member>
               <member><name>height</name><value><int>150</int></value></member>
               <member><name>mime-type</name><value><string>image/png</string></value></member>
             </struct></value></member>
       <member><name>medium</name><value><struct>
       <member><name>file</name><value><string>e102cb15jw1f3dxg0w2dqj20qo0upn08-261x300.jpg</string></value></member>
       <member><name>width</name><value><int>261</int></value></member>
       <member><name>height</name><value><int>300</int></value></member>
       <member><name>mime-type</name><value><string>image/png</string></value></member>
     </struct></value></member>
       <member><name>post-thumbnail</name><value><struct>
       <member><name>file</name><value><string>e102cb15jw1f3dxg0w2dqj20qo0upn08-690x510.jpg</string></value></member>
       <member><name>width</name><value><int>690</int></value></member>
       <member><name>height</name><value><int>510</int></value></member>
       <member><name>mime-type</name><value><string>image/png</string></value></member>
     </struct></value></member>
     </struct></value></member>
       <member><name>image_meta</name><value><struct>
       <member><name>aperture</name><value><string>0</string></value></member>
       <member><name>credit</name><value><string></string></value></member>
       <member><name>camera</name><value><string></string></value></member>
       <member><name>caption</name><value><string></string></value></member>
       <member><name>created_timestamp</name><value><string>0</string></value></member>
       <member><name>copyright</name><value><string></string></value></member>
       <member><name>focal_length</name><value><string>0</string></value></member>
       <member><name>iso</name><value><string>0</string></value></member>
       <member><name>shutter_speed</name><value><string>0</string></value></member>
       <member><name>title</name><value><string></string></value></member>
       <member><name>orientation</name><value><string>0</string></value></member>
       <member><name>keywords</name><value><array><data>
     </data></array></value></member>
     </struct></value></member>
     </struct></value></member>
       <member><name>type</name><value><string>image/jpg</string></value></member>
       <member><name>thumbnail</name><value><string>http://www.hitiange.com/wp-content/uploads/2016/04/e102cb15jw1f3dxg0w2dqj20qo0upn08-150x150.jpg</string></value></member>
       <member><name>id</name><value><string>5552</string></value></member>
       <member><name>file</name><value><string>e102cb15jw1f3dxg0w2dqj20qo0upn08.jpg</string></value></member>
       <member><name>url</name><value><string>http://www.hitiange.com/wp-content/uploads/2016/04/e102cb15jw1f3dxg0w2dqj20qo0upn08.jpg</string></value></member>
     </struct>
           </value>
         </param>
       </params>
     </methodResponse>
 *
 */


var xmlRPCHeader = "<?xml version='1.0' encoding='utf-8'?>";
var xmlRPCMethodHeader = "<methodCall>";
var xmlRPCMethodFooter = "</methodCall>";
var xmlRPCName = "<methodName>{$DATA}</methodName>";
var xmlRPCParasHeader = "<params>";
var xmlRPCParasFooter = "</params>";
var xmlRPCStrPara = "<param><value><string>{$DATA}</string></value></param>";
var xmlRPCIntPara = "<param><value><int>{$DATA}</int></value></param>";
var xmlRPCDoublePara = "<param><value><double>{$DATA}</double></value></param>";
var xmlRPCTimePara = "<param><value><dateTime.iso8601>{$DATA}</dateTime.iso8601></value></param>";
var xmlRPCBase64Para = "<param><value><base64>{$DATA}</base64></value></param>";
var xmlStructParaHeader = "<param><value><struct>";
var xmlStructParaFooter = "</struct></value></param>";
var xmlRPCStructParaStrMember = "<member><name>{$NAME}</name><value><string>{$DATA}</string></value></member>";
var xmlRPCStructParaIntMember = "<member><name>{$NAME}</name><value><int>{$DATA}</int></value></member>";
var xmlRPCStructParaDoubleMember = "<member><name>{$NAME}</name><value><double>{$DATA}</double></value></member>";
var xmlRPCStructParaTimeMember = "<member><name>{$NAME}</name><value><dateTime.iso8601>{$DATA}</dateTime.iso8601></value></member>";
var xmlRPCStructParaBase64Member = "<member><name>{$NAME}</name><value><base64>{$DATA}</base64></value></member>";
var xmlRPCUserAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:45.0) Gecko/20100101";
var xmlRPCContentType = "text/xml";
var serviceAddr = "http://www.hitiange.com/xmlrpc.php";

function publishPost(/*user, passwd, */title, excerpt, content) {
    var rpcBody = xmlRPCHeader +
                  xmlRPCMethodHeader +
                  xmlRPCName.replace("{$DATA}", "wp.newPost") +
                  xmlRPCParasHeader +
                  xmlRPCStrPara.replace("{$DATA}", "0") +
                  xmlRPCStrPara.replace("{$DATA}", user) +
                  xmlRPCStrPara.replace("{$DATA}", passwd) +
                  xmlStructParaHeader +
                  xmlRPCStructParaStrMember.replace("{$NAME}", "post_title").replace("{$DATA}", title) +
                  xmlRPCStructParaStrMember.replace("{$NAME}", "post_type").replace("{$DATA}", "post") +
                  xmlRPCStructParaStrMember.replace("{$NAME}", "post_status").replace("{$DATA}", "draft") +
                  xmlRPCStructParaStrMember.replace("{$NAME}", "post_author").replace("{$DATA}", user) +
                  xmlRPCStructParaStrMember.replace("{$NAME}", "post_excerpt").replace("{$DATA}", excerpt) +
                  xmlRPCStructParaTimeMember.replace("{$NAME}", "post_date").replace("{$DATA}", new Date().toISOString()) +
                  xmlRPCStructParaStrMember.replace("{$NAME}", "post_content").replace("{$DATA}", content) +
                  xmlStructParaFooter +
                  xmlRPCParasFooter +
                  xmlRPCMethodFooter;

    var submitRequest = new XMLHttpRequest();
    submitRequest.onreadystatechange = function() {
        console.log("submit ajax call return. status = " + submitRequest.status + "; readyState = " + submitRequest.readyState);
        if (submitRequest.readyState == 4 && submitRequest.status == 200) {
            alert("Successfully create draft post in your site.");
        } else if(!submitRequest.status == 200 && !submitRequest.status == 0) {
            alert("Failed to create draft post");
        }
    }
    submitRequest.open("post", serviceAddr, true);
    submitRequest.setRequestHeader("Content-Type", xmlRPCContentType);
    submitRequest.send(rpcBody);
}

function uploadImage(imgName, imgFormat, imgContent, /*returnVal,*/ sendResponse) {
    var rpcBody = xmlRPCHeader +
                  xmlRPCMethodHeader +
                  xmlRPCName.replace("{$DATA}", "wp.uploadFile") +
                  xmlRPCParasHeader +
                  xmlRPCStrPara.replace("{$DATA}", "0") +
                  xmlRPCStrPara.replace("{$DATA}", user) +
                  xmlRPCStrPara.replace("{$DATA}", passwd) +
                  xmlStructParaHeader +
                  xmlRPCStructParaStrMember.replace("{$NAME}", "name").replace("{$DATA}", imgName) +
                  xmlRPCStructParaStrMember.replace("{$NAME}", "type").replace("{$DATA}", imgFormat) +
                  xmlRPCStructParaBase64Member.replace("{$NAME}", "bits").replace("{$DATA}", imgContent) +
                  xmlStructParaFooter +
                  xmlRPCParasFooter +
                  xmlRPCMethodFooter;

    var submitRequest = new XMLHttpRequest();
    submitRequest.onreadystatechange = function() {
        console.log("submit ajax call return. status = " + submitRequest.status + "; readyState = " + submitRequest.readyState);
        if (submitRequest.readyState == 4 && submitRequest.status == 200) {
            //read response to get uploaded file url
            var responseMembers = submitRequest.responseXML.getElementsByTagName("member");
            var newSrc = "";
            for(var i = 0; i < responseMembers.length; i++) {
                if(responseMembers[i].getElementsByTagName("name")[0].textContent.toLowerCase() == "link") {
                    newSrc = responseMembers[i].getElementsByTagName("value")[0].getElementsByTagName("string")[0].textContent;
                    break;
                }
            }
            console.log("uploaded image new source : " + newSrc);
//            returnVal.status = "finished";
//            returnVal.newSrc = newSrc;
            sendResponse({source: newSrc});
        } else if(!submitRequest.status == 200 && !submitRequest.status == 0) {
            alert("Failed to upload media file");
//            returnVal.status = "error";
//            returnVal.newSrc = "";
        }
    };
    submitRequest.open("post", serviceAddr, true);
    submitRequest.setRequestHeader("Content-Type", xmlRPCContentType);
    submitRequest.send(rpcBody);
}
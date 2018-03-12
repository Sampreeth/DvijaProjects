function setPageTitleTxtbox(data){
    $('#psection').val(data);
}
function getPageTitleTxtbox(){
    return $('#psection').val();
}
function setRichTextbox(data){
    if ( typeof( tinyMCE) != "undefined" ) {
        if ( tinyMCE.get(0) != null) {
            tinyMCE.get(0).setContent(htmldata);
        }else{$('#myTextarea').html(data);}
    }else{$('#myTextarea').html(data);}
}
function getRichTextbox(currentPage){
    if( loadComplete && myProjectReport && tinyMCE ){
        return myProjectReport[currentPage].data=tinyMCE.get(0).getContent();
    }
}
function updateProjectTracker(trackers){
    let tracker_data='';

    //clearing the div
    $('#tracker').empty();

    //adding the start tracker
    tracker_data='<ul class="progress-indicator">';
    
    $.each(trackers,function(index,item){
        let status ='';
        if(item.status=="complete" && item.reviewStatus=="Pending"){
            status="completed info";
        }else if(item.status=="complete" && item.reviewStatus=="Complete"){
            status="completed";
        }else if(item.status=="done"){
            status="completed";
        }else{
            status="disabled";
        }
        tracker_data+=`<li class="${status}">`
        + `<a href="javascript:void(0);" onclick="showSection(${index});" style="
        text-decoration: none;" class="link${index}">`
        + `<span class="bubble"></span>`
        + `<span class="stacked-text">`
        + `<span class="title">${item.title}</span>`
        + `<span class="subdued">{${item.reviewStatus}}</span>`
        + `</a>`
        + `<span style="display:none;padding:20px;" class="otherDetail${index}">`
        + `<p style="font-size:10px;color:green;background:white;">${item.lastAccessDate}</p>`
        + `</span>`; //for otherDetails
        + `</span>` //for stacked-text
        +  `</li>`;
    });
    tracker_data+="</ul>";

    $('#tracker').append(tracker_data);
}
function setReviewBox(data){
    $('#reviewbox').val(data);
}
function getReviewBox(){
    return $('#reviewbox').val();
}
function UIforThisUser(typeOfuser){
    if(typeOfuser=="teacher"){
        //tinymce config
        tinymceConfig={
            selector: '#myTextarea',
            height:'400px',
            external_filemanager_path:"/filemanager/",
            filemanager_title:"Responsive Filemanager" ,
            external_plugins: { "filemanager" : "filemanager/plugin.min.js",
            "nanospell": "/moodle30/mod/dproject/script/tinymce/plugins/nanospell/plugin.js" },
            nanospell_server:"php",
            plugins: [
                "advlist autolink link image lists charmap print preview hr anchor pagebreak",
                "searchreplace wordcount visualblocks visualchars code insertdatetime media nonbreaking",
                "table contextmenu directionality emoticons paste textcolor responsivefilemanager imageupload annotate"
            ],
            toolbar1: "undo redo | bold italic underline | fontsizeselect fontselect| alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | styleselect forecolor backcolor | link unlink anchor ",
            toolbar2: "|imageupload| responsivefilemanager | print preview code | annotate delete-annotation ",
            content_css: [
            'style/style.css'
            ],
            image_advtab: true,
            init_instance_callback: function (editor) {
                editor.on('keyup', function (e) {
                    textChanged = true;
                });
            }
        }
        DisableComponenetsforUsertype(typeOfuser);
    }else if(typeOfuser=="student"){
        tinymceConfig={
            selector: '#myTextarea',
            width:'100%',
            height:'400px',
            external_plugins: { "nanospell": "/moodle30/mod/dproject/script/tinymce/plugins/nanospell/plugin.js" },
            nanospell_server:"php",
            autosave_ask_before_unload: true,
            plugins: 'advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table contextmenu paste annotate',
            toolbar: "insertfile undo redo | styleselect | bold italic underline subscript superscript | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link unlink image table | code",
            content_css: 'style/style.css',
            image_advtab: true,
            file_browser_callback: function(field_name, url, type, win) {
                win.document.getElementById(field_name).value = 'my browser value';
            },
            init_instance_callback: function (editor) {
                editor.on('keyup', function (e) {
                    textChanged = true;
                });
            }
        }
        DisableComponenetsforUsertype(typeOfuser);
    }else{
        //likely error or still loading   
    }
}
function DisableComponenetsforUsertype(bool){
    if(bool){
        $('#reviewbox').attr("disabled", true);
        $('#AprvReview').css("display","none");
        $('#reqReview').css("display","inline-block");
    }else{
        $('#reviewbox').attr("disabled", false);
        $('#AprvReview').css("display","inline-block");
        $('#reqReview').css("display","none");
    }
}

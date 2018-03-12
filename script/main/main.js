//jquery 
let currentPage=0;
let dbObject = null;
let pjObject = null;
function removePage(){
    pjObject.splice(currentPage,1);
    dbObject['data']=pjObject;
    addTracker(pjObject);
    console.log("clicked on remove Section");
}
function addPage(){
    //i think we should be able to call using ajax function to a page
    let newIndex = currentPage
    pjObject.splice(newIndex+1,0,{
        status: "disabled", 
        title: "untitled", 
        review: "", 
        reviewStatus: "", 
        data: ""
    });
    dbObject['data']=pjObject;
    addTracker(pjObject);
    console.log("clicked on add Section");
}
$('#finproject').click(function(e){
    //save the project changes 
    //ask confirmation first
    console.log("clicked on final project");
    let htmlreport='';
    let pageBreak='<!-- my page break -->';
    for(let i=0;i<pjObject.length;i++){
        if(i!=(pjObject.length-1)){
            console.log("include page break");
            htmlreport+=pjObject[i].data + pageBreak;
        }else{
            console.log("exclude page break");
            htmlreport+=pjObject[i].data;
        }
    }
    console.log(htmlreport);
    if(tinyMCE.get(1)!=null){
        console.log("Existing editor");
        tinyMCE.get(1).setContent("please wait report generating");
        tinyMCE.get(1).setContent(htmlreport);
        docPrint();
    }else{
        console.log("creating new");
        $('#fullreport').val(htmlreport);
        let x=tinymce.init({
            init_instance_callback : "docPrint",
            selector: '#fullreport',
            plugins: "pagebreak print preview",
            menubar: "insert view",
            toolbar: "pagebreak print preview",
            pagebreak_separator: "<!-- my page break -->",
            pagebreak_split_block: true
        });        
    }
});
function docPrint(){
    tinyMCE.get(1).execCommand("mcePrint");
}
function saveAllofme(){
    console.log("cliked");
    saveSession();
}
function requestReview(){
    console.log("Request Review");
    pjObject[currentPage].status="complete"; 
    pjObject[currentPage].reviewStatus="Pending";
    buttonCheckfunction();
}
function ApproveReview(){
    console.log("Approve Reviews");
    pjObject[currentPage].status="complete";   
    pjObject[currentPage].reviewStatus="Complete";
    buttonCheckfunction();
}
function buttonCheckfunction(){
    if(pjObject[currentPage].status=="complete" && pjObject[currentPage].reviewStatus=="Pending"){
        $('#reqReview').attr("disabled", true);
        $('#AprvReview').attr("disabled",false);
    }else{
        $('#reqReview').attr("disabled", false);
        $('#AprvReview').attr("disabled", true);
    }
}
function addTracker(trackers){
    //clearing the div
    $('#tracker').empty();
    let tracker_data='';
    
    //adding the start tracker
    tracker_data='<ul class="progress-indicator">';
    $.each(trackers,function(index,item){
        //console.log(item);
        let status ='completed';
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
    // console.log(tracker_data);
    $('#tracker').append(tracker_data);
}
function addDataToEditor(htmldata){
    $('#myTextarea').html(htmldata);
    if ( typeof( tinyMCE) != "undefined" ) {
        if ( tinyMCE.get(0) != null) {
            tinyMCE.get(0).setContent(htmldata);
        }
    }
    
}
function decodeJson(str){
    //console.log(str);
    var obj = JSON.parse(str);
    return obj;
}
function UIasPerRole(isStudent){
    if(isStudent==1){
        loadEditorStudent();
        $('#reviewbox').attr("disabled", true);
        $('#AprvReview').css("display","none");
        $('#reqReview').css("display","inline-block");
    }else{
        loadEditorTeacher();
        $('#reviewbox').attr("disabled", false);
        $('#AprvReview').css("display","inline-block");
        $('#reqReview').css("display","none");

    }
}
function decodeDBobject(obj,isStudent){
    UIasPerRole(isStudent);
    console.log(obj);
    dbObject=obj;
    pjObject=dbObject['data'];
    loadSession();
}
function saveSession(){
    var date = new Date();
    pjObject[currentPage].title=$('input[type=text][name=psection]').val();
    pjObject[currentPage].lastAccessDate=date.toString().slice(0,24);
    pjObject[currentPage].review=$('#reviewbox').val();
    pjObject[currentPage].data=tinyMCE.get(0).getContent();
    dbObject['data']=pjObject;
    commitDB();
}
function loadSession(){
    $('input[type=text][name=psection]').val(pjObject[currentPage].title);
    $('#reviewbox').val(pjObject[currentPage].review);
    addTracker(pjObject);
    $('ul li').eq(currentPage).toggleClass("currentSelection");
    $('span.otherDetail'+currentPage).fadeIn(30).fadeOut(4000);
    buttonCheckfunction();
    addDataToEditor(pjObject[currentPage].data);
}
function showSection(index){
    //commit previous session
    saveSession();
    // move to new page
    currentPage=index;
    loadSession();
}
function refresh(){
    addTracker(pjObject);
}
function commitDB(){
    //stringify data
    let myDB = JSON.stringify(dbObject);
    //console.log(myDB);
    $.ajax({
        url: "saveTodb.php",
        type: "post",
        data: {'p_object':myDB} ,
        success: function (response) {
        // you will get response from your php page (what you echo or print)                 
            //console.log(response);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus, errorThrown);
        }
    });
}
function loadEditorTeacher(){
    tinymce.init({
        selector: '#myTextarea',
        height:'300px',
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
    });
}
function loadEditorStudent(){
    tinymce.init({
        selector: '#myTextarea',
        width:'100%',
        height:'300px',
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
    });
}
  
  
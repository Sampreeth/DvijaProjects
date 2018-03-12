let loadComplete=false;
let studentDbData=null;
let currentSection=0;
let myProjectReport;
let myDvijaProjectDB;
//get from tableName,courseid,userId
function courseInfoFeed(userId,tableName,courseid,typeOfUser){ 
    let tempData={
        userId:userId,
        tableName:tableName,
        courseid:courseid,
        typeOfUser:typeOfUser
    };
    studentDbData=tempData;
    loadComplete=true;
}

function UpdateAllUIComponents(typeOfUser){
    if(loadComplete && myDvijaProjectDB){
        /*  ----------------
            things to update
            ----------------
            1) PageTitlebox
            2) ButtonBasedOn Type of user
            3) Add Tracker
            3) Report RichText editor
            4) Review Section
        */
        //Change Page Title
        PageTitlebox(myProjectReport[currentPage].title);
        //button for type of user
        UIforThisUser(typeOfUser);
        //add or update tracker
        updateProjectTracker(myProjectReport);
        // report richtext editor
        setRichTextbox(myProjectReport[currentPage].data);
        //review into textarea
        setReviewBox(myProjectReport[currentPage].review);
    }
}

function fetchDataFromUI(){
    /*  ----------------
        things to update
        ----------------
        1) PageTitlebox
        2) Report RichText editor
        3) Review Section
    */
    let temp={
        title:getPageTitleTxtbox(),
        data:getRichTextbox(),
        review:getReviewBox()
    }
    myProjectReport[currentSection]=temp;
}

function init(userId,tableName,courseid,typeOfUser){
    courseInfoFeed(userId,tableName,courseid,typeOfUser);
    let DatabaseObj=makeDataBaseObject('loadDbHandler',studentDbData,myProjectReport);
    if(DatabaseObj){
        let DatabaseController=contactDb(DatabaseObj);
        DatabaseController.done(function(data){ 
            let fri=parseJsonStr(data)
        });
    }
}



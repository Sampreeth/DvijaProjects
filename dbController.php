<?php
require_once(dirname(dirname(dirname(__FILE__))).'/config.php');
require_once(dirname(__FILE__).'/lib.php');

$methodName = isset($_POST['methodName']) ? $_POST['methodName'] : null;
methodSelector($methodName);


function dataObj($type,$data,$code){
    $obj=new stdClass();
    $obj->id="dataInformer";
    $obj->type=$type;
    $obj->data=$data;
    $obj->code=$code;
    return $obj;
}

function checkifStudent(){
    if(is_student($USER->id)){
        printReply(json_encode(dataObj("success","student here",103)));
    }else{
        printReply(json_encode(dataObj("error","not a student here with id: " .$USER->id,205)));
    }
}

function createTableDbHandler(){
    $courseId = isset($_POST['projectReportDb']) ? $_POST['projectReportDb'] : null;
    $trackerData = isset($_POST['projectReportDb']) ? $_POST['projectReportDb'] : null;

    if($courseId !=null && $trackerData !=null){
        $record=new stdClass();
        $record->courseid=$courseid;
        $record->data=$trackerData;
        $ProjectRID=createNewProject($tableName,$record);
        printReply(json_encode(dataObj("success","successfully done! creating table",104)));
    }else{
        printReply(json_encode(dataObj("error","unsuccessfully done! creating table",206)));
    }
}

function saveDbHandler(){
    $projectReportDb = isset($_POST['projectReportDb']) ? $_POST['projectReportDb'] : null;

    if($projectReportDb){
        $std_project_Db=json_decode($projectReportDb);
        $record_data=json_encode($std_project_Db->data);
        $std_project_Db->data=$record_data;
        updateProject("records",$record);
        printReply(json_encode(dataObj("success","successfully done! updating db",101)));
    }else{
        printReply(json_encode(dataObj("error","unsuccessfully done! updating db",201)));
    }
}

function loadDbHandler(){
    $tableName = isset($_POST['tableName']) ? $_POST['tableName'] : null;
    $courseId = isset($_POST['courseId']) ? $_POST['courseId'] : null;

    if($tableName!=null && $courseId!=null){
        try{
            $projectReportDb=getProject($tableName,$courseId);
            if($projectReportDb!=null){
                printReply(json_encode($projectReportDb));
            }else{
                printReply(json_encode(dataObj("error","record already doesn't exist assuming new project",202)));
            }
        }catch(Exception $e){
            printReply(json_encode(dataObj("error","error table name or course id might be wrong",204)));
        }
    }else{
        printReply(json_encode(dataObj("error","parameter not passed like table name and courseid",203)));
    }
}

function methodSelector($methodName){
    // --- method ids --- 
    // curspond to method names
    
    if(is_callable($methodName)){call_user_func($methodName);
    }else{
        printReply(json_encode(dataObj("error","Access denied ! cannot access directly || or invalid function name ",200)));
    }

}

function printReply($obj){
    print_r($obj);
}

?>
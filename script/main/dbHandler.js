function contactDb(DatabaseObject){
    if(DatabaseObject){
        console.log($.param(DatabaseObject));
        return $.ajax({
            url: "dbController.php",
            type: "POST",
            data: $.param(DatabaseObject),
            dataType: "html"
        });
    }
}
//this function validates if this data is a data informer object
function isDataInformerObject(data){
    if(data.hasOwnProperty('id')){
        if(data.id!="dataInformer"){return false;}
    }else{return false;}

    return true;
}

function makeDataBaseObject(methodName,studentObj,projectReport){
    if(methodName && studentObj){
        let DatabaseObject={
            methodName:methodName,
            courseid:studentObj.courseid,
            tableName:studentObj.tableName,
            projectReportDB:projectReport
        }
        return DatabaseObject;
    }
}


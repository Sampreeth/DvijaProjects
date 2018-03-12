<?php
require_once(dirname(dirname(dirname(__FILE__))).'/config.php');
require_once(dirname(__FILE__).'/lib.php');

$p_object = isset($_POST['p_object']) ? $_POST['p_object'] : null;
if($p_object){
    $p=json_decode($p_object);
    $record=new stdClass();
    $record->id=$p->id;
    $record->courseid=$p->courseid;
    $record->data=json_encode($p->data);
    // print_r($record);
    updateProject("records",$record);
    echo "True";
}else{
    echo "False";
}
?>
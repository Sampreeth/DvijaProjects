<?php
require_once(dirname(dirname(dirname(__FILE__))).'/config.php');
require_once(dirname(__FILE__).'/lib.php');

$id = optional_param('id', 0, PARAM_INT); // Course_module ID, or
$n  = optional_param('n', 0, PARAM_INT);  // ... dproject instance ID - it should be named as the first character of the module.

if ($id) {
    $cm         = get_coursemodule_from_id('dproject', $id, 0, false, MUST_EXIST);
    $course     = $DB->get_record('course', array('id' => $cm->course), '*', MUST_EXIST);
    $dproject  = $DB->get_record('dproject', array('id' => $cm->instance), '*', MUST_EXIST);
} else if ($n) {
    $dproject  = $DB->get_record('dproject', array('id' => $n), '*', MUST_EXIST);
    $course     = $DB->get_record('course', array('id' => $dproject->course), '*', MUST_EXIST);
    $cm         = get_coursemodule_from_instance('dproject', $dproject->id, $course->id, false, MUST_EXIST);
} else {
    error('You must specify a course_module ID or an instance ID');
}

require_login($course, true, $cm);

$event = \mod_dproject\event\course_module_viewed::create(array(
    'objectid' => $PAGE->cm->instance,
    'context' => $PAGE->context,
));
$event->add_record_snapshot('course', $PAGE->course);
$event->add_record_snapshot($PAGE->cm->modname, $dproject);
$event->trigger();

// Print the page header.
$PAGE->set_url('/mod/dproject/view.php', array('id' => $cm->id));
$PAGE->set_title(format_string($dproject->name));
$PAGE->set_heading(format_string($course->fullname));

// Output starts here.
echo $OUTPUT->header();

sprintf(`<iframe src="workflow.html?userId=%d&tableName=%s&courseid=%d&typeofUser" frameborder="0"></iframe>`,$USER->id,$tableName,\);
?>

<?php
// Finish the page.
echo $OUTPUT->footer();

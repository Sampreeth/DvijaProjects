function loadEditorTeacher(){
  tinymce.init({
    selector: '#myTextarea',
    external_plugins: { "nanospell": "/moodle30/mod/dproject/script/tinymce/plugins/nanospell/plugin.js" },
    nanospell_server:"php",
    autosave_ask_before_unload: true,
    plugins: 'advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table contextmenu paste annotate',
    toolbar: "insertfile undo redo | styleselect | bold italic underline subscript superscript | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link unlink image table | annotate delete-annotation | code",
    content_css: 'style/style.css',
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
    external_plugins: { "nanospell": "/moodle30/mod/dproject/script/tinymce/plugins/nanospell/plugin.js" },
    nanospell_server:"php",
    autosave_ask_before_unload: true,
    plugins: 'advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table contextmenu paste annotate',
    toolbar: "insertfile undo redo | styleselect | bold italic underline subscript superscript | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link unlink image table | code",
    content_css: 'style/style.css',
    image_advtab: true,
    init_instance_callback: function (editor) {
      editor.on('keyup', function (e) {
        textChanged = true;
      });
    }
  });
}


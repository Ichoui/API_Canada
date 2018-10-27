$(document).ready(function () {

    $('#uploadForm').submit(function () {
        $("#status").empty().text("File is uploading...");
        $(this).ajaxSubmit({
            success: function (response) {
                console.log(response);
                $("#status").empty().text(response);
            },
            error: function (xhr) {
                status('Error: ' + xhr.status);
            }
        });
        return false;
    });

});
$(document).ready(function () {


    $('#uploadForm').submit(function (e) {
        e.preventDefault();
        $("#status").empty().text("File is uploading...");
        $(this).ajaxSubmit({
            success: function (response) {
                console.log(response);
                $("#status").empty().text(response.message);
            },
            error: function (xhr) {
                status('Error: ' + xhr.status);
            }
        });
        return false;
    });

});
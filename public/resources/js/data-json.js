$(document).ready(function () {

    $('#post').submit(function (e) {
        e.preventDefault();
        $("#status").empty().text("File is uploading...");
        $(this).ajaxSubmit({
            success: function (e) {
                console.log(e);
                $("#status").empty().text(e.message);
            },
            error: function (xhr) {
                status('Error: ' + xhr.status);
            }
        });
        return false;
    });

    $('#get').on('click', e => {
        e.preventDefault();
        $.ajax({
            url: '/banff',
            type: 'GET',
            success: e => {
                console.log(e);
                $("#status").empty().html(e.method + " <br> Nombre d'images en base : " + e.count);
            }
        });
    });

    $('#del').on('click', e => {
        $.ajax({
            url: '/banff',
            type: 'DELETE',
            success: e => {
                console.log(e);
                $("#status").empty().html(e.success + " <br> Nombre d'immage supprimée : " + e.message.n);
            }
        });
    });

});
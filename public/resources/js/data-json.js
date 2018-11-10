$(document).ready(function () {

    $('#post').submit(function (e) {
        e.preventDefault();
        $("#status").empty().text("Les fichiers sont en cours d'upload ...");
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
            },
            error: e => {
                $("#status").empty().html("Il y a 0 images en base actuellement");
            }
        });
    });


    $('.yes').on('click', e => {
        $('.overlay-del').hide();
        $.ajax({
            url: '/banff',
            type: 'DELETE',
            success: e => {
                console.log(e);
                $("#status").empty().html(e.success + " <br> Nombre d'immages supprimées : " + e.message.n);
            }
        });
    });

    $('.no').on('click', e => {
        $('.overlay-del').hide();
    });

    $('#del').on('click', e => {
        $('.overlay-del').show();
    });

    function getRandomInt(max, min) {
       return Math.floor(Math.random() * max) + min;
    }
    const rand = getRandomInt(4, 1);
    $('body').addClass('body'+rand)
});
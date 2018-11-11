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
                $("#status").empty().html(e.method + " <br> Nombre d'images en base : " + e.count +
                    "<br><button class='show-images btn-cool mt-1'>Afficher les images</button>");

                // Popin pour afficher toutes les images
                $('.show-images').on('click', e, f => {
                    $('.overlay-img').show();
                    for (let i = 0; i < e.images.length; i++) {

                        let myImg = $('<img src="" class="myimage">')
                            .attr('id', 'myimage' + [i])
                            .attr('src', e.images[i].filepath)
                            .attr('title', 'Fichier : ' + e.images[i].name);

                        myImg.appendTo('.images');
                        console.log(myImg);
                    }

                });
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
        $('.overlay-img').hide();
        $('.images').empty();
    });

    $('#del').on('click', e => {
        $('.overlay-del').show();
    });


    function getRandomInt(max, min) {
        return Math.floor(Math.random() * max) + min;
    }

    const rand = getRandomInt(4, 1);
    $('body').addClass('body' + rand)
});
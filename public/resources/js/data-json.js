$(document).ready(function () {

    function whereAmI(e_get, $this, e_del) {
        let $block = $('.blocks-block');
        let albumName;

        if ($this !== null) {
            if ($this.closest($block).hasClass('banff')) {
                albumName = 'banff';
            } else if ($this.closest($block).hasClass('maple')) {
                albumName = 'maple';
            }
            else if ($this.closest($block).hasClass('francois')) {
                albumName = 'francois';
            }
        } else if (e_get !== null) {
            if (e_get.currentTarget.parentNode.parentElement.parentElement.classList[1] === 'banff') {
                albumName = 'banff';
            } else if (e_get.currentTarget.parentNode.parentElement.parentElement.classList[1] === 'maple') {
                albumName = 'maple';
            } else if (e_get.currentTarget.parentNode.parentElement.parentElement.classList[1] === 'francois') {
                albumName = 'francois';
            }
        }

        console.log(albumName);
        return albumName;
    }

    $('#post').submit(function (e) {
        e.preventDefault();
        $("#status").empty().html("Les fichiers sont en cours d'upload ... <img src='/resources/img/loader.gif' alt='loader'>");
        $(this).ajaxSubmit({
            success: function (e) {
                console.log(e);
                $("#status").empty().text(e.message);
            },
            error: function (xhr) {
                $('#status').html('Erreur ' + xhr.status + '<br>' + 'Seules les images au format JPG/JPEG et PNG sont acceptées.');
            }
        });
        return false;
    });

    $('#get').on('click', e => {
        e.preventDefault();
        let albumName = whereAmI(e, null);

        $.ajax({
            url: '/' + albumName,
            type: 'GET',
            success: e => {
                console.log(e);
                $("#status").empty().html(e.method + " <br> Nombre d'images en base : " + e.count +
                    "<br><button class='show-images btn-cool mt-1'>Afficher les images</button>");

                // Popin pour afficher toutes les images et les supprimer
                $('.show-images').on('click', e, f => {
                    $('.overlay-img').show();
                    for (let i = 0; i < e.images.length; i++) {
                        let divglobal = $('<div></div>')
                            .attr('id', 'glob' + [i])
                            .attr('class', 'glob');

                        let delImg = $('<span>Supprimer</span>')
                            .attr('data-id', e.images[i]._id)
                            .attr('data-name', e.images[i].name)
                            .attr('class', 'del-img');

                        let myImg = $('<img src="" class="myimage">')
                            .attr('src', e.images[i].filepath)
                            .attr('title', 'Fichier : ' + e.images[i].name);

                        divglobal.appendTo('.images');
                        myImg.appendTo('#glob' + [i]);
                        delImg.appendTo('#glob' + [i]);
                    }
                    // Suppression d'une seule image quand on clique supprimer
                    $('.del-img').on('click', e => {
                        const id = e.currentTarget.attributes[0].nodeValue;
                        const name = e.currentTarget.attributes[1].nodeValue;
                        const currentSpan = e.currentTarget;
                        console.log(e);
                        $('.overlay-del-one-img').show();
                        $('.yes-one').on('click', e => {
                            const divToHide = currentSpan.closest('div.glob');
                            $.ajax({
                                url: '/' + albumName + '/' + id,
                                type: 'DELETE',
                                success: e => {
                                    $("#status").empty().html("Vous venez de supprimer l'image suivante : " + name);
                                    $('.overlay-del-one-img').hide();
                                    $(divToHide).hide();
                                }
                            })
                        });
                        $('.no-one').on('click', e => {
                            $('.overlay-del-one-img').hide();
                        });

                    });

                });
            },
            error: e => {
                $("#status").empty().html("Il y a 0 images en base actuellement");
            }
        });
    });

    // Suprresion d'image
    $('.yes').on('click', e => {
        let albumName = whereAmI(null, null, e);
        $('.overlay-del').hide();
        $.ajax({
            url: '/' + albumName,
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
        $('.overlay-del-one-img').hide();
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
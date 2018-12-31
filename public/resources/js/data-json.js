$(document).ready(function () {
    let placement;

    function whereAmI($this) {
        let $block = $('.blocks-block');
        let albumName;

        if ($this.closest($block).hasClass('banff')) {
            albumName = 'banff';
        } else if ($this.closest($block).hasClass('maple')) {
            albumName = 'maple';

        } else if ($this.closest($block).hasClass('francois')) {
            albumName = 'francois';
        } else if ($this.closest($block).hasClass('jump')) {
            albumName = 'jump';
        }
        return albumName;
    }

    // Action POST formulaire
    $('.post').submit(function (e) {
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

    // Action GET formulaire
    $('.get').on('click', function (e) {
        e.preventDefault();
        let albumName = whereAmI($(this));

        $.ajax({
            url: '/' + albumName,
            type: 'GET',
            success: e => {
                console.log(e);
                $("#status").empty().html(e.method + " <br> Nombre d'images en base : " + e.count +
                    "<br><button class='show-images btn-cool mt-1'>Afficher les images</button>");

                // Permet de créer dans la popin overlay-img chaque image
                // Avec leurs attributs, mais aussi supprimet et update
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

                        /* let updateImg = $('<span class="description-img">D</span>')
                             .attr('data-id', e.images[i]._id)
                             .attr('title', 'Mettre à jour la description de cette image');
 */
                        divglobal.appendTo('.images');
                        myImg.appendTo('#glob' + [i]);
                        delImg.appendTo('#glob' + [i]);
                        // updateImg.appendTo('#glob' + [i]);
                    }

                    // Suppression d'UNE SEULE image quand on clique supprimer
                    // En lien avec delImg
                    $('.del-img').on('click', e => {
                        const id = e.currentTarget.attributes[0].nodeValue;
                        const name = e.currentTarget.attributes[1].nodeValue;
                        const currentSpan = e.currentTarget;
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
                    });
                    /*
                                        // Mettre à jour une image quand on clique sur la pastille de description
                                        $('.description-img').on('click', function (e) {
                                            let $this = $(this);
                                            let searchedId = $this.data('id'); // récupère l'id de l'image en cours

                                            $('.overlay-update').show();

                                            $('.valid-form-update').on('click', function (e) {
                                                console.log(searchedId);
                                                console.log($('.description-input').value);
                                                $.ajax({
                                                    url: '/' + albumName + '/' + id,
                                                    type:'DELETE',
                                                    success: e => {
                                                        console.log(e);
                                                        refuseUpdate(); // si la requête passe, exécuter
                                                    },
                                                    error: e => {
                                                        console.log(e);
                                                    }
                                                });
                                                //requete AJAX du update
                                            });
                                            $('.refuse-form-update').on('click', e => {
                                                console.log(searchedId + 'azezaezaezeazez');
                                                refuseUpdate();
                                            });

                                            // POPUP UPDATE DESCRIPTION QUAND ON REFUSE
                                            // FONCTIONNEMENT DIFFERENT CAR POPUP DANS POPUP
                                            function refuseUpdate() {
                                                // $('input').empty().html('');
                                                // $('.overlay-update').hide();
                                                // $('.overlay-img').show();
                                            }
                                        });*/

                });
            },
            error: e => {
                $("#status").empty().html("Il y a 0 images en base actuellement");
            }
        });
    });

    // Suprresion d'image depuis la POPIN OUI/NON
    $('.del-all').on('click', function (e) {
        // let albumName = whereAmI($(this));
        let albumName = placement;
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

    // NON DANS LES POPUP
    // SAUF UPDATE
    $('.no, .no-one').on('click', e => {
        $('.overlay-del').hide();
        $('.overlay-img').hide();
        $('.overlay-del-one-img').hide();
        $('.images').empty();
        // $('.overlay-update').hide(); // rajouter .refuse-form-update
    });

    // GROS BOUTON DELETE
    $('.del').on('click', function () {
        $('.overlay-del').show();
        placement = $(this).closest('.blocks-block').data('placement');
    });

    // SLICK
    $('.blocks-slider').slick({
        dots: false,
        slideToShow: 1,
        slideToScroll: 1,
        infinite: false,
        responsive: [
            {
                breakpoint: 550,
                settings: {
                    arrows:false
                }
            }
        ]
    });
});
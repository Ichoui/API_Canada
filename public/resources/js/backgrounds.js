// RANDOM BACKGROUND IMAGE
function getRandomInt(max, min) {
    return Math.floor(Math.random() * max) + min;
}

const rand = getRandomInt(4, 1);
$('body').addClass('body' + rand);
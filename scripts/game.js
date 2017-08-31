var gameBall = (function () {
    this.interval = null;
    this.startG = false;
    this.directBar1 = null;
    this.directBar2 = null;

    this.placarGame =
        player1 = 0,
        player2 = 0;

    this.iniciar = function () {
        $('.bola').css('left', (($(window).width()) / 2) - 25);
        $('.bola').css('top', (($(window).height()) / 2) - 25);
        $('#P1').html(player1);
        $('#P2').html(player2);
        $('.bola').css('transition', 'all linear 800ms');
        $('.bola').css('-moz-transition', 'all linear 800ms');
        $('.bola').css('-webkit-transition', 'all linear 500ms');
    };

    $(document).ready(iniciar);

    //mover bola para posição determinada nos parametros
    var positionBall = function (left, top) {
        $('.bola').css('left', left);
        $('.bola').css('top', top);
        //console.log('top: ' + top + ' left: ' + left);
    };

    var positionBar = function (player, top) {
        $('.' + player).css('top', top);
    };


    var collisionBar = function (player) {
        if ((($('.' + player).position().top <= $('.bola').position().top) &&
            (($('.' + player).position().top + $('.' + player).height()) >= $('.bola').position().top)) ||
            (($('.' + player).position().top <= ($('.bola').position().top) + $('.bola').height()) &&
                (($('.' + player).position().top + $('.' + player).height()) >= ($('.bola').position().top + $('.bola').height())))) {
            return true;
        } else {
            if(player == 'player1'){
                player2++;
            }else{
                player1++;
            }
            return false;
        }
    };

    //Move bola de forma "Aleatoria"
    var ballMove = function () {
        var random = Math.floor(Math.random() * ($(window).height() - $('.bola').height()));
        var bolaW = parseInt($('.bola').css('width'));
        var telaW = parseInt($('body').css('width'));
        var col = true;
        if ($('.bola').position().left >= ($('body').width() - $('.bola').width() - 30)) {
            col = collisionBar('player2');
            positionBall(30, random);
        } else if ($('.bola').position().left <= 30) {
            col = collisionBar('player1');
            positionBall(telaW - bolaW - 30, random);
        }
        moveBar('player1', directBar1);
        moveBar('player2', directBar2);
        if (col == false) {
            resetGame();
        }
    };

    //iniciar o jogo 
    this.startGame = function () {
        interval = setInterval(ballMove, 50);
    }

    //parar jogo
    this.stopGame = function () {
        clearInterval(interval);
        interval = null;
    }

    //alternar em iniciar ou parar o jogo
    this.toggleGame = function () {
        if (interval == null) {
            startGame();
        } else {
            stopGame();
        }
    }


    //resetar o jogo
    this.resetGame = function () {
        $('.bola').css('transition', 'none');
        $('.bola').css('-moz-transition', 'none');
        $('.bola').css('-webkit-transition', 'none');
        stopGame();
        iniciar();
        startG = false;
    };

    //mover barra
    this.moveBar = function (player, upDown) {
        var positBar = $('.' + player).position().top;
        if (upDown != null) {
            if (upDown && $('.' + player).position().top != 0) {
                positionBar(player, positBar - 25);
            } else if (!(upDown) && $('.' + player).position().top < ($(window).height() - $('.' + player).height())) {
                positionBar(player, positBar + 30);
            }
        }
        if (!(startG) && ($('.bola').position().top == (($(window).height() / 2) - 25))) {
            var top = (($(window).height() / 2) - 30)
            if (!(player == 'player1')){
                positionBall($('.player1').width(), top);
            } else {
                positionBall($(window).width() - $('.player2').width(), top);
            }
            startG = true;
            toggleGame();
        }
    };

    //Movimento das barras com as teclas
    window.onkeydown = function (event) {
        switch (event.key) {
            case 'w': directBar1 = true;
                moveBar('player1', directBar1);
                break;
            case 's': directBar1 = false;
                moveBar('player1', directBar1);
                break;
            case 'ArrowUp': directBar2 = true;
                moveBar('player2', directBar2);
                break;
            case 'ArrowDown': directBar2 = false;
                moveBar('player2', directBar2);
                break;
        }
    };

    window.onkeyup = function (event) {
        switch (event.key) {
            case 'w': directBar1 = null;
                break;
            case 's': directBar1 = null;
                break;
            case 'ArrowUp': directBar2 = null;
                break;
            case 'ArrowDown': directBar2 = null;
                break;
        }
    };

})();
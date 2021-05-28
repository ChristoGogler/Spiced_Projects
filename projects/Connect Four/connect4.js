// (function () {
console.log("connect4.js -- CONNECT FOUR");
var rowsAndColumns = [];
var $board = $(".board");
var $columns = $board.find(".column");

var $playerYin = $(".yin");
var $playerYang = $(".yang");
var yin;
var yang;
var currentPlayer;

initNewGame();
function initNewGame() {
    // $gameGrid.html(generateGrid());
    yin = new Player("yin", "palevioletred");
    yang = new Player("yang", "cadetblue");
    currentPlayer = yin;
}

function placeCoin(column) {
    //find the right column that was clicked on and place coin in the first free slot
    var $slots = $(column).find(".slot");

    //check for first free slot
    for (var i = $slots.length - 1; i >= 0; i--) {
        var isTaken =
            $slots.eq(i).hasClass("yin") || $slots.eq(i).hasClass("yang");
        //if its not taken add class currentPlayer.name
        if (!isTaken) {
            $slots.eq(i).addClass(currentPlayer.name);
            return true;
        }
    }
    return false;
}

function nextPlayer() {
    $playerYang.toggleClass("yourTurn");
    $playerYin.toggleClass("yourTurn");
    if (currentPlayer === yin) {
        currentPlayer = yang;
    } else {
        currentPlayer = yin;
    }
    console.log("Current Player is " + currentPlayer);
}

function Player(name, color) {
    this.name = name;
    this.color = color;
}

//COLUMNS CLICK EVENT LISTENER
$columns.on("click", function () {
    console.log("CLICK", currentPlayer, this);
    var clickedColumn = this;
    var placed = placeCoin(clickedColumn);
    if (placed) {
        nextPlayer();
    }
});

// function generateGrid() {
//     var htmlString = "";
//     for (var i = 0; i < 6; i++) {
//         for (var j = 0; j < 7; j++) {
//             htmlString += "<div class='slot'></div>";
//         }
//     }
//     console.log(htmlString);
//     return htmlString;
// }
// })();

// (function () {
console.log("connect4.js -- CONNECT FOUR");
// var rowsAndColumns = [];
var $board = $(".board");
var $columns = $board.find(".column");
var $allSlots = $board.find(".slot");
var $playerYin = $(".yin");
var $playerYang = $(".yang");
var yin;
var yang;
var currentPlayer;
var coinsPlaced = 0;
var possibleColumnWin;
var possibleRowWin;
var possibleDiagonalWin;
var winner;
var $winningSlots;

var allDiagonals = [
    [2, 9, 16, 23],
    [1, 8, 15, 22, 29],
    [0, 7, 14, 21, 28, 35],
    [6, 13, 20, 27, 34, 41],
    [12, 19, 26, 33, 40],
    [18, 25, 32, 39],
    [23, 28, 33, 38],
    [17, 22, 27, 32, 37],
    [11, 16, 21, 26, 31, 36],
    [5, 10, 15, 20, 25, 30],
    [4, 9, 14, 19, 24],
    [3, 8, 13, 28],
];

initNewGame();
function initNewGame() {
    //create Player objects
    yin = new Player("yin", "Sandy", $playerYin, "palevioletred", "yinCoin");
    yang = new Player("yang", "Patrick", $playerYang, "cadetblue", "yangCoin");
    //display names
    $playerYin.find(".name").html(yin.name);
    $playerYang.find(".name").html(yang.name);
    //find random start player
    var random = Math.round(Math.random());
    random === 1 ? (currentPlayer = yin) : (currentPlayer = yang);
    nextPlayer();
}

function placeCoin($slots) {
    //place coin in the first free slot
    //check for first free slot
    for (var i = $slots.length - 1; i >= 0; i--) {
        var isTaken =
            $slots.eq(i).hasClass(yin.coin) || $slots.eq(i).hasClass(yang.coin);
        //if its not taken add class currentPlayer.id
        if (!isTaken) {
            $slots.eq(i).addClass(currentPlayer.coin);
            coinsPlaced++;
            return i;
        }
    }
    return -1;
}

function nextPlayer() {
    if (currentPlayer === yin) {
        currentPlayer = yang;
        // console.log(currentPlayer.$element);
        $playerYin.removeClass("yourTurn");
    } else {
        currentPlayer = yin;
        // console.log(currentPlayer.$element);
        $playerYang.removeClass("yourTurn");
    }
    currentPlayer.$element.addClass("yourTurn");
}

//checkVictoryPreConditions
//parameter:
//return:
function checkVictoryPreConditions($slots, rowIndex) {
    //1) there must be at least 7 coins placed on the board
    if (coinsPlaced < 7) {
        return false;
    } else {
        possibleColumnWin = false;
        possibleRowWin = false;
        possibleDiagonalWin = false;
        //2) check for COLUMN CONDITION
        //pos2 & pos3 in that column have to be occupied by currentPlayer
        if (
            $slots.eq(2).hasClass(currentPlayer.coin) &&
            $slots.eq(3).hasClass(currentPlayer.coin)
        ) {
            possibleColumnWin = true;
        }

        //3) check for ROW CONDITION
        // pos 3 in that row has to be occupied by currentPlayer

        if (
            $columns
                .eq(3)
                .find(".slot")
                .eq(rowIndex)
                .hasClass(currentPlayer.coin)
        ) {
            possibleRowWin = true;
        }

        //4) check for DIAGONAL CONDITION
        //there must be at least 10 coins placed
        //there must be at least one coin in row 2 & one coin in row 3 ( column index one left/right of coin in row2)
        if (coinsPlaced > 9) {
            possibleDiagonalWin = true;
        }
    }

    return possibleColumnWin || possibleRowWin || possibleDiagonalWin;
}
//checkVictory
//parameter:
//return:
function checkVictory($positions) {
    $winningSlots = $();
    var count = 0;
    for (var i = 0; i < $positions.length; i++) {
        // console.log("Iteration", i);
        if ($positions.eq(i).hasClass(currentPlayer.coin)) {
            $winningSlots = $winningSlots.add($positions.eq(i));
            count++;
            console.log(
                "Add slot to winningCombo",
                i,
                "length",
                $winningSlots.length
            );
            if (count == 4) {
                // console.log(currentPlayer.id, "WIN!");
                // console.log(i, "in checkVictory $winningSlots", $winningSlots);
                winner = currentPlayer;
                announceWinner($winningSlots, winner);
            }
        } else {
            count = 0;
            $winningSlots = $();
            console.log("reset winningcombo", $winningSlots);
        }
    }
}

function Player(id, name, $element, color, coin) {
    this.id = id;
    this.name = name;
    this.$element = $element;
    this.color = color;
    this.coin = coin;
    this.wins = 0;
}

function isFull(index) {
    return index < 0;
}

function getRow(index) {
    var $slotsInRow = $();
    for (var i = 0; i < $columns.length; i++) {
        $slotsInRow = $slotsInRow.add($columns.eq(i).find(".slot").eq(index));
    }
    return $slotsInRow;
}

function getDiagonal(indexes) {
    var $diagonal = $();
    for (var i = 0; i < indexes.length; i++) {
        $diagonal = $diagonal.add($allSlots.eq(indexes[i]));
    }
    return $diagonal;
}

function announceWinner($winningSlots, winner) {
    for (var i = 0; i < $winningSlots.length; i++) {
        $winningSlots.eq(i).addClass("winningCombo");
    }
    winner.$element.find(".name").html("Winner");
    winner.wins++;
    winner.$element.find(".wins").html("won " + winner.wins);
    //show message
    var $message = $(".message");
    $message.find("div").html(winner.name + " has won!");
    $message.css("background-color", winner.color).css("display", "flex");

    //show resetButton
}

function resetGame() {
    for (var element of $allSlots) {
        $(element).removeClass(yin.coin);
        $(element).removeClass(yang.coin);
        $(element).removeClass("winningCombo");
    }
    winner.$element.find(".name").html(winner.name);
    winner = null;
    $(".message").css("display", "none");
}
//RESETBUTTON CLICK EVENT LISTENER
$(".resetButton").on("click", function () {
    resetGame();
});

//COLUMNS CLICK EVENT LISTENER
$columns.on("click", function () {
    //pass column that was clicked on
    columnClickHandler($(this));
});

//COLUMNS CLICK HANDLER
function columnClickHandler($clickedColumn) {
    // get all slots in that column
    var $slotsInColumn = $clickedColumn.find(".slot");
    //get index of columns and rows
    var columnIndex = $columns.index($clickedColumn);
    var rowIndex = placeCoin($slotsInColumn);
    var $winningSlots = [];

    //as long as a column is not completely occupied by coins
    if (!isFull(rowIndex)) {
        //check for winning situation condition
        //1) column: pos 2 & pos3 in that column have to be occupied by same player
        //2) row: pos 3 in that row has to be occupied
        //3)diagonal: at least 10 coins placed
        checkVictoryPreConditions($slotsInColumn, rowIndex);

        //checkVictory for column
        if (possibleColumnWin) {
            checkVictory($slotsInColumn);
        }

        //checkVictory for row
        if (possibleRowWin) {
            var $slotsInRow = getRow(rowIndex);
            checkVictory($slotsInRow);
        }

        //checkVictory for diagonal
        if (possibleDiagonalWin) {
            for (var diagIndexes of allDiagonals) {
                // allDiagonals.forEach(function (diagIndexes) {
                var $diagonal = getDiagonal(diagIndexes);
                checkVictory($diagonal);
                // });
            }
        }
        if (!winner) {
            nextPlayer();
        }
    }
}

// })();

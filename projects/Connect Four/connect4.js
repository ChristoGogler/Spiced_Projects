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
    // $gameGrid.html(generateGrid());
    yin = new Player("yin", "Yin", "palevioletred");
    yang = new Player("yang", "Yang", "cadetblue");
    winner = null;
    currentPlayer = yin;
}

function placeCoin($slots) {
    //place coin in the first free slot
    //check for first free slot
    for (var i = $slots.length - 1; i >= 0; i--) {
        var isTaken =
            $slots.eq(i).hasClass(yin.id) || $slots.eq(i).hasClass(yang.id);
        //if its not taken add class currentPlayer.id
        if (!isTaken) {
            $slots.eq(i).addClass(currentPlayer.id);
            coinsPlaced++;
            return i;
        }
    }
    return -1;
}

function nextPlayer() {
    $playerYang.toggleClass("yourTurn");
    $playerYin.toggleClass("yourTurn");
    if (currentPlayer === yin) {
        currentPlayer = yang;
    } else {
        currentPlayer = yin;
    }
    console.log("Current Player is " + currentPlayer.id);
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
            $slots.eq(2).hasClass(currentPlayer.id) &&
            $slots.eq(3).hasClass(currentPlayer.id)
        ) {
            possibleColumnWin = true;
        }

        //3) check for ROW CONDITION
        // pos 3 in that row has to be occupied by currentPlayer

        if (
            $columns.eq(3).find(".slot").eq(rowIndex).hasClass(currentPlayer.id)
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
    var $winningSlots = $();
    // console.log("Length", $positions.length);
    for (var i = 0; i < $positions.length; i++) {
        if ($positions.eq(i).hasClass(currentPlayer.id)) {
            $winningSlots = $winningSlots.add($positions.eq(i));
        } else {
            $winningSlots = $();
        }

        if ($winningSlots.length > 3) {
            // console.log(currentPlayer.id, "WIN!");
            console.log(i, "in checkVictory $winningSlots", $winningSlots);
            winner = currentPlayer;
            return $winningSlots;
        }
    }
    return -1;
}

function Player(id, name, color) {
    this.id = id;
    this.name = name;
    this.color = color;
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

function announceWinner(winner, $winningCombo) {
    for (var i = 0; i < $winningCombo.length; i++) {
        $winningCombo.eq(i).addClass("winningCombo");
    }
    console.log($winningCombo);
    console.log("The Winner is " + winner.name);
}

function resetGame() {
    for (var element of $allSlots) {
        console.log($(this));

        $(element).removeClass("yin");
        $(element).removeClass("yang");
        $(element).removeClass("winningCombo");
        initNewGame();
    }
}
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
            $winningSlots = checkVictory($slotsInColumn);
        }

        //checkVictory for row
        if (possibleRowWin) {
            var $slotsInRow = getRow(rowIndex);
            $winningSlots = checkVictory($slotsInRow);
        }

        //checkVictory for diagonal
        if (possibleDiagonalWin) {
            for (var diagIndexes of allDiagonals) {
                // allDiagonals.forEach(function (diagIndexes) {
                var $diagonal = getDiagonal(diagIndexes);
                $winningSlots = checkVictory($diagonal);
                if ($winningSlots.length > 3) {
                    break;
                }
                // });
            }
        }
        if (winner) {
            announceWinner(winner, $winningSlots);
            resetGame();
        }
        nextPlayer();
    }
}

// })();

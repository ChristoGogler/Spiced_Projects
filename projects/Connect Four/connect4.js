// (function () {
console.log("connect4.js -- CONNECT FOUR");
// var rowsAndColumns = [];
var $board = $(".board");
var $columns = $board.find(".column");

var $playerYin = $(".yin");
var $playerYang = $(".yang");
var yin;
var yang;
var currentPlayer;
var coinsPlaced = 0;
var possibleColumnWin;
var possibleRowWin;
var possibleDiagonalWin;

initNewGame();
function initNewGame() {
    // $gameGrid.html(generateGrid());
    yin = new Player("yin", "Christo", "palevioletred");
    yang = new Player("yang", "Rubi", "cadetblue");
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
function checkVictoryPreConditions($column, $slots, columnIndex, rowIndex) {
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
        //.......
    }

    return possibleColumnWin || possibleRowWin || possibleDiagonalWin;
}
//checkVictory
//parameter:
//return:
function checkVictory($positions) {
    var $winningSlots = $();
    for (var i = $positions.length - 1; i >= 0; i--) {
        console.log("checkVictory", i, $positions.eq(i));
        if ($positions.eq(i).hasClass(currentPlayer.id)) {
            $winningSlots = $winningSlots.add($positions.eq(i));
        }
        console.log("$winningSlots", $winningSlots);
        if ($winningSlots.length > 3) {
            console.log(currentPlayer.id, "WIN!");
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

//COLUMNS CLICK EVENT LISTENER
$columns.on("click", function () {
    //get column that was clicked on
    var $clickedColumn = $(this);
    // get all slots in that column
    var $slots = $clickedColumn.find(".slot");
    //get index of columns and rows
    var columnIndex = $columns.index($clickedColumn);
    var coinSlot = placeCoin($slots);

    //as long as a column is not completely occupied by coins
    if (coinSlot > 0) {
        //check for winning situation condition
        //1) column: pos 2 & pos3 in that column have to be occupied by same player
        //2) row: pos 3 in that row has to be occupied
        //3)diagonal: ??
        var isWinningCondition = checkVictoryPreConditions(
            $clickedColumn,
            $slots,
            columnIndex,
            coinSlot
        );
        // console.log("isWinningCondition", isWinningCondition);
        //checkVictory for column
        if (possibleColumnWin) {
            console.log("column win possible?", possibleColumnWin);
            checkVictory($slots);
        }

        //checkVictory for row
        if (possibleRowWin) {
            console.log("row win possible?", possibleRowWin);
            checkVictory($slots);
        }

        //checkVictory for diagonal
        if (possibleDiagonalWin) {
            console.log("diagonal win possible?", possibleDiagonalWin);
            checkVictory();
        }
        nextPlayer();
    }
});

// })();

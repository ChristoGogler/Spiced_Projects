(function () {
    console.log("connect4.js -- CONNECT FOUR -- Christo Gogler");
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

    //Object Player
    //contains properties for each player
    function Player(id, name, $element, color, coin) {
        this.id = id;
        this.name = name;
        this.$element = $element;
        this.color = color;
        this.coin = coin;
        this.wins = 0;
    }

    initNewGame();
    //initNewGame
    // 0 parameter
    //do: initialise the game with players
    //no return
    function initNewGame() {
        //create Player objects
        yin = new Player(
            "yin",
            getName($playerYin),
            $playerYin,
            "palevioletred",
            "yinCoin"
        );
        yang = new Player(
            "yang",
            getName($playerYang),
            $playerYang,
            "cadetblue",
            "yangCoin"
        );
        //display names
        $playerYin.find(".name").html(yin.name);
        $playerYang.find(".name").html(yang.name);
        //find random start player
        var random = Math.round(Math.random());
        random === 1 ? (currentPlayer = yin) : (currentPlayer = yang);
        nextPlayer();
    }

    function getName($element) {
        return $element.find(".Tname").val();
    }
    //dropCoin
    // 1 parameter: 1) $slots - slots of clicked column
    //do: place coin in the first free slot
    //return: i - index of the row the coin dropped into
    function dropCoin($slots) {
        //check for first free slot
        for (var i = $slots.length - 1; i >= 0; i--) {
            var isTaken =
                $slots.eq(i).hasClass(yin.coin) ||
                $slots.eq(i).hasClass(yang.coin);
            //if its not taken add class currentPlayer.coin and return index
            if (!isTaken) {
                $slots.eq(i).addClass(currentPlayer.coin);
                coinsPlaced++;
                return i;
            }
        }
        //no index found/all taken
        return -1;
    }

    //nextPlayer
    //0 parameters
    //do: switch to the next player
    //no return
    function nextPlayer() {
        if (currentPlayer === yin) {
            currentPlayer = yang;
            $playerYin.removeClass("yourTurn");
        } else {
            currentPlayer = yin;
            $playerYang.removeClass("yourTurn");
        }
        currentPlayer.$element.addClass("yourTurn");
    }

    //checkVictoryPreConditions
    //2 parameter: 1) $slots of the clicked column, 2) index of the row the last coin dropped into
    //do: check for a few preconditions that need to be met for a victory check
    //return: boolean expression, true if at least 1 precondition is met
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
            //a) there must be at least 10 coins placed

            if (coinsPlaced > 9) {
                possibleDiagonalWin = true;
            }
            //b) there must be at least one coin in row 2 & one coin in row 3 ( column index one left/right of coin in row2)
            //...not implemented yet
        }

        return possibleColumnWin || possibleRowWin || possibleDiagonalWin;
    }

    //checkVictory
    //1 parameter: 1) a collection of slots/positions
    //No return
    function checkVictory($positions) {
        $winningSlots = $();
        //loop over all slots and to winning slots if they contain coins belonging to current player
        for (var i = 0; i < $positions.length; i++) {
            if ($positions.eq(i).hasClass(currentPlayer.coin)) {
                $winningSlots = $winningSlots.add($positions.eq(i));

                //if 4 consecutive winning slots have been found, announce the winner
                //otherwise reset winning slots
                if ($winningSlots.length == 4) {
                    winner = currentPlayer;
                    announceWinner();
                }
            } else {
                $winningSlots = $();
            }
        }
    }

    //isFull
    //1 parameter: 1) index
    //check if the column is already filled up
    //return: boolean expression, true if full
    function isFull(index) {
        return index < 0;
    }

    //getRow
    //1 parameter: 1) index of the row that the coin dropped into
    //do: create a jquery collection of slots that can be checked for a win
    //return: collection of slots in that row
    function getRow(index) {
        var $slotsInRow = $();
        for (var i = 0; i < $columns.length; i++) {
            $slotsInRow = $slotsInRow.add(
                $columns.eq(i).find(".slot").eq(index)
            );
        }
        return $slotsInRow;
    }

    //getDiagonals
    //1 parameter: 1) indexes of a hardcoded array of all possible diagonals
    //do: create a jquery collection of slots that can be checked for a win
    //return: collection of slots
    function getDiagonal(indexes) {
        var $diagonal = $();
        //loop over all indexes and add all its elements
        for (var i = 0; i < indexes.length; i++) {
            $diagonal = $diagonal.add($allSlots.eq(indexes[i]));
        }
        return $diagonal;
    }
    //announceWinner
    //0 parameter
    // do: stop the round and announce the winner
    //no return
    function announceWinner() {
        //show the winning combo
        for (var i = 0; i < $winningSlots.length; i++) {
            $winningSlots.eq(i).addClass("winningCombo");
        }
        //swap name for "Winner"
        winner.$element.find(".name").html("Winner");
        //add 1 to winner's count and show wins
        winner.wins++;
        winner.$element.find(".wins").html("won " + winner.wins);
        //show message and reset button
        var $message = $(".message");
        $message.find("div").html(winner.name + " has won!");
        $message.css("background-color", winner.color).css("display", "flex");
    }

    //resetGame
    //0 parameter
    // do: reset board to initial state
    //no return
    function resetGame() {
        //remove all coins from board
        for (var element of $allSlots) {
            $(element).removeClass(yin.coin);
            $(element).removeClass(yang.coin);
            $(element).removeClass("winningCombo");
        }
        //reset the winners name
        winner.$element.find(".name").html(winner.name);

        winner = null;
        //remove the modal dialog
        $(".message").css("display", "none");
    }

    //TEXTFIELD INPUT EVENT LISTENERS
    $playerYin.find(".Tname").on("input", function () {
        textfieldInputHandler($(this), yin);
    });
    $playerYang.find(".Tname").on("input", function () {
        textfieldInputHandler($(this), yang);
    });

    //TEXTFIELD INPUT HANDLER
    function textfieldInputHandler($textfield, player) {
        if ($textfield.val() == "") {
            player.name = $textfield.placeholder();
        } else {
            player.name = $textfield.val();
        }
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
        var rowIndex = dropCoin($slotsInColumn);
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
                    var $diagonal = getDiagonal(diagIndexes);
                    checkVictory($diagonal);
                }
            }
            //call nextPlayer if theres no winner yet
            if (!winner) {
                nextPlayer();
            }
        }
    }
})();

(function () {
    console.log("SPOTIFY SEARCH - spotify.js");

    var $input = $("#searchField");
    var $type = $("#searchType");
    var $submitButton = $("#submitButton");
    var $resultsHeadline = $("searchResultsheadline");
    var $listOfResults = $("#searchResults");
    var $moreButton = $("#moreButton");

    const URL = "https://spicedify.herokuapp.com/spotify";

    console.log(
        "cache: ",
        $input,
        $type,
        $submitButton,
        $resultsHeadline,
        $listOfResults,
        $moreButton
    );

    //SUBMIT BUTTON LISTENER
    $submitButton.on("click", function () {
        console.log("Search CLICK");
        var userinput = $input.val();
        var searchType = $type.val();

        performRequest(userinput, searchType);
    });

    //MORE BUTTON LISTENER
    $moreButton.on("click", function () {
        console.log("More CLICK");
    });

    //performRequest
    // 2 parameters: 1) userInput - what the user is searching for, 2) searchtype - album or artist
    //create ajax request
    //no return
    function performRequest(userinput, searchType) {
        $.ajax({
            url: URL,
            data: {
                q: userinput,
                type: searchType,
            },
            success: function (results) {
                renderResults(results);
            },
        });
    }

    //renderResults
    // 1 parameters: 1) results - what the server returns as a result
    //make things appear in the results list
    //no return
    function renderResults(results) {}
})();

(function () {
    console.log("SPOTIFY SEARCH - spotify.js");

    var $input = $("#searchField");
    var $type = $("#searchType");
    var $submitButton = $("#submitButton");
    var $resultsHeadline = $("searchResultsheadline");
    var $listOfResults = $("#searchResults");

    var $moreButton = $("#moreButton");

    console.log(
        "cache: ",
        $input,
        $type,
        $submitButton,
        $resultsHeadline,
        $listOfResults,
        $moreButton
    );
})();

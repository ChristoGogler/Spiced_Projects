(function () {
    console.log("SPOTIFY SEARCH - spotify.js");

    var $input = $("#searchField");
    var $type = $("#searchType");
    var $submitButton = $("#submitButton");
    var $resultsHeadline = $("searchResultsheadline");
    var $listOfResults = $("#searchResults");
    var $moreButton = $("#moreButton");
    var $results;

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

    // KEYDOWN EVENT LISTENER - when user presses arrow up/down or return
    $input.keypress(function (event) {
        if (event.code == "Enter") {
            console.log("EVENT", event.code);
            $submitButton.trigger("click");
        }
    });

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
        $results = null;
        $.ajax({
            url: URL,
            data: {
                q: userinput,
                type: searchType,
            },
            success: function (results) {
                var $results = results;
                renderResults($results);
            },
        });
    }

    //renderResults
    // 1 parameters: 1) results - what the server returns as a result
    //make things appear in the results list
    //no return
    function renderResults($results) {
        console.log("rederResults", $results);
        //make distinction between artist and album
        if ($results.artists) {
            //for artists:
            //get all artists, images and link
            var artist = $results.artists.items[0].name;
            console.log("artist:", artist);
        } else {
            //for album:
            //get all albums, images and link
            var album = $results.albums.items[0].name;
            console.log("album:", album);
        }
    }
})();

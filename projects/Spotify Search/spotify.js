(function () {
    console.log("SPOTIFY SEARCH - spotify.js");

    var $input = $("#searchField");
    var $type = $("#searchType");
    var $submitButton = $("#submitButton");
    var $resultsHeadline = $("searchResultsheadline");
    var $listOfResults = $("#searchResults");
    var $moreButton = $("#moreButton");
    // var results;

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

    // SELECTION KEYDOWN EVENT LISTENER - when user presses ENTER
    $type.keypress(function (event) {
        if (event.code == "Enter") {
            // console.log("EVENT", event.code);
            $submitButton.trigger("click");
        }
    });
    // SEARCHFIELD KEYDOWN EVENT LISTENER - when user presses ENTER
    $input.keypress(function (event) {
        if (event.code == "Enter") {
            // console.log("EVENT", event.code);
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
        //console.log("userinput before", userinput);
        //var encodedUserinput = encodeURIComponent(userinput);
        //console.log("userinput after", userinput);
        $.ajax({
            url: URL,
            data: {
                q: userinput,
                type: searchType,
            },
            success: function (results) {
                var extract = extractItems(results);
                prepareResults(extract);
            },
        });
    }

    function extractItems(results) {
        if (results.artists) {
            return results.artists.items;
        }
        return results.albums.items;
    }

    //prepareResults
    // 1 parameters: 1) results - what the server returns as a result
    //make things appear in the results list
    //no return
    function prepareResults(results) {
        // console.log("rederResults", results);
        // //make distinction between artist and album
        // console.log("result type", results[0].type);
        var artists = [];
        var albums = [];
        var images = [];
        var links = [];
        if (results[0].type == "artist") {
            //for artists:
            //get all artists, images and link
            results.forEach(function (artist) {
                artists.push(artist.name);
                images.push(artist.images[1]);
                links.push(artist.external_urls.spotify);
            });
            console.log(
                "artists:",
                artists,
                "images:",
                images,
                "links:",
                links
            );
            showResults(artists, images, links);
        } else {
            //for album:
            //get all albums, images and link

            results.forEach(function (album) {
                albums.push(album.name);
                images.push(album.images[1]);
                links.push(album.external_urls.spotify);
            });
            // console.log("albums:", albums, "images:", images, "links:", links);
            showResults(albums, images, links);
        }
    }

    //showResults
    // 3 parameters: 1) titles = artists/albums, 2) images, 3) links - urls
    //make things appear in the results list
    //no return
    function showResults(titles, images, links) {
        titles.forEach(function (title, index) {
            var element = "<li>";
            try {
                element += "<img src='" + images[index].url + "'/>";
            } catch (error) {
                console.warn("No img available!");
                element += "<img src='https://via.placeholder.com/300'/>";
            }
            element += "<a href='" + links[index] + "'>" + title + "</a>";
            element += "</li>";
            console.log(element);
            $listOfResults.append(element);
        });
    }
})();

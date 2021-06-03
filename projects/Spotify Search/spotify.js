(function () {
    console.log("SPOTIFY SEARCH - spotify.js");

    var $input = $("#searchField");
    var $type = $("#searchType");
    var $submitButton = $("#submitButton");
    var $resultsHeadline = $("#searchResultsheadline");
    var $listOfResults = $("#searchResults");
    var $moreButton = $("#moreButton");

    var isInfiniteScroll = location.search.includes("scroll=infinite");
    var userinput;
    var searchType;
    var total;
    var next;
    var SCROLLING_OFFSET = 200;

    const URL = "https://spicedify.herokuapp.com/spotify";

    console.log("isInfiniteScroll", isInfiniteScroll);

    // SELECTION KEYDOWN EVENT LISTENER - when user presses ENTER
    $type.keypress(function (event) {
        if (event.code == "Enter") {
            $submitButton.trigger("click");
        }
    });
    // SEARCHFIELD KEYDOWN EVENT LISTENER - when user presses ENTER
    $input.keypress(function (event) {
        if (event.code == "Enter") {
            $submitButton.trigger("click");
        }
    });

    //SUBMIT BUTTON LISTENER
    $submitButton.on("click", function () {
        console.log("Search CLICK");
        $moreButton.addClass("hidden");

        $listOfResults.empty();
        userinput = $input.val();
        searchType = $type.val();

        performRequest(userinput, searchType);
    });

    //MORE BUTTON LISTENER
    $moreButton.on("click", function () {
        console.log("MORE CLICK");

        var nextURL = replaceURLName(next);
        $.ajax({
            url: nextURL,
            data: {},
            success: function (results) {
                var extract = extractItems(results);
                prepareResults(extract);
            },
        });
    });

    //loadInfiniteScrollResults
    // 1 parameter: 1) spotifyURL - the url to the next results
    // do: replace with API url
    // return: replaced url
    function loadInfiniteScrollResults() {
        if (next == null) {
            //no more results
            return;
        }
        if (hasScrolledCloseToBottom()) {
            // get more results
            $moreButton.trigger("click");
        } else {
            // console.log("check again");
            setTimeout(loadInfiniteScrollResults, 500);
        }
    }

    //hasScrolledCloseToBottom
    //parameter: 0
    //do: check if the scrolling position of the page is smaller than offset
    //return:  boolean
    function hasScrolledCloseToBottom() {
        var pageHeight = $(document).height();
        var windowHeight = $(window).height();
        var scrollTop = $(document).scrollTop();

        if (pageHeight - windowHeight - scrollTop < SCROLLING_OFFSET) {
            return true;
        }
        return false;
    }

    //replaceURLName
    // 1 parameter: 1) spotifyURL - the url to the next results
    //replace with API url
    // return: replaced url
    function replaceURLName(spotifyURL) {
        return spotifyURL.replace("https://api.spotify.com/v1/search", URL);
    }

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
                var extract = extractItems(results);
                if (total > 0) {
                    showResultsHandlebars(extract);
                    //prepareResults(extract);
                }
            },
        });
    }

    //extractItems
    // 1 parameter: 1) results - the data received from the server
    //extract the items
    //return items
    function extractItems(results) {
        if (results.artists) {
            total = results.artists.total;

            next = results.artists.next;
            // $resultsHeadline.html(" 0 results for " + $input.val());

            // console.log("results total", total);
            return results.artists.items;
        }
        total = results.albums.total;
        next = results.albums.next;
        console.log("results total", total);
        return results.albums.items;
    }

    //prepareResults
    // 1 parameters: 1) results - what the server returns as a result
    //seperate the results into arrays - artist, links, img, albums
    //no return
    function prepareResults(results) {
        console.log("results", results);
        // //make distinction between artist and album
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

            showResults(artists, images, links);
        } else {
            //for album:
            //get all albums, images and link
            results.forEach(function (album) {
                albums.push(album.name);
                images.push(album.images[1]);
                links.push(album.external_urls.spotify);
            });

            showResults(albums, images, links);
        }
    }
    //showResultsHandlebars
    // 3 parameters: 1) titles = artists/albums, 2) images, 3) links - urls
    //make things appear in the results list
    //no return
    function showResultsHandlebars(musicResults) {
        //get the template & compile
        var templates = document.querySelectorAll(
            'script[type="text/x-handlebars-template"]'
        );
        Array.prototype.slice.call(templates).forEach(function (script) {
            Handlebars.templates[script.id] = Handlebars.compile(
                script.innerHTML
            );
        });

        //connect the template with the anchor in the HTML
        // document.getElementById("searchResults").innerHTML += musicData;
        $listOfResults.append(
            Handlebars.templates.music({ results: musicResults })
        );
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
            // console.log(element);
            $listOfResults.append(element);
        });

        $resultsHeadline.html(total + " results for '" + $input.val() + "'");
        //make distinction between More Button and Infinite Scroll
        if (isInfiniteScroll) {
            loadInfiniteScrollResults();
        } else {
            if (next != null) {
                $moreButton.removeClass("hidden");
            } else {
                $moreButton.addClass("hidden");
            }
        }
    }
})();

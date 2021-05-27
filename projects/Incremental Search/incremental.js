(function () {
    console.log("incremental.js - Incremental Search");

    //cache elements
    var $inputField = $(".textInput");
    var $suggestionsContainer = $(".suggestions");
    var suggestions;

    // 1/6) INPUT EVENT LISTENER - when textfield input changes
    $inputField.on("input", function () {
        textfieldInputHandler($(this));
    });

    // 2/6) MOUSEOVER/ENTER EVENT LISTENER - when mouse over the individual suggestions
    $suggestionsContainer
        .on("mouseenter", ".oneSuggestion", function () {
            suggestionsMouseenterHandler($(this));
        })

        // 3/6) MOUSEDOWN EVENT LISTENER - when mousedown on suggestion add that value to textfield
        .on("mousedown", ".highlighted", function () {
            suggestionsMousedownHandler($(this));
        });

    // 4/6) KEYDOWN EVENT LISTENER - when user presses arrow up/down or return
    $inputField
        .on("keydown", function (event) {
            textfieldKeydownHandler(event);
        })

        // 5/6) FOCUS EVENT LISTENER - when the textfield gets a focus
        .on("focus", function () {
            textfieldInputHandler($(this));
        })
        // 6/6) BLUR EVENT LISTENER - when the textfield looses the focus
        .on("blur", function () {
            resetSuggestions();
        });

    //SUGGESTIONS MOUSEENTER HANDLER
    function suggestionsMouseenterHandler(element) {
        var $element = $(element);
        $(".highlighted").removeClass("highlighted");
        $element.addClass("highlighted");
    }

    //SUGGESTIONS MOUSEDOWN HANDLER
    function suggestionsMousedownHandler(element) {
        var $element = $(element);
        $inputField.val($element.html());
        resetSuggestions();
    }

    //textfield KEYDOWN HANDLER
    function textfieldKeydownHandler(event) {
        var $highlighted = $(".highlighted");
        switch (event.code) {
            //ARROW DOWN - change the highlighted element
            case "ArrowDown":
                if ($(".suggestions div:last-child").hasClass("highlighted")) {
                    //last element highlighted --> do nothing
                    break;
                } else if ($highlighted.length == 0) {
                    //none highlighted --> highlight first element
                    $(".oneSuggestion").first().addClass("highlighted");
                } else {
                    //middle element highlighted --> highlight next element
                    $highlighted.removeClass("highlighted");
                    $highlighted.next().addClass("highlighted");
                }
                break;
            //ARROW UP - change the highlighted element
            case "ArrowUp":
                if ($(".suggestions div:first-child").hasClass("highlighted")) {
                    //first element highlighted --> do nothing
                    break;
                } else if ($highlighted.length == 0) {
                    //none highlighted --> highlight last element
                    $(".oneSuggestion").last().addClass("highlighted");
                } else {
                    //middle element highlighted --> highlight prev element
                    $highlighted.removeClass("highlighted");
                    $highlighted.prev().addClass("highlighted");
                }
                break;
            //ENTER - enter value of highlighted element into the textfield
            case "Enter":
                $inputField.val($highlighted.html());
                resetSuggestions();
                break;
            default:
                break;
        }
    }
    //TEXTFIELD INPUT HANDLER
    function textfieldInputHandler(element) {
        var $value = $(element).val();
        suggestions = [];

        //if value is empty, empty suggestions & hide suggestionsContainer
        if ($value == "") {
            resetSuggestions();
            return;
        }

        for (var i = 0; i < countries.length; i++) {
            //if input matches the start of a country
            if (countries[i].toLowerCase().startsWith($value.toLowerCase())) {
                //add it to the suggestions array
                suggestions.push(countries[i]);
                console.log(suggestions);
            }
            //if array contains 4 elements stop searching
            if (suggestions.length > 3) {
                break;
            }
        }
        $suggestionsContainer.html(getHTMLString());
        $suggestionsContainer.removeClass("hidden");
    }

    //function getHTMLString
    //0 parameter
    //do: create a string of all suggestions within html elements or "not found! message
    //return: string
    function getHTMLString() {
        var htmlString;
        //if no countries match the input
        if (suggestions.length == 0) {
            // show no suggestions
            htmlString =
                "<div class='oneSuggestion'>Sorry - We couldn't find a match.</div>";
            //otherwise create a string containing html elements wrapping the suggestions
        } else {
            htmlString = "";
            suggestions.forEach(function createHTMLString(country, index) {
                htmlString += "<div class='oneSuggestion'>";

                htmlString += suggestions[index];
                htmlString += "</div>";
            });
        }
        return htmlString;
    }

    //function resetSuggestions
    //0 parameter
    //do: reset suggestions array and html of suggestions container; hide the suggestions container
    //return: none
    function resetSuggestions() {
        suggestions = [];
        $suggestionsContainer.html("");
        $suggestionsContainer.addClass("hidden");
    }

    var countries = [
        "Afghanistan",
        "Albania",
        "Algeria",
        "Andorra",
        "Angola",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bhutan",
        "Bolivia",
        "Bosnia and Herzegovina",
        "Botswana",
        "Brazil",
        "Brunei Darussalam",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cabo Verde",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Central African Republic",
        "Chad",
        "Chile",
        "China",
        "Colombia",
        "Comoros",
        "Congo",
        "Costa Rica",
        "Côte D'Ivoire",
        "Croatia",
        "Cuba",
        "Cyprus",
        "Czech Republic",
        "Democratic People's Republic of Korea",
        "Democratic Republic of the Congo",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Eswatini",
        "Ethiopia",
        "Fiji",
        "Finland",
        "France",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Greece",
        "Grenada",
        "Guatemala",
        "Guinea",
        "Guinea Bissau",
        "Guyana",
        "Haiti",
        "Honduras",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Kuwait",
        "Kyrgyzstan",
        "Lao People’s Democratic Republic",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands",
        "Mauritania",
        "Mauritius",
        "Mexico",
        "Micronesia",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Morocco",
        "Mozambique",
        "Myanmar",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "North Macedonia",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Poland",
        "Portugal",
        "Qatar",
        "Republic of Korea",
        "Republic of Moldova",
        "Romania",
        "Russian Federation",
        "Rwanda",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Vincent and the Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome and Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "Sudan",
        "Suriname",
        "Sweden",
        "Switzerland",
        "Syrian Arab Republic",
        "Tajikistan",
        "Thailand",
        "Timor-Leste",
        "Togo",
        "Tonga",
        "Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates",
        "United Kingdom",
        "United Republic of Tanzania",
        "United States of America",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Venezuela",
        "Viet Nam",
        "Yemen",
        "Zambia",
        "Zimbabwe",
    ];
})();

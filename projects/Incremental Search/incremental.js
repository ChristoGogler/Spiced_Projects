(function () {
    console.log("incremental.js - Incremental Search");

    //cache elements
    var $inputField = $(".textInput");
    var $resultsContainer = $(".results");
    var suggestions;

    function resetVariables() {
        suggestions = [];
        $resultsContainer.html("");
        $resultsContainer.addClass("hidden");
    }

    // 1/6) INPUT EVENT LISTENER - when textfield input changes
    $inputField.on("input", function (event) {
        var value = $(this).val();
        suggestions = [];

        //if value is empty, empty suggestions & hide resultsContainer
        if (value == "") {
            resetVariables();
            return;
        }

        for (var i = 0; i < countries.length; i++) {
            //if input matches the start of a country
            if (countries[i].toLowerCase().startsWith(value.toLowerCase())) {
                //add it to the suggestions array
                suggestions.push(countries[i]);
                console.log(suggestions);
            }
            //if array contains 4 elements stop searching
            if (suggestions.length > 3) {
                break;
            }
        }
        //if no countries match the input
        var htmlString = "";
        if (suggestions.length == 0) {
            // show no results
            htmlString =
                "<div class='indiResult'>Sorry - We couldn't find a match.</div>";
            $resultsContainer.html(htmlString);
            //otherwise create a string containing html elements wrapping the suggestions
        } else {
            htmlString = "";
            suggestions.forEach(function createHTMLString(country, index) {
                htmlString += "<div class='indiResult'>";
                // console.log("suggestions[index]", suggestions[index]);
                htmlString += suggestions[index];
                htmlString += "</div>";
                // console.log("HTMLString", htmlString);
            });
            $resultsContainer.html(htmlString);
        }
        $resultsContainer.removeClass("hidden");
    });

    // 2/6) MOUSEOVER/ENTER EVENT LISTENER - when mouse over the individual results
    $resultsContainer.on("mouseenter", ".indiResult", function () {
        var $element = $(this);
        $(".highlighted").removeClass("highlighted");
        $element.addClass("highlighted");
    });

    // 3/6) MOUSEDOWN EVENT LISTENER - when mousedown on suggestion add that value to textfield
    $resultsContainer.on("mousedown", ".highlighted", function () {
        var $element = $(this);
        $inputField.val($element.html());
        resetVariables();
    });

    // 4/6) KEYDOWN EVENT LISTENER - when user presses arrow up/down or return

    // 5/6) focus event

    // 6/6) blur event

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

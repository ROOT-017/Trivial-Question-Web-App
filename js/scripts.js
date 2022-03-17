$(function() {
    function get_countries() {
        $.ajax({
            url: "https://restcountries.com/v3.1/all",
            type: "GET",
            dataType: "json",
            success: function(data) {
                presentResults(data);
                countries(data)
            },
            error: function() {
                console.log("Error in the request");
            }
        });
    }

    /*    $("button").click(function() {
           get_countries();
       }) */
    get_countries();

    function presentResults(data) {
        // var country = data.results[0].capital;
        var randomCountry = get_Random_value(data)

        //$(".button").text(data[randomCountry[0]].name.common)
        var selectedCountry = data[randomCountry[0]].name.common
            /*  console.log(selectedCountry) */
        var imgSource = data[randomCountry[0]].flags.png
        $(".flagImage").attr("src", imgSource)

        return selectedCountry
    };

    function get_Random_value(data) {
        var get_values_in_data_size_rage = Math.random() * data.length
        var indexOfRandomItem = Math.floor(get_values_in_data_size_rage)
        var item = data[indexOfRandomItem]

        return [indexOfRandomItem, item]
    };

    function countries(data) {
        //data[0].name.common
        var countries = []
        for (i = 0; i <= data.length - 1; i++) {
            countries.push(data[i].name.common)
        }
        var randomCountrySelected = []
        for (j = 0; j <= 2; j++) {
            let randomCountry = get_Random_value(countries)
            randomCountrySelected.push(randomCountry[1])
        }

        var correctAnswer = presentResults(data)
        console.log(correctAnswer)
        randomCountrySelected.push(correctAnswer)
        console.log(randomCountrySelected)

        var alternativeAnswers = randomCountrySelected

        //Shuffling The array containing alternate answers
        for (i = alternativeAnswers.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = alternativeAnswers[i]
            alternativeAnswers[i] = alternativeAnswers[j]
            alternativeAnswers[j] = temp
        }
        console.log(alternativeAnswers)
            //Filling buttons names
        var buttons = $(".button")
        for (i = 0; i <= buttons.length - 1; i++) {

            buttons[i].innerHTML = alternativeAnswers[i]
            if (buttons[i].innerHTML == correctAnswer) {
                var answerButton = buttons[i]
                answerButton.setAttribute("id", "correctAnswer")
            }
        }

        //Determing if correct answer is clicked

        $(".button").click(function() {
            if (this.innerHTML == correctAnswer) {
                alert("Correct")
                location.reload();
            } else {
                alert("Wrong Answer")
                for (i = 0; i <= buttons.length - 1; i++) {
                    if (buttons[i].innerHTML == correctAnswer) {
                        console.log(buttons[i].innerHTML)
                        $("#correctAnswer").css("background-color", "green")
                        setTimeout(function() { location.reload() }, 5000)

                    }
                }
                //this.css = CSS("backgroud-color", "red")
            }

        })

    }

});
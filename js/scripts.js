function get_countries() {
    $.ajax({
        url: "http://api.worldbank.org/v2/country",
        type: "GET",
        dataType: "json",
        success: function(data) {
            console.log(data);
        },
        error: function() {
            console.log("Error in the request");
        }
    });
}
get_countries();
$("button").click(function() {
    alert("Request Not Sent")
})
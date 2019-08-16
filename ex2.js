$(function () {

    function getCapital(search, callback) {
        $.ajax({
            url: `https://restcountries.eu/rest/v2/currency/${search}`,
            method: "GET",
            success: function (data) {

                callback(data)
            },
            error: function (err) {
                $("#capital-cards").html("no match")
            }
        })
    }
    $(".money").on("click", function () {
        $("#money-cards").html(`<div class="loader"></div>`)
        getCapital(this.id, (result) => {
            $("#money-cards").html(drawCard(result))
        })

    })
})

function drawCard(array) {
    return array.reduce((stringChain, country) => {
        const { name, capital, flag } = country
        const temp = `<div class="card capital m-1">
            <img src="${flag}" class="card-img-top">
                <div class="card-body">
                    <h4 class="card-title">${name}</h4>
                    <h5 class="card-title">${capital}</h5>
                </div>
            </div>`
        return stringChain += temp
    }, "")
}
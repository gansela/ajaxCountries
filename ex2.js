const currencies = {
    GBP: "https://upload.wikimedia.org/wikipedia/en/b/b9/Bank_of_England_%C2%A350_obverse.jpg",
    EUR: "https://numismag.com/wp-content/uploads/2018/07/%E2%82%AC100-Banknote-Europa-Serie.jpg",
    ILS: "https://hskalla.files.wordpress.com/2013/07/d8aed985d8b3d98ad986-d8b4d98ad983d984.jpg?w=584",
    USD: "https://www.leftovercurrency.com/wp-content/uploads/2016/11/100-american-dollars-banknote-series-1996-obverse-1.jpg",
    JPY: "https://upload.wikimedia.org/wikipedia/commons/f/ff/1000_yen_Natsume_Soseki.jpg"
}


$(function () {

    function getCurrency(search, callback) {
        $.ajax({
            url: `https://restcountries.eu/rest/v2/currency/${search}`,
            method: "GET",
            success: function (data) {

                callback(data)
            },
            error: function (err) {
                $("#money-cards").html("<h1>No Reasult<h1/>")
            }
        })
    }
    $(".money").on("click", function (e) {
        console.log(e.target.id)
        $(".back").css({ "background-image": `url("${currencies[e.target.id]}")` })
        $("#money-cards").html(`<div class="loader"></div>`)
        getCurrency(e.target.id, (result) => {
            $("#money-cards").html(drawCard(result))
        })

    })
    function init(array) {
        $(".money").html(array.map(money => {
            const reasult = `<div class="dropdown-item" value="${money}" id="${money}"
            style="background-image:url(${currencies[money]})">${money}</div>`

            $(`${money}`).css({ "background-image": `url(${currencies[money]})` })
            return reasult
        }))
        getCurrency("ils", (result) => {
            $("#money-cards").html(drawCard(result))
        })
    }


    init(Object.keys(currencies))
})

function drawCard(array) {
    return array.reduce((stringChain, country) => {
        const { name, capital, flag } = country
        const temp = `<div class="card capital m-1">
            <img src="${flag}" class="card-img-top ">
                <div class="card-body">
                    <h4 class="card-title">${name}</h4>
                    <h5 class="card-title">${capital}</h5>
                </div>
            </div>`
        return stringChain += temp
    }, "")
}



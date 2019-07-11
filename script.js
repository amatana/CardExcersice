let loadLocalStorage = (obj) => {
    for (var i in obj) {
        if (i === "rooms") {
            window.localStorage.setItem(i, JSON.stringify(obj[i]))
        }

        window.localStorage.setItem(i, obj[i])
    }
}

let calculate_PxM = (price, mts) => {
    return Math.round(price / mts)
}

let numberWithDots = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

let setPriceOnLS = (price) => {
    window.localStorage.setItem("price", price)
}

let setPricesOnCard = (price) => {
    $("#price").text(" " + numberWithDots(price))
    $('#price_m').text(
        object.currency + " " +
        numberWithDots(
            calculate_PxM(Number(price), Number(object.mts)))
        + "/mts2"
    )

}


let changePriceOpt = () => {
    $('#priceChange').toggleClass('off')
    $('#price_section').toggleClass('off')
}


$('#price').click(changePriceOpt)

let newPrice

$('#newPrice').keypress((e) => {
    if (e.key !== 'Enter') {
        newPrice = e.target.value
    } else {
        changePriceOpt()
        setPriceOnLS(newPrice)
        setCard(window.localStorage)
    }
})

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

let onClickEnviar = () => {
    let email = $('#mailInput').val()
    if (!isEmail(email)) {
        $('.red').removeClass('off')
    } else {
        $(".red").addClass('off')
        $('.showContact').fadeOut(1000)
        $('#contactBtn').text('CONTACTADO!')
    }

}

function setCard(object) {
    $('#title').text(object.title);
    $('#location_descript').text(object.location);
    $("#prop_descript").text(object.description);
    $("#mts").text(numberWithDots(object.mts) + " mts2");
    $("#currency").text(object.currency)
    $("#price").text(" " + numberWithDots(object.price))
    $('#price_m').text(
        object.currency + " " +
        numberWithDots(
            calculate_PxM(Number(object.price), Number(object.mts)))
        + "/mts2"
    )
    let areas = ["Dormitorios", "Baño","Cocheras"]
    areas.map(area => {
        $("#rooms_" + area).text(area + ": " + object[area]);
    })


    $('#contactBtn').click(() => {
        $('#contactForm').toggleClass('off')
    })

    $('#closeLeft').click(() => {
        $('#contactForm').toggleClass('off')
        $('#mailInput').val("")
        $('.red').addClass('off')

    })

}

if (!window.localStorage.getItem("mts")) {
    console.log("DESDE LA VARIABLE")
    let property = {
        "img_src": "https://static1.sosiva451.com/3540595/7aef40b0-57f5-4568-a3fc-2c4a7ca85bd2_u_large.jpg",
        "title": "Si vas a utilizar un pasaje de Lorem Ipsum, necesitás esta...",
        "location": "Zapata 2539, Belgrano, CABA, Arg",
        "description": "Lorem Ipsus Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus magni assumenda perferendis, velit eaque veritatis tenetur asperiores numquam cum ex at impedit vero nisi temporibus nihil quaerat sunt laudantium iusto! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus magni assumenda perferendis, velit eaque veritatis tenetur asperiores numquam cum ex at impedit vero nisi temporibus nihil quaerat sunt laudantium iusto!",
        "price": 1400000,
        "currency": "U$S",
        "mts": 380,
        "Dormitorios": 3,
        "Baños": 2,
        "Cochera": 1
    }

    loadLocalStorage(property)
    setCard(property)
} else {
    let data = window.localStorage
    let prop = {}
    for (var j in data) {
        prop[j] = data[j]
    }
    setCard(prop)
}

let setForm = () => {
    $('#enviarBtn').click(onClickEnviar)
}

setForm()



let loadLocalStorage = (obj) => {
    for (var i in obj) {
        console.log("SOY EL OBJ QUE LLEGO", obj)
        console.log('VOY AL typeofROOMS', typeof (obj.rooms))
        console.log("EL OBJETO ROOMS", obj.rooms)

        //reviendo por qué ahora no guarda los rooms en el LS bien 
        // if ( typeof obj[i] === "object") {
        //     window.localStorage.setItem(i, JSON.parse(i))
        // }

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
    for (var i in object.rooms) {
        $("#rooms_" + i).text(i + ": " + object.rooms[i]);
    }


    $('#contactBtn').click(() => {
        $('#contactForm').toggleClass('off')
    })

    $('#closeLeft').click(() => {
        $('#contactForm').toggleClass('off')
    })

}

if (!window.localStorage.getItem("mts")) {
    console.log("DESDE LA VARIABLE")
    let property = {
        img_src: "https://static1.sosiva451.com/3540595/7aef40b0-57f5-4568-a3fc-2c4a7ca85bd2_u_large.jpg",
        title: "Si vas a utilizar un pasaje de Lorem Ipsum, necesitás esta...",
        location: "Zapata 2539, Belgrano, CABA, Arg",
        description: "Lorem Ipsus Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus magni assumenda perferendis, velit eaque veritatis tenetur asperiores numquam cum ex at impedit vero nisi temporibus nihil quaerat sunt laudantium iusto! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus magni assumenda perferendis, velit eaque veritatis tenetur asperiores numquam cum ex at impedit vero nisi temporibus nihil quaerat sunt laudantium iusto!",
        price: 1400000,
        currency: "U$S",
        mts: 380,
        rooms: {
            Dormitorios: 3,
            Baños: 2,
            Cochera: 1
        }
    }

    loadLocalStorage(property)
    setCard(property)
} else {
    console.log("DESDE EL LOCAL STORAGE")
    let data = window.localStorage
    let prop = {}
    for (var i in data) {
        prop[i] = data[i]
    }
    setCard(prop)
}



(function(){
    "use strict"

    const logo = document.querySelector("#logo-nav")
    const hamburger = document.querySelector("#hamburger")
    const body = document.body

    hamburger.addEventListener("click", () => {
        if(hamburger.ariaExpanded == "true"){
            hamburger.ariaExpanded = "false"
        }
        else{
            hamburger.ariaExpanded = "true"
        }
    })
    logo.addEventListener("click", () => {
        window.location = "../../"
    })

    //GO TO PERSONAL ROUTES
    const personal = document.querySelector("#goToPersonal")
    personal.addEventListener("click", (e) => {
        window.location = "./personal/"
    })
    const shared = document.querySelector("#goToShared")
    shared.addEventListener("click", (e) => {
        window.location = "./shared/"
    })

    //GO TO SHARED ROUTES

    //GET THE USERS CURRENT LOCATION
    const location = document.querySelector("#location + span.placeholder")
    const locinput = document.querySelector("#location")
    function getLocation(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(showPosition, showError)
        }
        else{
            location.innerHTML = "The Browser Does not Support Geolocation"
        }
    }
    function showPosition(position){
        locinput.required = false
        locinput.readOnly = true
        location.innerHTML = `Lat: ${position.coords.latitude}. Long: ${position.coords.longtitude}`
    }
    function showError(error){
        if(error.PERMISSION_DENIED){
            location.innerHTML = "The User Has Denied The Request For Geolocation"
        }
    }
    getLocation()
})()
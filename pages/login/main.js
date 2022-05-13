(function(){
    "use strict"
    const logo = document.querySelector("#logo-nav")
    const hamburger = document.querySelector("#hamburger")
    const signIn = document.querySelector("#stravaSignIn")

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

    //STRAVA AUTHORISATION
    const request = function(){
        window.location = "https://www.strava.com/oauth/authorize?client_id=84306&redirect_uri=http://127.0.0.1:5500/pages/dashboard/&response_type=code&scope=read_all&; path=/"
    }

    signIn.addEventListener("click", () => {
        request()
    })
})()
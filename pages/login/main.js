(function(){
    "use strict"
    const logo = document.querySelector("#logo-nav")
    const hamburger = document.querySelector("#hamburger")
    const signIn = document.querySelector("#googleSignIn")

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
})()
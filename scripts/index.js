(function(){
    "use strict"
    let logo = document.querySelector("#logo-nav")
    let loginBtn = document.querySelector("#btnToRoutes")
    let hamburger = document.querySelector("#hamburger")
    loginBtn.addEventListener("click", () => {
        window.location = "./pages/login/"
    })
    hamburger.addEventListener("click", () => {
        if(hamburger.ariaExpanded == "true"){
            hamburger.ariaExpanded = "false"
        }
        else{
            hamburger.ariaExpanded = "true"
        }
    })
    logo.addEventListener("click", () => {
        window.location = "./"
    })
})()
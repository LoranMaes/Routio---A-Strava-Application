function initMap() {}
(function(){
    "use strict"
    
    const logo = document.querySelector("#logo-nav")
    const hamburger = document.querySelector("#hamburger")
    const body = document.body

    hamburger.ariaExpanded = "false"
    hamburger.addEventListener("click", () => {
        if(hamburger.ariaExpanded == "true"){
            hamburger.ariaExpanded = "false"
        }
        else{
            hamburger.ariaExpanded = "true"
        }
    })

    logo.addEventListener("click", () => {
        window.location = "../../../../"
    })

    //BACK TO ROUTES
    const goBack = document.querySelector("#backToRoutes")
    goBack.addEventListener("click", () => {
        window.location = "../personal/index.html"
    })

    
    const shareRoute = document.querySelector("#share-route")
    shareRoute.addEventListener("click", () => {
        //CREATE THE SHARE LINK
        const routeURL = window.location.href
        navigator.clipboard.writeText(routeURL.valueOf())
        shareRoute.innerHTML = "Route copied!"
        shareRoute.style.backgroundSize = "100%"
        setTimeout(() => {
            shareRoute.innerHTML= "Copy route link"
            shareRoute.style.backgroundSize = "300% 100%"
        }, 5000)
    })
})()
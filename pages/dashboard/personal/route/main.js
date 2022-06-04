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

    //Header showing when scrolling down
    const scrollUp = "scroll-up"
    const scrollDown = "scroll-down"
    let lastScroll = 0
    window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset
        if(currentScroll <= 0){
            body.classList.remove(scrollUp)
            return
        }

        if(currentScroll > lastScroll && !body.classList.contains(scrollDown)){
            // down
            body.classList.remove(scrollUp)
            body.classList.add(scrollDown)
        }
        else if(
            currentScroll < lastScroll &&
            body.classList.contains(scrollDown)
        ){
            //up
            body.classList.remove(scrollDown)
            body.classList.add(scrollUp)
        }
        lastScroll = currentScroll
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
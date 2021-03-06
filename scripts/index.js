(function(){
    "use strict"
    const logo = document.querySelector("#logo-nav")
    const loginBtn = document.querySelector("#btnToRoutes")
    const hamburger = document.querySelector("#hamburger")
    const reviews = document.querySelector("#goToReviews")    
    const body = document.body
    const header = document.querySelector("header")

    loginBtn.addEventListener("click", () => {
        window.location = "./pages/login/"
    })
    
    hamburger.ariaExpanded = "false"
    hamburger.addEventListener("click", () => {
        if(hamburger.ariaExpanded === "true"){
            hamburger.ariaExpanded = "false"
            header.classList.remove("down")
            header.classList.add("up")
        }
        else{
            header.classList.remove("up")
            header.classList.add("down")
            hamburger.ariaExpanded = "true"
        }
    })

    logo.addEventListener("click", () => {
        window.location = "./"
    })

    reviews.addEventListener("click", () => {
        window.location = "./pages/reviews/"
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

        if(currentScroll > lastScroll && !body.classList.contains(scrollDown) && currentScroll > 700){
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
})()
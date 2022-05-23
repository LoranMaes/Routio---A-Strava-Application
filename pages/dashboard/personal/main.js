function initMap() {}
(function(){
    "use strict"
    
    const logo = document.querySelector("#logo-nav")
    const hamburger = document.querySelector("#hamburger")
    const personal = document.querySelector("#backToPersonal") 
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

    personal.addEventListener("click", () => {
        window.location = "../"
    })

    logo.addEventListener("click", () => {
        window.location = "../../../"
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

    //FIXING A LOAD MORE BUTTON (ONLY LOAD 6 IN THE BEGINNING)
})()
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

    //REVIEWS
    const starsClosed = document.querySelectorAll(".review-section .star-closed")
    const starsOpen = document.querySelectorAll(".review-section .star-open")

    starsClosed.forEach(star => {
        star.style.visibility = "hidden"
        star.style.position = "absolute"
        star.style.zIndex = "-1"
    })

    let finalScore = 0
    starsClosed.forEach(openstar => {
        openstar.addEventListener("click", (e) => {
            e.preventDefault()
            const id = e.target.id
            
            //EVERY STAR TO GIVE AS A PARAMETER
            const o1 = document.querySelector("#o1")
            const o2 = document.querySelector("#o2")
            const o3 = document.querySelector("#o3")
            const o4 = document.querySelector("#o4")
            const o5 = document.querySelector("#o5")

            const c1 = document.querySelector("#c1")
            const c2 = document.querySelector("#c2")
            const c3 = document.querySelector("#c3")
            const c4 = document.querySelector("#c4")
            const c5 = document.querySelector("#c5")

            switch(id){
                case "c1": {
                    makeHidden(c1)
                    makeHidden(c2)
                    makeHidden(c3)
                    makeHidden(c4)
                    makeHidden(c5)
                    makeHidden(o1)
                    makeHidden(o2)
                    makeHidden(o3)
                    makeHidden(o4)
                    makeHidden(o5)

                    makeVisible(o1)
                    makeVisible(o2)
                    makeVisible(o3)
                    makeVisible(o4)
                    makeVisible(o5)
                    finalScore = 0
                    console.log(finalScore)
                }return;
                case "c2": {
                    makeHidden(c1)
                    makeHidden(c2)
                    makeHidden(c3)
                    makeHidden(c4)
                    makeHidden(c5)
                    makeHidden(o1)
                    makeHidden(o2)
                    makeHidden(o3)
                    makeHidden(o4)
                    makeHidden(o5)

                    makeVisible(c1)
                    makeVisible(c2)
                    makeVisible(o3)
                    makeVisible(o4)
                    makeVisible(o5)
                    finalScore = 2
                    console.log(finalScore)
                }return;
                case "c3": {
                    makeHidden(c1)
                    makeHidden(c2)
                    makeHidden(c3)
                    makeHidden(c4)
                    makeHidden(c5)
                    makeHidden(o1)
                    makeHidden(o2)
                    makeHidden(o3)
                    makeHidden(o4)
                    makeHidden(o5)

                    makeVisible(c1)
                    makeVisible(c2)
                    makeVisible(c3)
                    makeVisible(o4)
                    makeVisible(o5)
                    finalScore = 3
                    console.log(finalScore)
                }return;
                case "c4": {
                    makeHidden(c1)
                    makeHidden(c2)
                    makeHidden(c3)
                    makeHidden(c4)
                    makeHidden(c5)
                    makeHidden(o1)
                    makeHidden(o2)
                    makeHidden(o3)
                    makeHidden(o4)
                    makeHidden(o5)

                    makeVisible(c1)
                    makeVisible(c2)
                    makeVisible(c3)
                    makeVisible(c4)
                    makeVisible(o5)
                    finalScore = 4
                    console.log(finalScore)
                }return;
                case "c5": {
                    makeHidden(c1)
                    makeHidden(c2)
                    makeHidden(c3)
                    makeHidden(c4)
                    makeHidden(c5)
                    makeHidden(o1)
                    makeHidden(o2)
                    makeHidden(o3)
                    makeHidden(o4)
                    makeHidden(o5)

                    makeVisible(c1)
                    makeVisible(c2)
                    makeVisible(c3)
                    makeVisible(c4)
                    makeVisible(c5)
                    finalScore = 5
                    console.log(finalScore)
                }return;
            }
        })
    })
    starsOpen.forEach(openstar => {
        openstar.addEventListener("click", (e) => {
            e.preventDefault()
            const id = e.target.id
            
            let finalScore = 0
            //EVERY STAR TO GIVE AS A PARAMETER
            const o1 = document.querySelector("#o1")
            const o2 = document.querySelector("#o2")
            const o3 = document.querySelector("#o3")
            const o4 = document.querySelector("#o4")
            const o5 = document.querySelector("#o5")

            const c1 = document.querySelector("#c1")
            const c2 = document.querySelector("#c2")
            const c3 = document.querySelector("#c3")
            const c4 = document.querySelector("#c4")
            const c5 = document.querySelector("#c5")

            switch(id){
                case "o1": {
                    makeHidden(c1)
                    makeHidden(c2)
                    makeHidden(c3)
                    makeHidden(c4)
                    makeHidden(c5)
                    makeHidden(o1)
                    makeHidden(o2)
                    makeHidden(o3)
                    makeHidden(o4)
                    makeHidden(o5)

                    makeVisible(c1)
                    makeVisible(o2)
                    makeVisible(o3)
                    makeVisible(o4)
                    makeVisible(o5)
                    finalScore = 1
                    console.log(finalScore)
                }return;
                case "o2": {
                    makeHidden(c1)
                    makeHidden(c2)
                    makeHidden(c3)
                    makeHidden(c4)
                    makeHidden(c5)
                    makeHidden(o1)
                    makeHidden(o2)
                    makeHidden(o3)
                    makeHidden(o4)
                    makeHidden(o5)

                    makeVisible(c1)
                    makeVisible(c2)
                    makeVisible(o3)
                    makeVisible(o4)
                    makeVisible(o5)
                    finalScore = 2
                    console.log(finalScore)
                }return;
                case "o3": {
                    makeHidden(c1)
                    makeHidden(c2)
                    makeHidden(c3)
                    makeHidden(c4)
                    makeHidden(c5)
                    makeHidden(o1)
                    makeHidden(o2)
                    makeHidden(o3)
                    makeHidden(o4)
                    makeHidden(o5)

                    makeVisible(c1)
                    makeVisible(c2)
                    makeVisible(c3)
                    makeVisible(o4)
                    makeVisible(o5)
                    finalScore = 3
                    console.log(finalScore)
                }return;
                case "o4": {
                    makeHidden(c1)
                    makeHidden(c2)
                    makeHidden(c3)
                    makeHidden(c4)
                    makeHidden(c5)
                    makeHidden(o1)
                    makeHidden(o2)
                    makeHidden(o3)
                    makeHidden(o4)
                    makeHidden(o5)

                    makeVisible(c1)
                    makeVisible(c2)
                    makeVisible(c3)
                    makeVisible(c4)
                    makeVisible(o5)
                    finalScore = 4
                    console.log(finalScore)
                }return;
                case "o5": {
                    makeHidden(c1)
                    makeHidden(c2)
                    makeHidden(c3)
                    makeHidden(c4)
                    makeHidden(c5)
                    makeHidden(o1)
                    makeHidden(o2)
                    makeHidden(o3)
                    makeHidden(o4)
                    makeHidden(o5)

                    makeVisible(c1)
                    makeVisible(c2)
                    makeVisible(c3)
                    makeVisible(c4)
                    makeVisible(c5)
                    finalScore = 5
                    console.log(finalScore)
                }return;
            }
        })
    })

    const makeHidden = function(element){
        element.style.visibility = "hidden"
        element.style.position = "absolute"
        element.style.zIndex = "-1"
    }

    const makeVisible = function(element){
        element.style.visibility = "visible"
        element.style.position = "relative"
        element.style.zIndex = "1"
    }
})()
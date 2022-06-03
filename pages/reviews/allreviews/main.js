(function(){
    "use strict"
    const logo = document.querySelector("#logo-nav")
    const hamburger = document.querySelector("#hamburger")
    const reviews = document.querySelector("#backToReview")    
    const header = document.querySelector("header")

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
        window.location = "../../"
    })

    reviews.addEventListener("click", () => {
        window.location = "../"
    })

    
})()
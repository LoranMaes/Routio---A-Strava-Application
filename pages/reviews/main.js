(function(){
    "use strict"
    const logo = document.querySelector("#logo-nav")
    const hamburger = document.querySelector("#hamburger")
    const reviews = document.querySelector("#goToReviews")    
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

    //CHECK IF REVIEW FORM IS FILLED IN CORRECTLY
    const submitReview = document.querySelector("#submitReview")
    const firstnameError = document.querySelector("#firstname + p.errorMessage")
    const lastnameError = document.querySelector("#lastname + p.errorMessage")
    const reviewError = document.querySelector("#review + p.errorMessage")
    const imageError = document.querySelector("#image + p.errorMessage")
    const emoticonError = document.querySelector("#smileys + p.errorMessage")
    const array = [firstnameError, lastnameError, reviewError, imageError, emoticonError]
    
    const removeErrors = function(){
        array.forEach(element => {
            element.style.visibility = "hidden"
            element.style.position = "absolute"
            element.style.zIndex = "-1"
        })
    }

    const showError = function(element){
        element.style.visibility = "visible"
        element.style.position = "relative"
        element.style.zIndex = "1"
    }

    submitReview.addEventListener("click", (e) => {
        e.preventDefault()
        removeErrors()
        let magSturen = true
        const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

        const firstname = document.querySelector("#firstname")

        const lastname = document.querySelector("#lastname")

        const review = document.querySelector("#review")

        const image = document.querySelector("#image")

        const emoticons = document.querySelectorAll("input[name=\"emoticon\"]")

        if(firstname.value != ""){
            let counter = 0
            letters.forEach(letter => {
                for(let i = 0; i < firstname.value.length; i++){
                    if(firstname.value.toLowerCase().charAt(i) === letter){
                        console.log(true)
                        counter++
                    }
                }
            })
            if(counter != firstname.value.length){
                showError(array[0])
                magSturen = false
            }
        }
        else{
            showError(array[0])
            magSturen = false
        }

        if(lastname.value != ""){
            let counter = 0
            letters.forEach(letter => {
                for(let i = 0; i < lastname.value.length; i++){
                    if(lastname.value.toLowerCase().charAt(i) === letter){
                        counter++
                    }
                }
            })
            if(counter != lastname.value.length){
                showError(array[1])
                magSturen = false
            }
        }
        else{
            showError(array[1])
            magSturen = false
        }

        if(review.value === ""){
            showError(array[2])
            magSturen = false
        }

        //CHECK IF FILE TYPE IS SUPPORTED
        if(image.value != ""){
            let idxDot = image.value.lastIndexOf(".") + 1;
            let extFile = image.value.substr(idxDot, image.value.length).toLowerCase();
            switch(extFile){
                case "png": break;
                case "jpg": break;
                case "jpeg": break;
                case "gif": break;
                default: {
                    showError(array[3])
                    magSturen = false
                }
            }
        }

        let emoticon_counter = 0
        emoticons.forEach(emoticon => {
            if(!emoticon.checked){
                emoticon_counter++
            }
        })
        if(emoticon_counter === emoticons.length){
            showError(array[4])
            magSturen = false
        }

        if(magSturen){
            //PUT THE DATA IN CONSTANTS
            const firstnamePost = firstname.value
            const lastnamePost = lastname.value
            const reviewPost = review.value
            let emoticonPost = ""

            const getCurrentEmoticon = function(){
                let emoticon_counter = 0
                emoticons.forEach(emoticon => {
                    if(emoticon.checked){
                        emoticonPost = emoticon_counter
                        return
                    }
                    emoticon_counter++
                })

            }
            getCurrentEmoticon()

            const data = {
                firstname: firstnamePost,
                lastname: lastnamePost,
                review: reviewPost,
                score: emoticonPost
            }

            //SEND HERE POST REQUEST
            console.log("sending post request")
            fetch("https://routioreviews.loranmaes.ikdoeict.be/reviews", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                body: JSON.stringify(data)
            })
            .then(() => {
                const reviewSent = document.querySelector(".write-review-yourself")

                const message = document.createElement("p")
                message.className = "reviewSendMessage"
                message.innerHTML = "Thanks for your review! Ride on :)"
                reviewSent.innerHTML = ""
                reviewSent.appendChild(message)
                setTimeout(() => { location.reload(); }, 5000);
            })
            .catch(err => console.error(err))
        }
    })

    //Load reviews
    window.addEventListener("DOMContentLoaded", () => {

        const getAllReviews = async function(){
            fetch("https://routioreviews.loranmaes.ikdoeict.be/reviews")
            .then(response => response.json())
            .then(data => {
                console.log(data)

                
            })
            .catch(err => console.error(err))
        }
        getAllReviews()
    })
})()
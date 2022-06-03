(function(){
    "use strict"
    const logo = document.querySelector("#logo-nav")
    const hamburger = document.querySelector("#hamburger")
    const reviews = document.querySelector("#toAllReviews")    
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
        window.location = "./allreviews/"
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
            array[2].innerHTML = "Please write a review"
            magSturen = false
        }
        if(review.value.length > 300){
            showError(array[2])
            array[2].innerHTML = "The maximum characters is 300"
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

            //https://routioreviews.loranmaes.ikdoeict.be/reviews
            fetch("http://127.0.0.1:3000/reviews", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                body: JSON.stringify(data)
            })
            .then((response) => {
                console.log(response)
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
})()
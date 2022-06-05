//Load reviews
window.addEventListener("DOMContentLoaded", () => {
    const reviewcards = document.querySelector(".review-cards .scrollable-area")
    
    const getAllReviews = async function(sort){
        //https://routioreviews.loranmaes.ikdoeict.be/reviews
        fetch(`https://routioreviews.loranmaes.ikdoeict.be/reviews/${sort}`, {
            method: "GET"
        })
        .then(response => response.json())
        .then(data => {
            if(data.length === 0){
                //HIDE THE FILTER OPTIONS
                const filteropts = document.querySelector(".filter-options")
                filteropts.style.visibility = "hidden"
                filteropts.style.position = "absolute"
                filteropts.style.zIndex = "-1"


                //MAKE THE NICE ANIMATION HERE TOO
                const div = document.createElement("div")
                div.className = "noReviewsDiv"
                div.innerHTML = `<h3>No reviews have been placed yet!</h3><img src="http://i.stack.imgur.com/SBv4T.gif" alt="this slowpoke moves"/>`
                reviewcards.appendChild(div)
            }
            else{
                data.forEach(review => {                
                    //DEFINE THE SMILEY
                    const smileyImg = document.createElement("img")
                    smileyImg.alt = "Smiley is"
                    switch(parseInt(review.score)){
                        case 0: {
                            smileyImg.src = require("../../assets/icons/not-okay-smiley.svg")
                            smileyImg.className = "scoreReview not-okay"
                            break;
                        }
                        case 1: {
                            smileyImg.src = require("../../assets/icons/okay-smiley.svg")
                            smileyImg.className = "scoreReview okay"
                            break;
                        }
                        case 2: {
                            smileyImg.src = require("../../assets/icons/satisfied-smiley.svg")
                            smileyImg.className = "scoreReview satisfied"
                            break;
                        }
                        case 3: {
                            smileyImg.src = require("../../assets/icons/very-satisfied-smiley.svg")
                            smileyImg.className = "scoreReview very-satisfied"
                            break;
                        }
                        default: {
                            smileyImg.className = "scoreReview not-okay"
                            smileyImg.src = require("../../assets/icons/not-okay-smiley.svg")
                        }
                    }
    
                    const reviewElement = document.createElement("div")
                    reviewElement.className = "review-card"
                    const date = review.date.split("T")[0].split("-")
                    const writeDate = `${date[2]}/${date[1]}/${date[0]}`
                    const reviewInner = `
                    <div class="left-side"></div>
                    <div class="right-side">
                        <div><p class="bold">${review.firstname.charAt(0)}. ${review.lastname}</p><p class="date primary capital">${writeDate}</p></div>
                        <hr>
                        <p class="review">${review.review}</p>
                        <p class="bold">Score: </p>
                    </div>
                    `
                    reviewElement.innerHTML = reviewInner
                    reviewcards.appendChild(reviewElement)
                    reviewElement.childNodes[3].childNodes[7].appendChild(smileyImg)
                })
            }
        })
        .catch(err => console.error(err))
    }
    getAllReviews("")

    const sort_score = document.querySelector("#sort_score")
    const sort_date = document.querySelector("#sort_date")

    sort_score.addEventListener("change", () => {
        reviewcards.innerHTML = ""
        if(sort_score.value === "score_asc" && sort_date.value === "date_asc"){
            getAllReviews("sa_da")
        }
        else if(sort_score.value === "score_desc" && sort_date.value === "date_desc"){
            getAllReviews("sd_dd")
        }
        else if(sort_score.value === "score_asc" && sort_date.value === "date_desc"){
            getAllReviews("sa_dd")
        }
        else if(sort_score.value === "score_desc" && sort_date.value === "date_asc"){
            getAllReviews("sd_da")
        }

        else if(sort_score.value === "select_option" && sort_date.value === "date_asc"){
            getAllReviews("so_da")
        }
        else if(sort_score.value === "select_option" && sort_date.value === "date_desc"){
            getAllReviews("so_dd")
        }
        else if(sort_score.value === "score_desc" && sort_date.value === "select_option"){
            getAllReviews("sd_so")
        }
        else if(sort_score.value === "score_asc" && sort_date.value === "select_option"){
            getAllReviews("sa_so")
        }
        else if(sort_score.value === "select_option" && sort_date.value === "select_option"){
            getAllReviews("")
        }
    })
    sort_date.addEventListener("change", () => {
        reviewcards.innerHTML = ""
        if(sort_score.value === "score_asc" && sort_date.value === "date_asc"){
            getAllReviews("sa_da")
        }
        else if(sort_score.value === "score_desc" && sort_date.value === "date_desc"){
            getAllReviews("sd_dd")
        }
        else if(sort_score.value === "score_asc" && sort_date.value === "date_desc"){
            getAllReviews("sa_dd")
        }
        else if(sort_score.value === "score_desc" && sort_date.value === "date_asc"){
            getAllReviews("sd_da")
        }

        else if(sort_score.value === "select_option" && sort_date.value === "date_asc"){
            getAllReviews("so_da")
        }
        else if(sort_score.value === "select_option" && sort_date.value === "date_desc"){
            getAllReviews("so_dd")
        }
        else if(sort_score.value === "score_desc" && sort_date.value === "select_option"){
            getAllReviews("sd_so")
        }
        else if(sort_score.value === "score_asc" && sort_date.value === "select_option"){
            getAllReviews("sa_so")
        }
        else if(sort_score.value === "select_option" && sort_date.value === "select_option"){
            getAllReviews("")
        }
    })
})
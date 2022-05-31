//Load reviews
window.addEventListener("DOMContentLoaded", () => {
    const getAllReviews = async function(){
        fetch("https://routioreviews.loranmaes.ikdoeict.be/reviews")
        .then(response => response.json())
        .then(data => {
            const reviewcards = document.querySelector(".review-cards .scrollable-area")
            if(data.length === 0){
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
                    const reviewInner = `
                    <div class="left-side"></div>
                    <div class="right-side">
                        <p class="bold">${review.firstname.charAt(0)}. ${review.lastname}</p>
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
    getAllReviews()
})
(function(){
    "use strict"

    let logo = document.querySelector("#logo-nav")
    let hamburger = document.querySelector("#hamburger")
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

    const url = new URLSearchParams(document.URL)
    const urlString = url.toString()
    if(urlString.includes("code") && urlString.includes("state") && urlString.includes("scope")){
        const auth_code = url.get('code')
        sessionStorage.setItem("auth_code", auth_code)
        const session = sessionStorage.getItem("auth_code")

        /* GET THE DATA IF CODE IS IN THE URL */
        const getClientId = async function(){
            fetch(`https://www.strava.com/oauth/token?client_id=84306&client_secret=30e1dd2eac6c3debeb0dc7d068918ac613a15747&code=${auth_code}&grant_type=authorization_code`, {
                method: "POST"
            })
            .then(response => {
                if(!response.ok){
                    throw new Error(response.error)
                }
                else{
                    return response.json()
                }
            })
            .then(data => {
                const access_token = data.access_token
                const profile_id = data.athlete.id

                fetch(`https://www.strava.com/api/v3/athletes/${profile_id}/routes`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${access_token}`
                    }
                })
                .then(response => {
                    if(!response.ok){
                        throw new Error(response.error)
                    }
                    else{
                        return response.json()
                    }
                })
                .then(data => console.log(data))
                .catch(err => console.log(err))
            })
            .catch(err => console.log(err))

            /*
            const response = await fetch(`https://www.strava.com/oauth/token?client_id=84306&client_secret=30e1dd2eac6c3debeb0dc7d068918ac613a15747&code=${auth_code}&grant_type=authorization_code`, {
                method: "POST"
            })
            const data = await response.json()
            const access_token = data.access_token
            const athlete_id = data.athlete.id

            const getRoutes = async function(){
                const response = await fetch(`https://www.strava.com/api/v3/athletes/${athlete_id}/routes?page=&per_page=" "Authorization: Bearer [${access_token}]`)
                const data = await response.json()
                console.log(data)
            }
            */
        }
        getClientId()
        
    }
    else{
        window.location = "../login/"
    }
})()
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

    //STRAVA AUTHORISATION
    const login = document.querySelector("#stravaSignIn")
    login.addEventListener("click", () => {
        window.open("http://www.strava.com/oauth/authorize?client_id=84306&response_type=code&redirect_uri=http://127.0.0.1:5500/exchange_token&approval_prompt=force&scope=read_all")
    })

    const auth = async function(){
        try{
            const response = await fetch("")
            const data = await response.json()

            console.log(data)

        }catch(err){
            console.log(err)
        }
    }
})()
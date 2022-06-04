//MODULE DUS GEEN IIFE
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, update, onValue, get, child } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACz9XwjRWc6k9Mep--iNbDLyxkJqR_zIA",
  authDomain: "routio-33bc2.firebaseapp.com",
  projectId: "routio-33bc2",
  storageBucket: "routio-33bc2.appspot.com",
  messagingSenderId: "20222628765",
  appId: "1:20222628765:web:c45b5667e358d8b5e51574",
  measurementId: "G-VC28HW3SK0",
  databaseURL: "https://routio-33bc2-default-rtdb.europe-west1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);
const dbRef = ref(database);

//STRAVA AUTHORISATION
const authorize = document.querySelector("#fetch-routes")
const request = function(){
    window.location = "https://www.strava.com/oauth/authorize?client_id=84306&redirect_uri=http://localhost:1234/pages/dashboard/personal/&response_type=code&scope=read_all&; path=/"
}
authorize.addEventListener("click", () => {
    request()
})
//VOEG DE ROUTES TOE VAN DE GEBRUIKER IN DE DATABASE
function writeUserData(userId, data) {
    update(ref(database, 'users/' + userId), {
        routes: data
    });
}
//FETCH DE ROUTES NA AUTHORISATIE
window.addEventListener('DOMContentLoaded', (event) => {
    fetchRoutes()
});

const fetchRoutes = function(){
    const url = new URLSearchParams(document.URL)
    const urlString = url.toString()
    if(urlString.includes("code") && urlString.includes("state") && urlString.includes("scope")){
        const auth_code = url.get('code')
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
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                        const uid = user.uid
                        update(ref(database, `users/${uid}/tokens/`), {
                            refresh_token: data.refresh_token
                        })
                    }
                })
                fetch(`https://www.strava.com/api/v3/athletes/${profile_id}/routes?page=1&per_page=200`, {
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
                .then(data => {
                    //HIER ZET IK DE DATA IN DE DATABASE VIA DE FUNCTIE WRITEUSERDATA
                    onAuthStateChanged(auth, (user) => {
                        if (user) {
                          // User is signed in, see docs for a list of available properties
                          // https://firebase.google.com/docs/reference/js/firebase.User
                          const uid = user.uid
                          writeUserData(uid, data)
                          const noRoutesDiv = document.querySelector(".noRoutesDiv")
                          if(noRoutesDiv){
                              noRoutesDiv.innerHTML = ""
                          }
                          //TO CLEAN UP THE URL
                          location.href = "./"
                        } else {
                          window.location = "../../login/"
                        }
                      })
                })
                .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        }
        getClientId()        
    }
}

//UITLOGGEN ALS DE GEBRUIKER NIET MEER IS INGELOGD
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid

        //GET THE DATA FROM FIREBASE AND LOOP OVER ALL THE ROUTES AND PUT THEM IN A DIV IN THE ROUTE-CARDS
        const routesRef = ref(database, `users/${uid}/routes`)
        onValue(routesRef, (snapshot) => {
            //Strava API gives a number that is the activity eg. "type: 1" which means it is a Ride
            const subTypes = ["Road", "Mountainbike", "Cross", "Trail", "Mixed"]
            const routeTypes = ["Ride", "Run"]
            const routecards = document.querySelector("#route-cards")
            const showMoreBtn = document.querySelector("#show-more-routes")

            let counter = 0
            let max = 6
            const data = snapshot.val()
            let newData = []
            newData = data
            
            if(data){
                authorize.innerHTML = "Synchronize your new routes!"
                //GETTING THE FILTER OPTIONS                
                const sort_cards = document.querySelector("#filter-option-sorts")
                const filter_for_type = document.querySelector("#filter-option-types")
                const deleteRoutes = function(){
                    const routecards_card = document.querySelectorAll(".route-card")
                    counter = 0
                    max = 6
                    routecards_card.forEach(route => {
                        route.remove()
                    })
                }

                filter_for_type.addEventListener("change", () => {
                    newData = []
                    const type = filter_for_type.value
                    sort_cards.selectedIndex = 0
                    switch(type){
                        case "cycling": {
                            data.forEach(route => {
                                if(route.type === 1){
                                    newData.push(route)
                                }
                            })
                        }
                        makeCards(false)
                        return
                        case "running": {
                            data.forEach(route => {
                                if(route.type === 2){
                                    newData.push(route)
                                }
                            })
                        }
                        makeCards(false)
                        return
                        case "cycling-and-running": {
                            newData = data
                        }
                        makeCards(false)
                        return
                    }
                })
                

                //TO SORT
                sort_cards.addEventListener("change", (e) => {
                    const sort = sort_cards.value
                    switch(sort){
                        case "lengthdesc": {
                            newData.sort((a, b) => {
                                if(a.distance < b.distance){
                                    return 1
                                }
                                else if(a.distance > b.distance){
                                    return -1
                                }
                                else{
                                    return 0
                                }
                            })
                        }
                        makeCards(false)
                        return;
                        case "lengthasc": {
                            newData.sort((a, b) => {
                                if(a.distance > b.distance){
                                    return 1
                                }
                                else if(a.distance < b.distance){
                                    return -1
                                }
                                else{
                                    return 0
                                }
                            })
                        }
                        makeCards(false)
                        return;
                        case "elevationdesc": {
                            newData.sort((a, b) => {
                                if(a.elevation_gain < b.elevation_gain){
                                    return 1
                                }
                                else if(a.elevation_gain > b.elevation_gain){
                                    return -1
                                }
                                else{
                                    return 0
                                }
                            })
                        }
                        makeCards(false)
                        return;
                        case "elevationasc": {
                            newData.sort((a, b) => {
                                if(a.elevation_gain > b.elevation_gain){
                                    return 1
                                }
                                else if(a.elevation_gain < b.elevation_gain){
                                    return -1
                                }
                                else{
                                    return 0
                                }
                            })
                        }
                        makeCards(false)
                        return;
                        case "date-created": {
                            newData.sort((a, b) => {
                                if(a.created_at < b.created_at){
                                    return 1
                                }
                                else if(a.created_at > b.created_at){
                                    return -1
                                }
                                else{
                                    return 0
                                }
                            })
                        }
                        makeCards(false)
                        return;
                        case "height/km": {
                            newData.sort((a, b) => {
                                const one = a.elevation_gain / a.distance
                                const two = b.elevation_gain / b.distance
                                if(one < two){
                                    return 1
                                }
                                else if(one > two){
                                    return -1
                                }
                                else{
                                    return 0
                                }
                            })
                        }
                        makeCards(false)
                        return;
                        case "alphabeticallyaz": {
                            newData.sort((a, b) => {
                                if(a.name > b.name){
                                    return 1
                                }
                                else if(a.name < b.name){
                                    return -1
                                }
                                else{
                                    return 0
                                }
                            })
                        }
                        makeCards(false)
                        return;
                        case "alphabeticallyza": {
                            newData.sort((a, b) => {
                                if(a.name < b.name){
                                    return 1
                                }
                                else if(a.name > b.name){
                                    return -1
                                }
                                else{
                                    return 0
                                }
                            })
                        }
                        makeCards(false)
                        return;
                        case "est-duration": {
                            newData.sort((a, b) => {
                                if(a.estimated_moving_time < b.estimated_moving_time){
                                    return 1
                                }
                                else if(a.estimated_moving_time > b.estimated_moving_time){
                                    return -1
                                }
                                else{
                                    return 0
                                }
                            })
                        }
                        makeCards(false)
                        return;
                        default: {
                            newData.sort((a, b) => a + b)
                        }
                        makeCards(false)
                    }
                })

                const makeCards = async function(showmore){
                    const slicer = function(){
                        if(!showmore){
                            deleteRoutes()
                        }
                        newData.slice(counter, max).forEach(route => {
                                const routename = route.name
                                const distance = Math.round((route.distance / 1000) * 100) / 100 
                                const elevation = Math.round(route.elevation_gain)
                                const type = routeTypes[route.type - 1]
                                const subtype = subTypes[route.sub_type - 1]
                                //ICONS FOR THE PAGE
                                const pencil = document.createElement("img")
                                pencil.src = require("../../../assets/icons/pencil.png")
                                pencil.className = "icon"
                                pencil.alt = "Change the titel"
        
                                const download = document.createElement("img")
                                download.src = require("../../../assets/icons/icon-download.png")
                                download.className = "icon"
                                download.alt = "Download the route "
            
                                const routeicon = document.createElement("img")
                                routeicon.src = require("../../../assets/icons/icon-route.png")
                                routeicon.className = "icon"
                                routeicon.alt = "Distance route"
            
                                const share = document.createElement("img")
                                share.src = require("../../../assets/icons/icon-share.png")
                                share.className = "icon"
                                share.alt = "Share the route"
            
                                const elev = document.createElement("img")
                                elev.src = require("../../../assets/icons/icon-mountain.png")
                                elev.className = "icon"
                                elev.alt = "Elevation for this route"
            
                                const typeRide = document.createElement("img")
                                typeRide.src = require("../../../assets/icons/icon-bike.png")
                                typeRide.className = "icon"
                                typeRide.alt = "This route is a ride"
        
                                const typeRun = document.createElement("img")
                                typeRun.src = require("../../../assets/icons/icon-run.png")
                                typeRun.className = "icon"
                                typeRun.alt = "This route is a running route"

                                const routeTypesImg = [typeRide, typeRun]
            
                                
                                //LATER TO ADD
                                const est = route.estimated_moving_time
                
                                let element = document.createElement("div");
                                element.className = `route-card route-card-${counter}`
                                //STILL HAVE TO PUT IN: NAME OF USER, PHOTO OF USER
                                let routediv = 
                                `   <a href="./route?route_name=${routename}&type=${type}&subtype=${subtype}&est_time=${est}&dist=${distance}&elev=${elevation}&route_id=${route.id_str}&enc_poly=${route.map.summary_polyline}" class="route"></a>
                                    <div class="titel">
                                        <label for="titel-route${counter}" class="away">Name of route: ${routename}</label>
                                        <input type="text" id="titel-route${counter}" class="titel-route" value="${routename}" readonly>
                                        <button class="edit-title"></button>
                                    </div>
                                    <hr>
                                    <div class="stats">
                                        <div class="left">
                                            <button class="line download-route" id="${route.id_str}">
                                                <p>Download gpx</p>
                                            </button>
                                            <button class="line">
                                                <p>Share route</p>
                                            </button>
                                            <div class="line">
                                                <p>${type}, ${subtype}</p>
                                            </div>
                                        </div>
                                        <div class="right">
                                            <div class="line">
                                                <p>${distance} km</p>
                                            </div>
                                            <div class="line">
                                                <p>${elevation} m</p>
                                            </div>
                                        </div>
                                        <div class="review_score">
                                        </div>
                                        </div>`
                                        
                                element.innerHTML = routediv
                                routecards.appendChild(element)
                                const downloadChildnode = element.childNodes[7].childNodes[1].childNodes[1]
                                const shareChildnode = element.childNodes[7].childNodes[1].childNodes[3]
                                const typeChildNode = element.childNodes[7].childNodes[1].childNodes[5]
                                const distChildNode = element.childNodes[7].childNodes[3].childNodes[1]
                                const elevChildNode = element.childNodes[7].childNodes[3].childNodes[3]
                                const reviewChildNode = element.childNodes[7].childNodes[5]
                                //APPEND THE IMAGES
                                element.childNodes[3].childNodes[5].appendChild(pencil)
                                downloadChildnode.appendChild(download)
                                shareChildnode.appendChild(share)
                                typeChildNode.appendChild(routeTypesImg[route.type - 1])
                                distChildNode.appendChild(routeicon)
                                elevChildNode.appendChild(elev)
                                //APPEND THE CARD IMAGE
                                const initMap = function initMap() {
                                    const enc_poly = route.map.summary_polyline
                                    const map = new google.maps.Map(document.querySelector(`.route-card-${counter} .route`), {
                                        zoom: 10,
                                        center: { lat: 34.366, lng: -89.519 },
                                        zoomControl: false,
                                        mapTypeControl: false,
                                        scaleControl: false,
                                        streetViewControl: false,
                                        rotateControl: false,
                                        fullscreenControl: false,
                                        gestureHandling: "none"
                                    });
        
                                    const poly = new google.maps.Polyline({
                                      strokeColor: "#F53636",
                                      strokeOpacity: 1,
                                      strokeWeight: 3,
                                      map: map,
                                      path: google.maps.geometry.encoding.decodePath(enc_poly)
                                    });
        
                                    let bounds = new google.maps.LatLngBounds();
                                    for (let i=0; i<poly.getPath().getLength(); i++) {
                                      bounds.extend(poly.getPath().getAt(i));
                                    }
                                    map.fitBounds(bounds);
                                    
                                }
                                initMap()
                                showMoreBtn.style.visibility = "visible"
                                showMoreBtn.style.zIndex = "1"

                                //APPEND REVIEW
                                
                                if(route.review){
                                    const score = route.review.score
                                    for(let i = 0; i < score; i++){
                                        const starClosedSVG = document.createElement("img")
                                        starClosedSVG.src = require("../../../assets/icons/icon-star-solid.svg")
                                        starClosedSVG.className = "icon"
                                        starClosedSVG.alt = "This is an open star for the review"
                                        reviewChildNode.appendChild(starClosedSVG)
                                    }
                                    for(let i = 0; i < 5 - score; i++){
                                        const starOpenSVG = document.createElement("img")
                                        starOpenSVG.src = require("../../../assets/icons/icon-star-open.svg")
                                        starOpenSVG.className = "icon"
                                        starOpenSVG.alt = "This is a closed star for the review"
                                        reviewChildNode.appendChild(starOpenSVG)
                                    }
                                }
                                else{
                                    reviewChildNode.innerHTML = "No review yet"
                                }
                                counter++
                        })
                    }
                    slicer()
                }
                makeCards(false)
                .then(() => download())

                const download = async function(){
                    const allRoutes = document.querySelectorAll(".download-route")
                    allRoutes.forEach(download => {
                        download.addEventListener("click", (event) => {
                            event.preventDefault()
                            getGpxFile(event)
                        })
                    })
                }


                showMoreBtn.addEventListener("click", () => {
                    max += 6
                    if(max >= counter){
                        showMoreBtn.style.visibility = "hidden"
                        showMoreBtn.style.position = "absolute"
                    }
                    makeCards(true)
                    .then(() => {
                        const allRoutes = document.querySelectorAll(".download-route")
                        allRoutes.forEach(download => {
                            download.addEventListener("click", (event) => {
                                event.preventDefault()
                                getGpxFile(event)
                            })
                        })
                    })
                })

                const getGpxFile = async function(event){
                    get(child(dbRef, `users/${uid}/tokens/`)).then((snapshot) => {
                        if (snapshot.exists()) {
                            const url = `https://www.strava.com/oauth/token?client_id=84306&client_secret=30e1dd2eac6c3debeb0dc7d068918ac613a15747&grant_type=refresh_token&refresh_token=${snapshot.val().refresh_token}`
                            fetch(url, {
                                method: "POST"
                            })
                            .then(response => response.json())
                            .then(data => {
                                update(ref(database, `users/${uid}/tokens/`), {
                                    refresh_token: data.refresh_token
                                })
                                .then(() => {
                                    const route_id = event.target.id
                                    const route_name = event.target.parentNode.parentNode.parentNode.childNodes[3].childNodes[3].value
                                    fetch(`https://www.strava.com/api/v3/routes/${route_id}/export_gpx`, {
                                        method: "GET",
                                        headers: {
                                            "Content-Type": "application/json",
                                            "Authorization": `Bearer ${data.access_token}`
                                        }
                                    })
                                    .then(response => response.blob())
                                    .then(data => {
                                        let a = document.createElement("a")
                                        a.href = window.URL.createObjectURL(data)
                                        a.download = `ROUTIO-${route_name}.gpx`
                                        a.click()
                                    })
                                    .catch(err => console.log(err))
                                })
                            })
                        } else {
                          console.log("No data available");
                        }
                      }).catch((error) => {
                        console.error(error);
                      });

                }
            }
            else{
                const div = document.createElement("div")
                div.className = "noRoutesDiv"
                div.innerHTML = `<h1>You didn't synchronize your routes yet :)</h1><img src="http://i.stack.imgur.com/SBv4T.gif" alt="this slowpoke moves"/>`
                routecards.appendChild(div)
            }
        })
    } else {
        window.location = "../../login/"
    }
  });
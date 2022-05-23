//MODULE DUS GEEN IIFE
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, update, onValue } from "firebase/database";

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
                localStorage.setItem("refresh_token", data.refresh_token)
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
                .then(data => {
                    //HIER ZET IK DE DATA IN DE DATABASE VIA DE FUNCTIE WRITEUSERDATA
                    onAuthStateChanged(auth, (user) => {
                        if (user) {
                          // User is signed in, see docs for a list of available properties
                          // https://firebase.google.com/docs/reference/js/firebase.User
                          const uid = user.uid
                          writeUserData(uid, data)
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
            let counter = 0
            const data = snapshot.val()
            if(data){
                const makeCards = async function(){
                    data.forEach(route => {
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
                        let routediv = 
                        `   <div class="route"></div>
                            <div class="titel">
                                <label for="titel-route${counter}" class="away">Name of route: ${routename}</label>
                                <input type="text" id="titel-route${counter}" class="titel-route" value="${routename}" readonly>
                                <button class="edit-title"></button>
                            </div>
                            <hr>
                            <div class="stats">
                                <div class="left">
                                    <a href="" class="line download-route">
                                        <p>Download gpx</p>
                                    </a>
                                    <a href="" class="line">
                                        <p>Share route</p>
                                    </a>
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
                                <div class="review">
                                    <img src="/icon-star-solid.5ec235aa.svg" alt="solid star" class="icon">
                                    <img src="/icon-star-solid.5ec235aa.svg" alt="solid star" class="icon">
                                    <img src="/icon-star-solid.5ec235aa.svg" alt="solid star" class="icon">
                                    <img src="/icon-star-solid-half.39e743c9.svg" alt="solid star" class="icon">
                                    <img src="/icon-star-open.6b996d0d.svg" alt="solid star" class="icon">
                                </div>
                            </div>`
                        element.innerHTML = routediv
                        routecards.appendChild(element)

                        const downloadChildnode = element.childNodes[7].childNodes[1].childNodes[1]
                        const shareChildnode = element.childNodes[7].childNodes[1].childNodes[3]
                        const typeChildNode = element.childNodes[7].childNodes[1].childNodes[5]
                        const distChildNode = element.childNodes[7].childNodes[3].childNodes[1]
                        const elevChildNode = element.childNodes[7].childNodes[3].childNodes[3]

                        //APPEND THE IMAGES
                        element.childNodes[3].childNodes[5].appendChild(pencil)
                        downloadChildnode.appendChild(download)
                        shareChildnode.appendChild(share)
                        typeChildNode.appendChild(routeTypesImg[route.type - 1])
                        distChildNode.appendChild(routeicon)
                        elevChildNode.appendChild(elev)

                        //APPEND THE CARD IMAGE
                        const initMap = function initMap() {
                            /*
                            const map = new google.maps.Map(document.querySelector(`.route-card-${counter} .route`), {
                              zoom: 10,
                              center: { lat: 34.366, lng: -89.519 },
                            });

                            const poly = new google.maps.Polyline({
                              strokeColor: "#000000",
                              strokeOpacity: 1,
                              strokeWeight: 3,
                              map: map,
                              path: google.maps.geometry.encoding.decodePath(enc_poly)
                            });

                            let bounds = new google.maps.LatLngBounds();
                            for (let i=0; i<poly.getPath().getLength(); i++) {
                              bounds.extend(poly.getPath().getAt(i));
                            }
                            map.addListener('zoom_changed', function() {
                              console.log("zoom="+map.getZoom())
                            });
                            map.addListener('center_changed', function() {
                              console.log("center="+map.getCenter())
                            });
                            map.fitBounds(bounds);
                            */
                            }
                        initMap()
                        
                        const enc_poly = route.map.summary_polyline
                        //DECODING FOR CENTER COORDINATES
                        const polyline2 = require("@mapbox/polyline")
                        const array = polyline2.decode(enc_poly)
                        let url = `https://maps.googleapis.com/maps/api/staticmap?size=400x400&center=${array[0][0]},${array[0][1]}&zoom=13&key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&path=weight:3%7Ccolor:red%7Cenc:${enc_poly}`;
                        const img_route = document.createElement("img")
                        img_route.src = url
                        const routeImage = document.querySelector(`.route-card-${counter} .route`)
                        routeImage.appendChild(img_route)

                        counter++
                    })
                }
                makeCards()
                .then(() => {
                    const allRoutes = document.querySelectorAll(".download-route")
                    allRoutes.forEach(download => {
                        download.addEventListener("click", (event) => {
                            event.preventDefault()
                            
                        })
                    })
                })
                .catch(err => {
                    console.log(err)
                })
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
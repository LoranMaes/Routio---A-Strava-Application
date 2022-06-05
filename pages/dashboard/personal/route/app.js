// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get, child, update, push } from "firebase/database";

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


const starsClosed = document.querySelectorAll(".review-section .star-closed")
const starsOpen = document.querySelectorAll(".review-section .star-open")
const textReview = document.querySelector("#review-input")
const submitReview = document.querySelector("#submit-review")
const errorSubmit = document.querySelector("#submit-review + p.errorMessage")

//ALL THE STARS
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

window.addEventListener("DOMContentLoaded", () => {
    onAuthStateChanged(auth, (user) => {
        if (user){
            const uid = user.uid
            get(ref(database, `users/${uid}/routes`))
            .then(snapshot => {
                if(snapshot.exists()){
                    const routes = snapshot.val()
                    let counter = 0
                    routes.forEach(route => {
                        const urlParams = new URLSearchParams(window.location.search)
                        const route_id = urlParams.get("route_id")
                        if(route.id_str === route_id){
                            get(ref(database, `users/${uid}/routes/${counter}/review`))
                            .then(snapshot => {
                                if(snapshot.exists()){
                                    const scoreData = snapshot.val().score
                                    const textReviewData = snapshot.val().textReview

                                    textReview.innerHTML = textReviewData
                                    const makeAllHidden = function(){
                                        starsClosed.forEach(star => {
                                            star.style.visibility = "hidden"
                                            star.style.position = "absolute"
                                            star.style.zIndex = "-1"
                                        })
                                        starsOpen.forEach(star => {
                                            star.style.visibility = "hidden"
                                            star.style.position = "absolute"
                                            star.style.zIndex = "-1"
                                        })
                                    }
                                    switch(scoreData){
                                        case 0: {
                                            makeAllHidden()
                                            makeVisible(o1)
                                            makeVisible(o2)
                                            makeVisible(o3)
                                            makeVisible(o4)
                                            makeVisible(o5)
                                        }return;
                                        case 1: {
                                            makeAllHidden()
                                            makeVisible(c1)
                                            makeVisible(o2)
                                            makeVisible(o3)
                                            makeVisible(o4)
                                            makeVisible(o5)
                                        }return;
                                        case 2: {
                                            makeAllHidden()
                                            makeVisible(c1)
                                            makeVisible(c2)
                                            makeVisible(o3)
                                            makeVisible(o4)
                                            makeVisible(o5)                                       
                                        }return;
                                        case 3: {
                                            makeAllHidden()
                                            makeVisible(c1)
                                            makeVisible(c2)
                                            makeVisible(c3)
                                            makeVisible(o4)
                                            makeVisible(o5)                                       
                                        }return;
                                        case 4: {
                                            makeAllHidden()
                                            makeVisible(c1)
                                            makeVisible(c2)
                                            makeVisible(c3)
                                            makeVisible(c4)
                                            makeVisible(o5)                                      
                                        }return;
                                        case 5: {
                                            makeAllHidden()
                                            makeVisible(c1)
                                            makeVisible(c2)
                                            makeVisible(c3)
                                            makeVisible(c4)
                                            makeVisible(c5)                                        
                                        }return;
                                        default: {
                                            makeAllHidden()
                                            makeVisible(o1)
                                            makeVisible(o2)
                                            makeVisible(o3)
                                            makeVisible(o4)
                                            makeVisible(o5)                                        
                                        }

                                    }
                                }
                            })
                            return
                        }
                        counter++
                    })
                }
            })
        }
    })
})

onAuthStateChanged(auth, (user) => {
    if (user){
        const fillUp = async function(){
            const uid = user.uid
            
            //GET THE URL PARAMS
            const urlParams = new URLSearchParams(window.location.search)
            
            const name = urlParams.get("route_name")
            document.title = `Routio - Route: ${name}`
            
            const est_time = urlParams.get("est_time")
            const uur = Math.floor(est_time / 3600)
            const minuten = (est_time / 3600 - uur) * 60
            const seconden = (minuten - Math.floor(minuten)) * 60
            
            const dist = urlParams.get("dist")
            
            const elev = urlParams.get("elev")
            const route_id = urlParams.get("route_id")
            const enc_poly = urlParams.get("enc_poly")
            
            const username = document.querySelector("#user-name")
            const photo = document.querySelector("#profile-picture") 
            
            //THIS IS FOR DEFINING THE TYPE OF ROUTE
            const type = urlParams.get("type")
            const subtype = urlParams.get("subtype")
            
            let typeImg = document.createElement("img")
            if(type === "Ride"){
                typeImg.src = require("../../../../assets/icons/icon-bike.png")
                typeImg.className = "icon"
                typeImg.alt = "This route is a ride"
            }
            else if(type === "Run"){
                typeImg.src = require("../../../../assets/icons/icon-run.png")
                typeImg.className = "icon"
                typeImg.alt = "This route is a running route"
            }
            

            //GET PROFILE PICTURE
            const creatorURL = urlParams.get("creatorURL")
            const creatorName = urlParams.get("creatorName")
            username.innerHTML = creatorName
            fetch(creatorURL)
            .then(response => response.blob())
            .then(data => {
                const url = URL.createObjectURL(data)
                let image = new Image()
                image.src = url
                image.alt = "Profile picture from Google"
                //image.ariaLabel = "Profile picture from Google"
                photo.appendChild(image)
            })
            
            //SET THE ROUTES INFORMATION
            document.querySelector("#name-route").innerHTML = name
            
            const stats = document.querySelectorAll(".route-stats p.stat")
            //FIRST ONE IS ELEVATION
            stats[0].innerHTML = `${elev} m`
            //SECOND ONE IS DISTANCE
            stats[1].innerHTML = `${dist} km`
            //THIRD ONE IS ESTIMATED TIME
            stats[2].innerHTML = `${Math.round(uur)}H ${Math.round(minuten)}M ${Math.round(seconden)}S`
            
            //SET THE STRING FOR THE DOWNLOAD BUTTON
            const downloadbtn = document.querySelector(".functionalities .download-route")
            downloadbtn.id = route_id
            
            //ADD THE ICON FOR TYPE OF RIDE
            const typeSelector = document.querySelector(".route-stats .line:nth-last-child(1)")
            typeSelector.childNodes[1].innerHTML = `${type}, ${subtype}`
            typeSelector.appendChild(typeImg)
            
            //APPEND THE CARD IMAGE
            const initMap = function initMap() {
                const map = new google.maps.Map(document.querySelector(`#route-canvas`), {
                    zoom: 15,
                    center: { lat: 34.366, lng: -89.519 },
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
        }

        fillUp()
        .then(() => {
            const downloadbtn = document.querySelector(".functionalities .download-route")

            downloadbtn.addEventListener("click", (e) => {
                e.preventDefault()
                const getGpxFile = async function(){
                    get(child(dbRef, `users/${user.uid}/tokens/`))
                    .then(snapshot => {
                        if(snapshot.exists()){
                            const url = `https://www.strava.com/oauth/token?client_id=84306&client_secret=30e1dd2eac6c3debeb0dc7d068918ac613a15747&grant_type=refresh_token&refresh_token=${snapshot.val().refresh_token}`
                            fetch(url, {
                                method: "POST"
                            })
                            .then(response => response.json())
                            .then(data => {
                                update(ref(database, `users/${user.uid}/tokens/`), {
                                    refresh_token: data.refresh_token
                                })
                                .then(() => {
                                    const route_id = downloadbtn.id
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
                                        const route_name = document.querySelector("#name-route").innerHTML
                                        a.download = `ROUTIO-${route_name}.gpx`
                                        a.click()
                                        })
                                    .catch(err => console.log(err))
                                })
                            })
                        }
                    })
                }
                getGpxFile()
            })
        })

        //REVIEWS
        let finalScore = 0

        submitReview.addEventListener("click", (e) => {
            e.preventDefault()
            if(textReview.value !== "" && finalScore > 0){
                errorSubmit.style.visibility = "hidden"
                errorSubmit.style.position = "absolute"
                errorSubmit.style.zIndex = "1"
                onAuthStateChanged(auth, (user) => {
                    if (user){
                        const uid = user.uid
                        get(ref(database, `users/${uid}/routes`))
                        .then(snapshot => {
                            if(snapshot.exists()){
                                const routes = snapshot.val()
                                let counter = 0
                                routes.forEach(route => {
                                    const urlParams = new URLSearchParams(window.location.search)
                                    const route_id = urlParams.get("route_id")
                                    if(route.id_str === route_id){
                                        update(ref(database, `users/${uid}/routes/${counter}/review`), {
                                            score: finalScore,
                                            textReview: textReview.value
                                        })
                                        .then(location.reload())
                                        return
                                    }
                                    counter++
                                })
                            }
                        })
                    }
                })
            }
            else{
                errorSubmit.style.visibility = "visible"
                errorSubmit.style.position = "relative"
                errorSubmit.style.zIndex = "-1"
            }
        })

        starsClosed.forEach(star => {
            star.style.visibility = "hidden"
            star.style.position = "absolute"
            star.style.zIndex = "-1"
        })

        starsClosed.forEach(openstar => {
            openstar.addEventListener("click", (e) => {
                e.preventDefault()
                const id = e.target.id
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
                    }return;
                }
            })
        })
        starsOpen.forEach(openstar => {
            openstar.addEventListener("click", (e) => {
                e.preventDefault()
                const id = e.target.id

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
                    }return;
                }
            })
        })
    }
    else{
        window.location = "../../../../login/index.html"
    }
})
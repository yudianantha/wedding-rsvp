// FADE IN TRANSITION START
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    })
})

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));
// FADE IN TRANSITION END



// AUDIO CONFIG START
var rindik = document.getElementById("rindik");
var rindikIcon = document.getElementById("rindik-icon")

// window.onload = function() {
//     rindik.play();
// }

function togglePlay(){
  if (rindik.paused){
    rindik.play();
    rindikIcon.classList.remove("bi-volume-mute-fill")
    rindikIcon.classList.add("bi-volume-up-fill")
  } else {
    rindik.pause();
    rindikIcon.classList.remove("bi-volume-up-fill")
    rindikIcon.classList.add("bi-volume-mute-fill")
  }
  // return rindik.paused ? rindik.play() : rindik.pause();
};
// AUDIO CONFIG END



// TIMER START
// Set the date we're counting down to
var countDownDate = new Date("Mar 16, 2024 10:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("demo").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);
// TIMER END



// GOOGLE MAP API START
(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})
    ({key: "AIzaSyCPobPV2hJo1kF6LltI00A_OQskVGjT47M", v: "weekly"});

// Initialize and add the map
let map;

async function initMap() {
  // The location of Uluru
  const position = { lat: -8.639396220918453, lng: 115.20626781329634 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 15,
    center: position,
    mapId: "DEMO_MAP_ID",
    disableDefaultUI: true
  });

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "Uluru",
  });
}

initMap();
// GOOGLE MAP API END



// SCROLL BUTTON START
// let scrollTopButton = document.getElementById("scroll-top");
// let scrollDownButton = document.getElementById("scroll-down")

// window.onscroll = function() {
//   scrollFunction()
//   console.log('test')
// };

// function scrollFunction() {
//   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//     scrollTopButton.style.display = "flex";
//     scrollDownButton.style.display = "none";
//     console.log('scroll')
//   } else {
//     scrollTopButton.style.display = "none";
//     scrollDownButton.style.display = "flex"
//   }
// }
// SCROLL BUTTON END



// POST FORM TO GOOGLE SHEET START
document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the default form submission
  document.getElementById("message").textContent = "Submitting..";
  document.getElementById("message").style.display = "block";
  document.getElementById("submit-button").disabled = true;

  // Collect the form data
  var formData = new FormData(this);
  var keyValuePairs = [];
  for (var pair of formData.entries()) {
    keyValuePairs.push(pair[0] + "=" + pair[1]);
  }

  var formDataString = keyValuePairs.join("&");

  // Send a POST request to your Google Apps Script
  fetch(
    "https://script.google.com/macros/s/AKfycbwQCSbHtSYUHpMXzlH4IoXOE1Bu1wKM6nY9YXzGv9LipSBC3ekAUg9034rBpkKxGHRE/exec",
    {
      redirect: "follow",
      method: "POST",
      body: formDataString,
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
    }
  )
    .then(function (response) {
      // Check if the request was successful
      if (response) {
        return response; // Assuming your script returns JSON response
      } else {
        throw new Error("Failed to submit the form.");
      }
    })
    .then(function (data) {
      // Display a success message
      document.getElementById("message").textContent =
        "Data submitted successfully!";
      document.getElementById("message").style.display = "block";
      document.getElementById("message").style.backgroundColor = "green";
      document.getElementById("message").style.color = "beige";
      document.getElementById("submit-button").disabled = false;
      document.getElementById("form").reset();

      setTimeout(function () {
        document.getElementById("message").textContent = "";
        document.getElementById("message").style.display = "none";
      }, 2600);
    })
    .catch(function (error) {
      // Handle errors, you can display an error message here
      console.error(error);
      document.getElementById("message").textContent =
        "An error occurred while submitting the form.";
      document.getElementById("message").style.display = "block";
    });
});
// POST FORM TO GOOGLE SHEET START
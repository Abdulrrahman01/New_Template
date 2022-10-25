
// Select Settings Box Element 
let settingsBox = document.querySelector('.settings-box');
let settingsGear = document.querySelector('.settings-box .gear-container .gear');

settingsGear.onclick = function () {
    settingsGear.classList.toggle('fa-spin');
    settingsBox.classList.toggle('clicked');
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------

// Switch Colors 
const colorsLi =document.querySelectorAll(".colors-list li");

// loop On Lis
colorsLi.forEach(li => {

    // Click On Lis ITems
    li.addEventListener("click", (e) => {

    // Set Color On Root
    document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

    // Set Color On Locat Storage 
    localStorage.setItem("color_option", e.target.dataset.color);

    handleActive(e);
})
});

// Check Color On Local Storage
let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) {
    document.documentElement.style.setProperty('--main-color', mainColors);

    // Check Active Class From All Colors List Item
    document.querySelectorAll(".colors-list li").forEach(element => {

        element.classList.remove("active");
        
        // Add Active Class To Clicked Color
        if (element.dataset.color === mainColors) {
            element.classList.add("active")
        }
    })
}
//---------------------------------------------------------------------------------------------------------------------------------------------------------

// Switch Backgrounds 
const randomBackEl = document.querySelectorAll(".random-backgrounds span");

// loop On All Spans
randomBackEl.forEach(span => {

    // Click On Spans ITems
    span.addEventListener("click", (e) => {

        handleActive(e);

    if (e.target.dataset.background === 'yes') {

        backgroundOption = true;

        randomizeImgs();

        localStorage.setItem("background_option", true);

    }else{
        backgroundOption = false;

        clearInterval(backgroundInterval);

        localStorage.setItem("background_option", false);
    }
})
});
// Random Background Option
let backgroundOption = true;

// Variable o Control The Interval
let backgroundInterval;

// Check If There is Local Storage Random Background Item
let backgroundLocalItem = localStorage.getItem("background_option");

// Check If Random Background Local Storage Is Not Null 
if (backgroundLocalItem !== null) {
    
    if (backgroundLocalItem === "true") {

        backgroundOption = true;
    
    } else {

        backgroundOption = false;
    
    }

    // Remove Active Class From All Spans
    document.querySelectorAll(".random-backgrounds span").forEach(element => {
        element.classList.remove("active");
    });

    if (backgroundLocalItem === "true") {
        document.querySelector(".random-backgrounds .yes").classList.add("active");
    }else {
        document.querySelector(".random-backgrounds .no").classList.add("active");
    }

}
//----------------------------------------------------------------------------------------------------------------------------------------------------------------

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option")

if (bulletLocalItem !== null) {
    
    bulletsSpan.forEach(span => {
        span.classList.remove("active");
    });

    if (bulletLocalItem === 'block') {

        bulletsContainer.style.display = "block"

        document.querySelector(".bullets-option", 'yes').classList.add("active");

    } else {

        bulletsContainer.style.display = "none"

        document.querySelector(".bullets-option", 'no').classList.add("active");

    }

};

bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {
        
        if (span.dataset.display === "show") {
            bulletsContainer.style.display = "block"
            localStorage.setItem("bullets_option", "block")
        }
        else{
            bulletsContainer.style.display = "none"
            localStorage.setItem("bullets_option", "none")

        }
        handleActive(e);
    })
})
//----------------------------------------------------------------------------------------------------------------------------------------------------------------
// Select Landing page Element 
let landingPage = document.querySelector(".landing-page");

// Get Array Of Images 
let imgsArray = ["landing-1.jpg", "landing-2.jpg", "landing-3.jpg", "landing-4.jpg", "landing-5.jpg"];

// Function To Randomize Imgs
function randomizeImgs() {
    if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
            // Get Random Number
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
            landingPage.style.backgroundImage = `url("images/landing-${randomNumber + 1}.jpg")`;
        }, 1000);
    }
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------

// Skills Selector
let ourskills = document.querySelector(".skills");

window.onscroll = function () {
    
    // Skills OffSet Top
    let skillsOffsetTop = ourskills.offsetTop;

    // Skills Outer Height
    let skillsOuterHeight = ourskills.offsetHeight;

    // Window Height
    let windowHeight = this.innerHeight;

    // window scroll top
    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight*1.5)) {


        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
            
        allSkills.forEach(skill => {

            skill.style.width = skill.dataset.progress;

        })
    }
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------

// Create Popup With The Image
let ourGallery = document.querySelectorAll(".gallery img")

ourGallery.forEach(img => {
    
    img.addEventListener("click", (e) => {
        
        // Create Overlay 
        let overlay = document.createElement("div");

        // Add Class To Overlay 
        overlay.className = "popup-overlay";
        
        // Append Overlay To Body
        document.body.appendChild(overlay);

        // Create The Popup
        let popupBox = document.createElement("div");

        // Add Class To Popup 
        popupBox.className = "popup";

        if (img.alt !== null) {
            
            // Create The Heading 
            let imgHeading = document.createElement("h3");

            // Create Heading Text 
            let imgHeadingText = document.createTextNode(img.alt);

            // Append Text To Heading 
            imgHeading.appendChild(imgHeadingText);

            // Append Heading To Popup box
            popupBox.appendChild(imgHeading);
        }

        // Create Close Span
        let closeSpan = document.createElement("span");

        // Create Span Text 
        let SpanText = document.createTextNode("x");

        // Append Text To Heading 
        closeSpan.appendChild(SpanText);

        // Add Class To Close Span
        closeSpan.className = "close-span"

        // Append Heading To Popup box
        popupBox.appendChild(closeSpan);

        // Create The Img 
        let popupImage = document.createElement("img")

        // Set Image Source
        popupImage.src = img.src

        // Append Img To popup
        popupBox.appendChild(popupImage);

        // Append Popup To Body
        document.body.appendChild(popupBox);

    });

});

// Close PopUp
document.addEventListener("click", (e) => {

    if (e.target.className == "close-span") {
        
        // Remove The Current Popup
        document.querySelector(".popup").remove();

        // Remove Overlay
        document.querySelector(".popup-overlay").remove();

    }

});

document.addEventListener("keyup", (ev) => {

    if (ev.key === "Escape") {
    
        // Remove The Current Popup
        document.querySelector(".popup").remove();

        // Remove Overlay
        document.querySelector(".popup-overlay").remove();
    
    }
    
});

//----------------------------------------------------------------------------------------------------------------------------------------------------------------

// Handle Active Status 
function handleActive(ev) {
        // Remove Active Class From All Children
        ev.target.parentElement.querySelectorAll(".active").forEach(element => {

            element.classList.remove("active");
        })
        // Add Active Class On Target
    
        ev.target.classList.add("active");
}


//----------------------------------------------------------------------------------------------------------------------------------------------------------------

document.querySelector('.reset-option').onclick = function () {
    
    localStorage.removeItem('bullets_option');
    localStorage.removeItem('background_option');
    localStorage.removeItem('color_option');
    window.location.reload()
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------

let toggleButton = document.querySelector('.toggle-menu');
let tLinks = document.querySelector('.links');

toggleButton.onclick = function (e) {

    e.stopPropagation();

    this.classList.toggle('menu-active');

    tLinks.classList.toggle('open');
}

document.addEventListener("click", (e) => {
    if (e.target !== toggleButton) {

        toggleButton.classList.remove('menu-active');

        tLinks.classList.remove('open');
    } else{
        
    }
})
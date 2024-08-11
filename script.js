// Initialize Locomotive Scroll
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPage() {
    var tl = gsap.timeline();

    // Smooth and quick animation for the navbar
    tl.from('#nav', {
        y: '-50%',       
        opacity: 0,
        duration: 1,  
        ease: 'power1.out'  
    });

    // Smooth and quick animation for the bounding element
    tl.to('.boundingelem', {
        y: 0,           
        duration: .7,  
        ease: 'power1.out',  
        delay: 0.5     
    });

    // Gradual fade-in for the bounding element
    tl.from('.boundingelem', {
        opacity: 0,
        duration: 0.4, 
        ease: 'power1.out'
    }, "-=0.7");

    // Smooth and quick animation for the footer
    tl.from('#herofooter', {
        y: '30%',       
        opacity: 0,
        duration: 1,    
        ease: 'power1.out'  
    });
}

// Circle Follower Effect
function circleskew() {
    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function (event) {
        var xdiff = event.clientX - xprev;
        var ydiff = event.clientY - yprev;

        // Update the previous positions after calculating the difference
        xprev = event.clientX;
        yprev = event.clientY;

        // Clamp the scale values between 0.8 and 1.2
        var xscale = gsap.utils.clamp(0.8, 1.2, 1 + Math.abs(xdiff) / 100);
        var yscale = gsap.utils.clamp(0.8, 1.2, 1 + Math.abs(ydiff) / 100);

        // Update the position and scale of the circle
        circleMouseFollower(event.clientX, event.clientY, xscale, yscale);
    });
}

function circleMouseFollower(x, y, xscale, yscale) {
    const minicircle = document.querySelector('#minicircle');
    minicircle.style.transform = `translate(${x}px, ${y}px) scale(${xscale}, ${yscale})`;
}

// Initialize the circle follower
circleskew();

// Hover Effect on .elem Elements
// Hover Effect on .elem Elements
document.querySelectorAll(".elem").forEach(function (elem) {
    let prevX = 0, prevY = 0;
    const image = elem.querySelector("img");

    // Listen for mousemove events on the window, not just the .elem
    window.addEventListener("mousemove", function (details) {
        var elemRect = elem.getBoundingClientRect();

        // Check if the cursor is within the .elem container
        if (details.clientX >= elemRect.left && details.clientX <= elemRect.right &&
            details.clientY >= elemRect.top && details.clientY <= elemRect.bottom) {
            
            var diffY = details.clientY - elemRect.top;
            var diffX = details.clientX - elemRect.left;

            // Calculate mouse speed
            var speedX = details.clientX - prevX;
            var speedY = details.clientY - prevY;

            // Update previous positions
            prevX = details.clientX;
            prevY = details.clientY;

            // Set the image to follow the cursor closely within the .elem container
            var offsetX = -75; // Adjust to position the image closer to the cursor
            var offsetY = -75; // Adjust to position the image closer to the cursor

            // Calculate rotation based on speed
            var rotationAngle = gsap.utils.clamp(-20, 25, (speedX + speedY) / 2);

            gsap.to(image, {
                opacity: 1,
                ease: "power1.easInout",
                top: (diffY + offsetY) + "px",
                left: (diffX + offsetX) + "px",
                rotation: rotationAngle, // Apply rotation
                overwrite: "auto",
                duration: 0.3 // Smooth transition
            });
        } else {
            // Hide the image if the cursor is outside the .elem container
            gsap.to(image, {
                opacity: 0,
                rotation: 0, // Reset rotation
                duration: 0.3 // Smooth transition
            });
        }
    });

    elem.addEventListener("mouseleave", function () {
        // Hide the image and reset rotation when the cursor leaves the .elem
        gsap.to(image, {
            opacity: 0,
            rotation: 0, // Reset rotation
            duration: 0.3 // Smooth transition
        });
    });
});



// Update Time Function
function updateTime() {
    var now = new Date();

    // Convert to IST (UTC + 5:30)
    var options = { timeZone: 'Asia/Kolkata', hour12: false };
    var timeString = now.toLocaleTimeString('en-US', options);

    // Update the time in the h5 element
    document.getElementById('time-display').innerText = timeString + ' IST';
}

// Update the time every second
setInterval(updateTime, 1000);

// Initialize the time display immediately
updateTime();

// Initialize animations on DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
    firstPage();
});


document.addEventListener("DOMContentLoaded", function () {
    const words = ["Analyst", "Designer", "Developer"];
    const typeElement = document.getElementById("type");

    let wordIndex = 0;
    let charIndex = 0;
    let currentWord = "";
    let isDeleting = false;

    function type() {
        const fullWord = words[wordIndex];

        if (isDeleting) {
            currentWord = fullWord.substring(0, charIndex--);
        } else {
            currentWord = fullWord.substring(0, charIndex++);
        }

        typeElement.textContent = currentWord;

        if (!isDeleting && charIndex === fullWord.length) {
            isDeleting = true;
            setTimeout(type, 1000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, 550);
        } else {
            setTimeout(type, isDeleting ? 50 : 100);
        }
    }

    type();
});

// Select all the images inside the #skill div
const skillImages = document.querySelectorAll('#skill img');

// Add mouseover and mouseout event listeners to each image
skillImages.forEach(img => {
    img.addEventListener('mouseover', () => {
        img.style.transform = 'scale(1.6) translateY(-10px)'; // Scale and move up on hover
        img.style.zIndex = '10'; // Bring the hovered element to the front
    });

    img.addEventListener('mouseout', () => {
        img.style.transform = 'scale(1) translateY(0)'; // Reset to original size and position
        img.style.zIndex = '1'; // Reset z-index
    });
});


// //cursor
// const coords = { x: 0, y: 0 };
// const circles = document.querySelectorAll(".circle");

// const colors = [
//  "#ffffff",  /* Pure white */
// "#f2f2f2",  /* Very light gray */
// "#e6e6e6",  /* Light gray */
// "#d9d9d9",  /* Soft gray */
// "#cccccc",  /* Medium light gray */
// "#bfbfbf",  /* Neutral gray */
// "#b3b3b3",  /* Slightly darker gray */
// "#a6a6a6",  /* Medium gray */
// "#999999",  /* Standard gray */
// "#8c8c8c",  /* Medium dark gray */
// "#808080",  /* Classic gray */
// "#737373",  /* Slightly darker than classic gray */
// "#666666",  /* Dark gray */
// "#595959",  /* Deeper gray */
// "#4d4d4d",  /* Darker still */
// "#404040",  /* Very dark gray */
// "#333333",  /* Near-black gray */
// "#262626",  /* Darker near-black gray */
// "#1a1a1a",  /* Almost black */
// "#0d0d0d",  /* Very close to black */
// "#000000"   /* Pure black */
// ];

// circles.forEach(function (circle, index) {
//   circle.x = 0;
//   circle.y = 0;
//   circle.style.backgroundColor = colors[index % colors.length];
// });

// window.addEventListener("mousemove", function(e){
//   coords.x = e.clientX;
//   coords.y = e.clientY;
  
// });

// function animateCircles() {
  
//   let x = coords.x;
//   let y = coords.y;
  
//   circles.forEach(function (circle, index) {
//     circle.style.left = x - 12 + "px";
//     circle.style.top = y - 12 + "px";
    
//     circle.style.scale = (circles.length - index) / circles.length;
    
//     circle.x = x;
//     circle.y = y;

//     const nextCircle = circles[index + 1] || circles[0];
//     x += (nextCircle.x - x) * 0.3;
//     y += (nextCircle.y - y) * 0.3;
//   });
 
//   requestAnimationFrame(animateCircles);
// }

// animateCircles();

//image distort error

// variables
const imageContainer = document.getElementById("imageContainer");
const imageElement = document.getElementById("myImage");

let easeFactor = 0.02;
let scene, camera, renderer, planeMesh;
let mousePosition = { x: 0.5, y: 0.5 };
let targetMousePosition = { x: 0.5, y: 0.5 };
let mouseStopTimeout;
let aberrationIntensity = 0.0;
let lastPosition = { x: 0.5, y: 0.5 };
let prevPosition = { x: 0.5, y: 0.5 };

// shaders
const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fragmentShader = `
    varying vec2 vUv;
    uniform sampler2D u_texture;    
    uniform vec2 u_mouse;
    uniform vec2 u_prevMouse;
    uniform float u_aberrationIntensity;

    void main() {
        vec2 gridUV = floor(vUv * vec2(20.0, 20.0)) / vec2(20.0, 20.0);
        vec2 centerOfPixel = gridUV + vec2(1.0/20.0, 1.0/20.0);
        
        vec2 mouseDirection = u_mouse - u_prevMouse;
        
        vec2 pixelToMouseDirection = centerOfPixel - u_mouse;
        float pixelDistanceToMouse = length(pixelToMouseDirection);
        float strength = smoothstep(0.3, 0.0, pixelDistanceToMouse);
 
        vec2 uvOffset = strength * - mouseDirection * 0.2;
        vec2 uv = vUv - uvOffset;

        vec4 colorR = texture2D(u_texture, uv + vec2(strength * u_aberrationIntensity * 0.01, 0.0));
        vec4 colorG = texture2D(u_texture, uv);
        vec4 colorB = texture2D(u_texture, uv - vec2(strength * u_aberrationIntensity * 0.01, 0.0));

        gl_FragColor = vec4(colorR.r, colorG.g, colorB.b, 1.0);
    }
`;

function initializeScene(texture) {
  //   scene creation
  scene = new THREE.Scene();

  // camera setup
  camera = new THREE.PerspectiveCamera(
    80,
    imageElement.offsetWidth / imageElement.offsetHeight,
    0.01,
    10
  );
  camera.position.z = 1;

  //   uniforms
  let shaderUniforms = {
    u_mouse: { type: "v2", value: new THREE.Vector2() },
    u_prevMouse: { type: "v2", value: new THREE.Vector2() },
    u_aberrationIntensity: { type: "f", value: 0.0 },
    u_texture: { type: "t", value: texture }
  };

  //   creating a plane mesh with materials
  planeMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    new THREE.ShaderMaterial({
      uniforms: shaderUniforms,
      vertexShader,
      fragmentShader
    })
  );

  //   add mesh to scene
  scene.add(planeMesh);

  //   render
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(imageElement.offsetWidth, imageElement.offsetHeight);

  //   create a canvas
  imageContainer.appendChild(renderer.domElement);
}

// use the existing image from html in the canvas
initializeScene(new THREE.TextureLoader().load(imageElement.src));

animateScene();

function animateScene() {
  requestAnimationFrame(animateScene);

  mousePosition.x += (targetMousePosition.x - mousePosition.x) * easeFactor;
  mousePosition.y += (targetMousePosition.y - mousePosition.y) * easeFactor;

  planeMesh.material.uniforms.u_mouse.value.set(
    mousePosition.x,
    1.0 - mousePosition.y
  );

  planeMesh.material.uniforms.u_prevMouse.value.set(
    prevPosition.x,
    1.0 - prevPosition.y
  );

  aberrationIntensity = Math.max(0.0, aberrationIntensity - 0.005);

  planeMesh.material.uniforms.u_aberrationIntensity.value = aberrationIntensity;

  renderer.render(scene, camera);
}

// event listeners
imageContainer.addEventListener("mousemove", handleMouseMove);
imageContainer.addEventListener("mouseenter", handleMouseEnter);
imageContainer.addEventListener("mouseleave", handleMouseLeave);

function handleMouseMove(event) {
  easeFactor = 0.02;
  let rect = imageContainer.getBoundingClientRect();
  prevPosition = { ...targetMousePosition };

  targetMousePosition.x = (event.clientX - rect.left) / rect.width;
  targetMousePosition.y = (event.clientY - rect.top) / rect.height;

  aberrationIntensity = 1;
}

function handleMouseEnter(event) {
  easeFactor = 0.02;
  let rect = imageContainer.getBoundingClientRect();

  mousePosition.x = targetMousePosition.x = (event.clientX - rect.left) / rect.width;
  mousePosition.y = targetMousePosition.y = (event.clientY - rect.top) / rect.height;
}

function handleMouseLeave() {
  easeFactor = 0.05;
  targetMousePosition = { ...prevPosition };
}

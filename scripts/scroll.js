SmoothScroll({
    animationTime    : 800,
    stepSize         : 75,   
    accelerationDelta : 30,  
    accelerationMax   : 1,   
    keyboardSupport   : true,  
    arrowScroll       : 50,
    pulseAlgorithm   : true,
    pulseScale       : 4,
    pulseNormalize   : 1,
    touchpadSupport   : true,
});

export default function checkScroll(elementClass, scrollClass) {
    const element = document.querySelector(elementClass);
    if ($(document).scrollTop() > 25) {
        element.classList.add(scrollClass);
    } else if ($(document).scrollTop() < 10)  {
        element.classList.remove(scrollClass);
}};
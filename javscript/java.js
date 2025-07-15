//fisrt we et the id of the navbar
const  navbar  = document.getElementById('navbar')

//Creating the function we called
function openSidebar(){
    // to open the navbar, we simply assign the class 'show' to the navbar
    navbar.classList.add('show')
}
function closeSidebar(){
    navbar.classList.remove('show')
}
// This closes your sidebar whenyou click on a link if you have bookmark links
const navLinks = document.querySelectorAll('nav a')
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeSidebar()
    })
})




document.addEventListener("DOMContentLoaded", () => {
    const fadeInElements = document.querySelectorAll(".fade-in");
    const slidInElements = document.querySelectorAll(".slid-in");
    const scalInElements = document.querySelectorAll(".scal-in");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            } else {
                entry.target.classList.remove("show"); // Remove the class when scrolling up
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    fadeInElements.forEach(element => {
        observer.observe(element);
    });
    slidInElements.forEach(element => {
        observer.observe(element);
    });
    scalInElements.forEach(element => {
        observer.observe(element);
    });
});
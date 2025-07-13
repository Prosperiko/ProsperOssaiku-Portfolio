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
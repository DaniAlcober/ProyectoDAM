// Show/Hide Menu
//var hamburger = document.querySelector(".hamburger");
//hamburger.addEventListener("click", function () {
//    document.querySelector("body").classList.toggle("active");
//})

// Make clicked tab active
var tab = document.querySelectorAll("a");
tab.forEach(t => {
    t.addEventListener('click', () => {
        var tabActive = document.querySelector("a.active");
        tabActive.classList.remove('active');
        t.classList.add('active');
    })
    
});

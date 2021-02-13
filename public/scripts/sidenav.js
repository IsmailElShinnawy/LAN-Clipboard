// SIDE BAR functions
let isClosed = true;
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("sidenav-icon-container").style.marginLeft = "250px";
    isClosed = false;
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("sidenav-icon-container").style.marginLeft = "0";
    isClosed = true;
}

function toggleNav() {
    if (isClosed) openNav();
    else closeNav();
}
// END OF SIDE BAR functions
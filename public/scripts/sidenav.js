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
const deleteuser = document.getElementById('delete-user');
    deleteuser.addEventListener('click', (e) => {
        e.preventDefault();
        socket.emit('delete user');
        // socket.broadcast.emit('delete user');
        fetch(`/users/${deleteuser.dataset.userid}`, {
            method: 'DELETE'
        })
            .then(result => result.json())
            .then(data => window.location.href = data.redirect)
            .catch(err => console.log(err));
    });
// END OF SIDE BAR functions
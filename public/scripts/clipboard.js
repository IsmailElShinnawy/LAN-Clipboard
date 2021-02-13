// COPY TO CLIPBOARD functions
function copyToClipboard(element) {
    const $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
}
// END OF COPY TO CLIPBOARD functions

// DELETE FROM CLIPBOARD functions
const trashcans = document.querySelectorAll('button.delete-button');
// console.log(trashcans);
trashcans.forEach((trashcan) => {
    trashcan.addEventListener('click', (e) => {
        const endpoint = `/items/${trashcan.dataset.itemid}`;
        fetch(endpoint, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => {console.log(data.redirect); window.location.href = data.redirect})
            .catch((err) => console.log(err));
    });
});
// END OF DELETE FROM CLIPBOARD functions
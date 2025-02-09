function copyLink(button) {
    let linkInput = button.parentElement.previousElementSibling;
    linkInput.select();
    document.execCommand("copy");
    alert("লিংক কপি হয়েছে: " + linkInput.value);
}

function openLink(button) {
    let linkInput = button.parentElement.previousElementSibling.value;
    window.open(linkInput, "_blank");
}

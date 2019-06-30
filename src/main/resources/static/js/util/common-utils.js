// Remove all children from a parent.
function removeChildren(parent) {
    while(parent.hasChildNodes()) {
        parent.removeChild(parent.firstChild);
    }
}

// Return the current root URL.
function getRootURL() {
    return location.protocol + "//" + window.location.hostname + ":" + window.location.port;
}

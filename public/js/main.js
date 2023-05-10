
function addOverlay(overlayCallback){
    var overlayStack = document.getElementById('overlayStack');

    const newOverlayDiv = document.createElement('div');
    newOverlayDiv.className = 'overlay';
    newOverlayDiv.onclick = overlayCallback;

    overlayStack.appendChild(newOverlayDiv);
}

function removeOverlay(){
    console.log("reached?");
    var overlayStack = document.getElementById('overlayStack');
    overlayStack.removeChild(overlayStack.lastChild);
}

// nav functions
function navToggle(){
    var nav = document.getElementById('nav-mobile');
    if (nav.classList.contains('navHide')){
        navShow();
    }
    else {
        navHide();
    }
}

function navShow(){
    var nav = document.getElementById('nav-mobile');
    var navToggle = nav.children.item(1);
    var navIcon = navToggle.children.item(0);
    console.log(navIcon);

    nav.classList.remove('navHide');
    navToggle.classList.add('navToggleHovered');
    navIcon.className = "fa-solid fa-xmark";
    addOverlay(navHide);
}

function navHide(){
    var nav = document.getElementById('nav-mobile');
    var navToggle = nav.children.item(1);
    var navIcon = navToggle.children.item(0);
    console.log(navIcon);

    nav.className = 'navHide';
    navToggle.classList.remove('navToggleHovered');
    navIcon.className = "fa-solid fa-bars";
    removeOverlay();
}

let changeType = false;
document.getElementById('menu-icon').addEventListener('click', function() {
    if(!changeType) {
    document.getElementById('menu-icon').innerText = "X";
    changeType = true;
    }
    else
    {
        document.getElementById('menu-icon').innerText = "☰";
        changeType = false;
    }
    document.getElementById('nav-links').classList.toggle('active');
});

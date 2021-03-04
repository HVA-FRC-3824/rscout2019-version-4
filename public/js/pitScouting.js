function changeOrientation() {
    var css = document.getElementById('css');
    if (document.documentElement.clientHeight > document.documentElement.clientWidth) {
        document.styleSheets[0].disabled = true;
        document.styleSheets[1].disabled = false;
    } else {
        document.styleSheets[0].disabled = false;
        document.styleSheets[1].disabled = true;
    }
    window.addEventListener("orientationchange", function(event) {
        if (document.documentElement.clientHeight > document.documentElement.clientWidth) {
            document.styleSheets[0].disabled = true;
            document.styleSheets[1].disabled = false;
        } else {
            document.styleSheets[0].disabled = true;
            document.styleSheets[1].disabled = false;
        }
    });
}

// ================== Firebase login stuff ===================== //
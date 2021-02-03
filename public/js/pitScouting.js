function changeOrientation() {
    var css = document.getElementById('css');
    if (document.documentElement.clientHeight > document.documentElement.clientWidth) {
        css.setAttribute('href', 'css/verticalIndex.css');
    } else {
        css.setAttribute('href', 'css/index.css');
    }
    window.addEventListener("orientationchange", function(event) {
        if (document.documentElement.clientHeight > document.documentElement.clientWidth) {
            css.setAttribute('href', 'css/verticalIndex.css');
        } else {
            css.setAttribute('href', 'css/index.css');
        }
    });
}
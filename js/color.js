const colorPicker = document.querySelectorAll(".input-color-picker");
const html = document.querySelector('html');
const colorUpdate = (cssVars) => {
    const keys = Object.keys(cssVars);
    keys.forEach((key) => {
        html.style.setProperty(key, cssVars[key]);
    });
};

colorPicker.forEach((item) => {
    item.addEventListener("input", (e) => {
        colorUpdate({
            [`--${e.target.getAttribute("data-id")}`]: e.target.value
        });
        localStorage.setItem(`--${e.target.getAttribute("data-id")}`, e.target.value);
    });
});

function onreadycolor() {
    colorPicker.forEach((item) => {
        html.style.setProperty(`--${item.getAttribute("data-id")}`, localStorage.getItem(`--${item.getAttribute("data-id")}`))
    });
}
function resetSave() {
    colorPicker.forEach((item) => {
        html.style.removeProperty(`--${item.getAttribute("data-id")}`)
        localStorage.removeItem(`--${item.getAttribute("data-id")}`)
    });
    document.querySelector()
}
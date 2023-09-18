function xmlall() {
    localStorage.setItem('path', pathNode.value);
    localStorage.setItem('inp', input.value);
    const clocks = document.querySelectorAll('.clock');
    let s = new Date();
    inputnode = new DOMParser().parseFromString(input.value, 'text/xml');
    flagTIme = true;
    flagtext = "";
    timer = "0";
    sleep(100).then(() => {
        loaderh("flex", "none");
    }).finally(() => {
        if (getId('input').value.length >= 2098000) {
            error(flagTIme, "Time", `Limit: 2 MB`, ""); return
        }
        if (!isValidXPath(getId('path').value, document)) {
            error(flagTIme, "xinput", "Error Occured! Xpath Invalid", ""); return
        }
        if (checkxml('input')) {
            error(flagTIme, "xmlput", "XML Invalid", ""); return
        } else {
            getId("xml_data").style.color = "Var(--dred)";
            getId("xml_data").value = "This may take seconds to minutes depending on your PC's performance and the complexity of the tree. Please be patient while we generate this tree and do not close the program or interrupt the process. We appreciate your cooperation and hope you enjoy the result.";
            clocks.forEach((i) => { i.innerHTML = `Loading....`; i.classList.toggle('blink') })
            sleep(10).then(() => {
                getId("x_paths").value = `<result>${iterxml(pathNode.value, inputnode)}</result>`;
            }).finally(() => {
                clocks[0].innerHTML = timeseter(s);
                timerst(clocks[0]);
            });
            sleep(10).then(() => {
                getId("xml_paths").getElementsByTagName("table")[0].innerHTML = patheval();
            }).finally(() => {
                clocks[2].innerHTML = timeseter(s);
                clocks[1].innerHTML = `Genrating Tree for ${map.length} Elements`;
                clocks[3].innerHTML = `Results : ${map.length}`;
                timerst(clocks[2]); timerst(clocks[3]);
            });
            sleep(10).then(() => {
                getId("xml_data").value = dataxml();
                getId("xml_data").style.color = "var(--dark)"
            }).finally(() => {
                clocks[1].innerHTML = timeseter(s);
                timerst(clocks[1]);
                console.log(timeseter(s))
                document.querySelector('#home>span').style.display = "inline";
            });
        }
    }).finally(() => { loaderh("none", "flex") });
}
function timerst(i) {
    i.style.color = "var(--dgreen)"; i.classList.toggle('blink')
}
function stopfunction() {
    clearTimeout(loader);
    // ovay.style = "display:none";
    alert("Terminted")
}

function timeseter(old) {
    millis = (new Date().getTime() - old.getTime());
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    if (millis < 1000) { return `Time: ${millis} ms` }
    else if (millis < 60000) { return `Time: ${(seconds < 10 ? '0' : '')}${seconds}:${(millis % 1000).toFixed(0)} sec` }
    else { return `Time: ${Math.floor(millis / 60000)}:${(seconds < 10 ? '0' : '')}${seconds}:${(millis % 1000).toFixed(0)} min`; }
}
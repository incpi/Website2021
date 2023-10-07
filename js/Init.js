function xmlall() {
    localStorage.setItem('path', pathNode.value);
    localStorage.setItem('inp', input.value);
    const clocks = document.querySelector('.clock');
    let s = new Date();
    inputnode = new DOMParser().parseFromString(input.value, 'text/xml');
    flagTIme = true;
    flagtext = "";
    timer = "0";
    sleep(100).then().finally(() => {
        if (getId('input').value.length >= 2098000) {
            error(flagTIme, "Time", `Limit: 2 MB`, ""); return
        }
        if (!isValidXPath(getId('path').value, document)) {
            error(flagTIme, "xinput", "Error Occured! Xpath Invalid", ""); return
        }
        if (checkxml('input')) {
            error(flagTIme, "xmlput", "XML Invalid", ""); return
        } else {
            getId("output").style.color = "Var(--dred)";
            getId("output").value = "This may take seconds to minutes depending on your PC's performance and the complexity of the tree. Please be patient while we generate this tree and do not close the program or interrupt the process. We appreciate your cooperation and hope you enjoy the result.";
            clocks.innerHTML = `Loading....`; clocks.classList.toggle('blink')
            sleep(10).then(() => {
                iterxml(pathNode.value, inputnode)
            }).finally(() => {
                clocks.innerHTML = timeseter(s);
                timerst(clocks);
            });
            sleep(10).then(() => {
                patheval();
            }).finally(() => {
                clocks.innerHTML = timeseter(s);
                clocks.innerHTML = `Genrating Tree for ${map.length} Elements`;
                clocks.innerHTML = `Results : ${map.length}`;
                timerst(clocks);
            });
            sleep(10).then(() => {
                const data=dataxml()
                getId("output").value = data===null?'No data present!':data;
                getId("output").style.color = "var(--dark)"
            }).finally(() => {
                clocks.innerHTML = timeseter(s);
                timerst(clocks);
                document.querySelector('#home>span').style.display = "inline";
            });
        }
    })
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
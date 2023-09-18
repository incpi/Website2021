let pathNode = getId("path");
let input = getId("input")
let mymap = [];
let x = "";
inputNode = new DOMParser().parseFromString(input.value, 'text/xml');
let path = "";
getId("path").value = (localStorage.getItem("path") != null) ? localStorage.getItem("path") : "";
getId("input").value = (localStorage.getItem("inp") != null) ? localStorage.getItem("inp") : "";

//line merge
function nodeGen(prev, next, flag = null) {
    var y = next.replace("]", "").split("[")[1].split("|")
    var x = next.replace("]", "").split("[");
    if (typeof (prev.getElementsByTagName(x[0])[y[0]]) === 'undefined') {
        prev.innerHTML += (flag != null) ? (`<${[x[0]]} ${y[2]} >${flag}</${[x[0]]}>`) : (`<${[x[0]]} ${y[2]} ></${[x[0]]}>`)
    }
    return prev.getElementsByTagName(x[0]).item([y[0]])
}

function evalXPath(path) {
    mymap = [];
    inputNode = new DOMParser().parseFromString(input.value, 'text/xml');
    r = inputNode.evaluate(path, inputNode, null, XPathResult.ANY_TYPE, null);
    while (n = r.iterateNext()) {
        vale = getXPath(n);
        mymap.push([vale, n.innerHTML])
        vale = (vale.startsWith('undefined')) ? vale.replace(/^\w+/, "") : vale;
    }
    return mymap
}

function patheval() {
    let x = "<thead><tr><th>No.</th><th>Paths</th><th>Content</th></tr></thead><tbody>";
    inputNode = new DOMParser().parseFromString(input.value, 'text/xml');
    map = evalXPath(pathNode.value)
    for (i in map) {
        x += `<tr><td>${parseInt(i) + 1}</td><td>${Encoding(map[i][0]).replace("result[0|1|]/", "").replaceAll(/\|\d+\|[=A-z&;0-9"]+|\]/g, "]")}</td><td>${Encoding(map[i][1]).replaceAll("><", "> <")}</td></tr>`;
    }
    return x + "</tbody>";
}
function iterxml(path, inputnode) {
    let k = "";
    r = inputNode.evaluate(path, inputnode, null, XPathResult.ANY_TYPE, null);
    while (n = r.iterateNext()) {
        k += n.outerHTML;
    }
    return k
}

function dataxml() {
    let outerNode = document.createElement("results");
    map = evalXPath(pathNode.value);
    for (i in map) {
        prevNode = outerNode;
        split1 = map[i][0].split("/");
        sleep(30)
        for (j = 0; j < split1.length; j++) {
            prevNode = (split1.length - 1 == j) ? nodeGen(prevNode, split1[j], map[i][1]) : nodeGen(prevNode, split1[j]);
        }
    }
    return outerNode.innerHTML;
}

function getXPath(node) {
    if (node.id !== '')
        return "result[0|1|]";
    if (node === inputNode.body)
        return node.tagName;
    var nodeCount = 0;
    var childNodes = node.parentNode.childNodes;
    t = []; childNodes.forEach(x => { t.push(x.tagName) }); t = t.filter(x => x != undefined);//tagname
    for (var i = 0; i < childNodes.length; i++) {
        var currentNode = childNodes[i];
        if (currentNode.tagName != undefined && currentNode === node) {
            const v1 = t.filter(x => x === node.tagName).length
            const atr = parseAttributes(node)
            c = getXPath(node.parentNode)
            return c + `/${node.tagName}[${nodeCount}|${v1}|${atr}]`
        }
        else if (currentNode.nodeType === 1 && currentNode.tagName === node.tagName)
            nodeCount++;
    }
}

function parseAttributes(node) {
    let attributes = node.attributes;
    obj = "";
    if (node.hasAttributes()) {
        for (let i = 0; i < attributes.length; i++) {
            obj += `${attributes[i].name}="${attributes[i].value}"`;
        }
    }
    return obj;
}
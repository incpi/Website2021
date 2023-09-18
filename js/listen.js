getId('input').addEventListener('input', (evt) => {
    (getId('input').value === "") ? error(true, "xmlput", "Enter XML", "") : error(checkxml('input'), "xmlput", "XML Invalid", "XML Valid");
});

getId('path').addEventListener('input', (evt) => {
    (getId('path').value == "") ? error(true, 'xinput', "Enter X-path", "") : error(!isValidXPath(getId('path').value, document), 'xinput', "X-Path Invalid", "X-Path Valid")
});
//set initial data for xml & xpath check
(getId('input').value === "") ? error(true, "xmlput", "Enter XML", "") : error(checkxml('input'), "xmlput", "XML Invalid", "XML Valid");
(getId('path').value == "") ? error(true, 'xinput', "Enter X-path", "") : error(!isValidXPath(getId('path').value, document), 'xinput', "X-Path Invalid", "X-Path Valid");

function linear(i) {
    error(false, "Time","", "Linearize Success")
    return getId(i).value.replaceAll(/\s+/g, " ").replaceAll(/(>[\n\r\s\t]+<)/g, "><");
}
function prem(i) {
    //     if (getId(i).value.includes(">\n")) {
    if (getId(i + "_btn").innerHTML == "Linearize") {
        getId(i).value = linear(i)
        getId(i + "_btn").innerHTML = "Prettyprint";
    } else {
        getId(i).value = prettifyXml(i);
        getId(i + "_btn").innerHTML = "Linearize";
    }
}

function premAll() {
    id = "Pretify_btn";
    args = ['input', 'x_paths', 'xml_data'];
    if (getId(id).innerHTML == "Linear All") {
        for (index in args) {
            getId(args[index]).value = linear(args[index]);
            getId((args[index]) + "_btn").innerHTML = "Prettyprint";
        }
        getId(id).innerHTML = "Pretty All";
    } else {
        for (index in args) {
            getId(args[index]).value = prettifyXml(args[index]);
            getId((args[index]) + "_btn").innerHTML = "Linearize";
        }
        getId(id).innerHTML = "Linear All";
    }
}
function linear(i) {
    error(false, "Time","", "Linearize Success")
    return getId(i).value.replaceAll(/\s+/g, " ").replaceAll(/(>[\n\r\s\t]+<)/g, "><");
}
function prettifyXml(i) {
    if (getId(i).value == "") {
        return "<error> No data avaiable </error>"
    } else {
        if (checkxml(i)) {
            error(true, "Time", "Parse error during Prettyprint"); return getId(i).value
        } else {
            var xmlDoc = new DOMParser().parseFromString(getId(i).value, 'text/xml');
            var xsltDoc = new DOMParser().parseFromString([
                '<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform">',
                '  <xsl:strip-space elements="*"/>',
                '  <xsl:template match="para[content-style][not(text())]">', // change to just text() to strip space in text nodes
                '    <xsl:value-of select="normalize-space(.)"/>',
                '  </xsl:template>',
                '  <xsl:template match="node()|@*">',
                '    <xsl:copy><xsl:apply-templates select="node()|@*"/></xsl:copy>',
                '  </xsl:template>',
                '  <xsl:output indent="yes"/>',
                '</xsl:stylesheet>',
            ].join('\n'), 'application/xml');
            var xsltProcessor = new XSLTProcessor();
            xsltProcessor.importStylesheet(xsltDoc);
            var resultDoc = xsltProcessor.transformToDocument(xmlDoc);
            var resultXml = new XMLSerializer().serializeToString(resultDoc);
            error(false, "Time","", "Prettyprint Success")
            return resultXml;
        }
    }
}

function checkxml(e) {
    xmlDoc = new DOMParser().parseFromString(getId(e).value, 'text/xml')
    return ((xmlDoc === '') ? false : ((xmlDoc.getElementsByTagName('parsererror').length > 0) ? true : false))
}

//Encoding Inputs:
function Encoding(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/\n/g, '&#010;').replace(/'/g, "&#039;").trim();
}

function error(err, e, errorin, truein) {
    if (err) {
        getId(e).style = "color:var(--dred)";
        getId(e).innerHTML = errorin
    } else {
        getId(e).style = "color:var(--dgreen)";
        getId(e).innerHTML = truein
    }
}

function isValidXPath(xpathExpression, doc) {
    try {
        doc.evaluate(xpathExpression, doc, null, XPathResult.ANY_TYPE, null);
        return true;
    } catch (e) {
        return false;
    }
}

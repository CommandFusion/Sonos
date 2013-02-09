xml=loadXMLDoc("test.xml");
var path="/bookstore/bk:book/bk:title";

if (typeof xml.evaluate !== 'undefined')
{
    var result = xml.evaluate(
        path,
        xml,
        function (prefix) {
            if (prefix === 'bk') {
                return 'http://purl.org/dc/elements/1.1/';
            }
            else {
                return null;
            }
        },
        XPathResult.ANY_TYPE,
        null
    );
    // now use the code here you already have in your sample for evaluate
    var nodes=xml.evaluate(
        path,
        xml,
        function (prefix) {
            if (prefix === 'bk') {
                return 'http://purl.org/dc/elements/1.1/';
            }
            else {
                return null;
            }
        },
        XPathResult.ANY_TYPE,
        null);
    var result=nodes.iterateNext();

    while (result)
    {
        document.write(result.childNodes[0].nodeValue);
        document.write("<br />");
        result=nodes.iterateNext();
    }
}
else if (typeof xml.selectNodes !== 'undefined' && typeof xml.setProperty != 'undefined')
{
    xml.setProperty('SelectionLanguage', 'XPath');
    xml.setProperty('SelectionNamespaces', 'xmlns:bk="http://purl.org/dc/elements/1.1/"');
    var nodes = xml.selectNodes(path);
    // now use the code you already have for selectNodes
    var nodes=xml.selectNodes(path);
//var nodes=xmlDoc.getElementsByTagName('bk:title');

    for (i=0;i<nodes.length;i++)
    {
        document.write(nodes[i].childNodes[0].nodeValue);
        document.write("<br />");
    }


}

/*
    Taken from http://blog.stevensanderson.com/2013/07/09/knockout-v2-3-0-released-v3-0-0-beta-available/
*/
(function(app, $, ko) {

    var expressionRegex = /{{([\s\S]+?)}}/g;
    function replaceExpressionsInText(text, expressionRegex, callback) {
        var prevIndex = expressionRegex.lastIndex = 0,
            resultNodes = null,
            match;

        // Find each expression marker, and for each one, invoke the callback
        // to get an array of nodes that should replace that part of the text
        while (match = expressionRegex.exec(text)) {
            var leadingText = text.substring(prevIndex, match.index);
            prevIndex = expressionRegex.lastIndex;
            resultNodes = resultNodes || [];

            // Preserve leading text
            if (leadingText) {
                resultNodes.push(document.createTextNode(leadingText));
            }

            resultNodes.push.apply(resultNodes, callback(match[1]));
        }

        // Preserve trailing text
        var trailingText = text.substring(prevIndex);
        if (resultNodes && trailingText) {
            resultNodes.push(document.createTextNode(trailingText));
        }

        return resultNodes;
    }

    ko.bindingProvider.instance.preprocessNode = function(node) {
        if (node.nodeType === 3 && node.nodeValue) {
            // Preprocess by replacing {{ expr }} with <!-- ko text: expr --><!-- /ko --> nodes
            var newNodes = replaceExpressionsInText(node.nodeValue, expressionRegex, function(expressionText) {
                return [
                    document.createComment("ko text:" + expressionText),
                    document.createComment("/ko")
                ];
            });

            // Insert the resulting nodes into the DOM and remove the original unpreprocessed node
            if (newNodes) {
                for (var i = 0; i < newNodes.length; i++) {
                    node.parentNode.insertBefore(newNodes[i], node);
                }
                node.parentNode.removeChild(node);
                return newNodes;
            }
        }
    };

})(window.app = window.app || {}, jQuery, ko);
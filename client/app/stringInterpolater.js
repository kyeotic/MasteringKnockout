/*
    Taken from http://blog.stevensanderson.com/2013/07/09/knockout-v2-3-0-released-v3-0-0-beta-available/
*/
(function(app, $, ko) {

    var curlyRegex = /{{([\s\S]+?)}}/g,
        erbRegex = /\<\%=([\s\S]+?)\%\>/g;
    ko.bindingProvider.instance.preprocessNode = function(node) {
        if (node.nodeType === 3 && node.nodeValue) {
            // Preprocess by replacing {{ expr }} with <!-- ko text: expr --><!-- /ko --> nodes
            var curlyNodes = replaceExpressionsInText(node.nodeValue, curlyRegex, function(expressionText) {
                return [
                    document.createComment("ko text:" + expressionText),
                    document.createComment("/ko")
                ];
            });

            var erbNodes = replaceExpressionsInText(node.nodeValue, erbRegex, function(expressionText) {
                var span = document.createElement('span');
                span.setAttribute('data-bind', 'text: ' + expressionText);
                return [span];
            });

            //Because of the leading/trialing space method, this would double up HTML
            if (curlyNodes && erbNodes)
                throw new Error("Using {{ nodes }} and <% nodes %> together is not supported.");

            var newNodes = curlyNodes || erbNodes;

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

})(window.app = window.app || {}, jQuery, ko);
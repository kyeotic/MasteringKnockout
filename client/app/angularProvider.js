(function(app, $, ko) {

var directives = [
    { name: 'ng-model', binding: 'value', adds: "valueUpdate: 'afterkeydown'" },
    { name: 'ng-bind', binding: 'text' }
];

ko.angularBindingProvider = function() {
  var defaultBindingProvider = new ko.bindingProvider();

    var expressionRegex = /{{([\s\S]+?)}}/g;
    function parseAttributeExpression(node, attributeName) {
        expressionRegex.lastIndex = 0;
        var attribute = node.getAttribute(attributeName),
            match = expressionRegex.exec(attribute);
        return match ? match[1] : null;
    }

    function nodeHasAttribute(node, attributeName) {
        return node.attributes && node.hasAttribute(attributeName);
    }

    function getBindingsString(node) {
        if (!node.attributes) {
          return null;
        }
        var bindings = directives.filter(function(d) { return nodeHasAttribute(node, d.name) });
        if (!bindings)
            return null;

        return bindings.map(function (d) {
            var result = d.binding + ':' + parseAttributeExpression(node, d.name);
            if (d.adds)
                result += ',' + d.adds;
            return result;
        }).join(',');
    }

    //Publid methods
    this.nodeHasBindings = function(node) {
        return defaultBindingProvider.nodeHasBindings(node)
            || directives.some(function(d) { return nodeHasAttribute(node, d.name) });
    };
    this.getBindings = function(node, bindingContext) {
        var bindingsString = defaultBindingProvider.getBindingsString(node, bindingContext) 
            || getBindingsString(node);
        return bindingsString ? 
            defaultBindingProvider.parseBindingsString(bindingsString, bindingContext, node) : 
            null;
    };
    this.getBindingAccessors = function(node, bindingContext) {
        var bindingsString = defaultBindingProvider.getBindingsString(node, bindingContext)
            || getBindingsString(node);
        return bindingsString ? 
            defaultBindingProvider.parseBindingsString(bindingsString, bindingContext, node, {'valueAccessors':true}) : 
            null;
    };
};
ko.bindingProvider.instance = new ko.angularBindingProvider();

})(window.app = window.app || {}, jQuery, ko);
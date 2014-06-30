(function(app, $, ko) {

var directives = [
   { name: 'ng-model', binding: 'value', adds: "valueUpdate: 'afterkeydown'"}, 
   { name: 'ng-bind',   binding: 'text'}
];

ko.angularBindingProvider = function() {
   var baseProvider = new ko.bindingProvider();

   var expressionRegex = /{{([\s\S]+?)}}/g;

   function parseExpression(node, attributeName) {
      expressionRegex.lastIndex = 0;
      var attribute = node.getAttribute(attributeName),
         match = expressionRegex.exec(attribute);
      return match ? match[1] : null;
   }

   function nodeHasAttribute(node, attributeName) {
      return node.attributes && node.hasAttribute(attributeName);
   }

   function hasAngularBinding(node) {
      return directives.some(function(d) { return nodeHasAttribute(node, d.name) });
   }

   function getAngularBindingsString(node) {
      if (!node.attributes) {
         return null;
      }
      var bindings = directives.filter(function(d) {
         return nodeHasAttribute(node, d.name)
      });
      if (!bindings)
         return null;

      return bindings.map(function(d) {
         var result = d.binding + ':' + parseExpression(node, d.name);
         if (d.adds)
            result += ',' + d.adds;
         return result;
      }).join(',');
   }

   //Public methods
   this.nodeHasBindings = function(node) {
      return baseProvider.nodeHasBindings(node) 
         || hasAngularBinding(node);
   };
   this.getBindings = function(node, bindingContext) {
      var bindingsString = baseProvider.getBindingsString(node, bindingContext) 
         || getAngularBindingsString(node);
      return bindingsString ?
         baseProvider.parseBindingsString(bindingsString, bindingContext, node) :
         null;
   };
   this.getBindingAccessors = function(node, bindingContext) {
      var bindingsString = baseProvider.getBindingsString(node, bindingContext) 
         || getAngularBindingsString(node);
      return bindingsString ?
         baseProvider.parseBindingsString(bindingsString, bindingContext, node, { 'valueAccessors': true }) :
         null;
   };
};
ko.bindingProvider.instance = new ko.angularBindingProvider();

})(window.app = window.app || {}, jQuery, ko);
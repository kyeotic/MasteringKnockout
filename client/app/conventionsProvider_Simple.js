
String.prototype.endsWith = String.prototype.endsWith ? String.prototype.endsWith : function (suffix) {
  return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

String.prototype.trim = String.prototype.trim || function () {
  return this.replace(/^\s+|\s+$/g, '');
};

ko.bindingConventions = {
   conventionBinders: {}
};
ko.bindingConventions.ConventionBindingProvider = function () {
  this.orgBindingProvider = ko.bindingProvider.instance || new ko.bindingProvider();
};

ko.bindingConventions.ConventionBindingProvider.prototype = {
  nodeHasBindings: function (node) {
      return this.orgBindingProvider.nodeHasBindings(node) || nodeHasBindings(node);
  },
  getBindingAccessors: function (node, bindingContext) {      
      return this.orgBindingProvider.getBindingAccessors(node, bindingContext)
         || conventionBindings(node, bindingContext);
  }
};
ko.bindingProvider.instance = new ko.bindingConventions.ConventionBindingProvider();

var getNameAttribute = function (node) {
   var name = null;
   if (node.nodeType === 1) {
      name = node.getAttribute('data-name');
   }
   return name;
};

var nodeHasBindings = function(node) { 
   return getNameAttribute(node) !== null; 
};
var conventionBindings = function(node, bindingContext) {
   var bindings = {};
   var name = getNameAttribute(node);
   if (name === null)
      return null;

   var data = bindingContext[name] ? bindingContext[name] : bindingContext.$data[name];

   if (data === undefined) {
      throw 'Can\'t resolve member: ' + name;
   }

   var valueAccessor = function() {
      return data;
   };
   var unwrapped = ko.utils.peekObservable(data);
   var type = typeof unwrapped;

for (var index in ko.bindingConventions.conventionBinders) {
   if (ko.bindingConventions.conventionBinders[index].rules !== undefined) {
      var convention = ko.bindingConventions.conventionBinders[index];
      var should = true;

      convention.rules.forEach(function (rule) {
         should = should && rule(name, node, bindings, unwrapped, type, data, bindingContext);
      });

      if (should) {
         convention.apply(name, node, bindings, unwrapped, type, valueAccessor, bindingContext);
         break;
      }
   }
}

   return bindings;
};


ko.bindingConventions.conventionBinders.options = {
  rules: [function (name, element, bindings, unwrapped) { return element.tagName === 'SELECT' && unwrapped.push; } ],
  apply: function (name, element, bindings, unwrapped, type, valueAccessor, bindingContext) {
      bindings.options = valueAccessor;
      singularize(name, function (singularized) {
         var selectedName = 'selected' + getPascalCased(singularized);
         if (bindingContext.$data[selectedName] !== undefined) {
            bindings['value'] = function() {
               return bindingContext.$data[selectedName];
            };
         }
      });
  }
};

ko.bindingConventions.conventionBinders.input = {
  rules: [function (name, element) { return element.tagName === 'INPUT' || element.tagName === 'TEXTAREA'; } ],
  apply: function (name, element, bindings, unwrapped, type, valueAccessor, bindingContext) {
      var bindingName = null;
      if (type === 'boolean') {
          element.setAttribute('type', 'checkbox');
          bindingName = 'checked';
      } else {
          bindingName = 'value';
      }
      bindings[bindingName] = valueAccessor;
  }
};

var setBinding = function(bindings, bindingName, dataName, bindingContext) {
  if (bindingContext.$data[dataName] !== undefined) {
      return (bindings[bindingName] = function() {
          return bindingContext.$data[dataName];
      });
  }
};

var getPascalCased = function (text) {
  return text.substring(0, 1).toUpperCase() + text.substring(1);
};

var pluralEndings = [{ end: 'ies', use: 'y' }, 'es', 's'];
var singularize = function (name, callback) {
  var singularized = null;
  pluralEndings.forEach(function (ending) {
      var append = ending.use;
      ending = ending.end || ending;
      if (name.endsWith(ending)) {
          singularized = name.substring(0, name.length - ending.length);
          singularized = singularized + (append || '');
          if (callback) {
              return !callback(singularized);
          }

          return true;
      }
      return true;
  });

  return singularized;
};
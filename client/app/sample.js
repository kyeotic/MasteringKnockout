(function(app, $, ko) {

	var treeTemplate = 'Name: <span data-bind="text:name"></span><br>'
	+'Root: <span data-bind="text: isRoot ? \'Self\' : $parentContext.name"></span><br>'
	+'<ul data-bind="foreach: children">'
		+'<li data-bind="tree: { data: $data, children: $parentContext.__children, name: $parentContext.__name, isRoot: false }></li>'
	+'</ul>';

	ko.bindingHandlers.stopBinding = {
	    init: function(element, valueAccessor) {
	        return { controlsDescendantBindings: ko.unwrap(valueAccessor()) };
	    }
	};
	ko.virtualElements.allowedBindings.stopBinding = true;

	ko.bindingHandlers.tree = {
	    init: function(element, valueAccessor, allBindings, viewmodel, bindingContext) {
	        
	        var value = valueAccessor();
	        var context = { 
	        		__name: value.name,
	        		__children: value.children,
	        		//Default to true since template specifies
	        		isRoot: value.isRoot === undefined || value.isroot,
	        		name: value.data[value.name],
	        		children: value.data[value.children],
	        	};

	        if (!context.isRoot) {
	        	context = bindingContext.createChildContext(context);
	        }

	        element.innerHTML = treeTemplate;

        	ko.applyBindingsToDescendants(context, element);

	        // Also tell KO *not* to bind the descendants itself, otherwise they will be bound twice
        	return { controlsDescendantBindings: true };
	    }
	};


	var BindingSample = function() {
		var self = this;

		self.person = { 
			fullName: 'Alexander Hamilton',
			descendants: [
				{
					fullName: 'James Hamilton',
					descendants: [
						{
							fullName: 'Alexander Hamilton',
							descendants: [
								{
									fullName: 'John Hamilton',
									descendants: []
								}, {
									fullName: 'Rebecca Cunningham',
									descendants: []
								}
							]
						}, {
							fullName: 'Elizabeth Pollock',
							descendants: [
								{
									fullName: 'Robert Pollock',
									descendants: []
								}, {
									fullName: 'Annabel Stewart',
									descendants: []
								}
							]
						}
					]
				}, {
					fullName: 'Rachel Fawcett',
					descendants: [
						{
							fullName: 'Jean Faucette IV',
							descendants: []
						}, {
							fullName: 'Mary Uppington',
							descendants: []
						}
					]
				}
			]
		};
	};
	
	$(document).ready(function() {
		ko.applyBindings(new BindingSample());
	});

})(window.app = window.app || {}, jQuery, ko);
(function(app, $, ko) {

	var treeTemplate = '<div>Name: <span data-bind="text:name"></span><br>'
		+'Root: <span data-bind="text: isRoot ? \'Self\' : $root.name"></span><br>'
		+'<ul data-bind="foreach: { data: children, as: \'child\' }">'
			+'<li data-bind="tree: { data: child, children: $root.__children, name: $root.__name, isRoot: false }"></li>'
		+'</ul></div>';

	ko.bindingHandlers.tree = {
	    init: function(element, valueAccessor, allBindings, viewmodel, bindingContext) {
	        
	        var value = valueAccessor();
	        var context =  { 
	        		__name: value.name,
	        		__children: value.children,
	        		//Default to true since template specifies
	        		isRoot: value.isRoot === undefined || value.isRoot,
	        		name: value.data[value.name],
	        		children: value.data[value.children],
	        	};

	        element.innerHTML = treeTemplate;

	        if (context.isRoot){
	        	ko.applyBindings(context, element.firstChild)
	        }
	        else
	        	ko.applyBindingsToDescendants(bindingContext.extend(context), element);        	

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
							fullName: 'Alex Hamilton',
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
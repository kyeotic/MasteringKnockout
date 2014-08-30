define(['knockout', 'plugins/dialog', 'jquery'], function(ko, dialog, $) {
	function install() {

		ko.bindingHandlers.on = {
			init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
				var options = valueAccessor();
				var handler = function() {
					options.method.call(bindingContext.$rawData,ko.dataFor(this));
				};

				$(element).on(options.event, options.selector, handler);

				ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
					$(element).off(options.event, options.selector, handler);
				});
			}
		};

		ko.dirtyFlag = function(root, isInitiallyDirty) {
		    var result = function() {},
		        _initialState = ko.observable(ko.toJSON(root)),
		        _isInitiallyDirty = ko.observable(isInitiallyDirty);

		    result.isDirty = ko.computed(function() {
		        return _isInitiallyDirty() || _initialState() !== ko.toJSON(root);
		    });

		    result.reset = function() {
		        _initialState(ko.toJSON(root));
		        _isInitiallyDirty(false);
		    };

		    return result;
		};

		ko.bindingHandlers.toggle = {
		    init: function (element, valueAccessor) {
		        var value = valueAccessor();
		        ko.applyBindingsToNode(element, {
		            click: function () {
		                value(!value());
		            }
		        });
		    }
		};

		//
        //Create new context for bootstrap dialogs
        dialog.addContext('bootstrap', {
            addHost: function (dialogInstance) {
                var body = $('body'),
                	host = $('<div class="modal fade"><div class="modal-dialog"><div class="modal-content"></div></div></div>');
                host.appendTo(body);
                dialogInstance.host = host.find('.modal-content').get(0);
                dialogInstance.modalHost = host;
            },
            removeHost: function (dialogInstance) {
            	$(dialogInstance.modalHost).modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
            },
            compositionComplete: function (child, parent, context) {
                var dialogInstance = dialog.getDialog(context.model),
                    $child = $(child);
                $(dialogInstance.modalHost).modal({ backdrop: 'static', keyboard: false, show: true });

                //Setting a short timeout is need in IE8, otherwise we could do this straight away
                setTimeout(function () {
                    $child.find('.autofocus').first().focus();
                }, 1);

                if ($child.hasClass('autoclose') || context.model.autoclose) {
                    $(dialogInstance.blockout).click(function () {
                        dialogInstance.close();
                    });
                }
            }
        });
	}	

	return {
		install: install
	};
});
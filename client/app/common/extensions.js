define(['knockout', 'plugins/dialog'], function(ko, dialog) {
	function install() {
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
            addHost: function (theDialog) {
                var body = $('body');
                $('<div class="modal fade" id="bootstrapModal"><div class="modal-dialog"><div class="modal-content" id="modalHost"></div></div></div>').appendTo(body);
                theDialog.host = $('#modalHost').get(0);
            },
            removeHost: function (theDialog) {
                //This was originally in a timeout, though I don't know why
                //If you encouter problems with closing later, put the timeout back in for 10ms
                $('#bootstrapModal').modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
            },
            compositionComplete: function (child, parent, context) {
                var theDialog = dialog.getDialog(context.model),
                    $child = $(child);
                $('#bootstrapModal').modal({ backdrop: 'static', keyboard: false, show: true });

                //Setting a short timeout is need in IE8, otherwise we could do this straight away
                setTimeout(function () {
                    $child.find('.autofocus').first().focus();
                }, 1);

                if ($child.hasClass('autoclose') || context.model.autoclose) {
                    $(theDialog.blockout).click(function () {
                        theDialog.close();
                    });
                }
            }
        });
	}	

	return {
		install: install
	};
});
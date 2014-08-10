define(['knockout', 'text!settings/page.html'], function(ko, templateString) {

	function SettingsViewmodel(params) { }

	return { template: templateString, viewModel: SettingsViewmodel };
});
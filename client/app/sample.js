(function(app, $, ko) {

  ko.maps = {
	 defaults: {
		zoom: 5,
		lat: 45.51, 
		long: -122.67,
		mapType: google.maps.MapTypeId.ROADMAP
	 },
	 mapType: {
		hybrid: "hybrid",
		roadmap: "roadmap",
		satellite: "satellite",
		terrain: "terrain"
	 }
  };

  ko.bindingHandlers.map = {
	 init: function(element, valueAccessor) {
		var data = valueAccessor(),
		  options = ko.utils.extend(ko.maps.defaults, data),
		  //just get the relevant options
		  mapOptions = {
			 zoom: ko.unwrap(options.zoom),
			 center: new google.maps.LatLng(ko.unwrap(options.lat), ko.unwrap(options.long)),
			 mapTypeId: options.mapType
		  },
		  map = new google.maps.Map(element, mapOptions);

		ko.computed(function() {
		  map.setZoom(parseFloat(ko.unwrap(options.zoom)));
		}, null, { disposeWhenNodeIsRemoved: element });

		ko.computed(function() {
		  map.panTo(new google.maps.LatLng(ko.unwrap(options.lat), ko.unwrap(options.long)));
		}, null, { disposeWhenNodeIsRemoved: element });

		google.maps.event.addListener(map, 'center_changed', function() {
		  var center = map.getCenter();
		  if (ko.isObservable(data.lat))
			 data.lat(center.lat());
		  if (ko.isObservable(data.long))
			 data.long(center.lng());
		});
 
		if (ko.isObservable(data.zoom)) {
		  google.maps.event.addListener(map, 'zoom_changed', function() {
			 data.zoom(map.getZoom());
		  });
		}
	 }
  };

  var BindingSample = function() {
	 var self = this;

	 self.zoom = ko.observable(8);
	 self.latitude = ko.observable(45.51312335271636);
	 self.longitude = ko.observable(-122.67063820362091);
  };
  
  $(document).ready(function() {
	 ko.applyBindings(new BindingSample());
  });

})(window.app = window.app || {}, jQuery, ko);
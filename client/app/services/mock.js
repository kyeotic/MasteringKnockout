define(['knockout', 'contacts/contact', 'durandal/system'], function(ko, Contact, system) {
	function supportsWebStorage() {
		try {
			return 'localStorage' in window && window['localStorage'] !== null;
		} catch (e) {
			return false;
		}
	}

	//Force local storage support
	if (!supportsWebStorage())
		throw new Error("Local storage is not supported. Unable to use mock data service.")

	/**
	* Fast UUID generator, RFC4122 version 4 compliant.
	* @author Jeff Ward (jcward.com).
	* @license MIT license
	* @link http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
	**/
	var UUID = (function() {
		var self = {};
		var lut = []; for (var i=0; i<256; i++) { lut[i] = (i<16?'0':'')+(i).toString(16); }
		self.generate = function() {
			var d0 = Math.random()*0xffffffff|0;
			var d1 = Math.random()*0xffffffff|0;
			var d2 = Math.random()*0xffffffff|0;
			var d3 = Math.random()*0xffffffff|0;
			return lut[d0&0xff]+lut[d0>>8&0xff]+lut[d0>>16&0xff]+lut[d0>>24&0xff]+'-'+
			lut[d1&0xff]+lut[d1>>8&0xff]+'-'+lut[d1>>16&0x0f|0x40]+lut[d1>>24&0xff]+'-'+
			lut[d2&0x3f|0x80]+lut[d2>>8&0xff]+'-'+lut[d2>>16&0xff]+lut[d2>>24&0xff]+
			lut[d3&0xff]+lut[d3>>8&0xff]+lut[d3>>16&0xff]+lut[d3>>24&0xff];
		}
		return self;
	})();

	var contacts = {}, //Cached version, so we don't have to keep reading
	storage = {
		get: function(key) {
			return localStorage.getItem(key);
		},
		set: function(key, value) {
			if (value === undefined || value === null)
				storage.remove(key);
			else
				localStorage.setItem(key, value); 
		},
		remove: function(key) { 
			return localStorage.removeItem(key); 
		},
	},
	storedContacts = storage.get('contacts');

	//Read out existing contacts
	if (storedContacts) {
		contacts = JSON.parse(storedContacts);
	}

	//We want to to this after every interaction,
	//since we are persisting all contacts as a single serialized array
	var saveAllContacts = function() {
		storage.set('contacts', JSON.stringify(contacts));
	};

	return {
		getContacts: function() {
			return system.defer(function(defer) {
				//Return our POJO contacts as real contact objects
				var typedContacts = [];
				for (var c in contacts) {
					if (contacts.hasOwnProperty(c)) {
						typedContacts.push(new Contact(contacts[c]))
					}
				}
				setTimeout(function() {
					defer.resolve(typedContacts);
				}, 1000);
			}).promise();
		},
		getContact: function(id, callback) {
			return system.defer(function(defer) {
				var contact = contacts[id];
				
				setTimeout(function() {
					defer.resolve(new Contact(contact));
				}, 1000);
			}).promise();
		},
		createContact: function(contact) {
			return system.defer(function(defer) {
				contact.id(UUID.generate());
				//Add it to the cache
				contacts[contact.id()] = ko.toJS(contact);
				//Save it
				saveAllContacts();
				//Return the new contact
				setTimeout(function() {
					defer.resolve(contact);
				}, 1000);
			}).promise();
		},
		updateContact: function(contact) {
			return system.defer(function(defer) {
				//Create an unwrapped copy
				contactId = contact.id();

				if (contactId === undefined || contactId === 0)
					throw new Error('Unable to update contact, it must first be created to receive an id');

				if (contacts[contactId] === undefined)
					throw new Error('Unable to update contact, it does not exist');

				//Set the contact
				contacts[contactId] = ko.toJS(contact);
				saveAllContacts();

				//Echo back to notify success
				setTimeout(function() {
					defer.resolve(contact);
				}, 1000);
			}).promise();
		},
		removeContact: function(contactId) {
			return system.defer(function(defer) {
				//If the contact doesn't exist, removing should still succeed
				delete contacts[contactId];
				saveAllContacts();

				setTimeout(function() {
					defer.resolve();
				}, 1000);
			}).promise();
		}
	};
});
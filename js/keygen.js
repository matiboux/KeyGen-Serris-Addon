(function () {

	$(document).ready(function () {
		$('.keygen form').submit(function (e) {
			e.preventDefault();
			var KeygenFormData = $('.keygen form').serializeArray().reduce(function (obj, item) {
				obj[item.name] = item.value;
				return obj;
			}, {});
			
			KeygenLib.setParameters(KeygenFormData);
			var keygen = KeygenLib.generateKeygen();
			SCE.insert(keygen);
		});
		
		$('a').click(function (e) {
			e.preventDefault();
			SCE.sendCommand('web-browser:///{url}' + $(this).attr('href'));
		});
	});

})();

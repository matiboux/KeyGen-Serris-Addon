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
		
		$('.keygen form :reset').click(function () {
			$('#bye').removeClass().addClass('content-box-header');
			$('#bye p').html('Use the form below to generate your own Keygen');
			$('#bye .copykeygen').animate({ right: '-99px' });
		});
	});

})();

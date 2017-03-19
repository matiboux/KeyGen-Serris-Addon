(function () {
	var url = "", count = 0;
	
	function downloadCode()
	{
		url = $('#url_dl').val();
		if (url.indexOf("http://") == -1)
			url = "http://" + $('#url_dl').val();
		$('#view').attr('src', url);
		SCE.getCode(url).then(function (result) { SCE.setCode(result); }); //Download and set code in the editor !
		$("#tt").html("Link: " + url);
	}
	
	$(document).ready(function () {
		$('.keygen form').submit(function (e) {
			e.preventDefault();
			var KeygenFormData = $('.keygen form').serializeArray().reduce(function (obj, item) {
				obj[item.name] = item.value;
				return obj;
			}, {});

			KeygenLib.setParameters(KeygenFormData);
			var keygen = KeygenLib.generateKeygen();
			
			if (KeygenLib.errorInfo.code == '00') {
				$('#bye').removeClass().addClass('content-box-header header-primary');
				$('#bye p').html('Your Keygen: <span>' + keygen + '</span>');
				$('#bye .copykeygen').animate({ right: '-28px' });
			}
			else {
				$('#bye').removeClass().addClass('content-box-header header-danger');
				$('#bye p').html('An error occured (#' + KeygenLib.errorInfo.code + '): <span>' + KeygenLib.errorInfo.message + '</span>');
				$('#bye .copykeygen').animate({ right: '-99px' });
			}
		});
		
		$('.keygen form :reset').click(function () {
			$('#bye').removeClass().addClass('content-box-header');
			$('#bye p').html('Use the form below to generate your own Keygen');
			$('#bye .copykeygen').animate({ right: '-99px' });
		});
		
		$('#bye .copykeygen').click(function(e) {
			e.preventDefault();

			if($('#_hiddenTextToCopy_').length <= 0) {
				$('body').append(
					$('<textarea>').attr({
						id: '_hiddenTextToCopy_'
					}).css({
						position: 'absolute',
						top: '0',
						left: '-9999px'
					})
				);
			}
			var currentFocus = document.activeElement;
			$('#_hiddenTextToCopy_').empty().append($(this).parent().find('p span').text()).focus();
			$('#_hiddenTextToCopy_')[0].setSelectionRange(0, $('#_hiddenTextToCopy_').val().length);
			
			var succeed;
			try {
				succeed = true;
				document.execCommand('copy');
			}
			catch (exception) {
				succeed = false;
			}
			$(currentFocus).focus();

			if (succeed) {
				$(this).animate({ right: 0 }, function () { $(this).animate({ right: '-28px' }); });
			}

			return false;
		});
	});

})();

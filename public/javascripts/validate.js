jQuery.fn.extend({
	validateInput: function(data) {
		var types = ['text', 'password', 'password_entropy', 'email', 'postcode'];
		var defdata = $.extend({
			reqsize: 1,
			pattern: '/\.+/',
			reqentropy: 4
		}, data);
		if (types.indexOf(data.type) >= 0) {
			var color = this.closest('form').css('color');
			var conditions = [];
			conditions[0] = true;
			if (this.val().length < defdata.reqsize) conditions[0] = false;

			if (data.type == 'text') {
				conditions[conditions.length] = defdata.pattern.test(this.val());
			}
			else if (data.type == 'password') {
				var chars = new Object;
				var strength = 0;
				for (var x = 0; x < this.val().length; x++) {
					var c = this.val().charAt(x);
					chars[c] = (isNaN(chars[c]) ? 1 : chars[c] + 1);
				}
				for (var x in chars) {
					var patt = new RegExp(/\W/);
					var res = patt.test(x);
					if (chars[x] == 1) strength += 2;
					else if (chars[x] <= 3) strength += chars[x] + 1;
					if (res) strength += 1;
					strength += chars[x];
				}
				conditions[conditions.length] = (strength > 27) ? true : false;
			}
			else if (data.type == 'password_entropy') {
				var chars = new Object;
				var probs = [];
				for (var x = 0; x < this.val().length; x++) {
					var c = this.val().charAt(x);
					chars[c] = (isNaN(chars[c]) ? 1 : chars[c] + 1);
				}
				for (var x in chars) {
					probs[probs.length] = chars[x] / this.val().length;
				}
				var entropy = 0;
				for (var x = 0; x < probs.length; x++) {
					entropy += (-1 * probs[x]) * Math.log(probs[x]) / Math.log(2);
				}
				conditions[conditions.length] = (Math.round(entropy) >= defdata.reqentropy) ? true : false;
			}
			else if (data.type == 'email') {
				var patt = new RegExp(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i);
				conditions[conditions.length] = patt.test(this.val());
			}
			else if (data.type == 'postcode') {
				var patt = new RegExp(/^[0-9]{2}\-[0-9]{3}$/);
				if (patt.test(this.val())) {
					var postdata = {'action': 'get-city', 'postcode': this.val()};
					$.ajax({
						url: '/',
						type: 'POST',
						contentType: 'application/json',
						data: JSON.stringify(postdata),
						success: function (result) {
							if(result != 'fail') {
								var selectObject = $('select[name="postcode-city"]');
								selectObject.html('');
								for (var x = 0; x < result.length; x++) {
									var selected = '';
									if (x == 0) selected = 'selected="selected"';
									selectObject.append('<option value="'+ result[x] +'" '+ selected +'>'+ result[x] +'</option>');
								}
							}
						}
					});
				}
				else conditions[conditions.length] = false;
			}

			if (conditions.indexOf(false) >= 0) {
				this.css('color', '#e61717');
				$('input[type="submit"]').attr('disabled', 'disabled');
			}
			else {
				this.css('color', color);
				$('input[type="submit"]').removeAttr('disabled');
			}
		}
		return this;
	}
});
$(document).ready(function() {

	$(document).on('input', 'input[name="username"]', function() {
		$(this).validateInput({type: 'text', pattern: /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłóńśźż]*$/, reqsize: 5});
	});

	$(document).on('input', 'input[name="password"]', function() {
		$(this).validateInput({type: 'password', reqsize: 8});
	});

	$(document).on('input', 'input[name="password_entropy"]', function() {
		$(this).validateInput({type: 'password_entropy', reqsize: 3});
	});

	$(document).on('input', 'input[name="email"]', function() {
		$(this).validateInput({type: 'email'});
	});

	$(document).on('input', 'input[name="postcode"]', function() {
		$(this).validateInput({type: 'postcode'});
	});

});
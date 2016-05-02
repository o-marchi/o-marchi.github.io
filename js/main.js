
var languages = [
	{
		name: 'JavaScript',
		code: "{nome: 'JavaScript', age: 26, info: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate eaque quasi neque nostrum, itaque accusamus reprehenderit sequi provident nam tempore natus in. Natus nisi eos recusandae dolor sint non, facilis.'}"
	}, {
		name: 'Ruby',
		code: "{nome: 'Ruby', age: 26, info: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate eaque quasi neque nostrum, itaque accusamus reprehenderit sequi provident nam tempore natus in. Natus nisi eos recusandae dolor sint non, facilis.'}"
	}, {
		name: 'PHP',
		code: "{nome: 'PHP', age: 26, info: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate eaque quasi neque nostrum, itaque accusamus reprehenderit sequi provident nam tempore natus in. Natus nisi eos recusandae dolor sint non, facilis.'}"
	}, {
		name: 'LISP',
		code: "{nome: 'LISP', age: 26, info: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate eaque quasi neque nostrum, itaque accusamus reprehenderit sequi provident nam tempore natus in. Natus nisi eos recusandae dolor sint non, facilis.'}"
	},
];

var codeEl = $('.code');

for (var i = 0; i < languages.length; i++) {

	$('<pre/>', {
		class: 'hide code-sample code-' + languages[i].name.toLowerCase()
	})
		.html(languages[i].code)
		.appendTo(codeEl);
}

$('.code-javascript').removeClass('hide');

// ------------------------------------------------------------------

var typedLanguages = [
	'JavaScript',
	'Ruby',
	'PHP',
	'LISP'
];

var languageMagic = $('.language-magic');

languageMagic.typed({

	strings: typedLanguages,
	typeSpeed: 100,
	loop: true,
	backDelay: 1000,

	preStringTyped: function(stringIndex) {
		var language = typedLanguages[stringIndex].toLowerCase();

		languageMagic.removeClass('language-javascript');
		languageMagic.removeClass('language-ruby');
		languageMagic.removeClass('language-php');
		languageMagic.removeClass('language-lisp');

		languageMagic.addClass('language-' + language);
	},

	onStringTyped: function(stringIndex) {
		var language = typedLanguages[stringIndex].toLowerCase();

		$('.code-sample').addClass('hide');
		$('.code-' + language).removeClass('hide');
	},

});

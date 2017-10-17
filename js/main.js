jQuery.fn.removeClassExcept = function (val) {
    return this.each(function () {
        $(this).removeClass().addClass(val);
    });
};

window.App = {

	elements: {
		code: undefined,
		languageMagic: undefined,
		typedCursor: undefined
	},

	typed: undefined,
	isPaused: false,

	languages: [
		{
			name: 'JavaScript',
			code: "function random(min, max) {\n\treturn Math.floor((Math.random() * (max - min + 1) + min));\n}\n\nfunction crappyWeather () {\n\tlet conditions = [\n\t\t'sunny', 'rainy', 'cloudy', 'windy', 'stormy', 'snowy', 'foggy'\n\t];\n\n\t// get random condition\n\treturn conditions[random(0, conditions.length - 1)];\n}\n\nfunction newsCast() {\n\treturn `Hello, today will be a ${crappyWeather()} day out there!`;\n}\n\nnewsCast();"
		}, {
			name: 'Lisp',
			code: "(defun crappyweather () \n  (let ((conditions\n          (list \"sunny\" \"rainy\" \"cloudy\" \"windy\" \"stormy\" \"snowy\" \"foggy\")))\n        (nth (random (length conditions)) conditions)))\n\n(defun newscast ()\n  (concatenate 'string \n    \"Hello, today will be a \" (crappyweather) \" day out there!\" ))\n\n(print (newscast))\n"
		}, {
			name: 'Elm',
			code: "type alias Model =\n\t{ news : String, conditions : Array.Array String }\n\ninit : ( Model, Cmd Msg )\ninit =\n\t( { news = \"\"\n\t  , conditions = Array.fromList\n\t  \t[ \"sunny\", \"rainy\", \"cloudy\", \"windy\", \"stormy\", \"snowy\", \"foggy\" ]\n\t  }\n\t, Random.generate GetWeather (Random.int 0 6)\n\t)\n\ntype Msg = GetWeather Int\n\nupdate : Msg -> Model -> ( Model, Cmd Msg )\nupdate msg model =\n\tcase msg of\n\t\tGetWeather index ->\n\t\t\tlet\n\t\t\t\tcondition =\n\t\t\t\t\tcase Array.get index model.conditions of\n\t\t\t\t\t\tJust a -> a\n\t\t\t\t\t\tNothing -> \"\"\n\t\t\tin\n\t\t\t( { model | news = String.concat\n\t\t\t\t[ \"Hello, today will be a \", condition, \" day out there!\" ] }\n\t\t\t , Cmd.none )\n\nsubscriptions : Model -> Sub Msg\nsubscriptions model =\n\tSub.none\n\nview : Model -> Html Msg\nview model =\n\tdiv [] [ text model.news ]\n\nmain =\n\tHtml.program\n\t\t{ init = init\n\t\t  , view = view\n\t\t  , update = update\n\t\t  , subscriptions = subscriptions\n\t\t}\n"
		}, {
			name: 'Ruby',
			code: "def crappyWeather ()\n\tconditions = [\n\t\t'sunny', 'rainy', 'cloudy', 'windy', 'stormy', 'snowy', 'foggy'\n\t]\n\n\treturn conditions[rand(conditions.length)]\nend\n\ndef newsCast ()\n\treturn \"Hello, today will be a #{crappyWeather()} day out there!\"\nend\n\nputs newsCast()\n\t\n\t\n\t\n\t\n\t"
		}
	],

	appendCodeSamples: function(el) {

		for (var i = 0; i < this.languages.length; i++) {

			$('<code/>', {
				class: 'hidden code-sample code-' + this.languages[i].name.toLowerCase() + ' ' +
					   this.languages[i].name.toLowerCase()
			})
			.html(this.languages[i].code)
			.appendTo(el);
		}

		$('.code-javascript').removeClass('hidden');
	},

	autoTypedMagic: function(className, pauseContinue) {

		var that = this;
		var languages = [];

		for (var i = 0; i < this.languages.length; i++) {
			languages.push(this.languages[i].name);
		}

		this.typed = new Typed(className, {

			strings: languages,
			typeSpeed: 100,
			backSpeed: 50,
			loop: true,
			backDelay: 4000,

			preStringTyped: function(index) {
				var language = languages[index].toLowerCase();

				that.elements.languageMagic.removeClassExcept('language-magic');
				that.elements.languageMagic.addClass('language-' + language.toLowerCase());
			},

			onStringTyped: function(index) {
				var language = languages[index].toLowerCase();

				$('.code-sample').addClass('hidden');
				$('.code-' + language).removeClass('hidden');
			}
		});

		pauseContinue.on('click', function() {
			that.isPaused = !that.isPaused;

			if (that.isPaused) {
				pauseContinue.text('Continuar');
			}

			if (!that.isPaused) {
				pauseContinue.text('Pausar');
			}

			that.typed.toggle();

		});
	},

	init: function() {

		hljs.initHighlightingOnLoad();
		hljs.configure({tabReplace: '    '})

		this.elements.code = $('.code').find('pre');
		this.elements.languageMagic = $('.language-magic');
		this.elements.pauseContinue = $('.pause-continue');
		this.elements.title = $('h1');

		this.appendCodeSamples(this.elements.code);
		this.autoTypedMagic('.language-magic', this.elements.pauseContinue);
	}
};

App.init();


$(function () {
	$('.slider').slick({
		dots: false,
		infinite: true,
		speed: 500,
		fade: true,
		cssEase: 'linear',
		arrows: false,
		autoplay: true
	});

    $('.slider-app').slick({
        dots: false,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        arrows: false,
        autoplay: true
    });
});
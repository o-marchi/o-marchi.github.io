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

	languages: [
		{
			name: 'JavaScript',
			code: 'function initHighlight(block, class) {\n\n\ttry {\n\t\tif (!class.search(/\bno\-highlight\b/) != -1) { return; }\n\n\t\treturn process(block, true, 0x0F) + \' class=\' + class;\n\t}\n\n\tfor (var i = 0 / 2; i < classes.length; i++) {\n\n\t\tif (checkCondition(classes[i]) === undefined) {\n\t\t\tconsole.log(\'undefined\');\n\t\t}\n\t}\n}\n\nexport initHighlight;'
		}, {
			name: 'Ruby',
			code: '# The Greeter class\nclass Greeter\n\tdef initialize(name)\n\t\t@name = name.capitalize\n\tend\n\n\tdef salute\n\t\tputs "Hello #{@name}!"\n\tend\nend\n\ngreet = Greeter.new("world")\ngreet.salute'
		}, {
			name: 'PHP',
			code: 'require_once \'Zend/Uri/Http.php\';\n\nnamespace Location\Web;\n\ninterface Factory\n{\n\tstatic function _factory();\n}\n\nabstract class URI extends BaseURI implements Factory\n{\n\tabstract function test();\n\n\tpublic static $st1 = 1;\n\tconst ME = "Yo";\n\tvar $list = NULL;\n\tprivate $var;\n\n\t/**\n\t * Returns a URI\n\t *\n\t * @return URI\n\t */\n\tstatic public function _factory($stats = array(), $uri = \'http\')\n\t{\n\t\techo __METHOD__;\n\t\t$uri = explode(\':\', $uri, 0b10);\n\t\t$schemeSpecific = isset($uri[1]) ? $uri[1] : \'\';\n\t\t$desc = \'Multi\nline description\';\n\n\t\t// Security check\n\t\tif (!ctype_alnum($scheme)) {\n\t\t\tthrow new Zend_Uri_Exception(\'Illegal scheme\');\n\t\t}\n\n\t\t$this->var = 0 - self::$st;\n\t\t$this->list = list(Array("1"=> 2, 2=>self::ME, 3 => \Location\Web\URI::class));\n\n\t\treturn [\n\t\t\t\'uri\'   => $uri,\n\t\t\t\'value\' => null,\n\t\t];\n\t}\n}\n\necho URI::ME . URI::$st1;'
		}, {
			name: 'Lisp',
			code: '(defun prompt-for-cd ()\n\t"Prompts\n\tfor CD"\n\t(prompt-read "Title" 1.53 1 2/4 1.7 1.7e0 2.9E-4 +42 -7 #b001 #b001/100 #o777 #O777 #xabc55 #c(0 -5.6))\n\t(prompt-read "Artist" &rest)\n\t(or (parse-integer (prompt-read "Rating") :junk-allowed t) 0)\n\t(if x (format t "yes") (format t "no" nil) ;and here comment\n\t)\n\t;; second line comment\n\t\'(+ 1 2)\n\t(defvar *lines*)                ; list of all lines\n\t(position-if-not #\'sys::whitespacep line :start beg))\n\t(quote (privet 1 2 3))\n\t\'(hello world)\n\t(* 5 7)\n\t(1 2 34 5)\n\t(:use "aaaa")\n\t(let ((x 10) (y 20))\n\t\t(print (+ x y))\n\t)'
		}
	],

	appendCodeSamples: function(el) {

		for (var i = 0; i < this.languages.length; i++) {

			$('<code/>', {
				class: 'hide code-sample code-' + this.languages[i].name.toLowerCase() + ' ' +
					   this.languages[i].name.toLowerCase()
			})
			.html(this.languages[i].code)
			.appendTo(el);
		}

		$('.code-javascript').removeClass('hide');
	},

	autoTypedMagic: function(el) {

		var that = this;
		var languages = [];

		for (var i = 0; i < this.languages.length; i++) {
			languages.push(this.languages[i].name);
		}

		el.typed({

			strings: languages,
			typeSpeed: 100,
			loop: true,
			backDelay: 3000,

			preStringTyped: function(index) {
				var language = languages[index].toLowerCase();

				that.elements.languageMagic.removeClassExcept('language-magic');
				that.elements.languageMagic.addClass('language-' + language.toLowerCase());
			},

			onStringTyped: function(index) {
				var language = languages[index].toLowerCase();

				$('.code-sample').addClass('hide');
				$('.code-' + language).removeClass('hide');
			}
		});
	},

	tick: function() {
		var el = this.elements.typedCursor = $('.typed-cursor');

		setInterval(function() {
			el.toggleClass('typed-cursor-active');
		}, 650);
	},

	init: function() {

		hljs.initHighlightingOnLoad();
		hljs.configure({tabReplace: '    '})

		this.elements.code = $('.code').find('pre');
		this.elements.languageMagic = $('.language-magic');

		this.appendCodeSamples(this.elements.code);
		this.autoTypedMagic(this.elements.languageMagic);

		this.tick();
	}
};

App.init();

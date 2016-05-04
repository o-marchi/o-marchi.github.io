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
			code: '\'use strict\';\n\nfunction Pessoa() {\n\tthis.nome = undefined;\n\tthis.idade = undefined;\n\n\tthis.init = function() {\n\t\tthis.nome = \'Marchi\';\n\t\tthis.idade = 26;\n\t}\n\n\tthis.ola = function() {\n\t\treturn \'Olá, meu nome é \' + this.nome + \'!\';\n\t}\n}\n\nvar onelio = new Pessoa();\nonelio.init(); onelio.ola();\n'
		}, {
			name: 'Ruby',
			code: '# encoding: UTF-8\n\nclass Pessoa\n\tattr :nome,\n\t\t :idade\n\n\tdef initialize\n\t\t@nome = \'Marchi\'\n\t\t@idade = 26\n\tend\n\n\tdef ola\n\t\treturn "Meu nome é, #{nome}"\n\tend\nend\n\nonelio = Pessoa.new\nputs onelio.ola\n'
		}, {
			name: 'PHP',
			code: '&lt;\?php\n\nclass Pessoa {\n\tpublic $nome;\n\tpublic $idade;\n\n\tpublic function initialize() {\n\t\t$this->nome = \'Marchi\';\n\t\t$this->idade = 26;\n\t}\n\t\n\tpublic function ola() {\n\t\treturn "Olá, meu nome é {$this->nome}!";\n\t}\n}\n\n$marchi = new Pessoa();\necho $marchi->ola();\n'
		}, {
			name: 'Lisp',
			code: ';; Lisp Rule!\n\n\n(defstruct pessoa\n\t(:nome "Marchi")\n\t(:idade 26)\n\n\t(init \n\t\t(lambda (this-pessoa)\n\t\t\t(funcall (pessoa-ola this-pessoa)\n\t\t\t\t(pessoa-nome this-pessoa))))\n\n\t(ola\n\t\t(lambda (nome) (write-line (concatenate\n\t\t\t\'string "Ola, eu me chamo " nome "!"))))\n)\n\n(setq marchi (make-pessoa))\n(funcall (pessoa-init marchi) marchi)\n'
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

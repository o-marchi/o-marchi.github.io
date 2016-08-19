jQuery.fn.removeClassExcept = function (val) {
    return this.each(function () {
        $(this).removeClass().addClass(val);
    });
};

window.App = {

	elements: {
		code: undefined,
		languageMagic: undefined,
		typedCursor: undefined,
		title: undefined
	},

	languages: [
		{
			name: 'JavaScript',
			code: '\'use strict\';\n\nfunction Person() {\n\tthis.name = undefined;\n\tthis.age = undefined;\n\n\tthis.init = function() {\n\t\tthis.name = \'Marchi\';\n\t\tthis.age = 26;\n\t}\n\n\tthis.hello = function() {\n\t\treturn \'Hello, my name is \' + this.name + \'!\';\n\t}\n}\n\nvar marchi = new Person();\nmarchi.init(); marchi.hello();\n'
		}, {
			name: 'Ruby',
			code: '# encoding: UTF-8\n\nclass Person\n\tattr :name,\n\t\t :age\n\n\tdef initialize\n\t\t@name = \'Marchi\'\n\t\t@age = 26\n\tend\n\n\tdef hello\n\t\treturn "Hello, my name is #{name}!"\n\tend\nend\n\nmarchi = Person.new\nputs marchi.hello\n'
		}, {
			name: 'PHP',
			code: '&lt;\?php\n\nclass Person {\n\tpublic $name;\n\tpublic $age;\n\n\tpublic function initialize() {\n\t\t$this->name = \'Marchi\';\n\t\t$this->age = 26;\n\t}\n\t\n\tpublic function hello() {\n\t\treturn "Hello, my name is {$this->name}!";\n\t}\n}\n\n$marchi = new Person();\necho $marchi->hello();\n'
		}, {
			name: 'Lisp',
			code: ';; Lisp Rule!\n\n(defstruct person\n\t(:name "Marchi")\n\t(:age 26)\n\n\t(init \n\t\t(lambda (this-person)\n\t\t\t(funcall (person-hello this-person)\n\t\t\t\t(person-name this-person))))\n\n\t(hello\n\t\t(lambda (name) (write-line (concatenate\n\t\t\t\'string "Hello, my name is " name "!"))))\n)\n\n(setq marchi (make-person))\n(funcall (person-init marchi) marchi)\n'
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

	typeTitle: function(el) {

		el.find('.complete-title').typed({
			strings: ['nélio', '^10000'],
			typeSpeed: 100,
			backDelay: 2000,
			loop: false
	    });
	},

	init: function() {

		hljs.initHighlightingOnLoad();
		hljs.configure({tabReplace: '    '})

		this.elements.code = $('.code').find('pre');
		this.elements.languageMagic = $('.language-magic');
		this.elements.title = $('h1');

		this.appendCodeSamples(this.elements.code);
		this.autoTypedMagic(this.elements.languageMagic);
		this.typeTitle(this.elements.title);
	}
};

App.init();

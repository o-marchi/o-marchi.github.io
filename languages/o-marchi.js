'use strict';

function Pessoa() {
	this.nome = undefined;
	this.idade = undefined;

	this.init = function() {
		this.nome = 'Marchi';
		this.idade = 26;
	}

	this.ola = function() {
		return 'Olá, meu nome é ' + this.nome + '!';
	}
}

var onelio = new Pessoa();
onelio.init(); onelio.ola();
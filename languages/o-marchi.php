<?php

class Pessoa {
	public $nome;
	public $idade;

	public function initialize() {
		$this->nome = 'Marchi';
		$this->idade = 26;
	}
	
	public function ola() {
		return "Olá, meu nome é {$this->nome}!";
	}
}

$marchi = new Pessoa();
echo $marchi->ola();
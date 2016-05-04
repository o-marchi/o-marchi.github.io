# encoding: UTF-8

class Pessoa
	attr :nome,
	     :idade

	def initialize
		@nome = 'Marchi'
		@idade = 26
	end

	def ola
		return "Meu nome é, #{nome}"
	end
end

onelio = Pessoa.new
puts onelio.ola
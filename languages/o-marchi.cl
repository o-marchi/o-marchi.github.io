;; Lisp Rule!

(defstruct pessoa
    (:nome "Marchi")
    (:idade 26)

    (init 
    	(lambda (this-pessoa)
    		(funcall (pessoa-ola this-pessoa)
    			(pessoa-nome this-pessoa))))

    (ola
    	(lambda (nome) (write-line (concatenate
    		'string "Ola, eu me chamo " nome "!"))))
)
    
(setq marchi (make-pessoa))
(funcall (pessoa-init marchi) marchi)
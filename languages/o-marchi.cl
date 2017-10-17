(defun crappyweather () 
  (let ((conditions
          (list "sunny" "rainy" "cloudy" "windy" "stormy" "snowy" "foggy")))
        (nth (random (length conditions)) conditions)))

(defun newscast ()
  (concatenate 'string 
    "Hello, today will be a " (crappyweather) " day out there!" ))

(print (newscast))

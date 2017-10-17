def crappyWeather ()
	conditions = [
		'sunny', 'rainy', 'cloudy', 'windy', 'stormy', 'snowy', 'foggy'
	]

	return conditions[rand(conditions.length)]
end

def newsCast ()
	return "Hello, today will be a #{crappyWeather()} day out there!"
end

puts newsCast()
	
	
	
	
	
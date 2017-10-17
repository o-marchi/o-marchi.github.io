type alias Model =
	{ news : String, conditions : Array.Array String }

init : ( Model, Cmd Msg )
init =
	( { news = ""
	  , conditions = Array.fromList
	  	[ "sunny", "rainy", "cloudy", "windy", "stormy", "snowy", "foggy" ]
	  }
	, Random.generate GetWeather (Random.int 0 6)
	)

type Msg = GetWeather Int

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
	case msg of
		GetWeather index ->
			let
				condition =
					case Array.get index model.conditions of
						Just a -> a
						Nothing -> ""
			in
			( { model | news = String.concat
				[ "Hello, today will be a ", condition, " day out there!" ] }
			 , Cmd.none )

subscriptions : Model -> Sub Msg
subscriptions model =
	Sub.none

view : Model -> Html Msg
view model =
	div [] [ text model.news ]

main =
	Html.program
		{ init = init
		  , view = view
		  , update = update
		  , subscriptions = subscriptions
		}

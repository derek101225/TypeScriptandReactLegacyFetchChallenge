import {Component} from 'react'

type Props = {

}

type State = {
    lat: number;
    lon: number;
    weather: number;
}

export default class usePostion extends Component<Props, State> {
    constructor(props: Props){
        super(props) 
        this.state = {
            lat: 0,
            lon: 0,
            weather: 50,
        }
        
    }

    

    componentDidMount(){
                    navigator.geolocation.watchPosition(position => { 
                        // const latitude : number = Math.round(position.coords.latitude);
                        // const longitude : number = Math.round(position.coords.longitude);
                        this.setState({
                            lat: Math.round(position.coords.latitude),
                            lon: Math.round(position.coords.longitude)
                        })
                        
                        console.log(this.state.lat)
                        console.log(this.state.lon)
                    })
                    
                }
                
                componentDidUpdate({}, prevState: State){
                    if(prevState.lat !== this.state.lat){
                        this.fetchWeather()
                    }
                }

                fetchWeather (){
        const WeatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lon}&appid=4dedb8cc8c2383f6b531b4848e6b12f0&units=imperial`
        fetch(WeatherAPI)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            this.setState({
                weather: data.main.temp

            })
            console.log(this.state.weather)
        }) 
    }

    


    render(){
        return(
            <div>
                <h1>{this.state.weather}</h1>
            </div>
        )
    }

}
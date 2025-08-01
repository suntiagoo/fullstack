const InformationWeather = ({ weather }) => {

    if (weather) {
        return (
            <>
                <h2>Weather</h2>
                {<p> {`Temperature ${weather[0].main.temp} Celsius`}</p>}
                {<img src={`https://openweathermap.org/img/wn/${weather[0].weather[0].icon}.png`} width={200} height={200} />}
                {<p>{`Wind ${weather[0].wind.speed} m/s`}</p>}

            </>
        )
    }
}

export default InformationWeather;
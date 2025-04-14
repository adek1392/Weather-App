

import Api_key from "./Api_key.js"

const input = document.querySelector('.input')
const btn = document.querySelector('.searchBtn')
const img = document.querySelector('img')
const cityName = document.querySelector('.cityName')
const temperature = document.querySelector('.temperatureData')
const humidity = document.querySelector('.humidityData')
const wind = document.querySelector('.windData')
const actualization = document.querySelector('.lastUpdate')
const error = document.querySelector('.errorText')

const weatherData = () => {
	const apiKey = Api_key.key
	const city = input.value || 'New york'

	const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`

	axios
		.get(apiUrl)
		.then(res => {
			const data = res.data
			console.log('Wheather data:', data)

			const description = data.current.condition.text
			const altAtribiute = description + ' weather'
			const icon = data.current.condition.icon
			const temp = data.current.temp_c
			const humidityData = data.current.humidity
			const windData = data.current.wind_kph

			cityName.textContent = data.location.name
			temperature.textContent = Math.floor(temp) + ' ℃'
			humidity.textContent = humidityData + ' %'
			wind.textContent = Math.floor(windData) + ' km/h'
			actualization.textContent = data.current.last_updated

			input.value = ''
			error.textContent = ''

			img.setAttribute('src', icon)
			img.setAttribute('alt', altAtribiute)
		})
		.catch(() => (error.textContent = 'Please enter a valid city name!'))
}

const enterCheck = e => {
	if (e.key === 'Enter') {
		weatherData()
	}
}

weatherData()

input.addEventListener('keyup', enterCheck)
btn.addEventListener('click', weatherData)

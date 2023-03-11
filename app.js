const pollutionScale = [
    {
      scale: [0, 50],
      quality: "Good",
      src: "happy",
      background: "linear-gradient(to right, #45B649, #DCE35B)",
    },
    {
      scale: [51, 100],
      quality: "Moderate",
      src: "thinking",
      background: "linear-gradient(to right, #F3F9A7, #CAC531)",
    },
    {
      scale: [101, 150],
      quality: "Unhealthy",
      src: "unhealthy",
      background: "linear-gradient(to right, #F16529, #E44D26)",
    },
    {
      scale: [151, 200],
      quality: "Bad",
      src: "bad",
      background: "linear-gradient(to right, #ef473a, #cb2d3e)",
    },
    {
      scale: [201, 300],
      quality: "Very bad",
      src: "mask",
      background: "linear-gradient(to right, #8E54E9, #4776E6)",
    },
    {
      scale: [301, 500],
      quality: "Terrible",
      src: "terrible",
      background: "linear-gradient(to right, #7a2828, #a73737)",
    },
  ];


const userInformation = document.getElementById('info-city')
const emojiLogo = document.querySelector('#emoji-logo > img')
const background = document.querySelector('main')
const cityInfo = document.getElementById('city')
const pollutionInfo = document.getElementById('pollution')
const indexInfo = document.getElementById('index')
const logoPin = document.getElementById('logo-pin')
  
export async function getAirQuality() {
    try{
        const getData = await fetch('http://api.airvisual.com/v2/nearest_city?key=e9a22552-9bad-4be4-9390-87296a572359')
        if(!getData.ok) {
            console.log('Aucune data chargée')
        }
        const response = await getData.json()
        const aqi = response.data.current.pollution.aqius

        const sortData = {
            city: response.data.city,
            country: response.data.country,
            aqi,
            ...pollutionScale.find(obj => aqi >= obj.scale[0] && aqi <= obj.scale[1])
        }

        populateData(sortData)

        /**
         * Constante qui va chercher le score dans le tableau des score pollutionScale
         */
        /**
         * On vient appliquer les data au front
         */


    } catch(e) {
        throw new Error("impossible de se connecter à l'API")
        console.error(e)
    }
}

getAirQuality()

function populateData(data) {
    userInformation.innerText = `Voici la qualité de l'air en ce moment à ${data.city} en ${data.country}`
    background.style.background = data.background
    cityInfo.innerText = data.city
    pollutionInfo.innerText = data.quality
    indexInfo.innerText = data.aqi
    emojiLogo.src = `./src/img/${data.src}.svg`
    placePointerPollution(data.aqi)
}

const locationPointer = document.querySelector('.quality-bar')

function placePointerPollution(dataIQ) {
    const width = locationPointer.scrollWidth
    logoPin.style.transform = `translateX(${(dataIQ / 500) * width}px) rotate(180deg)`
    console.log(width)
    console.log((dataIQ / 500))
    console.log((dataIQ / 500) * width)
}


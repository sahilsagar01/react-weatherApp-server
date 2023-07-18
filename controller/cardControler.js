const { error } = require("console");
const WeatherCard = require("../module/cardModule");
const weatherCard = require("../module/cardModule");
const https = require("https")


const createCard = async (req, res) => {
    const data = req.body;
    // const newCityName = req.body.cityName;
    // console.log(newCityName)
    // const api = "https://api.openweathermap.org/data/2.5/weather?q="+newCityName+"&appid=755a05b61b6251414437e6c7944df9b3&units=metric"
    // https.get(api, (response) => {
    //     response.on('data', (data) =>{
    //         const weatherInfo = JSON.parse(data);
    //         console.log(weatherInfo.cod);
    //         if(weatherInfo.cod === 200){
    //             const NAME = weatherInfo.name;
    //             const temp = weatherInfo.main.temp;
    //             const weatdes = weatherInfo.weather[0].description;
    //             const icon = weatherInfo.weather[0].icon;
    //             const windSpeed = weatherInfo.wind.speed;
    //             const Hdt = weatherInfo.main.humidity;
    //             const country = weatherInfo.sys.country;
    //             const imageurl = " https://openweathermap.org/img/wn/"+icon+"@2x.png"
                const newCard = new WeatherCard({
                    temperature: data.temperature,
                    weather: data.weather,
                    windSpeed: data.windSpeed,
                    humidity: data.humidity,
                    country: data.country,
                    city: data.city,
                    image: data.image
                })
                newCard.save()
                .then((doc, err) => {
                    res.send(doc);
                    console.log(doc)
                })
                .catch((err)=> {
                    res.send(err)
                })
            // }
//             else{
//                 res.send("Sorry, 404 request not")
//             }
//         })
//     })

}
const showCard = async (req, res) => {
    const newCityName = req?.body?.cityName;
    console.log(newCityName)
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${newCityName}&appid=${process.env.weatherKey}&units=metric`
    https.get(api, (response) => {
        response.on('data', (data) =>{
            const weatherInfo = JSON.parse(data);
            console.log(weatherInfo.cod);
            if(weatherInfo.cod === 200){
                const NAME = weatherInfo.name;
                const temp = weatherInfo.main.temp;
                const weatdes = weatherInfo.weather[0].description;
                const icon = weatherInfo.weather[0].icon;
                const windSpeed = weatherInfo.wind.speed;
                const Hdt = weatherInfo.main.humidity;
                const country = weatherInfo.sys.country;
                const imageurl = " https://openweathermap.org/img/wn/"+icon+"@2x.png";
                res.send({
                    temperature: temp,
                    weather: weatdes,
                    windSpeed: windSpeed,
                    humidity: Hdt,
                    country: country,
                    city: NAME,
                    image: imageurl
                })
            }
            else{
                res.send("Sorry, 404 request not")
            }
        })
    })
}

const getCard = async (req, res) => {
    weatherCard.find({})
    .then((doc , err) => {
        res.send(doc)
    })
    .catch(err => {
        console.log(err)
        res.send(err)
    })
}

const deleteCard = async(req, res) => {
    const id = req.params.id;
    weatherCard.findByIdAndDelete(id)
    .then((doc , err) => {
        res.send(doc)
        console.log(doc)
    })
    .catch(err => {
        res.send(err)
        console.log(err)
    })
}

module.exports = {createCard, getCard, deleteCard, showCard};
const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
    temperature: String,
    weather: String,
    windSpeed: String,
    humidity: String,
    country: String,
    city: String,
    image: String
},{
    timestamps: true
});

const WeatherCard = mongoose.model("Weather" , cardSchema);

module.exports = WeatherCard;
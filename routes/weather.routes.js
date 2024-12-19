import express from 'express'
import { Weather } from '../models/weather.model.js'


const weatherRoutes = express()

weatherRoutes.get('/test-check', async (req, res) => {
    res.send('Hello World! form weather data');
})
weatherRoutes.post("/test", async (req, res) => {
    res.send("Hello World! form weather data");
})
weatherRoutes.get('/all-cities', async (req, res) => {
    const {id} = req.headers
    try {
        const allCity =  await Weather.find({user : id})
        res.status(200).json({
            cities: allCity
        })
    } catch (error) {
        return console.log("Error while getting the cities")
    }
})

weatherRoutes.post('/addfav-city', async (req, res) => {
    const { id } = req.headers
    // const id = "6760e5513bcccb3561f0246c"
    const {lat, lon, cityName } = req.body
    console.log("id", id);
    console.log("/addfav-city");
    
    
    try {
        const favCity = await Weather.create({
            user : id,
            lat : lat,
            lon : lon,
            cityName : cityName,
            isFavorite : true
        })

        return res.status(200).json({
            favCity : favCity
        })
    } catch (error) {
        console.log("Error while getting the fav city ", error)
    }
})

weatherRoutes.delete('/remove-city', async (req, res) => {
    const { id } = req.headers
    const { cityName } = req.body
    try {
        const removedCity = await Weather.findOneAndDelete({
            user: id,
            cityName: cityName
        })

        if (!removedCity) {
            return res.status(404).json({
                message: 'Favorite city not found'
            })
        }

        return res.status(200).json({
            message: 'Favorite city removed successfully'
        })
    } catch (error) {
        console.log("Error while removing the fav city ", error)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
})

export { weatherRoutes }
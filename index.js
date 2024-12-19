import express from 'express';
import { connectDB } from './db/connectDB.js';
import {userRoute} from './routes/user.routes.js';
import {weatherRoutes} from './routes/weather.routes.js';



const app = express();
import cors from 'cors'


const port = 5000;

app.use(express.json());

app.use(cors());

try {
    connectDB();
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
} catch (error) {
    console.log(`Error: ${error.message}`);
}

app.use('/user', userRoute);
app.use('/weather', weatherRoutes);

app.get('/weather-data', (req, res) => {
    res.send('Hello World! form weather data');
});


import mongoose from 'mongoose';

const weatherSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    lat:{
        type : Number,
    },
    lon:{
        type : Number,
    },
    cityName : {
        type : String,
    },
    isFavorite: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Weather = mongoose.model('Weather', weatherSchema);

export { Weather };
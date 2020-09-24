const mongoose = require('mongoose');
const { Schema } = mongoose;

const busObjectList = [];

const userSchema = new Schema(
    {
        bus_station_num: Number,
        bus_list: busObjectList,
        bus_num: Number
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Bus', userSchema);
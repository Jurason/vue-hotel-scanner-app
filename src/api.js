import axios from 'axios'

//get hotel information
const apiHotels = (location, checkIn, checkOut, limit=10) => {
    return `https://engine.hotellook.com/api/v2/cache.json?location=${location}&currency=usd&checkIn=${checkIn}&checkOut=${checkOut}&limit=${limit}`
}
Date.prototype.addDays = function(days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
export const getHotels = async query => {
    let { location, checkIn, days } = query
    let checkOut = checkIn.addDays(days)
    checkIn = dateFormatHandler(checkIn)
    checkOut = dateFormatHandler(checkOut)
    return await axios.get(apiHotels(location,checkIn, checkOut)).then(res => res.data).catch(error => console.log(error))
}
function dateFormatHandler(date){
    return date.toISOString().split('T')[0]
}

//get images for carousel
const API_IMAGES = 'https://picsum.photos/v2/list'
export const getCarouselImages = () => {
    return axios.get(API_IMAGES)
        .then(res => res.data)
        .catch(err => console.log(err))
}

//get location
const apiCityLocation = (lat, lng) => `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
export const getLocationCity = async () => {
    return getPosition()
        .then(position => {
            const { latitude, longitude } = position.coords
            return axios.get(apiCityLocation(latitude, longitude))
        })
        .then(res => res.data.city)
        .catch(err => {
            console.log(err)
            return 'Kyiv'
        })
}
function getPosition(){
    return new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
    );
}
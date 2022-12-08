import axios from 'axios'

//get hotel information
const apiHotels = (location, checkIn, checkOut, limit=10) => {
    return `http://engine.hotellook.com/api/v2/cache.json?location=${location}}&currency=usd&checkIn=${checkIn}&checkOut=${checkOut}&limit=${limit}`
}
export const getHotels = (query) => {
    const { location, checkIn, checkOut } = query
    return axios.get(apiHotels(location,checkIn, checkOut)).then(res => res.data).catch(error => console.log(error))
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
export const getLocationCity = () => navigator.geolocation.getCurrentPosition(success,error)
function success(position){
    const { latitude, longitude } = position.coords
    return axios.get(apiCityLocation(latitude, longitude))
        .then(res => res.data.city)
        .catch(err => console.log(err))
}
function error(err){
    console.log(`ERROR ${err.code}: ${err.message}`)
}
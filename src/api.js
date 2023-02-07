import axios from 'axios'
import {ref} from "vue";
import {useRouter} from "vue-router";

export const defaultValues = () => {
    return {
        location: 'Kyiv',
        checkIn: new Date(),
        days: 12
    }
}

// login state handler
export const loginStateHandler = async () => {
    const router = useRouter()
    const loginStatus = localStorage.getItem('login-status')
    if(!loginStatus || loginStatus !== '1'){
        await router.push({name: 'LoginView'})
    }
}

//get hotel information
const hotelsApiUrl = (location, checkIn, checkOut, limit=10) => {
    return `https://engine.hotellook.com/api/v2/cache.json?location=${location}&currency=usd&checkIn=${checkIn}&checkOut=${checkOut}&limit=${limit}`
}
export const getHotels = async query => {
    let { location, checkIn, days } = query
    let checkOut = checkIn.addDays(days)
    checkIn = dateFormatHandler(checkIn)
    checkOut = dateFormatHandler(checkOut)
    return await axios.get(hotelsApiUrl(location,checkIn, checkOut)).then(res => res.data).catch(error => console.log(error))
}
function dateFormatHandler(date){
    return date.toISOString().split('T')[0]
}
Date.prototype.addDays = function(days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
//get location
export const handleInitialStateGeoLocation = async (config = {}) => {
    const { defaultCity } = config
    const locationFromLocalStorage = ref('')
    if(!localStorage.getItem('geo-location')) {
        const location = await getLocationCity()
        location ? localStorage.setItem('geo-location', String(location)) : localStorage.setItem('geo-location', (defaultCity || 'Kyiv'))
        locationFromLocalStorage.value = location || (defaultCity || 'Kyiv')
    } else {
        locationFromLocalStorage.value = localStorage.getItem('geo-location')
    }
    return {
        locationFromLocalStorage
    }
}
const apiCityLocation = (lat, lng) => `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
export const getLocationCity = async () => {
    return getPosition()
        .then(position => {
            const { latitude, longitude } = position.coords
            return axios.get(apiCityLocation(latitude, longitude))
        })
        .then(res => res.data.city)
        .catch(err => {
            console.log('Error:', err)
            // return 'Kyiv'
        })
}
function getPosition(){
    return new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
    );
}
//get images for carousel
const API_IMAGES = 'https://picsum.photos/v2/list'
export const getCarouselImages = () => {
    return axios.get(API_IMAGES)
        .then(res => res.data)
        .catch(err => console.log(err))
}
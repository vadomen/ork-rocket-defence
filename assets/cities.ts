import cities from './ua.json';
import { City } from './types';

export class Cities {
    map: google.maps.Map;
    constructor(map) {
        this.map = map;
    }

    getCapitals():City[] {
        return cities.reduce((filtered: City[], city) => {
            if ((city.capital === 'admin' || city.capital === 'primary') && Number(city.lat) && Number(city.lng) && Number(city.population)) {
                const convertedCity = {
                    ...city,
                    center: { lat: Number(city.lat), lng: Number(city.lng) },
                    lat: Number(city.lat),
                    lng: Number(city.lng),
                    population: Number(city.population),
                }
                filtered.push(convertedCity);
            }
            return filtered;
        }, []);
    }

    circleCities() {
        const cities = this.getCapitals();
        cities.forEach(city => new google.maps.Circle({
            strokeColor: "#064605",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#3d9d05",
            fillOpacity: 0.35,
            map: this.map,
            center: city.center,
            radius: Math.sqrt(city.population) * 20,
        }));
    }

    getRandomCity() {
        const cities = this.getCapitals();
        return cities[Math.floor(Math.random() * cities.length)];
    }
}

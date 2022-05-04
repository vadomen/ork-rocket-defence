import { Circle } from './types';

export class AirDefenceBase {
    bases: Circle[] = [];
    map: google.maps.Map;

    constructor(map) {
        this.map = map;
    }

    createBase({ latLng }) {
        const item = {
            type: 'airDefenceSystem',
            center: latLng,
            radius: Math.sqrt(35000) * 100
        };
        console.log(JSON.stringify(item));
        this.bases.push(item);
        new google.maps.Circle({
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
            map: this.map,
            ...item
        })
    }
}


import { Circle } from './types';

export class AirDefenceBase {
    bases: Circle[] = [];
    map: google.maps.Map;
    currentBaseType: string;

    constructor(map) {
        this.map = map;
        this.currentBaseType = 'c400';
    }

    set currentBase(type: string) {
        this.currentBaseType = type;
    }

    get baseTypes() {
        return {
            c300:{
                type: 'C300',
                radius: Math.sqrt(35000) * 100,
                fillColor: "#d7a81a",
                strokeColor: "#FF0000",
            },
            c400:{
                type: 'C400',
                radius: Math.sqrt(80000) * 100,
                fillColor: "#FF0000",
                strokeColor: "#FF0000",
            }
        }
    }

    createBase({ latLng }) {
        const item = this.baseTypes[this.currentBaseType];
        item.center = latLng;
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


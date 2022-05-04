export interface Circle {
    type: string;
    center: google.maps.LatLngLiteral;
    radius: number;
}

export interface Trajectory {
    id: Symbol;
    count: number;
    interval: number;
    polyline: google.maps.Polyline;
}



export interface City {
    city: string,
    lat: number,
    lng: number,
    country: string,
    center: google.maps.LatLngLiteral,
    iso2: string,
    admin_name: string,
    capital: string,
    population: number,
    population_proper: string
}
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
import { Trajectory, Circle } from './types';

export class RocketTrajectory {
    trajectories: Trajectory[] = [];
    airDefenceSystems: Circle[];
    cities: any;

    constructor(airDefenceSystems, cities) {
        this.airDefenceSystems = airDefenceSystems;
        this.cities = cities;
    }

    drawRocket () {
        return {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            strokeColor: "#d7a81a",
        };
    }

    generateTrajectoryPath() {
        const lines = [
            [
                { lat: 45.29, lng: 31.35 },
                this.cities.getRandomCity().center,
            ],
            [
                {lat: 45.264, lng: 34.291},
                this.cities.getRandomCity().center,
            ],
            [
                { lat: 52.449, lng: 28.004},
                this.cities.getRandomCity().center,
            ],
            [
                { lat: 51.786, lng: 36.175},
                this.cities.getRandomCity().center,
            ],
        ];
        return lines[Math.floor(Math.random() * lines.length)];
    }

    generateTrajectory(map) {
        const trajectory: Trajectory = {
            id: Symbol('trajectoryId'),
            count: 0,
            interval: 0,
            polyline: new google.maps.Polyline({
                path: this.generateTrajectoryPath(),
                strokeColor: '#FF0000',
                strokeOpacity: 1,
                strokeWeight: 0,
                icons: [
                    {
                        icon: this.drawRocket(),
                        offset: "100%",
                    },
                ],
                map: map,
            })
        };
        this.trajectories.push(trajectory);
        this.rocketFly(trajectory);
    }


    destroyRocket (trajectory: Trajectory) {
        const { polyline, interval } = trajectory;
        polyline.setMap(null);
        polyline.set('icons', []);
        clearInterval(interval);
    };

    calculateCollision(trajectory: Trajectory) {
        const { polyline, count } = trajectory;
        const path = polyline.getPath().getArray();
        const rocketPosition = google.maps.geometry.spherical.interpolate(path[0], path[1], (count / 200));
        this.airDefenceSystems.forEach(base => {
            if((google.maps.geometry.spherical.computeDistanceBetween(rocketPosition, base.center) <= base.radius)) {
                this.destroyRocket(trajectory);
            }
        });
    };

    rocketFly(trajectory: Trajectory) {
        let count = 0;
        let interval;
        interval = window.setInterval(() => {
            count = (count + 1) % 200;
            const icons = trajectory.polyline.get("icons");
            icons[0].offset = count / 2 + "%";
            trajectory.polyline.set("icons", icons);
            trajectory.count = count;
            trajectory.interval = interval;
            this.calculateCollision(trajectory);
        }, 20);
    }
}




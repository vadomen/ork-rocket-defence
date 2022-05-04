/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

interface Circle {
  type: string;
  center: google.maps.LatLngLiteral;
  radius: number;
}

interface Trajectory {
  id: Symbol;
  count: number;
  interval: number;
  polyline: google.maps.Polyline;
}

const airDefenceSystem: Circle[] = [];

const trajectories: any[] = [];

const addBase = (map, { latLng }) => {
  const item = {
    type: 'airDefenceSystem',
    center: latLng,
    radius: Math.sqrt(35000) * 100
  };
  console.log(JSON.stringify(item));
  airDefenceSystem.push(item);
  new google.maps.Circle({
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    map,
    ...item
  })
}

const drawRocket = () => {
  return {
    path: google.maps.SymbolPath.CIRCLE,
    scale: 8,
    strokeColor: "#d7a81a",
  };
}

const generateTrajectoryPath = () => {
  const lines = [
      [
          { lat: 45.29, lng: 31.35 },
          { lat: 50.413, lng: 30.550 }
      ],
      [
        {lat: 45.264, lng: 34.291},
        { lat: 50.413, lng: 30.550 }
      ],
      [
        { lat: 52.449, lng: 28.004},
        { lat: 50.413, lng: 30.550 }
      ],
    [
        { lat: 51.786, lng: 36.175},
        { lat: 50.413, lng: 30.550 }
      ],
  ];
  return lines[Math.floor(Math.random()*lines.length)];
}

const generateTrajectory = (map) => {
  const trajectory: Trajectory = {
    id: Symbol('trajectoryId'),
    count: 0,
    interval: 0,
    polyline: new google.maps.Polyline({
      path: generateTrajectoryPath(),
      strokeColor: '#FF0000',
      strokeOpacity: 1,
      strokeWeight: 0,
      icons: [
        {
          icon: drawRocket(),
          offset: "100%",
        },
      ],
      map: map,
    })
  };
  trajectories.push(trajectory);
  rocketFly(trajectory);
}

const destroyRocket = (trajectory: Trajectory) => {
  const { polyline, interval } = trajectory;
  polyline.setMap(null);
  polyline.set('icons', []);
  clearInterval(interval);
};

const calculateCollision = (trajectory: Trajectory) => {
  const { polyline, count } = trajectory;
  const path = polyline.getPath().getArray();
  const rocketPosition = google.maps.geometry.spherical.interpolate(path[0], path[1], (count / 200));
  airDefenceSystem.forEach(base => {
    if((google.maps.geometry.spherical.computeDistanceBetween(rocketPosition, base.center) <= base.radius)) {
      destroyRocket(trajectory);
    }
  });
};

const rocketFly = (trajectory: Trajectory) => {
  let count = 0;
  let interval;
  interval = window.setInterval(() => {
    count = (count + 1) % 200;
    const icons = trajectory.polyline.get("icons");
    icons[0].offset = count / 2 + "%";
    trajectory.polyline.set("icons", icons);
    trajectory.count = count;
    trajectory.interval = interval;
    calculateCollision(trajectory);
  }, 20);
}

const startGame = (map) => {
  window.setInterval(() => {
    generateTrajectory(map);
  }, Math.random() * 5000);
}

function initMap(): void {
  const myLatlng = { lat: 48.3794, lng: 31.1656 };
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 7,
      center: myLatlng,
      mapTypeId: 'terrain',
    }
  );

  map.addListener('click', (mapsMouseEvent) => {
    addBase(map, mapsMouseEvent);
  });

  startGame(map);
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};

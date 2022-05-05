import { AirDefenceBase } from './base';
import { RocketTrajectory } from './rocketTrajectory';
import { Cities } from './cities';

const UA_CENTER = { lat: 48.3794, lng: 31.1656 };

const startGame = (map, rocketTrajectory) => {
  window.setInterval(() => {
    rocketTrajectory.generateTrajectory(map);
  }, Math.random() * 7000);
}

function initMap(): void {
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 7,
      center: UA_CENTER,
      mapTypeId: 'terrain',
    }
  );
  const cities = new Cities(map);
  cities.circleCities();

  const airDefenceBase = new AirDefenceBase(map);
  const rocketTrajectory = new RocketTrajectory(airDefenceBase.bases, cities);

  map.addListener('click', (mapsMouseEvent) => {
    airDefenceBase.createBase(mapsMouseEvent);
  });
  const buttonStartGame = document.querySelector("#start-game");
  // @ts-ignore
  buttonStartGame.addEventListener('click', () => {
    startGame(map, rocketTrajectory);
  });
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};

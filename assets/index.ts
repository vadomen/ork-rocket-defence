import { AirDefenceBase } from './base';
import { RocketTrajectory } from './rocketTrajectory';
import { Cities } from './cities';

const UA_CENTER = { lat: 48.3794, lng: 31.1656 };

const startGame = (map, rocketTrajectory) => {
  window.setInterval(() => {
    rocketTrajectory.generateTrajectory(map);
  }, Math.random() * 7000);
}

let map;
let airDefenceBase;
let rocketTrajectory;

function initMap(): void {
  map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 7,
      center: UA_CENTER,
      mapTypeId: 'terrain',
    }
  );
  const cities = new Cities(map);
  cities.circleCities();

  airDefenceBase = new AirDefenceBase(map);
  rocketTrajectory = new RocketTrajectory(airDefenceBase.bases, cities);

  map.addListener('click', (mapsMouseEvent) => {
    airDefenceBase.createBase(mapsMouseEvent);
  });
  const buttonStartGame = document.querySelector("#start-game");

  buttonStartGame && buttonStartGame.addEventListener('click', () => {
    startGame(map, rocketTrajectory);
  });

  const buttonSetBaseType = document.querySelectorAll(".button.set-base");
  buttonSetBaseType.forEach(base => {
    base.addEventListener('click', (event) => {
      buttonSetBaseType.forEach(b => {
        b.classList.remove('active');
      })
      // @ts-ignore
      airDefenceBase.currentBase = event.target.getAttribute('data-baseType');
      // @ts-ignore
      event.target.classList.add('active');
    });
  });
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};

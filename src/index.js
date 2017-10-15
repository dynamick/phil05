import Driver from './driver';
import Sonar from './sonar';

class Main {
  constructor() {
    this.driver = new Driver(5,6,19,13);
    this.sonar = new Sonar();
  }

  run() {
    var self = this;
    var startSonar = this.sonar.initSensor();
    startSonar.then(function() {
      console.log('Sonar listening...');

      self.sonar.on('distance', (dist) => self.driver.setDistance(dist));
      self.driver.autopilot();
    }, function(error) {
      console.log(error);
    });
  }

}


// main
const script = new Main();
// script.init();
script.run();

import Sonar from './sonar';
import Driver from './driver';

class Main {
  constructor() {
    this.driver = new Driver(5,6,19,13);
    this.sonar = new Sonar();

  }

  run() {
    var self = this;
    var start_sonar = this.sonar.initSensor();
    start_sonar.then(function() {
      console.log('Sonar listening...');

      self.sonar.on('distance', (dist) => self.driver.setDistance(dist));
      
      self.driver.autopilot();

    }, function(error) {
      console.log(error);
    });
  }

}

// main
var script = new Main();
//script.init();
script.run();

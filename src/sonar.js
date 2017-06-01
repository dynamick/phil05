var usonic = require('mmm-usonic');
const EventEmitter = require('events');

class Sonar  extends EventEmitter  {
  constructor() {
    super();
    this.echoPin    = 24;
    this.triggerPin = 23;
    this.timeout    = 750;
  }

  getDistance() {
    return this.sensor();
  }

  initSensor( error ) {
    var self = this;
    var promise = new Promise( function (resolve, reject) {
      usonic.init( function(error) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          self.sensor = usonic.createSensor(self.echoPin, self.triggerPin, self.timeout);
          self.runSensor();
          resolve();
        }
      } );
    });
    return promise;
  }

  runSensor() {
    var self = this;
    setTimeout( function() {
      var distance = self.getDistance();
      //console.log(distance);
      self.emit('distance', distance);
      self.runSensor();
    }, 750);

  }

} // end of class Sonar

export default Sonar

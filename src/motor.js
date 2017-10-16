var wpi = require('wiring-pi');

class Motor {
  constructor(motorPin1, motorPin2) {
      // Pi pins for the motor control connection:
      this._motorPin1 = motorPin1;
      this._motorPin2 = motorPin2;

      wpi.setup('gpio');
  
      // setup the pins on the Pi:
      wpi.pinMode(this._motorPin1, wpi.OUTPUT);
      wpi.pinMode(this._motorPin2, wpi.OUTPUT);
      console.log('Motors turned on!');
  } // End of constructor

    forward() {
      wpi.digitalWrite(this._motorPin1, wpi.LOW);
      wpi.digitalWrite(this._motorPin2, wpi.HIGH);
    }
    backward() {
      wpi.digitalWrite(this._motorPin1, wpi.HIGH);
      wpi.digitalWrite(this._motorPin2, wpi.LOW);
    }
    stop() {
        wpi.digitalWrite(this._motorPin1, wpi.LOW);
        wpi.digitalWrite(this._motorPin2, wpi.LOW);
    }

}

export default Motor;

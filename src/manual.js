const wpi = require('wiring-pi');
const async = require('async');
const keypress = require('keypress');

class Motor {

    constructor(motorPin1, motorPin2) {
        // Pi pins for the motor control connection:
        this._motorPin1 = motorPin1;
        this._motorPin2 = motorPin2;

        // setup the GPIO
        wpi.setup('gpio');

        // setup the pins on the Pi:
        wpi.pinMode(this._motorPin1, wpi.OUTPUT);
        wpi.pinMode(this._motorPin2, wpi.OUTPUT);

    } // End of constructor

    forward(ms) {
        var _motorPin1 = this._motorPin1;
        var _motorPin2 = this._motorPin2;
        async.series([
            function (cb) {
                wpi.digitalWrite(_motorPin1, wpi.LOW);
                wpi.digitalWrite(_motorPin2, wpi.HIGH);
                cb();
            },
            function (cb) {
                setTimeout(cb, ms);
            },
            function (cb) {
                //wpi.digitalWrite(_motorPin1, wpi.LOW);
                //wpi.digitalWrite(_motorPin2, wpi.LOW);
                cb();
            }
        ], function (err) {});
    }
    backward(ms) {
        var _motorPin1 = this._motorPin1;
        var _motorPin2 = this._motorPin2;
        async.series([
            function (cb) {
                wpi.digitalWrite(_motorPin1, wpi.HIGH);
                wpi.digitalWrite(_motorPin2, wpi.LOW);
                cb();
            },
            function (cb) {
                setTimeout(cb, ms);
            },
            function (cb) {
                //wpi.digitalWrite(_motorPin1, wpi.LOW);
                //wpi.digitalWrite(_motorPin2, wpi.LOW);
                cb();
            }
        ], function (err) {});
    }
    stop() {
        wpi.digitalWrite(this._motorPin1, wpi.LOW);
        wpi.digitalWrite(this._motorPin2, wpi.LOW);
    }
}

const [m1_pin1, m1_pin2] = [5,6];
const [m2_pin1, m2_pin2] = [19,13];

m1 = new Motor(m1_pin1, m1_pin2);
m2 = new Motor(m2_pin1, m2_pin2);

// start stopping the robot
m1.stop();
m2.stop();

// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);
console.log("PRESS arrows to move the robot");
console.log("PRESS SPACE to stop movements");
console.log("PRESS CTRL-C to exit");
console.log("----");

// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
    if (key.code == '[A') {
        console.log('FORWARD');
        m1.forward()
        m2.forward()
    }
    if (key.code == '[B') {
        console.log('BACKWARD');
        m1.backward();
        m2.backward();
    }
    if (key.code == '[C') {
        console.log('RIGHT');
        m1.forward();
        m2.backward();
    }
    if (key.code == '[D') {
        console.log('LEFT');
        m1.backward();
        m2.forward();
    }
    if (key.name == 'space') {
        console.log('STOP');
        m1.stop()
        m2.stop()
    }
    //console.log('got "keypress"', key);
    
    if (key && key.ctrl && key.name == 'c') {
        process.stdin.pause();
    }
});

process.stdin.setRawMode(true);
process.stdin.resume();
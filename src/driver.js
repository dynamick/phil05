import Motor from './motor'
const createTimer = require('unitimer');
const EventEmitter = require('events');

class Driver extends EventEmitter {

  constructor(motorPin1, motorPin2, motorPin3, motorPin4) {
    super();
    this._motor1 = new Motor(motorPin1, motorPin2);
    this._motor2 = new Motor(motorPin3, motorPin4);
    this.lock = false;
    this.status = 'stop';
    this.speeds = [];
    this.speed_avg = 1;

    this.off_distance = 1000;
    this.obstacle = 30;
    this.max_distance = 100;

    console.log('Driver stay fine!')
  } // End of constructor

  autopilot() {
    var self = this;
    this.stop()
    this.on('free', () => this.forward());
    this.on('obstacle', () => this.turnright(1500));
    this.on('stall', () => {
      console.log("sono in stallo");
      self.toggle(2000).then(() => {
        self.turnright(3000);
      }, () => {});
    });
  }

  setDistance(dist) {
    if (this.timer) {
      this.timing = this.timer.stop() / 1000; // calcolo al secondo
      this.distance = dist;
      this.speed = (this.last_distance - this.distance) / this.timing;
      if (Math.abs(this.speed) < 30) {
        if (this.speeds.length > 4) {
          this.speeds.shift();
        }
        this.speeds.push(this.speed);
        var speed_sum = this.speeds.reduce(function (a, b) {
          return a + b;
        });
        this.speed_avg = speed_sum / this.speeds.length;
      }

      console.log('dist: ', this.distance.toFixed(2), ' speed: ', this.speed.toFixed(2), ' speed avg: ', this.speed_avg.toFixed(2));
      this.last_distance = this.distance;
    }

    this.check_environment();
    this.timer = createTimer().start();
  }

  check_environment() {
    if (this.distance < this.off_distance) {
      if (this.distance > this.obstacle) {
        if (Math.abs(this.speed_avg) < 1) {
          this.emit('stall');
        } else {
          this.emit('free');
        }
      } else {
        this.emit('obstacle');
      }
    }
  }

  toggle(ms = 1000) {
      if (this.status == 'forward') {
        return this.backward(ms);
      } else {
        return this.forward(ms);
      }
  }

  lockStatus(ms, status, cb) {
    var self = this;
    var promise = new Promise(function (resolve, reject) {
      if (self.lock === false) {
        self.lock = true;
        self.status = status;
        cb();
        console.log(self.status);
        setTimeout(function () {
          self.lock = false;
          resolve();
        }, ms);
      } else {
        reject();
      }
    });
    return promise;
  }

  forward(ms = 1000) {
    var self = this;
    var cb = function () {
      self._motor1.forward()
      self._motor2.forward()
    };
    return self.lockStatus(ms, 'forward', cb);
  }
  backward(ms = 1000) {
    var self = this;
    var cb = function () {
      self._motor1.backward();
      self._motor2.backward();
    }
    return self.lockStatus(ms, 'backward', cb);
  }
  turnright(ms = 1000) {
    var self = this;
    var cb = function() {
        self._motor1.forward()
        self._motor2.backward()
    }
    return self.lockStatus(ms, 'right', cb);
  }
  turnleft(ms = 1000) {
    var self = this;
    var cb = function() {
        self._motor1.backward()
        self._motor2.forward()
    }
    return self.lockStatus(ms, 'left', cb);
  }
  stop() {
    var self = this;
    console.log('stop');
    self._motor1.stop()
    self._motor2.stop()
  }

}

export default Driver
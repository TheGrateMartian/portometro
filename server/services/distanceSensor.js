const { Gpio } = require('pigpio')

const millisecondsPerCm = 1e6/34321;

const trigger = new Gpio(6, {mode: Gpio.OUTPUT});
const echo = new Gpio(13, {mode: Gpio.INPUT, alert: true});
trigger.digitalWrite(0);

function watcher(callback) {
    let startTick;
    echo.once('alert', (level, tick) => {
        if (level === 1) {
            startTick = tick;
        } else {
            console.log("i")
            const diff = (tick >> 0) - (startTick >> 0);
            return callback(diff / 2 / millisecondsPerCm);
        }
    });
}

function activate() {
    trigger.trigger(10, 1);
    watcher(function (err, data){
        console.log(data);
    })
}
activate()
exports.activate = activate;

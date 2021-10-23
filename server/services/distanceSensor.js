const { Gpio } = require('pigpio')

const millisecondsPerCm = 1e6/34321;

const trigger = new Gpio(6, {mode: Gpio.OUTPUT});
const echo = new Gpio(13, {mode: Gpio.INPUT, alert: true});
trigger.digitalWrite(0);

function watcher()
 {
    let startTick;
    echo.on('alert', (level, tick) => {
        if (level === 1) {
            startTick = tick;
        } else {
            console.log("i")
            const diff = (tick >> 0) - (startTick >> 0);
            console.log(diff / 2 / millisecondsPerCm);
        }
    });
}
setInterval(() => {
    trigger.trigger(10, 1); // Set trigger high for 10 microseconds
}, 1000);
function activate() {
    trigger.trigger(10, 1);
}
watcher()
exports.activate = activate;

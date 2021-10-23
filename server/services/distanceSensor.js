const { Gpio } = require('pigpio')
const util = require('util');

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
            const diff = (tick >> 0) - (startTick >> 0);
            return callback(diff / 2 / millisecondsPerCm)
        }
    });
}

async function activate() {
    trigger.trigger(10, 1);
    const r = util.promisify(watcher);
    return (await r())
}
activate().then(r => { console.log(r) });
exports.activate = activate;

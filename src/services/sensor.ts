import {Gpio} from 'pigpio';

const millisecondsPerCm = 1e6/34321;

const trigger = new Gpio(6, {mode: Gpio.OUTPUT});
const echo = new Gpio(13, {mode: Gpio.INPUT, alert: true});

trigger.digitalWrite(0);

function watcher(callback: Function) {
    let startTick: number;

    echo.on('alert', (level: 0 | 1, tick: number) => {
        if (level === 1) {
            startTick = tick;
        } else {
            const diff = (tick >> 0) - (startTick >> 0);
            callback(diff / 2 / millisecondsPerCm);
        }
    });
}

function activate() {
    trigger.trigger(10, 1);
}

export {watcher, activate};

const { Gpio } = require('pigpio')

const millisecondsPerCm = 1e6/34321;

class distanceSensor{

    init(){
        this.trigger = new Gpio(6, {mode: Gpio.OUTPUT});
        this.echo = new Gpio(13, {mode: Gpio.INPUT, alert: true});
        this.trigger.digitalWrite(0);
        this.watcher();
    }

    watcher(){
        let startTick;
        this.echo.on('alert', (level, tick) => {
            if (level === 1) {
                startTick = tick;
            } else {
                const diff = (tick >> 0) - (startTick >> 0);
                this.result = diff / 2 / millisecondsPerCm;
            }
        });
    }

    runner(){
        setInterval(() => {
            this.trigger.trigger(10, 1);
        }, 1000);
    }

}
const ds = new distanceSensor();
ds.init();
exports.distanceSensor = ds;

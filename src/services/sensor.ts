import {delay} from '../util/delay';
import {Gpio} from 'onoff';

const trig = new Gpio(6, 'out');
const echo = new Gpio(13, 'in');
trig.writeSync(0);
async function watcher() {
    await trig.writeSync(1);
    await delay(1);
    await trig.writeSync(0);
    let start = 0;
    let end = 0;
    while (echo.readSync() === 0){
        start = Date.now();
    }
    while (echo.readSync() === 1){
        end = Date.now();
    }
    let duration = Math.round(end - start);
    console.log(duration);
    return duration;
}

export {watcher};

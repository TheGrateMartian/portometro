import GPIO from 'rpi-gpio';
import {delay} from '../util/delay';
import * as util from 'util';

const trig = 6;
const echo = 13;
async function setup() {
    await GPIO.setup(trig, GPIO.DIR_OUT);
    await GPIO.setup(echo, GPIO.DIR_IN);
    await GPIO.output(trig, false);
}

async function watcher() {
    await GPIO.output(trig, true);
    await delay(1);
    await GPIO.output(trig, false);
    let start = 0;
    let end = 0;
    while (await r() === false){
        start = Date.now();
    }
    while (await r() === true){
        end = Date.now();
    }
    let duration = Math.round(end - start);
    console.log(duration);
    return duration;
}
async function r(): Promise<boolean | undefined> {
    const getInput = util.promisify(GPIO.input);
    return await getInput(echo);
}

export {watcher, setup};

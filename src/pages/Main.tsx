import Waiting from '../containers/Waiting';
import Portometro from '../containers/Portometro';
import Analyze from '../containers/Analyze';
import {useEffect, useState} from 'react';
import { delay } from '../util/delay';
import '../css/pages/Main.css';
import { watcher, activate } from '../services/sensor';

function Main(props: any){
    const [state, setState] = useState(false);
    const [sensor, setSensor] = useState(0);
    const [analyze, setAnalyze] = useState(false);

    useEffect(() => {
        async function run(){
            while (!sensor){
                await delay(1000);
                callback(await watcher());
            }
        }

        run().then();
    },[state])
    let first = 0;

    function callback(num: number){
        if (sensor) return;
        if (!first){
            first = num;
            return;
        }
        if (Math.abs(first - num) < 3) {
            let average: number = Math.floor((first + num) / 2);
            if (!analyze) {
                setSensor(average);
            } else {
                setAnalyze(true);
            }
        }
        first = num;
    }
    function reset(){
        setAnalyze(false);
        setSensor(0);
        setState(!state);
    }

    return(
        <div>
            <Waiting classname={`container waiting ${sensor || analyze ? 'hidden' : null}`} />
            {analyze ? <Analyze classname={`container analyze ${sensor ? 'hidden' : null}`}/> : null}
            {sensor ? <Portometro reset={reset} value={sensor} classname="container portometro"/> : null}
        </div>
    );
}
export default Main;

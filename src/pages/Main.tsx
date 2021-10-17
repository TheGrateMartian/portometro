import Waiting from '../containers/Waiting';
import Portometro from '../containers/Portometro';
import Analyze from '../containers/Analyze';
import {useEffect, useState} from 'react';
import { delay } from '../util/delay';
import '../css/pages/Main.css';

function Main(props: any){
    const [state, setState] = useState(false);
    const [sensor, setSensor] = useState(0);
    const [analyze, setAnalyze] = useState(false);

    useEffect(() => {
        const run = async () => {
            setAnalyze(true)
        }
        run().then();
    },[state])

    function reset(){
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

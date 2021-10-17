import ReactSpeedometer from 'react-d3-speedometer';
import React, {useEffect, useState} from 'react';
import {delay} from '../util/delay';


function Meter(props: any) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        async function numbers(){
            await delay(1200);
            for (let i = 0; i < 30; i++) {
                setValue(Math.floor((Math.random() * 10) + 1));
                await delay(250);
            }
            setValue(Math.floor((Math.random() * 5) + 1));
            await delay(1200);
            setValue(isNaN(props.result) ? 7 : props.result);
        }

        numbers().then();
    }, [props.result]);

    return (
        <ReactSpeedometer
            needleTransitionDuration={700}
            minValue={0}
            maxValue={10}
            value={value}
            width={800}
            height={470}
            currentValueText="  "
            customSegmentLabels={[
                {
                    text: "Muy mal",
                    color: "#555",
                },
                {
                    text: "Travieso",
                    color: "#555",
                },
                {
                    text: "Bien",
                    color: "#555",
                },
                {
                    text: "Muy bien",
                    color: "#555",
                },
                {
                    text: "Exelente",
                    color: "#555",
                },
            ]}
        />
    )
}

export default Meter;

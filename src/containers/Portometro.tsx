import React from 'react';

function Portometro(props: any) {
    return (
        <div className={props.classname}>
            <h1>
                Portometro
            </h1>
            <button onClick={() => { props.reset() }}>r</button>
        </div>
    );
}

export default Portometro;

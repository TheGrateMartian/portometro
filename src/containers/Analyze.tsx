import React from 'react';
import '../css/components/Analyze.css';

function Analyze(props: any) {
    return (
        <div className={props.classname}>
            <div className={"box"}>
                <h1>⚠️ ADVERTENCIA ⚠️</h1>
                <h2>Escaneando...</h2>
                <p>¡No te muevas!</p>
            </div>
        </div>
    );
}

export default Analyze;

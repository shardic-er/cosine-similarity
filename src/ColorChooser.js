import {WheelExample} from "./WheelExample";
import React from "react";

function ColorChooser({ color, setColor }){
    return (
        <div className="flex-item" >
            <WheelExample color={color} onColorChange={setColor} />
            <div>
                Red: {color.r}<br />
                Green: {color.g}<br />
                Blue: {color.b}<br />
            </div>
        </div>
    );
}

export default ColorChooser
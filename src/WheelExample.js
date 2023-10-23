import React, { useState } from 'react';
import reactCSS from 'reactcss';
import { Wheel } from "@uiw/react-color";

function WheelExample(props) {
    const initialRgb = props.color || { r: 241, g: 112, b: 19};
    const initialHsv = rgbToHsv(initialRgb.r, initialRgb.g, initialRgb.b);

    const [selectedColor, setSelectedColor] = useState(initialRgb);
    const [selectedHSVColor, setSelectedHSVColor] = useState(initialHsv);
    const [displayColorPicker, setDisplayColorPicker] = useState(true);


    const handleClick = () => {
        setDisplayColorPicker(!displayColorPicker);
    };

    const handleClose = () => {
        // setDisplayColorPicker(false);
    };

    const handleChange = (color) => {
        const rgbColor = hsvToRgb(color.hsv.h / 360, color.hsv.s / 100, 1);
        setSelectedColor(rgbColor);
        setSelectedHSVColor(color.hsv);

        const updatedColor = { ...rgbColor };
        props.onColorChange(updatedColor);
    };

    const styles = reactCSS({
        'default': {
            container: {
                position: 'relative', // Added this
            },
            color: {
                width: '36px',
                height: '14px',
                borderRadius: '2px',
                background: `rgba(${selectedColor.r}, ${selectedColor.g}, ${selectedColor.b}, ${selectedColor.a})`,
            },
            swatch: {
                padding: '5px',
                background: '#fff',
                borderRadius: '1px',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'inline-block',
                cursor: 'pointer',
            },
            popover: {
                position: 'absolute',
                zIndex: '2',
                bottom: '100%',  // Makes it appear above the swatch
                left: '50%',     // Center it horizontally
                transform: 'translateX(-50%)' // Adjust the positioning due to the left: 50% above
            },
            cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
            },
        },
    });


    function rgbToHsv(r, g, b) {
        r = r / 255;
        g = g / 255;
        b = b / 255;

        let max = Math.max(r, g, b);
        let min = Math.min(r, g, b);
        let h, s, v = max;

        let d = max - min;
        s = max === 0 ? 0 : d / max;

        if (max === min) {
            h = 0; // achromatic
        } else {
            if (max === r) {
                h = (g - b) / d + (g < b ? 6 : 0);
            } else if (max === g) {
                h = (b - r) / d + 2;
            } else if (max === b) {
                h = (r - g) / d + 4;
            }
            h /= 6;
        }

        return { h: h * 360, s: s * 100, v: 100 }; // in the format the Wheel component expects
    }

    function hsvToRgb(h, s, v) {
        let r, g, b;
        let i;
        let f, p, q, t;

        if (arguments.length === 1) {
            s = h.s;
            v = h.v;
            h = h.h;
        }

        i = Math.floor(h * 6);
        f = h * 6 - i;
        p = v * (1 - s);
        q = v * (1 - f * s);
        t = v * (1 - (1 - f) * s);

        switch (i % 6) {
            case 0:
                r = v;
                g = t;
                b = p;
                break;
            case 1:
                r = q;
                g = v;
                b = p;
                break;
            case 2:
                r = p;
                g = v;
                b = t;
                break;
            case 3:
                r = p;
                g = q;
                b = v;
                break;
            case 4:
                r = t;
                g = p;
                b = v;
                break;
            case 5:
                r = v;
                g = p;
                b = q;
                break;
        }

        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255)
        };
    }

    return (
        <div >
            {displayColorPicker ? (
                <div style={styles.popover} >
                    <div style={styles.cover} onClick={handleClose} />
                        <div  style={{ margin: '1rem'}}>
                            <Wheel color={selectedHSVColor} onChange={handleChange} style={{border:"solid .25rem", borderRadius:'50%'}}/>
                        </div>
                </div>
            ) : null}
        </div>
    );
}

export { WheelExample };

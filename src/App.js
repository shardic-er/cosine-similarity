import React, {useEffect} from 'react';
import './App.css';
import GradientDiv from "./GradientDiv";
import ColorChooser from "./ColorChooser";
import ThreeDVectorVisualizer2 from "./ThreeDVectorVisualizer2";

function App() {
    const [color1, setColor1] = React.useState({
        r: '241',
        g: '112',
        b: '19',
    });

    const [color2, setColor2] = React.useState({
        r: '255',
        g: '122',
        b: '0',
    });

    const [cosineSimilarity, setCosineSimilarity] = React.useState(0);

    const [theta, setTheta] = React.useState(0);

    const div1Style = {
        background: `rgb(${color1.r}, ${color1.g}, ${color1.b})`,
        borderRadius: "1rem",
        border: "solid 0.25rem",
        minWidth: "10rem"
    }

    const div2Style= {
        background: `rgb(${color2.r}, ${color2.g}, ${color2.b})`,
        borderRadius: "1rem",
        border: "solid 0.25rem",
        minWidth: "10rem"
    }

    const visualizerContainerStyle = {
        width: '250px', // Control the width
        height: '250px', // Control the height
        overflow: 'hidden',  // This ensures the visualizer doesn't exceed its container
    };


    useEffect(()=>{
            const vector1 = colorToVector(color1)
            const vector2 = colorToVector(color2)
            let cs = findCosineSimilarity(vector1, vector2)
            setCosineSimilarity(cs)
            setTheta(Math.acos(cs))
        },
    [color1, color2])

    function findCosineSimilarity(vector1, vector2) {
        // calculate the new cosineSimilarity
        // cos(theta) = (A dot B) / magnitude of A * magnitude of B

        const dotProduct = vectorDotProduct(vector1, vector2)
        const magnitude1 = getMagnitude(vector1)
        const magnitude2 = getMagnitude(vector2)

        return dotProduct / (magnitude1 * magnitude2)
    }

    function colorToVector(color) {
        // const vector = []
        // for (let scalar in color) {
        //     if (color[scalar] != 0){
        //         vector.push(color[scalar])
        //     } else {
        //         vector.push(0.1)
        //     }
        // }
        // return vector;
        return [color.r, color.g, color.b];
    }

    function getMagnitude(vector) {
        let sumOfSquares = 0;
        for (let scalar in vector) {
            sumOfSquares += vector[scalar]*vector[scalar];
        }
        return Math.sqrt(sumOfSquares);
    }

    function vectorDotProduct(vectorA, vectorB) {
        if (vectorA.length != vectorB.length) {
            console.log("Shame on you");
            return;
        }
        let total = 0;
        for (let i = 0; i < vectorA.length; i++) {
            total += vectorA[i] * vectorB[i];
        }
        return total
    }

    return (
        <div className="flex-container">
            <GradientDiv color1={color1} color2={color2} theta={theta} />

            <div style={div1Style}>
                <ColorChooser color={color1} setColor={setColor1} />
            </div>

            {/* Combined container for Cosine Similarity and Visualizer */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {/* Cosine Similarity and Theta div */}
                <div style={{background:"slateblue", borderRadius:"1rem", border:"solid", margin: "10px"}}>
                    <div className="flex-item">
                        Cosine Similarity: {cosineSimilarity.toFixed(3)}
                        <br/>
                        <br/>
                        Theta: {Math.round(theta * (180/Math.PI))}°
                    </div>
                </div>

                {/* Visualizer div */}
                <div style={visualizerContainerStyle}>
                    <ThreeDVectorVisualizer2 color1={color1} color2={color2} initialCameraPosition={{ x: 10, y: 10, z: 10 }} />
                </div>
            </div>

            <div style={div2Style}>
                <ColorChooser color={color2} setColor={setColor2} />
            </div>
        </div>
    );

}

export default App;

function GradientDiv(props) {
    const { color1, color2, theta } = props;

    // Prepare color strings
    const colorStr1 = `rgb(${color1.r}, ${color1.g}, ${color1.b})`;
    const colorStr2 = `rgb(${color2.r}, ${color2.g}, ${color2.b})`;

    // Convert theta from radians to degrees for CSS
    const angleDeg = 360-(theta * (360 / Math.PI));

    // Create linear gradient background style with a rotated axis
    const gradientStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        background: `linear-gradient(${angleDeg}deg, ${colorStr2} 40%, ${colorStr1} 60%)`
    };


    return (
        <div style={gradientStyle}></div>
    );
}

export default GradientDiv
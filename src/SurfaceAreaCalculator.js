class SurfaceAreaCalculator {
    constructor(shapes) {
        this.shapes = shapes;
    }

    calculateTotalSurfaceArea() {
        let totalArea = 0;

        this.shapes.forEach((shape) => {
            if (shape.type === "triangle") {
                // Calculate the surface area for a triangle
                totalArea += (shape.base * shape.height) / 2;
            } else if (shape.type === "rectangle") {
                // Calculate the surface area for a rectangle
                totalArea += shape.width * shape.height;
            } else if (shape.type === "pentagon") {
                // Calculate the surface area for a pentagon
                const sideLength = shape.sideLength;
                totalArea += (5 / 4) * Math.pow(sideLength, 2) * (1 / Math.tan(Math.PI / 5));
            } else if (shape.type === "hexagon") {
                // Calculate the surface area for a hexagon
                const sideLength = shape.sideLength;
                totalArea += (3 * Math.sqrt(3) * Math.pow(sideLength, 2)) / 2;
            } else if (shape.type === "circle") {
                // Calculate the surface area for a circle
                totalArea += Math.PI * Math.pow(shape.radius, 2);
            } else if (shape.type === "ellipse") {
                // Calculate the surface area for an ellipse
                totalArea += Math.PI * shape.semiMajorAxis * shape.semiMinorAxis;
            } else if (shape.type === "star") {
                // Calculate the surface area for a star
                const outerRadius = shape.outerRadius;
                const innerRadius = shape.innerRadius;
                totalArea += (5 / 4) * (Math.pow(outerRadius, 2) - Math.pow(innerRadius, 2)) * Math.tan(Math.PI / 5);
            }
        });

        return totalArea;
    }
}

// Export the SurfaceAreaCalculator class
export default SurfaceAreaCalculator;

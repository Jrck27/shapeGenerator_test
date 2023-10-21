import SurfaceAreaCalculator from "./SurfaceAreaCalculator";

class ShapeManager {
    constructor(app, maskGraphics, shapeIdMap, shapeIdCounter) {
        this.app = app;
        this.maskGraphics = maskGraphics;
        this.shapeIdMap = shapeIdMap;
        this.shapeIdCounter = shapeIdCounter;
        this.shapes = [];
    }

    removeShape(shapeId) {
        // Remove a shape by its ID
        const shape = this.shapeIdMap[shapeId];
        if (shape) {
            const index = this.shapes.indexOf(shape);
            if (index !== -1) {
                this.app.stage.removeChild(shape);
                this.shapes.splice(index, 1);
                delete this.shapeIdMap[shapeId];
            }
        }
    }

    updateShapeCountText() {
        const shapeCountText = document.getElementById("shape-count");
        shapeCountText.textContent = `Shapes Count: ${this.shapes.length}`;
    }

    updateSurfaceAreaText() {
        const surfaceAreaCalculator = new SurfaceAreaCalculator(this.shapes);
        const totalSurfaceArea = surfaceAreaCalculator.calculateTotalSurfaceArea();
        const surfaceAreaText = document.getElementById("surfaceArea");
        surfaceAreaText.textContent = `Surface Area: ${totalSurfaceArea.toFixed(2)} px²`;
    }
}

export default ShapeManager;

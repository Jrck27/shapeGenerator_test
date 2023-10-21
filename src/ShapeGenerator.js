import * as PIXI from "pixi.js";

class ShapeGenerator {
    constructor(app, shapeManager, appWidth, appHeight) {
        this.app = app;
        this.shapeManager = shapeManager;
        this.appWidth = appWidth;
        this.appHeight = appHeight;
        this.generationRate = 1; // Initialize the generation rate
        this.generationInterval = null; // Initialize the interval
    }

    createShapeAtPosition(x, y) {
        this.createRandomShape(x, y);
    }

    createRandomShape(x = Math.random() * this.appWidth, y = -100) {
        const shapeArrayList = ["triangle", "rectangle", "pentagon", "hexagon", "circle", "ellipse", "star"];
        const randomType = Math.floor(Math.random() * shapeArrayList.length);
        const shapeType = shapeArrayList[randomType];
        let shape;
        const color = 0xffffff;

        switch (shapeType) {
            case "triangle": // 3 sides
                shape = new PIXI.Graphics();
                shape.type = "triangle";
                shape.base = 50; // Set the base property for the triangle
                shape.height = 100; // Set the height property for the triangle
                shape.beginFill(Math.random() * color);
                shape.drawPolygon([0, 0, 50, 100, 100, 0]);
                break;
            case "rectangle": // 4 sides
                shape = new PIXI.Graphics();
                shape.type = "rectangle";
                shape.width = 50; // Set the width property for the rectangle
                shape.height = 50; // Set the height property for the rectangle
                shape.beginFill(Math.random() * color);
                shape.drawRect(0, 0, 50, 50);

                break;
            case "pentagon": // 5 sides
                shape = new PIXI.Graphics();
                shape.type = "pentagon";
                shape.sideLength = 60; // Set the sideLength property for the pentagon
                shape.beginFill(Math.random() * color);
                shape.drawPolygon([50, 0, 100, 40, 80, 100, 20, 100, 0, 40]);
                break;
            case "hexagon": // 6 sides
                shape = new PIXI.Graphics();
                shape.beginFill(Math.random() * color);
                shape.sideLength = 50; // Set the side length for the hexagon
                shape.drawPolygon([60, 0, 100, 30, 80, 100, 20, 100, 0, 30, 40, 0]);
                shape.type = "hexagon";
                break;
            case "circle": // Circle
                shape = new PIXI.Graphics();
                shape.beginFill(Math.random() * color);
                shape.drawCircle(0, 0, 30);
                shape.radius = 30;
                shape.type = "circle";
                break;
            case "ellipse": // Ellipse
                shape = new PIXI.Graphics();
                shape.beginFill(Math.random() * color);
                shape.drawEllipse(0, 0, 60, 30);
                shape.type = "ellipse";
                shape.semiMajorAxis = 60; // Set the semi-major axis (a)
                shape.semiMinorAxis = 30; // Set the semi-minor axis (b)
                break;
            case "star": // Star
                shape = new PIXI.Graphics();
                shape.beginFill(Math.random() * color);

                const points = [];
                const starRadius = 25; // Adjust the size of the star
                const innerRadius = 15; // Adjust the inner radius

                for (let i = 0; i < 10; i++) {
                    const angle = (i * Math.PI) / 5;
                    const x = Math.cos(angle) * (i % 2 === 0 ? starRadius : innerRadius);
                    const y = Math.sin(angle) * (i % 2 === 0 ? starRadius : innerRadius);
                    points.push(x, y);
                }
                shape.drawPolygon(points);

                //shape.drawStar(0, 0, 5, 40, 10, 0);
                shape.type = "star";
                shape.outerRadius = 30; // Set the outer radius
                shape.innerRadius = 10; // Set the inner radius
                break;
        }

        if (shape) {
            shape.endFill();

            // Apply the mask to the shape
            shape.mask = this.shapeManager.maskGraphics;

            // Assign a unique ID to the shape
            shape.id = this.shapeManager.shapeIdCounter;
            this.shapeManager.shapeIdMap[shape.id] = shape;
            this.shapeManager.shapeIdCounter++;

            // Add a click event listener to the shape
            shape.interactive = true;
            shape.buttonMode = true;
            shape.on("pointerdown", () => {
                this.shapeManager.removeShape(shape.id);
            });

            shape.x = x;
            shape.y = y;
            this.app.stage.addChild(shape);
            this.shapeManager.shapes.push(shape);


            // Remove the shape when it's finished (e.g., y position is greater than a certain value)
            const finishYPosition = this.appHeight + 50; // Adjust the value as needed
            if (shape.y >= finishYPosition) {
                console.log('alskdjfklajsdklfasdf -- ', shape.id)
                this.shapeManager.removeShape(shape.id);
            }
        }
    }

    createShapesAtRate() {
        clearInterval(this.generationInterval);
        this.generationInterval = setInterval(() => {
            this.createRandomShape();
        }, 1000 / this.generationRate);
    }

    updateGenerationRate(newRate) {
        this.generationRate = newRate;
        // You can call createShapesAtRate to start generating shapes with the new rate
        this.createShapesAtRate();
        document.getElementById("generationRate").textContent = this.generationRate;
    }
}

export default ShapeGenerator;

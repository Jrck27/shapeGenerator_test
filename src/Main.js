import * as PIXI from "pixi.js";
import ShapeManager from "./ShapeManager";
import ShapeGenerator from "./ShapeGenerator";
import GravityManager from "./GravityManager";
import SurfaceAreaCalculator from "./SurfaceAreaCalculator";

class App {
    constructor() {
        this.appWidth = 800;
        this.appHeight = 600;
        this.app = new PIXI.Application({
            width: this.appWidth,
            height: this.appHeight,
            view: document.getElementById("app"),
            backgroundColor: 0xffffff, // Background color
            antialias: true, // Optional: enable antialiasing
        });

        this.maskGraphics = new PIXI.Graphics();
        this.maskGraphics.beginFill(0xffffff);
        this.maskGraphics.drawRect(0, 0, this.appWidth, this.appHeight);
        this.maskGraphics.endFill();
        this.app.stage.addChild(this.maskGraphics);

        this.shapeIdMap = {}; // Define shapeIdMap
        this.shapeIdCounter = 1; // Define shapeIdCounter

        this.shapeManager = new ShapeManager(this.app, this.maskGraphics, this.shapeIdMap, this.shapeIdCounter);
        this.shapeGenerator = new ShapeGenerator(this.app, this.shapeManager, this.appWidth, this.appHeight);
        this.gravityManager = new GravityManager(this.app, this.shapeManager.shapes);
        this.surfaceAreaCalculator = new SurfaceAreaCalculator(this.shapeManager.shapes);

        // Start generating shapes
        this.shapeGenerator.createShapesAtRate();

        const hitArea = new PIXI.Graphics();
        hitArea.beginFill(0xe5e4e2, 1); // Transparent fill
        hitArea.drawRect(0, 0, this.appWidth, this.appHeight); // Use the canvas size
        hitArea.endFill();
        this.app.stage.addChild(hitArea);

        // Event listener for mouse clicks on the hit area
        hitArea.interactive = true;
        hitArea.buttonMode = true;
        hitArea.on("pointerdown", (event) => {
            const clickX = event.global.x;
            const clickY = event.global.y;

            this.shapeManager.updateShapeCountText();

            // Create a shape at the click position
            this.shapeGenerator.createShapeAtPosition(clickX, clickY);
        });

        // Event listener for increasing gravity
        document.getElementById("increaseGravity").addEventListener("click", () => {
            this.gravityManager.updateGravity(this.gravityManager.gravity + 1);
        });

        // Event listener for decreasing gravity
        document.getElementById("decreaseGravity").addEventListener("click", () => {
            if (this.gravityManager.gravity > 1) {
                // Ensure gravity remains greater than 0
                this.gravityManager.updateGravity(this.gravityManager.gravity - 1);
            }
        });

        // Event listener for the "+" button
        document.getElementById("increaseButton").addEventListener("click", () => {
            this.shapeGenerator.updateGenerationRate(this.shapeGenerator.generationRate + 1);
        });

        // Event listener for the "-" button
        document.getElementById("decreaseButton").addEventListener("click", () => {
            if (this.shapeGenerator.generationRate > 1) {
                this.shapeGenerator.updateGenerationRate(this.shapeGenerator.generationRate - 1);
            }
        });

        // Animation loop
        this.app.ticker.add((delta) => {
            const appHeight = this.appHeight;

            for (let i = this.shapeManager.shapes.length - 1; i >= 0; i--) {
                const shape = this.shapeManager.shapes[i];
                shape.y += this.gravityManager.gravity * delta;

                if (shape.y >= appHeight + 50) {
                    // Shape has completed its animation, remove it
                    this.shapeManager.removeShape(shape.id);
                }
            }

            this.shapeManager.updateShapeCountText();
            this.shapeManager.updateSurfaceAreaText();
        });
    }
}

const appInstance = new App();

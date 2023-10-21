class GravityManager {
    constructor(app, shapes) {
        this.app = app;
        this.shapes = shapes;
        this.gravity = 1;
    }

    updateGravity(newValue) {
        this.gravity = newValue;
        document.getElementById("gravityValue").textContent = this.gravity;
    }
}

// Export the GravityManager class
export default GravityManager;

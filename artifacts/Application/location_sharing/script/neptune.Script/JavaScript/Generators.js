// Used to generate the cordinates. This can be anything etc streaming data

class CoordinateGenerator {
    constructor({ startX, endX, slope, intercept, userId }) {
        this.userId = userId;
        this.START_X = startX;
        this.END_X = endX;
        this.SLOPE = slope;
        this.INTERCEPT = intercept;
        this.STEPS = 25;
        this.step = (this.END_X - this.START_X) / (this.STEPS - 1);
        this.currentIndex = 0;
    }

    calculateY(x) {
        return this.SLOPE * x + this.INTERCEPT;
    }

    getNextCoordinate() {
        const x = this.START_X + this.step * this.currentIndex;
        const y = this.calculateY(x);

        this.currentIndex = (this.currentIndex + 1) % this.STEPS;

        return {
            latitude: Number(x.toFixed(6)),
            longitude: Number(y.toFixed(6)),
            timestamp: new Date().toISOString(),
        };
    }
}

class PerimeterGenerator {
    constructor({ points, userId }) {
        this.userId = userId;
        this.points = points;
        this.STEPS_PER_SIDE = 8;
        this.TOTAL_STEPS = this.STEPS_PER_SIDE * 4;
        this.currentIndex = 0;
    }

    interpolatePoints(p1, p2, fraction) {
        return {
            x: p1.x + (p2.x - p1.x) * fraction,
            y: p1.y + (p2.y - p1.y) * fraction
        };
    }

    getCurrentSideIndex() {
        return Math.floor(this.currentIndex / this.STEPS_PER_SIDE);
    }

    getCurrentSideProgress() {
        return (this.currentIndex % this.STEPS_PER_SIDE) / this.STEPS_PER_SIDE;
    }

    getNextCoordinate() {
        const sideIndex = this.getCurrentSideIndex();
        const progress = this.getCurrentSideProgress();

        const startPoint = this.points[sideIndex];
        const endPoint = this.points[(sideIndex + 1) % 4];

        const currentPoint = this.interpolatePoints(startPoint, endPoint, progress);

        this.currentIndex = (this.currentIndex + 1) % this.TOTAL_STEPS;

        return {
            latitude: Number(currentPoint.x.toFixed(6)),
            longitude: Number(currentPoint.y.toFixed(6)),
            timestamp: new Date().toISOString(),
        };
    }

    getPerimeterLength() {
        let length = 0;
        for (let i = 0; i < 4; i++) {
            const p1 = this.points[i];
            const p2 = this.points[(i + 1) % 4];
            length += Math.sqrt(
                Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)
            );
        }
        return length;
    }
}
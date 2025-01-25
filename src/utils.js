function getRandomValue(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function doSomeHeavyTask() {
    const ms = getRandomValue([100, 150, 200, 250, 300, 600, 1000, 1500, 2000, 1400, 2200, 3000]);
    const shouldThrowError = getRandomValue([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) === 8;
    
    if (shouldThrowError) {
        const randomError = getRandomValue([
            "Error1",
            "Error2",
            "Error3",
            "Error4",
            "Error5",
        ]);
        throw new Error(randomError);
    }
    
    return new Promise((resolve, reject) => setTimeout(() => resolve(ms), ms));
}

// Simulates CPU-intensive task
function simulateCPULoad(duration = 100) {
    const start = Date.now();
    while (Date.now() - start < duration) {
        Math.random() * Math.random();
    }
}

module.exports = { 
    doSomeHeavyTask,
    getRandomValue,
    simulateCPULoad
};
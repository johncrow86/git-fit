// Get a list of exercises that match the input split, then select a subset of those exercises to comprise the workout.
async function getExercises (split) {
    try {
        // Retrieve the list of exercises by split.
        const response = await fetch(`http://localhost:5000/api/v1/exercises/${split}`, {
            credentials: 'include'
        });
        const jsonData = await response.json();
        const results = jsonData.data.exercises;

        // Filter each zone into a seperate array.
        const zone1 = results.filter(exercise => exercise.zone === "1");
        const zone2 = results.filter(exercise => exercise.zone === "2");
        const zone3 = results.filter(exercise => exercise.zone === "3");

        // Create the workout and assign 5 exercises to it.
        // Each exercise will select a random index within the zone, add that exercise to the workout, then remove it from the remaining results.
        const workout = []
        
        // Exercise 1
        const randomIndex1 = Math.floor(Math.random() * zone1.length);
        workout.push(zone1[randomIndex1]);
        zone1.splice(randomIndex1, 1)

        // Exercise 2
        const randomIndex2 = Math.floor(Math.random() * zone2.length);
        workout.push(zone2[randomIndex2]);
        zone2.splice(randomIndex2, 1)

        // Exercise 3
        const randomIndex3 = Math.floor(Math.random() * zone3.length);
        workout.push(zone3[randomIndex3]);
        zone3.splice(randomIndex3, 1)

        // Exercise 4
        // randomSelect4 will randomly choose zone 1 or 2.
        const randomSelect4 = Math.floor(Math.random() * 2 + 1);
        if (randomSelect4 === 1) {
            const randomIndex4 = Math.floor(Math.random() * zone1.length);
            workout.push(zone1[randomIndex4]);
            zone1.splice(randomIndex4, 1);
        }
        else {
            const randomIndex4 = Math.floor(Math.random() * zone2.length);
            workout.push(zone2[randomIndex4]);
            zone2.splice(randomIndex4, 1);
        }

        // Exercise 5
        // randomSelect5 will randomly choose zone 1, 2 or 3.
        let randomSelect5;
        // If randomSelect4 is zone 1, randomSelect5 will be zone 2 or 3.
        if (randomSelect4 === 1) randomSelect5 = Math.floor(Math.random() * 2 + 2);
        // If randomSelect4 is zone 2, randomSelect5 will be zone 1 or 2. If randomSelect5 is zone 2, it will be set to zone 3.
        else if (randomSelect4 === 2) {
            randomSelect5 = Math.floor(Math.random() * 2 + 1);
            if (randomSelect5 === 2) randomSelect5 = 3;
        }
        
        if (randomSelect5 === 1) {
            const randomIndex5 = Math.floor(Math.random() * zone1.length);
            workout.push(zone1[randomIndex5]);
            zone1.splice(randomIndex5, 1);
        }
        else if (randomSelect5 === 2) {
            const randomIndex5 = Math.floor(Math.random() * zone2.length);
            workout.push(zone2[randomIndex5]);
            zone2.splice(randomIndex5, 1);
        }
        else {
            const randomIndex5 = Math.floor(Math.random() * zone3.length);
            workout.push(zone3[randomIndex5]);
            zone3.splice(randomIndex5, 1);
        }

        return workout;
    } catch (err) {
        console.error(err)
    }
}

module.exports = { getExercises };

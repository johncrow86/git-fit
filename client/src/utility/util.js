
// Get a single exercise from the subset of exercises that meet the split and zone params
async function getExercise(split, zone) {
    // Retrieve the subset
    const exercise = await fetch(`http://localhost:5000/exercises/${split}/${zone}`)
        .then(response => {
            if (response.ok) return response.json();
            else throw new Error('Request Failed!');
        }, networkError => console.log(networkError.message))
        .then(jsonResponse => {
            // Select a single exercise from the subset
            const random = Math.floor(Math.random() * jsonResponse.length);
            return jsonResponse[random];
        });

    return exercise;
}

module.exports = { getExercise };

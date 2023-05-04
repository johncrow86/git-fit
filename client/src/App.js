import React, { Fragment, useEffect, useState } from 'react';
import './App.css';
import { getExercise } from './utility/util';
import OptionBar from './components/OptionBar';
import WorkoutDisplay from './components/WorkoutDisplay';
import ActionBar from './components/ActionBar';
import JournalDisplay from './components/JournalDisplay';


function App() {
    const [split, setSplit] = useState('Pull');
    const [repRange, setRepRange] = useState('High');
    const [workoutList, setWorkoutList] = useState([
        {name: "Exercise 1"},
        {name: "Exercise 2"},
        {name: "Exercise 3"},
        {name: "Exercise 4"},
        {name: "Exercise 5"}
    ]);
    const [journal, setJournal] = useState([]);
    const [showJournal, setShowJournal] = useState(false);

    // Populate the journal on load
    useEffect(() => {
        getJournal();
    },[]);

    
    // populateWorkoutList will house the exercise protocol logic
    async function populateWorkoutList(split) {

        // We are making seperate API calls to allow for absolute flexibility for selecting exercises
        const exercise1 = await getExercise(split, 1);
        const exercise2 = await getExercise(split, 2);
        const exercise3 = await getExercise(split, 3);
        // Set a random zone for exercise 4 between 1-2
        const random4 = Math.ceil(Math.random() * 2);
        const exercise4 = await getExercise(split, random4);
        // If exercise 4 was zone 2, then exercise 5 must be zone 3, else exercise 5 can be zone 2 or 3
        const random5 = random4 === 2 ? 3 : Math.ceil(Math.random() * 2 + 1);
        const exercise5 = await getExercise(split, random5);

        // Set the state
        setWorkoutList([exercise1, exercise2, exercise3, exercise4, exercise5]);
    }

    // Used to load/reload the journal after database updates
    async function getJournal() {
        const journal = await fetch(`http://localhost:5000/journal`)
            .then(response => {
                if (response.ok) return response.json();
                else throw new Error('Request Failed!');
            }, networkError => console.log(networkError.message))
            .then(jsonResponse => jsonResponse);

        setJournal(journal);
    }

    // Toggle Journal display
    function toggleJournalDisplay() {
        if (showJournal) setShowJournal(false);
        else setShowJournal(true);
    }
    
    return (
        <Fragment>
        <div id="top-space" style={{ height: "200px"}}></div>

        <div className="container" style={{ border: "3px solid black"}}>
            <div className="row bg-dark">
                <OptionBar setSplit={setSplit} setRepRange={setRepRange}/>
            </div>

            <div className="row bg-dark">
                <WorkoutDisplay workoutList={workoutList} repRange={repRange} />
            </div>

            <div className="row  bg-dark">
                <ActionBar
                    split={split}
                    repRange={repRange}
                    populateWorkoutList={populateWorkoutList}
                    toggleJournalDisplay={toggleJournalDisplay}
                    showJournal={showJournal}
                    getJournal={getJournal}
                    workoutList={workoutList}
                />
            </div>

            <div className="row bg-dark">
                {showJournal && <JournalDisplay journal={journal} getJournal={getJournal} />}
            </div>
        </div>
        </Fragment>
    );
}

export default App;

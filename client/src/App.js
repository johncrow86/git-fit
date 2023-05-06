// Imports
import React, { Fragment, useEffect, useState } from 'react';
import { getExercises } from './utility/util';
import OptionBar from './components/OptionBar';
import WorkoutDisplay from './components/WorkoutDisplay';
import ActionBar from './components/ActionBar';
import JournalDisplay from './components/JournalDisplay';

// Main App
function App() {
    // State Variables
    const [split, setSplit] = useState('Push');
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

    
    // Populate the workout list
    async function populateWorkoutList(split) {
        const workoutList = await getExercises(split);
        setWorkoutList(workoutList);
    }

    // Used to load/reload the journal
    async function getJournal() {
        const journal = await fetch(`http://localhost:5000/api/v1/journal`)
            .then(response => {
                if (response.ok) return response.json();
                else throw new Error('Request Failed!');
            }, networkError => console.log(networkError.message))
            .then(jsonResponse => jsonResponse.data.journal);

        setJournal(journal);
    }

    // Toggle journal display
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

import React, { Fragment, useState, useContext } from "react"
import OptionBar from '../components/HomePage/OptionBar';
import WorkoutDisplay from '../components/HomePage/WorkoutDisplay';
import ActionBar from '../components/HomePage/ActionBar';
import JournalDisplay from '../components/HomePage/JournalDisplay';
import { getExercises } from '../utility/exerciseAPI';
import { JournalContext } from "../context/JournalContext";

function Home() {
    // State Variables
    const { showJournal, setShowJournal } = useContext(JournalContext);
    const [ split, setSplit ] = useState('Push');
    const [ repRange, setRepRange ] = useState('High');
    const [ workoutList, setWorkoutList ] = useState([
        {name: "Exercise 1"},
        {name: "Exercise 2"},
        {name: "Exercise 3"},
        {name: "Exercise 4"},
        {name: "Exercise 5"}
    ]);

    // Populate the workout list
    async function populateWorkoutList(split) {
        const workoutList = await getExercises(split);
        setWorkoutList(workoutList);
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
                    <OptionBar
                        split={split}
                        setSplit={setSplit}
                        repRange={repRange}
                        setRepRange={setRepRange}
                    />
                </div>
                <div className="row bg-dark">
                    <WorkoutDisplay workoutList={workoutList} repRange={repRange} />
                </div>
                <div className="row bg-dark">
                    <ActionBar
                        split={split}
                        repRange={repRange}
                        populateWorkoutList={populateWorkoutList}
                        toggleJournalDisplay={toggleJournalDisplay}
                        showJournal={showJournal}
                        workoutList={workoutList}
                    />
                </div>
                <div className="row bg-dark">
                    {showJournal && <JournalDisplay />}
                </div>
            </div>
        </Fragment>
    )
}

export default Home;

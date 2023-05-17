import React, { Fragment, useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom";
// Components
import OptionBar from '../components/HomePage/OptionBar';
import WorkoutDisplay from '../components/HomePage/WorkoutDisplay';
import ActionBar from '../components/HomePage/ActionBar';
import JournalDisplay from '../components/HomePage/JournalDisplay';
// Context
import { JournalContext } from "../context/JournalContext";
import { UserContext } from "../context/UserContext";
// Utility
import { getExercises } from '../utility/exerciseAPI';

function Home() {
    const [ split, setSplit ] = useState('Push');
    const [ repRange, setRepRange ] = useState('High');
    const [ workoutList, setWorkoutList ] = useState([
        {name: "Exercise 1"},
        {name: "Exercise 2"},
        {name: "Exercise 3"},
        {name: "Exercise 4"},
        {name: "Exercise 5"}
    ]);
    const { showJournal, setShowJournal } = useContext(JournalContext);
    const { authenticated, setAuthenticated, logout } = useContext(UserContext);
    const navigate = useNavigate();

    // Redirect if not authenticated
    useEffect(() => {
        if (!authenticated) navigate('/login');
    },[authenticated])

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

    function handleLogout() {
        logout();
        setAuthenticated(false);
        navigate('/login');
    }
    
    return (
        <Fragment>
            <div id="top-space" style={{ height: "200px"}}></div>
            <button type="button" className="btn btn-danger" onClick={handleLogout}>Log Out</button>
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

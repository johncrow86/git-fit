import React, { Fragment } from "react";

function ActionBar ({ setSplit, setRepRange }) {
    return (
        <Fragment>
        {/* Setting classname=col on the top div but not the bottom div floats the bottom div right */}
        <div className="col">
            <div>
                <label className="text-white ml-5">Select Split</label>
            </div>
            <div className="btn-group btn-group-toggle my-3 ml-2" role="group">
                <button
                    type="radio"
                    className="btn btn-secondary"
                    onClick={()=>setSplit("Push")}>
                    Push
                </button>
                <button
                    type="radio"
                    className="btn btn-secondary"
                    onClick={()=>setSplit("Pull")}>
                    Pull
                </button>
                <button
                    type="radio"
                    className="btn btn-secondary"
                    onClick={()=>setSplit("Legs")}>
                    Legs
                </button>
            </div>
        </div>

        <div>
            <div>
                <label className="text-white">Select Rep Range</label>
            </div>
            <div className="btn-group my-3 mr-5" role="group">
                <button
                    type="radio"
                    className="btn btn-secondary"
                    onClick={()=>setRepRange("High")}>
                    High
                </button>
                <button 
                    type="radio"
                    className="btn btn-secondary"
                    onClick={()=>setRepRange("Low")}>
                    Low
                </button>
            </div>
        </div>
        </Fragment>
    )
}

export default ActionBar;

import React, { Fragment } from "react";

function ActionBar ({ split, setSplit, repRange, setRepRange }) {

  const handleSplitClick = (split) => {
    setSplit(split);
  };

  const handleRepRangeClick = (range) => {
    setRepRange(range);
  };

  return (
    <Fragment>
      <div className="col">
        <div>
          <label className="text-white ml-5">Select Split</label>
        </div>
        <div className="btn-group btn-group-toggle my-3 ml-2" role="group">
          <button
            type="button"
            className={`btn btn-secondary ${split === "Push" ? "active" : ""}`}
            onClick={() => handleSplitClick("Push")}
          >
            Push
          </button>
          <button
            type="button"
            className={`btn btn-secondary ${split === "Pull" ? "active" : ""}`}
            onClick={() => handleSplitClick("Pull")}
          >
            Pull
          </button>
          <button
            type="button"
            className={`btn btn-secondary ${split === "Legs" ? "active" : ""}`}
            onClick={() => handleSplitClick("Legs")}
          >
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
            type="button"
            className={`btn btn-secondary ${repRange === "High" ? "active" : ""}`}
            onClick={() => handleRepRangeClick("High")}
          >
            High
          </button>
          <button
            type="button"
            className={`btn btn-secondary ${repRange === "Low" ? "active" : ""}`}
            onClick={() => handleRepRangeClick("Low")}
          >
            Low
          </button>
        </div>
      </div>
    </Fragment>
  );
}

export default ActionBar;

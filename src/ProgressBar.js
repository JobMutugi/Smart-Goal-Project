import React from 'react';

function ProgressBar({ percentage }) {
  return (
    <div className="progress-container">
      <div 
        className="progress-bar"
        style={{ width: `${Math.min(100, percentage)}%` }}
      >
        {Math.round(percentage)}%
      </div>
    </div>
  );
}

export default ProgressBar;
// src/components/DashboardStatistics.jsx
import React from 'react';

function DashboardStatistics({ stats }) {
    return (
        <div className="dashboard-statistics">
            <h3>Statistics</h3>
            <ul>
                {Object.keys(stats).map((key, index) => (
                    <li key={index}>
                        {key}: {stats[key]}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DashboardStatistics;

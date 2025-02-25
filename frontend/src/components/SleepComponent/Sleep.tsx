import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import '../../css_files/Sleep.css';

const Sleep = () => {
    const [sleepHours, setSleepHours] = useState(6);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const goal = 12;

    useEffect(() => {
        const savedData = localStorage.getItem(selectedDate);
        if (savedData) {
            setSleepHours(Number(savedData));
        }
    }, [selectedDate]);

    const percentage = (sleepHours / goal) * 100;

    const changeSleepHours = (e) => {
        const hours = e.target.value;
        setSleepHours(hours);
        localStorage.setItem(selectedDate, hours);
    };

    const changeDate = (e) => {
        setSelectedDate(e.target.value);
    };

    return (
        <div className="main">
            <h1 className="text-xl font-bold mb-4 text-center">Sleep Tracker</h1>

            {/* Date Picker */}
            <input
                type="date"
                value={selectedDate}
                onChange={changeDate}
                className="mb-4 p-2 rounded text-black w-full"
            />

            {/* Sleep Bar */}
            <div className="sleep-progress-container">
                <motion.div
                    className="sleep-progress-bar"
                    initial={{ height: "0%" }}
                    animate={{ height: `${percentage}%` }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                />
                <motion.div
                    className="sleep-progress-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                >
                    {sleepHours} hrs / {goal} hrs
                </motion.div>
            </div>

            {/* Range Slider */}
            <input
                type="range"
                min="0"
                max="12"
                step="0.5"
                value={sleepHours}
                onChange={changeSleepHours}
                className="sleep-slider"
            />

            <p className="sleep-slider-label">Adjust your sleep hours</p>
        </div>
    );
};

export default Sleep;

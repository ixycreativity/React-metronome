import React, { useState, useRef, useEffect } from "react";
import "./Metronome.css";
import click1 from "../../assets/click1.wav";
import click2 from "../../assets/click2.wav";

const Metronome = () => {
  const [bpm, setBpm] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [count, setCount] = useState(0);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);

  const sound1 = new Audio(click1);
  const sound2 = new Audio(click2);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        sound1.play();
      }
    }, (60 / bpm) * 1000);
    return () => {
      clearInterval(interval);
    };
  }, [isPlaying, bpm]);

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
    // const myInterval = setInterval(() => {
    //   sound1.play();
    // }, (60 / bpm) * 1000);
    // if (!isPlaying) {
    //   //myInterval();
    //   clearInterval(myInterval);
    // } else {
    // }
  };

  const handleBpmChange = (e) => {
    setBpm(e.target.value);
  };

  return (
    <div className="metronome">
      <h1>Metronome</h1>
      <div className="bpm-range">
        <p>{bpm}BPM</p>
        <input
          type="range"
          min="6"
          max="240"
          value={bpm}
          className="range-input"
          onChange={handleBpmChange}
        />
      </div>
      <button className="start-stop" onClick={handleTogglePlay}>
        {isPlaying ? "STOP" : "START"}
      </button>
    </div>
  );
};

export default Metronome;

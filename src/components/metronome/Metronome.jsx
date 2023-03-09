import React, { useState, useRef, useEffect } from "react";
import "./Metronome.css";
import click1 from "../../assets/click1.wav";
import click2 from "../../assets/click2.wav";

const Metronome = () => {
  const [bpm, setBpm] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [countPlays, setCountPlays] = useState(0);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
  const counterRef = useRef();

  const sound1 = new Audio(click1);
  const sound2 = new Audio(click2);

  useEffect(() => {
    counterRef.current = countPlays;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCountPlays(counterRef.current + 1);
      if (isPlaying) {
        if (counterRef.current % beatsPerMeasure === 0) {
          sound2.play();
        } else {
          sound1.play();
        }
      }
    }, (60 / bpm) * 1000);
    return () => {
      clearInterval(interval);
    };
  }, [isPlaying, bpm, beatsPerMeasure]);

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleBpmChange = (e) => {
    setBpm(e.target.value);
  };

  const handleBeatsPerMeasureDecrease = () => {
    if (beatsPerMeasure >= 2) {
      setBeatsPerMeasure(beatsPerMeasure - 1);
    }
  };
  const handleBeatsPerMeasureIncrease = () => {
    setBeatsPerMeasure(beatsPerMeasure + 1);
  };

  return (
    <div className="metronome">
      <h1>Metronome</h1>
      <button onClick={handleBeatsPerMeasureDecrease}>-</button>
      <input type="text" value={beatsPerMeasure} />
      <button onClick={handleBeatsPerMeasureIncrease}>+</button>
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

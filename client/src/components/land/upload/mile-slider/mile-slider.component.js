import React from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import "./mile-slider.scss";

export default function MileSlider(props) {
  const marks = [
    { value: 5, label: "5" },
    { value: 10, label: "10" },
    { value: 15, label: "15" },
    { value: 20, label: "20" },
    { value: 25, label: "25" },
    { value: 30, label: "30" },
    { value: 35, label: "35" },
    { value: 40, label: "40" },
  ];
  const updateMileage = (e, value) => {
    props.onChangeMileage(value);
  };
  return (
    <div className="mile-slider-component">
      <Slider
        defaultValue={40}
        aria-labelledby="discrete-slider-always"
        step={5}
        min={5}
        max={40}
        onChange={updateMileage}
        marks={marks}
        valueLabelDisplay="on"
      />
      <Typography id="discrete-slider-always" gutterBottom>
        Mileage Radius
      </Typography>
    </div>
  );
}

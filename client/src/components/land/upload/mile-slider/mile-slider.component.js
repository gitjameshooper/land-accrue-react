import React from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import "./mile-slider.scss";

export default function MileSlider(props) {
  const marks = [
    { value: 2, label: "2" },
    { value: 4, label: "4" },
    { value: 6, label: "6" },
    { value: 8, label: "8" },
    { value: 10, label: "10" },
    { value: 12, label: "12" },
    { value: 14, label: "14" },
    { value: 16, label: "16" },
    { value: 18, label: "18" },
    { value: 20, label: "20" },
  ];
  const updateMileage = (e, value) => {
    props.onChangeMileage(value);
  };
  return (
    <div className="mile-slider-component">
      <Slider
        defaultValue={8}
        aria-labelledby="discrete-slider-always"
        step={1}
        min={1}
        max={20}
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

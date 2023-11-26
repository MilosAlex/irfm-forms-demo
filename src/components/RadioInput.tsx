import React from "react";
import "../styles/radio-input.css";

interface RadioInputProps {
  id: string;
  label: string;
  value: string;
  checked: boolean;
  disabled: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioInput = (props: RadioInputProps) => {
  return (
    <div
      className={`radio-input${props.disabled ? " radio-input--disabled" : " "}`}
    >
      <label className="radio-input__label" htmlFor={props.id}>
        {props.label}
      </label>
      <input
        className="radio-input__input"
        type="radio"
        value={props.value}
        onChange={props.onChange}
        checked={props.checked}
        disabled={props.disabled}
        id={props.id}
      />
    </div>
  );
};

export default RadioInput;

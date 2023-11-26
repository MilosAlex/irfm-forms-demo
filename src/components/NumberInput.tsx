import React from "react";
import "../styles/number-input.css";

interface NumberInputProps {
  id: string;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const NumberInput = (props: NumberInputProps) => {
  return (
    <div className="number-input">
      <input
        className="number-input__input"
        type="number"
        id={props.id}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};

export default NumberInput;

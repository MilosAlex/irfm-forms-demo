import { useState } from "react";

type Size = "S" | "M" | "L" | "XL";

type SMPackaging = "envelope" | "cardboard-box";
type LPackaging = "cardboard-box" | "wooden-box";
type XLPackaging = "wooden-box" | "pallet";
type Packaging = SMPackaging | LPackaging | XLPackaging;

export interface MachineFunctions {
  setSize: (size: Size) => void;
  setWeight: (weight: number) => void;
  setPackaging: (packaging: Packaging) => void;
  getSize: () => Size;
  getWeight: () => number;
  getPackaging: () => Packaging;
  isPackagingValid: (packaging?: Packaging) => boolean;
  isWeightValid: () => boolean;
}

const config = {
  initialState: {
    size: "S" as Size,
    weight: 0,
    packaging: "envelope" as Packaging,
  },
  states: {
    S: {
      weight: {
        min: 1,
        max: 20,
      },
      packaging: ["envelope", "cardboard-box"],
    },
    M: {
      weight: {
        min: 1,
        max: 31.5,
      },
      packaging: ["envelope", "cardboard-box"],
    },
    L: {
      weight: {
        min: 1,
        max: 1000,
      },
      packaging: ["cardboard-box", "wooden-box"],
    },
    XL: {
      weight: {
        min: 1,
        max: 1000,
      },
      packaging: ["wooden-box", "pallet"],
    },
  },
};

export const Machine = () => {
  const [state, setState] = useState(config.initialState);

  const isPackagingValid = (packaging = state.packaging) => {
    const size = state.size;
    return config.states[size].packaging.includes(packaging);
  };

  const isWeightValid = () => {
    const weight = state.weight;
    const size = state.size;
    return (
      weight >= config.states[size].weight.min &&
      weight <= config.states[size].weight.max
    );
  };

  // setters

  const setSize = (size: Size) => {
    setState({
      ...state,
      size,
    });
  };

  const setWeight = (weight: number) => {
    setState({
      ...state,
      weight,
    });
  };

  const setPackaging = (packaging: Packaging) => {
    setState({
      ...state,
      packaging,
    });
  };

  // getters

  const getSize = () => {
    return state.size;
  };

  const getWeight = () => {
    return state.weight;
  };

  const getPackaging = () => {
    return state.packaging;
  };

  return {
    setSize,
    setWeight,
    setPackaging,
    getSize,
    getWeight,
    getPackaging,
    isPackagingValid,
    isWeightValid,
  };
};

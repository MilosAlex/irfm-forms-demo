import { useState } from "react";
import "../styles/original-form.css";
import RadioInput from "../components/RadioInput";
import NumberInput from "../components/NumberInput";

type Size = "S" | "M" | "L" | "XL";

type SMPackaging = "envelope" | "cardboard-box";
type LPackaging = "cardboard-box" | "wooden-box";
type XLPackaging = "wooden-box" | "pallet";
type Packaging = SMPackaging | LPackaging | XLPackaging;

const SM_PACKAGING: Packaging[] = ["envelope", "cardboard-box"];
const L_PACKAGING: Packaging[] = ["cardboard-box", "wooden-box"];
const XL_PACKAGING: Packaging[] = ["wooden-box", "pallet"];

interface FormParams {
  size: Size;
  weight: number;
  packaging: Packaging;
}

const OriginalForm = () => {
  const [size, setSize] = useState<Size>("S");
  const [weight, setWeight] = useState<FormParams["weight"]>(0);
  const [packaging, setPackaging] = useState<FormParams["packaging"]>("envelope");

  const [weightError, setWeightError] = useState<boolean>(true);
  const [packagingError, setPackagingError] = useState<boolean>(false);

  const onSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = event.target.value as Size;
    setSize(newSize);
    packagingErrorCheck(packaging, newSize);
    weightErrorCheck(weight, newSize);
  };

  const onWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newWeight = Number(event.target.value);
    setWeight(newWeight);
    weightErrorCheck(newWeight, size);
  };

  const onPackagingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPackaging = event.target.value as Packaging;
    setPackaging(newPackaging);
    packagingErrorCheck(newPackaging, size);
  };

  const weightErrorCheck = (newWeight: number, newSize: Size) => {
    if (newWeight === 0) {
      setWeightError(true);
    } else if (newSize === "S" && newWeight > 20) {
      setWeightError(true);
    } else if (newSize === "M" && newWeight > 31.5) {
      setWeightError(true);
    } else if (newSize === "L" && newWeight > 1000) {
      setWeightError(true);
    } else if (newSize === "XL" && newWeight > 1000) {
      setWeightError(true);
    } else {
      setWeightError(false);
    }
  };

  const packagingErrorCheck = (newPackaging: Packaging, newSize: Size) => {
    if (
      (newSize === "S" || newSize === "M") &&
      !SM_PACKAGING.includes(newPackaging)
    ) {
      setPackagingError(true);
    } else if (newSize === "L" && !L_PACKAGING.includes(newPackaging)) {
      setPackagingError(true);
    } else if (newSize === "XL" && !XL_PACKAGING.includes(newPackaging)) {
      setPackagingError(true);
    } else {
      setPackagingError(false);
    }
    // ALTERNATIVE:
    /* if (
      (newSize === "S" || newSize === "M") &&
      !SM_PACKAGING.includes(newPackaging)
    ) {
      setPackaging("envelope");
    }
    if (newSize === "L" && !L_PACKAGING.includes(newPackaging)) {
      setPackaging("cardboard-box");
    }
    if (newSize === "XL" && !XL_PACKAGING.includes(newPackaging)) {
      setPackaging("wooden-box");
    } */
  }

  return (
    <div className="original-form">
      <h1 className="original-form__title">Original</h1>
      <section className="original-form__size">
        <h2 className="original-form__size__title">Size</h2>
        <RadioInput
          id={"O-size-s"}
          label={"S - max. 50 x 31 x 35 cm, 0 - 20 kg"}
          value={"S"}
          checked={size === "S"}
          onChange={onSizeChange}
          disabled={false}
        />
        <RadioInput
          id={"O-size-m"}
          label={"M - max. 75 x 75 x 50 cm, 0 - 31,5 kg"}
          value={"M"}
          checked={size === "M"}
          onChange={onSizeChange}
          disabled={false}
        />
        <RadioInput
          id={"O-size-l"}
          label={"L - max. 120 x 120 x 80 cm, 0 - 1000 kg"}
          value={"L"}
          checked={size === "L"}
          onChange={onSizeChange}
          disabled={false}
        />
        <RadioInput
          id={"O-size-xl"}
          label={"XL max. 300 x 100 x 100 cm 0 - 1000 kg"}
          value={"XL"}
          checked={size === "XL"}
          onChange={onSizeChange}
          disabled={false}
        />
      </section>
      <section className="original-form__weight">
        <h2 className="original-form__weight__title">Weight (kg)</h2>
        <NumberInput 
          id={"O-weight"} 
          value={weight} 
          onChange={onWeightChange} 
        />
        {weightError && (
          <p className="original-form__error">
            Please enter a correct weight for your package.
          </p>
        )}
      </section>
      <section className="original-form__packaging">
        <h2 className="original-form__packaging__title">Packaging</h2>

        <RadioInput
          id={"O-packaging-envelope"}
          label={"Envelope"}
          value={"envelope"}
          checked={packaging === "envelope"}
          onChange={onPackagingChange}
          disabled={size !== "S" && size !== "M"}
        />
        <RadioInput
          id={"O-packaging-cardboard-box"}
          label={"Cardboard Box"}
          value={"cardboard-box"}
          checked={packaging === "cardboard-box"}
          onChange={onPackagingChange}
          disabled={size !== "S" && size !== "M" && size !== "L"}
        />
        <RadioInput
          id={"O-packaging-wooden-box"}
          label={"Wooden Box"}
          value={"wooden-box"}
          checked={packaging === "wooden-box"}
          onChange={onPackagingChange}
          disabled={size !== "L" && size !== "XL"}
        />
        <RadioInput
          id={"O-packaging-pallet"}
          label={"Pallet"}
          value={"pallet"}
          checked={packaging === "pallet"}
          onChange={onPackagingChange}
          disabled={size !== "XL"}
        />
        {packagingError && (
          <p className="original-form__error">
            Please select a correct packaging for your package.
          </p>
        )}
      </section>
    </div>
  );
};

export default OriginalForm;

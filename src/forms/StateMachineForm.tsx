import "../styles/original-form.css";
import RadioInput from "../components/RadioInput";
import NumberInput from "../components/NumberInput";
import { Machine, MachineFunctions } from "./Machine";

const StateMachineForm = () => {
  const machine: MachineFunctions = Machine();

  return (
    <div className="original-form">
      <h1 className="original-form__title">State Machine</h1>
      <section className="original-form__size">
        <h2 className="original-form__size__title">Size</h2>
        <RadioInput
          id={"STATE-size-s"}
          label={"S - max. 50 x 31 x 35 cm, 0 - 20 kg"}
          value={"S"}
          checked={machine.getSize() === "S"}
          onChange={() => machine.setSize("S")}
          disabled={false}
        />
        <RadioInput
          id={"STATE-size-m"}
          label={"M - max. 75 x 75 x 50 cm, 0 - 31,5 kg"}
          value={"M"}
          checked={machine.getSize() === "M"}
          onChange={() => machine.setSize("M")}
          disabled={false}
        />
        <RadioInput
          id={"STATE-size-l"}
          label={"L - max. 120 x 120 x 80 cm, 0 - 1000 kg"}
          value={"L"}
          checked={machine.getSize() === "L"}
          onChange={() => machine.setSize("L")}
          disabled={false}
        />
        <RadioInput
          id={"STATE-size-xl"}
          label={"XL max. 300 x 100 x 100 cm 0 - 1000 kg"}
          value={"XL"}
          checked={machine.getSize() === "XL"}
          onChange={() => machine.setSize("XL")}
          disabled={false}
        />
      </section>
      <section className="original-form__weight">
        <h2 className="original-form__weight__title">Weight (kg)</h2>
        <NumberInput
          id={"STATE-weight"}
          value={machine.getWeight()}
          onChange={(event) => machine.setWeight(Number(event.target.value))}
        />
        {!machine.isWeightValid() && (
          <p className="original-form__error">
            Please enter a correct weight for your package.
          </p>
        )}
      </section>
      <section className="original-form__packaging">
        <h2 className="original-form__packaging__title">Packaging</h2>

        <RadioInput
          id={"STATE-packaging-envelope"}
          label={"Envelope"}
          value={"envelope"}
          checked={machine.getPackaging() === "envelope"}
          onChange={() => machine.setPackaging("envelope")}
          disabled={!machine.isPackagingValid("envelope")}
        />
        <RadioInput
          id={"STATE-packaging-cardboard-box"}
          label={"Cardboard Box"}
          value={"cardboard-box"}
          checked={machine.getPackaging() === "cardboard-box"}
          onChange={() => machine.setPackaging("cardboard-box")}
          disabled={!machine.isPackagingValid("cardboard-box")}
        />
        <RadioInput
          id={"STATE-packaging-wooden-box"}
          label={"Wooden Box"}
          value={"wooden-box"}
          checked={machine.getPackaging() === "wooden-box"}
          onChange={() => machine.setPackaging("wooden-box")}
          disabled={!machine.isPackagingValid("wooden-box")}
        />
        <RadioInput
          id={"STATE-packaging-pallet"}
          label={"Pallet"}
          value={"pallet"}
          checked={machine.getPackaging() === "pallet"}
          onChange={() => machine.setPackaging("pallet")}
          disabled={!machine.isPackagingValid("pallet")}
        />
        {!machine.isPackagingValid() && (
          <p className="original-form__error">
            Please select a correct packaging for your package.
          </p>
        )}
      </section>
    </div>
  );
};

export default StateMachineForm;

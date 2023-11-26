import { useForm, Controller } from "react-hook-form";
import "../styles/original-form.css";
import RadioInput from "../components/RadioInput";
import NumberInput from "../components/NumberInput";
import { useEffect } from "react";

type Size = "S" | "M" | "L" | "XL";

type SMPackaging = "envelope" | "cardboard-box";
type LPackaging = "cardboard-box" | "wooden-box";
type XLPackaging = "wooden-box" | "pallet";
type Packaging = SMPackaging | LPackaging | XLPackaging;

const SM_PACKAGING: Packaging[] = ["envelope", "cardboard-box"];
const L_PACKAGING: Packaging[] = ["cardboard-box", "wooden-box"];
const XL_PACKAGING: Packaging[] = ["wooden-box", "pallet"];

const sizeValues: { size: Size; label: string }[] = [
  { size: "S", label: "S - max. 50 x 31 x 35 cm, 0 - 20 kg" },
  { size: "M", label: "M - max. 75 x 75 x 50 cm, 0 - 31,5 kg" },
  { size: "L", label: "L - max. 120 x 120 x 80 cm, 0 - 1000 kg" },
  { size: "XL", label: "XL max. 300 x 100 x 100 cm 0 - 1000 kg" },
];

const packagingValues: { packaging: Packaging; label: string, enabledSizes: Size[] }[] = [
  { packaging: "envelope", label: "Envelope", enabledSizes: ["S", "M"] },
  { packaging: "cardboard-box", label: "Cardboard Box", enabledSizes: ["S", "M", "L"] },
  { packaging: "wooden-box", label: "Wooden Box", enabledSizes: ["L", "XL"] },
  { packaging: "pallet", label: "Pallet", enabledSizes: ["XL"] },
];

interface FormParams {
  size: Size;
  weight: number;
  packaging: Packaging;
}

const RhfForm = () => {
  const { control, watch, trigger, formState: { errors } } = useForm<FormParams>({
    defaultValues: {
      size: "S",
      weight: 0,
      packaging: "envelope",
    },
    mode: "onChange",
  });

  const size = watch("size");

  const validateWeight = (weight: number): boolean | string => {
    if (weight <= 0) return "Weight must be greater than 0";
    if (size === "S" && weight > 20) return "Weight exceeds limit for size S";
    if (size === "M" && weight > 31.5) return "Weight exceeds limit for size M";
    if ((size === "L" || size === "XL") && weight > 1000)
      return "Weight exceeds limit for size L and XL";
    return true;
  };

  const validatePackaging = (packaging: Packaging): boolean | string => {
    if ((size === "S" || size === "M") && !SM_PACKAGING.includes(packaging))
      return "Invalid packaging for size S or M";
    if (size === "L" && !L_PACKAGING.includes(packaging))
      return "Invalid packaging for size L";
    if (size === "XL" && !XL_PACKAGING.includes(packaging))
      return "Invalid packaging for size XL";
    return true;
  };

  useEffect(() => {
    trigger("weight");
    trigger("packaging");
  }, [trigger, size]);

  return (
    <form className="original-form">
      <h1 className="original-form__title">RHF</h1>
      <section className="original-form__size">
        <h2 className="original-form__size__title">Size</h2>
        {sizeValues.map((sizeValue) => (
          <Controller
            name="size"
            control={control}
            render={({ field }) => (
              <RadioInput
                id={`Rhf-size-${sizeValue.size}`}
                label={sizeValue.label}
                value={sizeValue.size}
                checked={field.value === sizeValue.size}
                onChange={() => field.onChange(sizeValue.size)}
                disabled={false}
              />
            )}
          />
        ))}
      </section>
      <section className="original-form__weight">
        <h2 className="original-form__weight__title">Weight (kg)</h2>
        <Controller
          name="weight"
          control={control}
          rules={{
            required: true,
            validate: validateWeight,
          }}
          render={({ field }) => <NumberInput {...field} id={"Rhf-weight"} />}
        />
        {errors.weight && (
          <p className="original-form__error">{errors.weight.message}</p>
        )}
      </section>
      <section className="original-form__packaging">
        <h2 className="original-form__packaging__title">Packaging</h2>
        {packagingValues.map((packagingValue) => (
          <Controller
            name="packaging"
            control={control}
            rules={{
              required: true,
              validate: validatePackaging,
            }}
            render={({ field }) => (
              <RadioInput
                id={`Rhf-packaging-${packagingValue.packaging}`}
                label={packagingValue.label}
                value={packagingValue.packaging}
                checked={field.value === packagingValue.packaging}
                onChange={() => field.onChange(packagingValue.packaging)}
                disabled={!packagingValue.enabledSizes.includes(size)}
              />
            )}
          />
        ))}
        {errors.packaging && (
          <p className="original-form__error">{errors.packaging.message}</p>
        )}
      </section>
    </form>
  );
};

export default RhfForm;

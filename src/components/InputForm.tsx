"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

export interface FormData {
  address: string;
  name: string;
  productCost: string;
  tip: string;
  serviceFee: string;
  deliveryFee: string;
  proDiscount: string;
  exclusiveDiscount: string;
  paymentMethod: string;
  [key: string]: string;
}

const InputForm = () => {
  const { register, handleSubmit, setValue } = useForm<FormData>();
  const router = useRouter();

  const onSubmit = (data: FormData) => {
    const queryString = new URLSearchParams(data).toString();
    router.push(`/comidas?${queryString}`);
  };
  return (
    <form>
      <div className="flex flex-col">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Direccion: (Tal como en google maps)
            <Input type="text" {...register("address")} />
          </label>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Repartidor:
            <Input type="text" {...register("name")} />
          </label>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Costo del producto:
            <Input type="tel" {...register("productCost")} />
          </label>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Propina:
            <Input type="tel" {...register("tip")} />
          </label>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Tarifa de servicio:
            <Input type="tel" {...register("serviceFee")} />
          </label>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Tarifa de domicilio:
            <Input type="tel" {...register("deliveryFee")} />
          </label>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Descuentos PRO: (Si tenias rappi pro)
            <Input type="tel" {...register("proDiscount")} />
          </label>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Descuentos exclusivos: (Normalmente son descuentos del restaurante)
            <Input type="tel" {...register("exclusiveDiscount")} />
          </label>
        </div>
        <div>
          <RadioGroup
            defaultValue="efectivo"
            onValueChange={(value) => {
              setValue("paymentMethod", value);
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="efectivo" id="efectivo" />
              <label htmlFor="efectivo">Efectivo</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="rappicard" id="rappicard" />
              <label htmlFor="rappicard">Rappi Card</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pse" id="pse" />
              <label htmlFor="pse">PSE</label>
            </div>
          </RadioGroup>
        </div>
        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default InputForm;

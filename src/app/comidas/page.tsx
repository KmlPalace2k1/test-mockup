import {
  CrownIcon,
  LeftIcon,
  LocationIcon,
  MotorcycleIcon,
} from "@/src/components/Icons";
import { FormData } from "@/src/components/InputForm";
import Image from "next/image";
import Link from "next/link";

interface IComidasProps {
  params: Promise<{ [key: string]: string }>;
  searchParams: Promise<FormData>;
}

const priceFormatter = (value: number) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  })
    .format(value)
    .replace(/\s/g, "");
};

const payment_methods = {
  efectivo: "/circle-cash.png",
  rappicard: "/logo_rappicard_100.png",
  pse: "/pse-logo.png",
};

export default async function Comidas(props: IComidasProps) {
  const {
    address,
    name,
    productCost,
    deliveryFee,
    exclusiveDiscount,
    proDiscount,
    serviceFee,
    tip,
    paymentMethod,
  } = await props.searchParams;

  const totalPaid =
    Number(productCost) +
    Number(deliveryFee) +
    Number(serviceFee) +
    Number(tip) -
    Number(proDiscount) -
    Number(exclusiveDiscount);

  return (
    <div className="px-6 py-2 text-sm">
      <Link href="/form">
        <div className="bg-[#ebedf2] p-1 rounded-full mb-4 w-fit">
          <LeftIcon />
        </div>
      </Link>
      <h1 className="font-bold text-base">Detalles del pedido</h1>
      <div className="border-b border-b-[#ebedf2] py-1 flex items-center gap-4">
        <LocationIcon />
        <span>{address}</span>
      </div>
      <div className="flex justify-between border-b items-center border-b-[#ebedf2] py-1">
        <div className="flex gap-4 items-center">
          <MotorcycleIcon />
          <span>{name}</span>
        </div>
        <div className="bg-[#ebedf2] px-4 py-1 rounded-full w-fit font-bold">
          Ver chat
        </div>
      </div>
      <h2 className="font-bold my-6 text-xl">Costo total</h2>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between">
          <span>Costo de los productos</span>
          <span>{priceFormatter(Number(productCost))}</span>
        </div>
        <div className="flex flex-row justify-between">
          <span>Propina</span>
          <span>{priceFormatter(Number(tip))}</span>
        </div>
        <div className="flex flex-row justify-between">
          <span>Tarifa de servicio</span>
          <span>{priceFormatter(Number(serviceFee))}</span>
        </div>
        <div className="flex flex-row justify-between">
          <span>Costo de envío</span>
          <span>{priceFormatter(Number(deliveryFee))}</span>
        </div>
        {Number(proDiscount) > 0 && (
          <div className="flex flex-row justify-between">
            <span>Descuentos PRO</span>
            <div className="flex justify-between w-1/3">
              <CrownIcon />
              <span>-{priceFormatter(Number(proDiscount))}</span>
            </div>
          </div>
        )}
        {Number(exclusiveDiscount) > 0 && (
          <div className="flex flex-row justify-between">
            <span>Descuentos exclusivos</span>
            <span>-{priceFormatter(Number(exclusiveDiscount))}</span>
          </div>
        )}
        <div className="flex flex-row justify-between border-t border-t-[#ebedf2] py-4 pb-6">
          <span className="font-bold">Total pagado</span>
          <span>{priceFormatter(totalPaid)}</span>
        </div>
      </div>
      <h2 className="font-bold text-xl mb-2">Transacciones</h2>
      <div className="flex flex-row justify-between border-b border-b-[#ebedf2] py-4">
        <div className="flex gap-2">
          <Image
            src={
              paymentMethod && paymentMethod.length > 0
                ? payment_methods[paymentMethod as keyof typeof payment_methods]
                : payment_methods.efectivo
            }
            alt="Transactions"
            width={40}
            height={40}
          />
          <span>Pago realizado</span>
        </div>
        <span className="text-xs mt-2">
          {priceFormatter(Number(totalPaid))}
        </span>
      </div>
    </div>
  );
}

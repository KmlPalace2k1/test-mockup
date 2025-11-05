import { faChevronRight } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DriveItem = ({
  date,
  price,
  from,
  to,
}: {
  date: string;
  price: number;
  from: string;
  to: string;
}) => {
  const formatPrice = (price: number) => {
    return price.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="flex flex-col p-4 py-3 border-b border-gray-600">
      <div className="flex flex-row justify-between">
        <span className="font-bold">{date}</span>
        <span className="font-bold">COP {formatPrice(price)}</span>
      </div>
      <div className="flex flex-row gap-2">
        <div className="my-1 flex flex-col relative justify-between">
          <div className="bg-[#8cbcf7] z-10 rounded-full w-4 h-4 border-4 border-[#1f4566]" />
          <div className="absolute left-1/2 top-3 transform -translate-x-1/2 h-1/2 border border-[#3f4042] border-dashed" />
          <div className="bg-[#CBF052] z-10 rounded-full w-4 h-4 border-4 border-[#2f6527]" />
        </div>
        <div className="flex flex-col gap-1 relative w-full">
          <FontAwesomeIcon
            icon={faChevronRight}
            className="text-[#96989C] w-4 h-4 absolute right-0 top-1"
          />
          <span className="text-white">{from}</span>
          <span className="text-white">{to}</span>
        </div>
      </div>
    </div>
  );
};

export default DriveItem;

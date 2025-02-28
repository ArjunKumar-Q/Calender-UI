import { format, setMonth } from "date-fns";
import { useCallback } from "react";

const Year = ({
  currentDate,
  setDate,
  viewStateHandler,
}: {
  currentDate: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  viewStateHandler: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const months = Array.from({ length: 12 }, (_, i) =>
    format(setMonth(currentDate, i), "MMMM")
  );

  const cardClickHandler = useCallback(
    (index: number) => {
      setDate(setMonth(currentDate, index));
      viewStateHandler("month");
    },
    [currentDate, setDate, viewStateHandler]
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-center py-2">
      {months.map((month, index) => (
        <button
          key={month}
          className="p-4 bg-white rounded-lg shadow-md h-32 text-[#006dbf]"
          onClick={() => cardClickHandler(index)}
        >
          {month}
        </button>
      ))}
    </div>
  );
};


export default Year;
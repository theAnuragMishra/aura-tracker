const AttendanceDateList = ({
  onSelectDate,
  dates,
}: {
  onSelectDate: (date: string) => void;
  dates: { unique_dates: string }[];
}) => {
  const handleClick = (date: string) => {
    onSelectDate(date);
  };

  return (
    <div className="flex flex-col gap-2 justify-center items-start">
      {dates && dates.map((date, index) => (
        <button
          key={index}
          onClick={() => handleClick(date.unique_dates)}
          className="text-lg"
        >
          {date.unique_dates}
        </button>
      ))
      }
      <button
        onClick={() => handleClick(new Date().toISOString().split("T")[0])}
        className="text-lg"
      >
        Today
      </button>
    </div >
  );
};

export default AttendanceDateList;

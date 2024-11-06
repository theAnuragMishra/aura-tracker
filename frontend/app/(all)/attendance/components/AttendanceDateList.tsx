const AttendanceDateList = ({
  onSelectDate,
  dates,
}: {
  onSelectDate: (date: string, course_name: string, course_id: number) => void;
  dates: { unique_dates: string[]; course_id: number, course_name: string }[];
}) => {
  const handleClick = (date: string, course_name: string, course_id: number) => {
    onSelectDate(date, course_name, course_id);
  };

  return (
    <div className="flex flex-col gap-2">
      {dates.map((date) => (
        <div className="text-2xl flex flex-col items-start justify-center mb-3" key={date.course_id}>
          <p className="mb-1">{date.course_name}</p>
          {date.unique_dates.map((one_date, index) => (
            <button
              key={index}
              onClick={() => handleClick(one_date, date.course_name, date.course_id)}
              className="text-lg"
            >
              {one_date}
            </button>

          ))}
          <button
            onClick={() => handleClick(new Date().toISOString().split("T")[0], date.course_name, date.course_id)}
            className="text-lg"
          >
            Today
          </button>

        </div>
      ))}
    </div>
  );
};

export default AttendanceDateList;

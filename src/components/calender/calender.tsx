import Header from "./header";
import Year from "./YearView";
import Month from "./MonthView";
import Week from "./WeekView";
import Day from "./DayView";

import { useState } from "react";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [view, setView] = useState<string>("month");

  return (
    <div className="min-w-screen max-w-screen-xl min-h-screen mx-auto px-4 bg-[#fafbfc]  overflow-x-auto">
      <Header
        currentDate={currentDate}
        view={view}
        viewStateHandler={setView}
        setDate={setCurrentDate}
      />
      <div id="calender-body" className="mx-auto overflow-x-auto h-auto">
        {view === "year" && (
          <Year
            currentDate={currentDate}
            setDate={setCurrentDate}
            viewStateHandler={setView}
          />
        )}

        {view === "month" && <Month currentDate={currentDate} />}

        {view === "week" && <Week currentDate={currentDate} />}

        {view === "day" && <Day currentDate={currentDate} />}
      </div>
    </div>
  );
}

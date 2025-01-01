import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  // 1. n.o bookings
  const numBookings = bookings.length;

  //2. all costs
  const sales = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);

  //   3. n.o stays
  const checkins = confirmedStays?.length;

  // 4.
  const occupation =
    confirmedStays?.reduce((acc, stay) => acc + stay.numNights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        value={numBookings}
        title="Bookings"
        color="blue"
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
        title="Sales"
        color="green"
      />
      <Stat
        icon={<HiOutlineCalendarDays />}
        value={checkins}
        title="Check ins"
        color="indigo"
      />
      <Stat
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + "%"}
        title="Occupancy rate"
        color="yellow"
      />
    </>
  );
}

export default Stats;

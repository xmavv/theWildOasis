import styled from "styled-components";
import Heading from "../../ui/Heading";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import { MdRestaurantMenu } from "react-icons/md";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const startDataLight = [
  {
    duration: "1 night",
    value: 0,
    color: "#ef4444",
  },
  {
    duration: "2 nights",
    value: 0,
    color: "#f97316",
  },
  {
    duration: "3 nights",
    value: 0,
    color: "#eab308",
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: "#84cc16",
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: "#22c55e",
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#14b8a6",
  },
  {
    duration: "15-21 nights",
    value: 0,
    color: "#3b82f6",
  },
  {
    duration: "21+ nights",
    value: 0,
    color: "#a855f7",
  },
];

const startDataDark = [
  {
    duration: "1 night",
    value: 0,
    color: "#b91c1c",
  },
  {
    duration: "2 nights",
    value: 0,
    color: "#c2410c",
  },
  {
    duration: "3 nights",
    value: 0,
    color: "#a16207",
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: "#4d7c0f",
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: "#15803d",
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#0f766e",
  },
  {
    duration: "15-21 nights",
    value: 0,
    color: "#1d4ed8",
  },
  {
    duration: "21+ nights",
    value: 0,
    color: "#7e22ce",
  },
];

function prepareData(startData, stays) {
  // A bit ugly code, but sometimes this is what it takes when working with real data 😅

  function incArrayValue(arr, field) {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = stays
    .reduce((arr, cur) => {
      const num = cur.numNights;
      if (num === 1) return incArrayValue(arr, "1 night");
      if (num === 2) return incArrayValue(arr, "2 nights");
      if (num === 3) return incArrayValue(arr, "3 nights");
      if ([4, 5].includes(num)) return incArrayValue(arr, "4-5 nights");
      if ([6, 7].includes(num)) return incArrayValue(arr, "6-7 nights");
      if (num >= 8 && num <= 14) return incArrayValue(arr, "8-14 nights");
      if (num >= 15 && num <= 21) return incArrayValue(arr, "15-21 nights");
      if (num >= 21) return incArrayValue(arr, "21+ nights");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

const darkColors = {
  "1 night": "#b91c1c",
  "2 nights": "#c2410c",
  "3 nights": "#a16207",
  "4-5 nights": "#4d7c0f",
  "6-7 nights": "#15803d",
  "8-14 nights": "#0f766e",
  "15-21 nights": "#1d4ed8",
  "21+ nights": "#7e22ce",
};

const lightColors = {
  "1 night": "#ef4444",
  "2 nights": "#f97316",
  "3 nights": "#eab308",
  "4-5 nights": "#84cc16",
  "6-7 nights": "#22c55e",
  "8-14 nights": "#14b8a6",
  "15-21 nights": "#3b82f6",
  "21+ nights": "#a855f7",
};

function prepareData2(stays, colors) {
  const data = {};

  stays.forEach((stay) => {
    let nights;
    if (stay.numNights === 1) nights = `1 night`;
    else if (stay.numNights <= 3) nights = `${stay.numNights} nights`;
    else if (stay.numNights <= 5) nights = "4-5 nights";
    else if (stay.numNights <= 7) nights = "6-7 nights";
    else if (stay.numNights <= 14) nights = "8-14 nights";
    else if (stay.numNights <= 21) nights = "15-21 nights";
    else nights = "21+ nights";

    if (!data[nights]) {
      data[nights] = 1;
    } else {
      data[nights]++;
    }
  });

  const arr = [];

  for (const [key, value] of Object.entries(data)) {
    const obj = {
      duration: key,
      value: value,
      color: colors[key],
    };

    delete data[key];
    arr.push(obj);
  }

  // in descending order
  return arr.sort((a, b) => b.value - a.value);
}

function DurationChart({ confirmedStays }) {
  const { isDarkMode } = useDarkMode();

  const startData = isDarkMode ? startDataDark : startDataLight;
  const colors = isDarkMode ? darkColors : lightColors;

  // jonas function
  const data = prepareData(startData, confirmedStays);
  // my funcion
  const data2 = prepareData2(confirmedStays, colors);

  return (
    <ChartBox>
      <Heading as="h2">Stay duration summary</Heading>

      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data2}
            innerRadius={85}
            outerRadius={110}
            nameKey="duration"
            dataKey="value"
            cx="40%"
            cy="50%"
            paddingAngle={3}
          >
            {data2.map((entry) => (
              <Cell
                fill={entry.color}
                stroke={entry.color}
                key={entry.duration}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default DurationChart;

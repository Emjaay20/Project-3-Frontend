import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import { useGetHeartRatesQuery } from "@/states/api";
import { useTheme } from "@mui/material";
import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  Legend,
  LineChart,
  BarChart,
  Bar,
} from "recharts";
import { GetHeartRatesResponse, MonthlyHeartRateData } from "@/types";

const Row2 = () => {
  const { palette } = useTheme();
  const { data } = useGetHeartRatesQuery();

  console.log("data:", data);

  const heartRateAverage = useMemo(() => {
    return (
      data?.[0]?.monthlyData.map(({ month, average }: MonthlyHeartRateData) => ({
        name: month.substring(0, 3),
        average,
      })) || []
    );
  }, [data]);

  const heartRateMinMax = useMemo(() => {
    return (
      data?.[0]?.monthlyData.map(({ month, min, max }: MonthlyHeartRateData) => ({
        name: month.substring(0, 3),
        min,
        max,
      })) || []
    );
  }, [data]);

  const heartRateReadings = useMemo(() => {
    return (
      data?.[0]?.monthlyData.map(({ month, readings }: MonthlyHeartRateData) => {
        const avgReading =
          readings.reduce((sum: number, r: { value: number }) => sum + r.value, 0) /
          readings.length;
        return {
          name: month.substring(0, 3),
          avgReading,
        };
      }) || []
    );
  }, [data]);

  return (
    <>
      {/* Average Heart Rate Chart */}
      <DashboardBox gridArea="d">
        <BoxHeader
          title="Average Heart Rate"
          subtitle="Displays the average heart rate per month"
          sideText="Data Overview"
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={heartRateAverage}
            margin={{
              top: 15,
              right: 25,
              left: -10,
              bottom: 60,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="average"
              stroke={palette.primary.main}
              dot={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>

      {/* Min/Max Heart Rate Chart */}
      <DashboardBox gridArea="e">
        <BoxHeader
          title="Heart Rate Min/Max"
          subtitle="Shows minimum and maximum heart rates for each month"
          sideText="Data Range"
        />
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={heartRateMinMax}
            margin={{
              top: 15,
              right: 25,
              left: -10,
              bottom: 60,
            }}
          >
            <defs>
              <linearGradient id="colorMin" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={palette.secondary.main} stopOpacity={0.5} />
                <stop offset="95%" stopColor={palette.secondary.main} stopOpacity={0.2} />
              </linearGradient>
              <linearGradient id="colorMax" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={palette.tertiary.main} stopOpacity={0.5} />
                <stop offset="95%" stopColor={palette.tertiary.main} stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="min"
              stroke={palette.secondary.main}
              fill="url(#colorMin)"
            />
            <Area
              type="monotone"
              dataKey="max"
              stroke={palette.tertiary.main}
              fill="url(#colorMax)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>

      {/* Average Readings per Month */}
      <DashboardBox gridArea="f">
        <BoxHeader
          title="Heart Rate Readings"
          subtitle="Average daily readings per month"
          sideText="Readings Overview"
        />
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={heartRateReadings}
            margin={{
              top: 15,
              right: 25,
              left: -10,
              bottom: 60,
            }}
          >
            <defs>
              <linearGradient id="colorAvgReading" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.5} />
                <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Bar
              dataKey="avgReading"
              fill="url(#colorAvgReading)"
              radius={[5, 5, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row2;

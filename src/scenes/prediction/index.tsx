import React, { useMemo, useState } from "react";
import { useTheme, Box, Button, Typography } from "@mui/material";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, Label } from "recharts";
import regression, { DataPoint } from "regression";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetHeartRatesQuery } from "@/states/api";

const Predictions = () => {
  const { palette } = useTheme();
  const [isPredictions, setIsPredictions] = useState(false);
  const { data: heartRateData } = useGetHeartRatesQuery();

  const formattedData = useMemo(() => {
    if (!heartRateData || heartRateData.length === 0) return [];
    const monthData = heartRateData[0].monthlyData;

    // Prepare data for regression
    const formatted: Array<DataPoint> = monthData.map(({ average }, i: number) => [i, average]);
    const regressionLine = regression.linear(formatted);

    // Return formatted data for the chart
    return monthData.map(({ month, average }, i: number) => ({
      name: month,
      "Average Heart Rate": average,
      "Regression Line": regressionLine.points[i][1],
      "Predicted Heart Rate": regressionLine.predict(i + 12)[1],
    }));
  }, [heartRateData]);

  return (
    <DashboardBox width="100%" height="100%" p="1rem" overflow="hidden">
      <FlexBetween m="1rem 2.5rem" gap="1rem">
        <Box>
          <Typography variant="h3">Heart Rate Analysis</Typography>
          <Typography variant="h6">
            Visualized average heart rates and predictions using a simple linear regression model.
          </Typography>
        </Box>
        <Button
          onClick={() => setIsPredictions(!isPredictions)}
          sx={{
            color: palette.grey[900],
            backgroundColor: palette.grey[700],
            boxShadow: "0.1rem 0.1rem 0.1rem rgba(0,0,0,0.4)",
          }}
        >
          Show Predicted Heart Rate for Next Year
        </Button>
      </FlexBetween>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={formattedData}
          margin={{
            top: 20,
            right: 75,
            left: 20,
            bottom: 80,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={palette.grey[800]} />
          <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }}>
            <Label value="Month" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis
            domain={["dataMin - 10", "dataMax + 10"]}
            tickLine={false}
            axisLine={false}
            style={{ strokeWidth: "0" }}
            tickFormatter={(v) => `${v} BPM`}
          >
            <Label value="Heart Rate (BPM)" angle={-90} offset={-5} position="insideLeft" />
          </YAxis>
          <Tooltip />
          <Legend verticalAlign="top" />
          <Line type="monotone" dataKey="Average Heart Rate" stroke={palette.primary.main} dot={{ strokeWidth: 5 }} />
          <Line type="monotone" dataKey="Regression Line" stroke="#8884d8" dot={false} />
          {isPredictions && (
            <Line type="monotone" dataKey="Predicted Heart Rate" strokeDasharray="5 5" stroke={palette.secondary[500]} />
          )}
        </LineChart>
      </ResponsiveContainer>
    </DashboardBox>
  );
};

export default Predictions;

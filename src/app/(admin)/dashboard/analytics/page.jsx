"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";
import { useCallback, useEffect, useState } from "react";
import { generateBluishColor } from "@/components/helper/utils";
import { Logout } from "../../_resources/utils/logout";
import BeatLoading from "@/components/ui/BeatLoading/BeatLoading";
// const { ServerURI } = process.env;

function Analytics(req) {
  const [status, setStatus] = useState([]);
  const [message, setMessage] = useState(<BeatLoading />);
  const [dailyReports, setdailyReports] = useState([]);
  const [monthlyReports, setMonthlyReports] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);
  const [lineChartData1, setLineChartData1] = useState([]);
  const [pieChart, setPieChart] = useState([]);
  const [pieChart1, setPieChart1] = useState([]);
  const [pieChart2, setPieChart2] = useState([]);

  let fetchedData = useCallback(async (token) => {
    try {
      let response = await fetch(`/api/v1/analytics`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = await response.json();
      if (response.status == 401 || response.status == 500) {
        setStatus(response.status);
        setMessage(data.message);
        localStorage.clear();
        Logout();
        return;
      } else if (response.status == 403) {
        setStatus(response.status);
        setMessage("Token expired, Kindly logout & login again !");
        return;
      } else {
        setStatus(response.status);
      }
      setdailyReports(data?.dailyReports);
      setMonthlyReports(processedMonthForLineChart(data?.monthlyReports));
      setPieChart(processedPieChartData(data?.monthlyDepartment));
      setPieChart1(processedPieChartData(data?.monthlyRequestFor));
      setPieChart2(processedPieChartData(data?.annualRequestFor));
      if (data?.monthlyReports.length > 0) {
        setLineChartData(processedLineChartData(data?.monthlyReports));
      }
      if (data?.dailyReports.length > 0) {
        setLineChartData1(processedLineChartData(data?.dailyReports, "day"));
      }
      // return data;
      function processedPieChartData(data) {
        let result = data.map((item) => ({
          id: item.type,
          label: item.type,
          value: item.count,
          color: generateBluishColor(),
        }));
        return result;
      }
      function processedLineChartData(data, day) {
        let result = [
          {
            id: "Order Value",
            data: data.map((report) => ({
              x: day ? report.day : getMonthName(report.month),
              y: report.totalValue,
              // y: getMoneyinThousand(report.totalValue),
            })),
          },
          // {
          //   id: "Order Size",
          //   data: monthlyReports.map((report) => ({
          //     x: getMonthName(report.month),
          //     y: report.totalOrders,
          //   })),
          // },
        ];
        return result;
      }
      function processedMonthForLineChart(data) {
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];

        return data.map((item) => ({
          ...item,
          month: monthNames[item.month - 1], // Convert month number to month name
        }));
      }
    } catch (error) {
      throw new Error("Bad fetch response");
    }
  }, []);

  useEffect(() => {
    let token = localStorage.getItem("token");
    fetchedData(token);
  }, [fetchedData]);

  const getMonthName = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString("default", { month: "short" });
  };

  if (status !== 200) {
    return (
      <div>
        <h1
          className="flex flex-col justify-center items-center h-dvh
         font-bold text-center dark:text-white"
        >
          <p className="text-2xl font-bold text-red-700 text-center">
            {status}
          </p>
          {message}
        </h1>
      </div>
    );
  }

  return (
    <div>
      <main className="flex flex-1 flex-col gap-4 p-7 md:gap-8 md:p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardDescription>Day&apos;s Revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <CurvedlineChart data={lineChartData1} className="aspect-[1/1]" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Day&apos;s Order</CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart
                data={dailyReports}
                indexby={"day"}
                className="aspect-[1/1]"
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Monthly Doctor&apos;s Count</CardDescription>
            </CardHeader>
            <CardContent>
              <PieChart data={pieChart} className="aspect-[1/1]" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Monthly Revenue</CardDescription>
              <CardTitle>
                {/* &#8377; {monthlyreports[0]?.totalAmount || 0} */}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CurvedlineChart data={lineChartData} className="aspect-[1/1]" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Monthly Orders</CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart
                data={monthlyReports}
                indexby={"month"}
                className="aspect-[1/1]"
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Monthly Order Type</CardDescription>
            </CardHeader>
            <CardContent>
              <PieChart data={pieChart1} className="aspect-[1/1]" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Overall Order Type</CardDescription>
            </CardHeader>
            <CardContent>
              <PieChart data={pieChart2} className="aspect-[1/1]" />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

function CurvedlineChart(props) {
  const { data } = props;
  return (
    <div {...props}>
      <ResponsiveLine
        data={data}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
          min: 0,
          max: "auto",
        }}
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={["#2563eb", "#e11d48"]}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        role="application"
      />
    </div>
  );
}

function BarChart(props) {
  const { data, indexby, width, height, margin } = props;
  return (
    <div {...props}>
      <ResponsiveBar
        data={data}
        keys={["totalOrders"]}
        indexBy={indexby}
        margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
        padding={0.3}
        colors={["#2563eb"]}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 4,
          tickPadding: 16,
        }}
        gridYValues={4}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        tooltipLabel={({ id }) => `${id}`}
        enableLabel={false}
        role="application"
        ariaLabel="A bar chart showing data"
      />
    </div>
  );
}

function PieChart(props) {
  const { data, width, height, margin } = props;
  return (
    <div {...props}>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.7}
        padAngle={0.7}
        cornerRadius={2}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        colors={{ scheme: "paired" }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={
          [
            // {
            //   match: {
            //     id: "Path",
            //   },
            //   id: "dots",
            // },
            // {
            //   match: {
            //     id: "OPD",
            //   },
            //   id: "lines",
            // },
          ]
        }
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
}

export default Analytics;

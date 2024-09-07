"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { NewAppointmentForm } from "@/app/(admin)/_resources/modalForm/newAppointment";
import { dateTimeConversion } from "@/components/helper/dateConversion";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Fitness from "@/app/(auth)/fitness/fitness";
import { Modal, Modal1 } from "@/components/helper/Modal";
import OpdCard from "@/app/(admin)/_resources/printForm/opdCard";

function Home() {
  const [dailyReports, setdailyReports] = useState([]);
  const [monthlyReports, setMonthlyReports] = useState([]);
  const [AppointmentData, setAppointmentData] = useState([]);
  const [currentModal, setCurrentModal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleEditSelection = (modalComponent) => {
    setCurrentModal(modalComponent);
    setIsModalOpen(true);
  };
  const handlePrintSelection = (modalComponent) => {
    setCurrentModal(modalComponent);
    setIsModalOpen1(true);
  };
  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1) {
      setCurrentPage(1);
    } else if (pageNumber > totalPages) {
      setCurrentPage(totalPages);
    } else {
      setCurrentPage(pageNumber);
    }
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsModalOpen1(false);
    fetchAppointments();
  };

  let fetchAppointments = useCallback(async () => {
    try {
      let response = await fetch(`/api/v1/home/${currentPage}`);
      var fetchedData = await response.json();
      // console.log("L-74, fetchAppointment", fetchedData);
      if (fetchedData.status === 200) {
        setdailyReports(fetchedData?.dailyReports);
        setMonthlyReports(fetchedData?.monthlyReports);
        setAppointmentData(fetchedData?.results);
        setTotalPages(fetchedData?.totalPages);
      }
    } catch (error) {
      console.log(`Error ${error}`);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  return (
    <div>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardDescription>Monthly Revenue</CardDescription>
              <CardTitle>
                &#8377; {monthlyReports[0]?.totalAmount || 0}
              </CardTitle>
            </CardHeader>
            {/* <CardContent>
              <CurvedlineChart className="aspect-[1/1]" />
            </CardContent> */}
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Monthly Orders</CardDescription>
              <CardTitle>{monthlyReports[0]?.totalCount || 0}</CardTitle>
            </CardHeader>
            {/* <CardContent>
              <BarChart className="aspect-[1/1]" />
            </CardContent> */}
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Today&apos;s Revenue</CardDescription>
              <CardTitle>
                {" "}
                &#8377; {dailyReports[0]?.totalAmount || 0}
              </CardTitle>
            </CardHeader>
            {/* <CardContent>
              <LineChart className="aspect-[1/1]" />
            </CardContent> */}
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Today&apos;s Order</CardDescription>
              <CardTitle>{dailyReports[0]?.totalCount || 0}</CardTitle>
            </CardHeader>
            {/* <CardContent>
              <CurvedlineChart className="aspect-[1/1]" />
            </CardContent> */}
          </Card>
        </div>
        <Button
          variant="projectbtn1"
          onClick={() => handleEditSelection(<NewAppointmentForm />)}
        >
          New Appointment
        </Button>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              Todays Appointment
              {/* <SearchIcon className="h-4 w-4 opacity-25" /> */}
              {/* <Input
                className="min-w-0 flex-1"
                placeholder="Search orders"
                type="search"
              /> */}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Appointment ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Mobile Number</TableHead>
                  <TableHead>RequestFor</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {AppointmentData.map((appointment) => (
                  <TableRow key={appointment.appointmentId}>
                    <TableCell>
                      {dateTimeConversion(appointment.appointmentDate)}
                    </TableCell>
                    <TableCell>
                      <Button
                        className="p-0"
                        variant="link"
                        onClick={() =>
                          handlePrintSelection(
                            <OpdCard
                              name={appointment.name}
                              age={appointment.age}
                              appointmentId={appointment.appointmentId}
                              gender={appointment.gender}
                              // address={appointment.address}
                            />
                          )
                        }
                      >
                        {appointment.appointmentId}
                      </Button>
                    </TableCell>
                    <TableCell>{appointment.name}</TableCell>
                    <TableCell>{appointment.phoneNumber}</TableCell>
                    <TableCell>{appointment.requestFor}</TableCell>
                    <TableCell className="font-semibold bg-pink-400 dark:text-black">
                      &#8377;&nbsp;{appointment?.amount}
                    </TableCell>
                    <TableCell className="font-semibold bg-pink-400">
                      {appointment.amountPaid ? "✅" : "❌"}
                    </TableCell>
                    {/* <TableCell>
                      {new Date(appointment.appointmentDate).toLocaleDateString()}
                    </TableCell> */}
                    <TableCell>{appointment.totalVisits}</TableCell>
                    {/* <TableCell>
                      <button onClick={() => handleEditSelection({ appointment })}>
                        {/* Edit 
                        <EditIcon />
                      </button>
                    </TableCell>
                    <TableCell>
                      <button onClick={() => handleDeleteBooking(appointment._id)}>
                        <DeleteIcon />
                      </button>
                    </TableCell>
                    */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Pagination className={""}>
              <PaginationContent className={"flex justify-evenly w-full my-5"}>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  />
                </PaginationItem>
                <PaginationItem>
                  <span>
                    &nbsp; Page {currentPage} of {totalPages}
                    &nbsp;
                  </span>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardContent>
        </Card>
      </main>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {currentModal}
      </Modal>
      <Modal1 isOpen={isModalOpen1} onClose={handleCloseModal}>
        {currentModal}
      </Modal1>
    </div>
  );
}

function CurvedlineChart(props) {
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: "Desktop",
            data: [
              { x: "Jan", y: 43 },
              { x: "Feb", y: 137 },
              { x: "Mar", y: 61 },
              { x: "Apr", y: 145 },
              { x: "May", y: 26 },
              { x: "Jun", y: 154 },
            ],
          },
          {
            id: "Mobile",
            data: [
              { x: "Jan", y: 60 },
              { x: "Feb", y: 48 },
              { x: "Mar", y: 177 },
              { x: "Apr", y: 78 },
              { x: "May", y: 96 },
              { x: "Jun", y: 204 },
            ],
          },
        ]}
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
  return (
    <div {...props}>
      <ResponsiveBar
        data={[
          { name: "Jan", count: 111 },
          { name: "Feb", count: 157 },
          { name: "Mar", count: 129 },
          { name: "Apr", count: 150 },
          { name: "May", count: 119 },
          { name: "Jun", count: 72 },
        ]}
        keys={["count"]}
        indexBy="name"
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

function LineChart(props) {
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: "Desktop",
            data: [
              { x: "Jan", y: 43 },
              { x: "Feb", y: 137 },
              { x: "Mar", y: 61 },
              { x: "Apr", y: 145 },
              { x: "May", y: 26 },
              { x: "Jun", y: 154 },
            ],
          },
          {
            id: "Mobile",
            data: [
              { x: "Jan", y: 60 },
              { x: "Feb", y: 48 },
              { x: "Mar", y: 177 },
              { x: "Apr", y: 78 },
              { x: "May", y: 96 },
              { x: "Jun", y: 204 },
            ],
          },
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
        }}
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

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export default Home;

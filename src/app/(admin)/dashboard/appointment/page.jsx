"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DeleteIcon, EditIcon } from "@/app/_components/social";
// import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
// import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { dateTimeConversion } from "@/components/helper/dateConversion";
import { Modal, Modal1 } from "@/components/helper/Modal";
import { EditAppointmentForm } from "@/app/(admin)/_resources/modalForm/editAppointment";
import DayAppointment from "@/app/(admin)/_resources/printForm/dayAppointment";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BeatLoading from "@/components/ui/BeatLoading/BeatLoading";
import { Logout } from "../../_resources/utils/logout";
const dateTimeNow = new Date(
  new Date().getTime() - new Date().getTimezoneOffset() * 60000
)
  .toISOString()
  .slice(0, 10);

function Appointment() {
  const [status, setStatus] = useState([]);
  const [authToken, setAuthToken] = useState([]);
  const [message, setMessage] = useState(<BeatLoading />);
  const [appointmentData, setAppointmentData] = useState([]);
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal1Open, setIsModal1Open] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedDate, setSelectedDate] = useState(dateTimeNow);
  const [printData, setPrintData] = useState([]);

  const handleEditSelection = (appointment) => {
    setAppointmentDetails(appointment.booking);
    setIsModalOpen(true);
  };

  const handleDateChange = async (event) => {
    setSelectedDate(event.target.value);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsModal1Open(false);
    fetchAppointments(authToken);
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

  let fetchAppointments = useCallback(
    async (token) => {
      try {
        let response = await fetch(
          `/api/v1/appointment/pageNum/${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        let fetchedData = await response.json();
        // console.log("L-88, fetchAppointment", fetchedData);
        if (response.status == 401) {
          setStatus(response.status);
          setMessage(fetchedData.message);
          localStorage.clear();
          Logout();
          return;
        } else if (response.status == 403) {
          setStatus(response.status);
          setMessage("Token expired, Kindly logout & login again !");
          return;
        } else if (response.status == 500) {
          setStatus(response.status);
          setMessage(fetchedData.message);
          return;
        } else if (response.status == 200) {
          setStatus(response.status);
          setAppointmentData(fetchedData.results);
          setTotalPages(fetchedData?.totalPages);
        } else {
          setStatus(response.status);
        }
      } catch (error) {
        console.log(`Error ${error}`);
      }
    },
    [currentPage]
  );

  const handleDeleteBooking = async (id) => {
    try {
      let deleteData = await fetch(`/api/v1/appointment/${id}`, {
        method: "delete",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      let response = await deleteData.json();
      fetchAppointments(authToken);
      alert(response?.message);
    } catch (error) {
      alert("Something went wrong!");
      console.error("Error deleting booking:", error);
    }
  };
  const handlePrintBooking = async () => {
    console.log("L-133 response--------->", selectedDate);
    try {
      let response = await fetch(`/api/v1/appointment/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ selectedDate }),
      });
      let fetchedData = await response.json();
      if (response.status === 200) {
        // console.log("L-146, fetchedData------->", fetchedData);
        setPrintData(fetchedData.data);
        setIsModal1Open(true);
      } else {
        alert(fetchedData?.message);
      }
    } catch (error) {
      alert("Something went wrong!");
      console.error("Error deleting booking:", error);
    }
  };
  useEffect(() => {
    let token = localStorage.getItem("token");
    setAuthToken(token);
    fetchAppointments(token);
  }, [fetchAppointments]);

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
    <div className="p-7">
      {/* <h2 className="text-black">Appointment List</h2> */}
      <Card className="mt-4">
        <CardHeader className="flex flex-col sm:flex-row justify-evenly items-center gap-5">
          <p className="flex text-2xl font-semibold justify-center sm:justify-start w-full">
            Appointment List
            {/* <SearchIcon className="h-4 w-4 opacity-25" /> */}
          </p>
          <div className="flex flex-col sm:flex-row justify-evenly w-full items-center gap-5 bg-slate-300 p-6 rounded-lg">
            <Input
              type="date"
              value={selectedDate} // format the date to YYYY-MM-DD
              onChange={handleDateChange}
              className="dark:text-black"
            />
            <Button variant="projectbtn1" onClick={handlePrintBooking}>
              Create Day Report
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>Appointment Id</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>Mobile Number</TableHead>
                <TableHead>Request For</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Edit</TableHead>
                <TableHead>Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointmentData.map((booking) => (
                <TableRow key={booking._id}>
                  <TableCell>
                    {dateTimeConversion(booking.appointmentDate)}
                  </TableCell>
                  <TableCell>{booking.appointmentId}</TableCell>
                  <TableCell className="font-semibold bg-orange-200 dark: text-black">
                    {booking.name}
                  </TableCell>
                  <TableCell className="">{booking.phoneNumber}</TableCell>
                  <TableCell>{booking.requestFor}</TableCell>
                  <TableCell className="font-semibold bg-orange-200 dark: text-black">
                    {booking.amount}
                  </TableCell>
                  <TableCell className="font-semibold bg-orange-200 dark: text-black">
                    {booking.amountPaid ? "✅" : "❌"}
                  </TableCell>
                  <TableCell>
                    <button onClick={() => handleEditSelection({ booking })}>
                      {/* Edit */}
                      <EditIcon />
                    </button>
                  </TableCell>
                  <TableCell>
                    <button onClick={() => handleDeleteBooking(booking._id)}>
                      <DeleteIcon />
                    </button>
                  </TableCell>
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
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {<EditAppointmentForm appointmentDetails={appointmentDetails} />}
      </Modal>
      <Modal1 isOpen={isModal1Open} onClose={handleCloseModal}>
        {
          <DayAppointment
            appointmentData={printData}
            selectedDate={selectedDate}
          />
        }
      </Modal1>
    </div>
  );
}

export default Appointment;

"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DeleteIcon, EditIcon } from "@/app/_components/social";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Modal } from "@/components/helper/Modal";
import { EditCustomerForm } from "@/app/(admin)/_resources/modalForm/editCustomer";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { SearchIcon } from "@/components/icons/icons2";
import { headers } from "next/headers";

function Customer() {
  const [status, setStatus] = useState();
  const [authToken, setAuthToken] = useState();
  const [customerData, setCustomerData] = useState([]);
  // const [bookings, setBookings] = useState([]);
  const [CustomerDetails, setCustomerDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleEditSelection = (customerData) => {
    setCustomerDetails(customerData.customer);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    fetchCustomers();
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

  let fetchCustomers = useCallback(async () => {
    try {
      let response = await fetch(`/api/v1/customer/pageNum/${currentPage}`);
      let fetchedData = await response.json();
      if (fetchedData.status === 200) {
        setCustomerData(fetchedData.results);
        setTotalPages(fetchedData?.totalPages);
      }
    } catch (error) {
      console.log(`Error ${error}`);
    }
  }, [currentPage]);

  const handleDeleteBooking = async (id) => {
    try {
      let deleteData = await axios.delete(`/api/v1/customer/${id}`, {
        method: "delete",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      fetchCustomers();
      alert(deleteData?.data?.Message);
    } catch (error) {
      alert("Something went wrong!");
      console.error("Error deleting booking:", error);
    }
  };
  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);
  return (
    <div className="p-7">
      <Card className="mt-4">
        <CardHeader>
          <div className="flex flex-col w-full items-center gap-2">
            <h2>Customer&apos;s List</h2>
            <div className="flex flex-row justify-evenly w-full items-center gap-4">
              <SearchIcon className="h-4 w-4 opacity-25" />
              <Input
                className="min-w-0 flex-1"
                placeholder="Search orders"
                type="search"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer Name</TableHead>
                <TableHead>Mobile Number</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Latest Appointment Date</TableHead>
                <TableHead>Total Visits</TableHead>
                <TableHead>Edit</TableHead>
                <TableHead>Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customerData.map((customer) => (
                <TableRow key={customer._id}>
                  <TableCell className="font-semibold bg-orange-200 dark:text-black">
                    {customer.name}
                  </TableCell>
                  <TableCell className="font-semibold bg-orange-200 dark:text-black">
                    {customer.phoneNumber}
                  </TableCell>
                  <TableCell>{customer.address.city}</TableCell>
                  <TableCell>
                    {new Date(customer.appointmentDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{customer.totalVisits}</TableCell>
                  <TableCell>
                    <button onClick={() => handleEditSelection({ customer })}>
                      {/* Edit */}
                      <EditIcon />
                    </button>
                  </TableCell>
                  <TableCell>
                    <button onClick={() => handleDeleteBooking(customer._id)}>
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
        {<EditCustomerForm CustomerDetails={CustomerDetails} />}
      </Modal>
    </div>
  );
}

export default Customer;

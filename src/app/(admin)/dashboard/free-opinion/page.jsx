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
import { useEffect, useState } from "react";

function FreeOpinion() {
  const [customerData, setCustomerData] = useState([]);

  let fetchCustomers = async () => {
    try {
      let response = await fetch(`/api/v1/free-opinion`);
      let fetchedData = await response.json();
      if (fetchedData.status === 200) {
        setCustomerData(fetchedData.data);
      }
    } catch (error) {
      console.log(`Error ${error}`);
    }
  };

  const handleDeleteBooking = async (id) => {
    try {
      let deleteData = await axios.patch(`/api/v1/free-opinion/${id}`);
      fetchCustomers();
      alert(deleteData?.data?.Message);
    } catch (error) {
      alert("Something went wrong!");
      console.error("Error deleting booking:", error);
    }
  };
  useEffect(() => {
    fetchCustomers();
  }, []);
  return (
    <div className="p-7">
      <Card className="mt-4">
        <CardHeader>
          <div className="flex items-center gap-2">
            <h2>Free Opinion List</h2>
            {/* <SearchIcon className="h-4 w-4 opacity-25" />
            <Input
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
                <TableHead>Customer Name</TableHead>
                <TableHead>Mobile Number</TableHead>
                <TableHead>Address</TableHead>
                {/* <TableHead>Latest Appointment Date</TableHead> */}
                <TableHead>Total Visits</TableHead>
                <TableHead>Request For</TableHead>
                <TableHead>Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customerData.map((customer) => (
                <TableRow key={customer._id}>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.phoneNumber}</TableCell>
                  <TableCell>{customer.address.city}</TableCell>
                  <TableCell>{customer.totalVisits}</TableCell>
                  <TableCell>{customer.requestFor}</TableCell>
                  <TableCell>
                    <button onClick={() => handleDeleteBooking(customer._id)}>
                      <DeleteIcon />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default FreeOpinion;

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
import { useCallback, useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Modal } from "@/components/helper/Modal";
import { NewEmployeeForm } from "@/app/(admin)/_resources/modalForm/newEmployee";
import { DeleteIcon, EditIcon } from "@/app/_components/social";
import BeatLoading from "@/components/ui/BeatLoading/BeatLoading";
import { Logout } from "../../_resources/utils/logout";

function Employees() {
  const [status, setStatus] = useState([]);
  const [authToken, setAuthToken] = useState([]);
  const [message, setMessage] = useState(<BeatLoading />);
  const [EmployeeData, setEmployeeData] = useState([]);
  const [currentModal, setCurrentModal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleEditSelection = (modalComponent) => {
    setCurrentModal(modalComponent);
    setIsModalOpen(true);
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
    fetchEmployees(authToken);
  };

  const handleDeleteBooking = async (id) => {
    try {
      let deleteData = await fetch(`/api/v1/employee/${id}`, {
        method: "delete",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      let response = await deleteData.json();
      fetchEmployees(authToken);
      alert(response?.message);
    } catch (error) {
      alert("Something went wrong!");
      console.error("L-76, Error deleting booking:", error);
    }
  };

  let fetchEmployees = useCallback(
    async (token) => {
      try {
        let response = await fetch(`/api/v1/employee/pageNum/${currentPage}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        var fetchedData = await response.json();
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
          setEmployeeData(fetchedData?.results);
          setTotalPages(fetchedData?.totalPages);
        } else {
          setStatus(response.status);
        }
      } catch (error) {
        // console.log("L-122, error-------------------->", error);
        throw new Error("Bad fetch response");
      }
    },
    [currentPage]
  );

  useEffect(() => {
    let token = localStorage.getItem("token");
    setAuthToken(token);
    fetchEmployees(token);
  }, [fetchEmployees]);

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
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="w-full flex justify-end">
          <Button
            variant="projectbtn"
            onClick={() => handleEditSelection(<NewEmployeeForm />)}
          >
            Add New Employee
          </Button>
        </div>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              Employees
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
                  <TableHead>Mobile Number</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Qualification</TableHead>
                  <TableHead>Specialization</TableHead>
                  <TableHead>Edit</TableHead>
                  <TableHead>delete</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {EmployeeData.map((employee) => (
                  <TableRow key={employee._id}>
                    <TableCell>{employee.phoneNumber}</TableCell>
                    <TableCell className="font-semibold bg-green-300 dark:text-black uppercase">
                      {employee.name}
                    </TableCell>
                    <TableCell
                      className={`${
                        employee.gender == "Female"
                          ? "bg-pink-500"
                          : "bg-blue-500"
                      }`}
                    >
                      {employee.gender}
                    </TableCell>
                    <TableCell>
                      {employee.designation.charAt(0).toUpperCase() +
                        employee.designation.slice(1)}
                    </TableCell>
                    <TableCell>{employee.qualification}</TableCell>
                    <TableCell>{employee.specialization}</TableCell>
                    <TableCell>
                      <button
                        onClick={() =>
                          handleEditSelection(
                            <NewEmployeeForm employeeDetails={employee} />
                          )
                        }
                      >
                        <EditIcon />
                      </button>
                    </TableCell>
                    <TableCell>
                      <button onClick={() => handleDeleteBooking(employee._id)}>
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
      </main>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {currentModal}
      </Modal>
    </div>
  );
}

export default Employees;

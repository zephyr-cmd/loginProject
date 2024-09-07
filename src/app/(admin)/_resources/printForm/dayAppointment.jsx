import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function DayAppointment(props) {
  console.log("L-10, props fitness------->", props);
  let appointmentData = props?.appointmentData || [];
  let selectedDate = props?.selectedDate || new Date();
  return (
    <div className="flex flex-col justify-center items-center inset-0 p-2 mt-5">
      <Card className="mt-4 w-full">
        <CardHeader className="flex flex-row justify-evenly items-center gap-5">
          <p className="flex font-semibold justify-start">Appointment List</p>
          <p>{new Date(selectedDate).toLocaleDateString()}</p>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="border-black border-b-2 ">
              <TableRow>
                <TableHead>Appointment Id</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>Age / Gender</TableHead>
                <TableHead>Mobile Number</TableHead>
                <TableHead>Request For</TableHead>
                {/* <TableHead>Doctor</TableHead> */}
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className={"mt-5 "}>
              {appointmentData.map((appointment) => (
                <TableRow key={appointment.appointmentId}>
                  <TableCell>{appointment.appointmentId}</TableCell>
                  <TableCell className="font-semibold bg-gray-300">
                    {appointment.name}
                  </TableCell>
                  <TableCell>
                    {appointment.age}/ {appointment.gender}
                  </TableCell>
                  <TableCell className="">{appointment.phoneNumber}</TableCell>
                  <TableCell>{appointment.requestFor}</TableCell>
                  {/* <TableCell>{appointment.doctor}</TableCell> */}
                  <TableCell className="font-semibold bg-gray-300">
                    {appointment.amount}
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

export default DayAppointment;

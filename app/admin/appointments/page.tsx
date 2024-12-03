"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [appointmentTypes, setAppointmentTypes] = useState([]);
  const [users, setUsers] = useState([]);
  const [editingAppointment, setEditingAppointment] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/get-appointments.php")
      .then((response) => response.json())
      .then((data) => setAppointments(data));

    fetch("http://localhost:8080/get-appointment-types.php")
      .then((response) => response.json())
      .then((data) => setAppointmentTypes(data));

    fetch("http://localhost:8080/get-users.php")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const handleEdit = (appointment) => {
    setEditingAppointment(appointment);
  };

  const handleDelete = (id) => {
    const data = new FormData();
    data.append("id", id);

    fetch("http://localhost:8080/delete-appointment.php", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setAppointments(appointments.filter((a) => a.id !== id));
        } else {
          alert(result.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSave = () => {
    setEditingAppointment(null);
    fetch("http://localhost:8080/get-appointments.php")
      .then((response) => response.json())
      .then((data) => setAppointments(data));
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Appointment management</h1>
      <Dialog
        open={editingAppointment !== null}
        onOpenChange={setEditingAppointment}
      >
        <DialogTrigger asChild>
          <Button onClick={() => setEditingAppointment({})}>
            Add Appointment
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingAppointment?.id
                ? "Edit Appointment"
                : "Add new Appointment"}
            </DialogTitle>
          </DialogHeader>
          <AppointmentForm
            appointment={editingAppointment}
            onSave={handleSave}
            appointmentTypes={appointmentTypes}
            users={users}
          />
        </DialogContent>
      </Dialog>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>{appointment.userName}</TableCell>
              <TableCell>{appointment.title}</TableCell>
              <TableCell>{appointment.type}</TableCell>
              <TableCell>{appointment.date}</TableCell>
              <TableCell>{appointment.time}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  onClick={() => handleEdit(appointment)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(appointment.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function AppointmentForm({ appointment, onSave, appointmentTypes, users }) {
  const [userId, setUserId] = useState(appointment?.user_id || "");
  const [appointmentId, setAppointmentId] = useState(
    appointment?.appointment_id || ""
  );
  const [date, setDate] = useState(appointment?.date || "");
  const [time, setTime] = useState(appointment?.time || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    if (appointment?.id) {
      data.append("id", appointment.id);
    }
    data.append("userId", userId);
    data.append("appointmentId", appointmentId);
    data.append("date", date);
    data.append("time", time);

    fetch("http://localhost:8080/save-appointment.php", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          onSave();
        } else {
          alert(result.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          User
        </label>
        <Select
          value={userId.toString()}
          onValueChange={(value) => setUserId(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Choose a user" />
          </SelectTrigger>
          <SelectContent>
            {users.map((user) => (
              <SelectItem key={user.id} value={user.id.toString()}>
                {user.username}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Appointment Type
        </label>
        <Select
          value={appointmentId.toString()}
          onValueChange={(value) => setAppointmentId(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Choose an appointment type" />
          </SelectTrigger>
          <SelectContent>
            {appointmentTypes.map((type) => (
              <SelectItem key={type.id} value={type.id.toString()}>
                {type.title} ({type.type})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Time</label>
        <Input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>
      <Button type="submit">{appointment?.id ? "Refresh" : "Save"}</Button>
    </form>
  );
}

// page.tsx
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

interface AppointmentType {
  id: number;
  title: string;
  type: string;
}

export default function AdminAppointmentTypes() {
  const [appointmentTypes, setAppointmentTypes] = useState<AppointmentType[]>(
    []
  );
  const [editingType, setEditingType] = useState<AppointmentType | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false); // State for Add Dialog

  useEffect(() => {
    fetch("http://localhost:8080/get-appointment-types.php")
      .then((response) => response.json())
      .then((data) => setAppointmentTypes(data))
      .catch((error) =>
        console.error("Error fetching appointment types:", error)
      );
  }, []);

  const handleEdit = (type: AppointmentType) => {
    setEditingType(type);
  };

  const handleDelete = (typeId: number) => {
    fetch("http://localhost:8080/delete-appointment-type.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: typeId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setAppointmentTypes(
            appointmentTypes.filter((type) => type.id !== typeId)
          );
        } else {
          console.error("Delete failed:", data.error);
        }
      })
      .catch((error) =>
        console.error("Error deleting appointment type:", error)
      );
  };

  const handleSave = (updatedType: AppointmentType) => {
    if (updatedType.id) {
      // Edit existing appointment type
      fetch("http://localhost:8080/edit-appointment-type.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedType),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setAppointmentTypes(
              appointmentTypes.map((type) =>
                type.id === updatedType.id ? updatedType : type
              )
            );
            setEditingType(null); // Close Edit Dialog
          } else {
            console.error("Edit failed:", data.error);
          }
        })
        .catch((error) =>
          console.error("Error editing appointment type:", error)
        );
    } else {
      // Add new appointment type
      fetch("http://localhost:8080/add-appointment-type.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedType),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setAppointmentTypes([
              ...appointmentTypes,
              { ...updatedType, id: data.id },
            ]);
            setIsAddDialogOpen(false); // Close Add Dialog
          } else {
            console.error("Add failed:", data.error);
          }
        })
        .catch((error) =>
          console.error("Error adding appointment type:", error)
        );
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Appointment Types</h1>

      {/* Add Appointment Type Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            Add Appointment Type
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new Appointment Type</DialogTitle>
          </DialogHeader>
          <AppointmentTypeForm onSave={handleSave} />
        </DialogContent>
      </Dialog>

      {/* Edit Appointment Type Dialog */}
      <Dialog
        open={editingType !== null}
        onOpenChange={() => setEditingType(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Appointment Type</DialogTitle>
          </DialogHeader>
          {editingType && (
            <AppointmentTypeForm type={editingType} onSave={handleSave} />
          )}
        </DialogContent>
      </Dialog>

      {/* Appointment Types Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointmentTypes.map((type) => (
            <TableRow key={type.id}>
              <TableCell>{type.title}</TableCell>
              <TableCell>{type.type}</TableCell>
              <TableCell>
                {/* Edit Button */}
                <Button
                  variant="outline"
                  className="mr-2"
                  onClick={() => handleEdit(type)}
                >
                  Edit
                </Button>

                {/* Delete Button */}
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(type.id)}
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

function AppointmentTypeForm({
  type,
  onSave,
}: {
  type?: AppointmentType | null;
  onSave: (type: AppointmentType) => void;
}) {
  const [title, setTitle] = useState(type?.title || "");
  const [appointmentType, setAppointmentType] = useState(type?.type || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ id: type?.id || 0, title, type: appointmentType });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label
          htmlFor="type"
          className="block text-sm font-medium text-gray-700"
        >
          Type
        </label>
        <Input
          id="type"
          value={appointmentType}
          onChange={(e) => setAppointmentType(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Save</Button>
    </form>
  );
}

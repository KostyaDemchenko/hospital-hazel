"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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

// Define User type
type User = {
  id: number;
  username: string;
  email: string;
  phone: string;
};

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = async () => {
      const response = await fetch("http://localhost:8080/admin-profile.php", {
        credentials: "include",
      });
      if (response.status !== 200) {
        router.push("/admin/login");
      }
    };

    checkAdmin();
    fetchUsers();
  }, [router]);

  const fetchUsers = () => {
    fetch("http://localhost:8080/get-users.php", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  const handleDelete = (id: number) => {
    const data = new FormData();
    data.append("id", id.toString());

    fetch("http://localhost:8080/delete-user.php", {
      method: "POST",
      body: data,
      credentials: "include",
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setUsers(users.filter((u) => u.id !== id));
        } else {
          alert(result.error);
        }
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  const handleSave = () => {
    setEditingUser(null);
    setIsAddUserDialogOpen(false); // Close the Add User dialog if it was open
    fetchUsers();
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Users Management</h1>

      {/* Dialog for Adding a New User */}
      <Dialog
        open={isAddUserDialogOpen}
        onOpenChange={(open) => setIsAddUserDialogOpen(open)}
      >
        <DialogTrigger asChild>
          <Button onClick={() => setIsAddUserDialogOpen(true)}>
            Add User
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add User</DialogTitle>
          </DialogHeader>
          <UserForm user={null} onSave={handleSave} />
        </DialogContent>
      </Dialog>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>
                {/* Dialog for Editing an Existing User */}
                <Dialog
                  open={editingUser?.id === user.id}
                  onOpenChange={(open) => {
                    if (!open) setEditingUser(null);
                  }}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="mr-2"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit User</DialogTitle>
                    </DialogHeader>
                    <UserForm user={editingUser} onSave={handleSave} />
                  </DialogContent>
                </Dialog>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(user.id)}
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

function UserForm({ user, onSave }: { user: User | null; onSave: () => void }) {
  const [name, setName] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");

  useEffect(() => {
    if (user) {
      setName(user.username);
      setEmail(user.email);
      setPhone(user.phone);
    } else {
      setName("");
      setEmail("");
      setPhone("");
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    if (user?.id) {
      data.append("id", user.id.toString());
    }
    data.append("name", name);
    data.append("email", email);
    data.append("phone", phone);

    const url = "http://localhost:8080/save-user.php";

    fetch(url, {
      method: "POST",
      body: data,
      credentials: "include",
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          onSave();
        } else {
          alert(result.error);
        }
      })
      .catch((error) => console.error("Error saving user:", error));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700"
        >
          Phone
        </label>
        <Input
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <Button type="submit">{user?.id ? "Обновить" : "Сохранить"}</Button>
    </form>
  );
}

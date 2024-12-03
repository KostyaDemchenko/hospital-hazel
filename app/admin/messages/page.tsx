"use client";

import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
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

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const checkAdminAndFetchMessages = async () => {
      const response = await fetch("http://localhost:8080/admin-profile.php", {
        credentials: "include",
      });
      if (response.status !== 200) {
        router.push("/admin/login");
      } else {
        // Получаем сообщения с сервера
        const messagesResponse = await fetch(
          "http://localhost:8080/get-messages.php",
          { credentials: "include" }
        );
        if (messagesResponse.ok) {
          const data = await messagesResponse.json();
          setMessages(data);
        } else {
          console.error("Could not fetch messages");
        }
      }
    };

    checkAdminAndFetchMessages();
  }, [router]);

  const handleDelete = async (messageId) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this message?"
    );
    if (!confirmDelete) return;
    try {
      const response = await fetch(
        "http://localhost:8080/delete-messages.php",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            id: messageId,
          }),
        }
      );
      if (response.ok) {
        // Удаляем сообщение из состояния
        setMessages(messages.filter((message) => message.id !== messageId));
      } else {
        console.error("Could not delete message");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Messages</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages.map((message) => (
            <TableRow key={message.id}>
              <TableCell>{message.name}</TableCell>
              <TableCell>{message.email}</TableCell>
              <TableCell>{message.created_at}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="mr-2">
                      Show
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Message from {message.name}</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                      <p>
                        <strong>Email:</strong> {message.email}
                      </p>
                      <p>
                        <strong>Phone:</strong> {message.phone}
                      </p>
                      <p>
                        <strong>Date:</strong> {message.created_at}
                      </p>
                      <p>
                        <strong>Message:</strong>
                      </p>
                      <p className="mt-2">{message.message}</p>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(message.id)}
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

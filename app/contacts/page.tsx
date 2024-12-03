"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin, Phone, Mail } from "lucide-react";

const API_URL = "http://localhost:8080/save-message.php"; // Update if different

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    // Combine first name and last name into a single name field
    const combinedName = `${formData.firstName} ${formData.lastName}`.trim();

    const data = new FormData();
    data.append("name", combinedName);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("message", formData.message);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: data,
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        setStatus("error");
        setError(result.error || "An unexpected error occurred.");
      }
    } catch (err) {
      setStatus("error");
      setError("Failed to send message. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="relative h-[300px] bg-gray-900">
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Contact Us!</h1>
            <p className="max-w-md mx-auto">
              Questions, comments, or suggestions? Simply fill in the form and
              we'll be in touch shortly.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Success and Error Messages */}
                {status === "success" && (
                  <div className="p-4 bg-green-100 text-green-700 rounded">
                    Message sent successfully!
                  </div>
                )}
                {status === "error" && error && (
                  <div className="p-4 bg-red-100 text-red-700 rounded">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First Name
                    </label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      placeholder="Your First Name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      placeholder="Your Last Name"
                    />
                  </div>
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
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Your Email"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Your Phone Number"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Your message..."
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    rows={5}
                  ></Textarea>
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information Cards */}
          <div className="grid gap-6">
            <Card className="bg-[#E6E6FF]">
              <CardContent className="p-6 flex gap-4">
                <MapPin className="h-6 w-6" />
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p>Tarasa Shevchenko Boulevard, Kyiv, Ukraine, 40001</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#E6E6FF]">
              <CardContent className="p-6 flex gap-4">
                <Clock className="h-6 w-6" />
                <div>
                  <h3 className="font-semibold">Opening Hours</h3>
                  <p>08:00 AM to 10:00 PM</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#E6E6FF]">
              <CardContent className="p-6 flex gap-4">
                <Phone className="h-6 w-6" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p>+380 98 765 43 21</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#E6E6FF]">
              <CardContent className="p-6 flex gap-4">
                <Mail className="h-6 w-6" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p>center@gmail.com</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Google Map */}
        <div className="mt-12 h-[400px] rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.5277145364197!2d30.50742081573773!3d50.44171797947591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce56b2456d3b%3A0xd062ae171b57e947!2sGolden%20Gate!5e0"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}

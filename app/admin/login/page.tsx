"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});

    const response = await fetch("http://localhost:8080/admin-login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ username, password }),
      credentials: "include", // Убедитесь, что это включено для отправки куки
    });

    if (response.ok) {
      // Логин успешен, редирект на страницу dashboard
      router.push("/admin/dashboard");
    } else {
      const data = await response.json();
      setErrors(data.errors || { password: "Login failed" });
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold text-center'>
            Admin Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <label
                htmlFor='username'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                Username
              </label>
              <Input
                id='username'
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              {errors.username && (
                <p className='text-red-500 text-sm justify-center mt-1'>
                  {errors.username}
                </p>
              )}
            </div>
            <div className='space-y-2'>
              <label
                htmlFor='password'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                Password
              </label>
              <Input
                id='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {errors.password && (
                <p className='text-red-500 text-sm justify-center mt-1'>
                  {errors.password}
                </p>
              )}
            </div>
            <Button type='submit' className='w-full'>
              Log in
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

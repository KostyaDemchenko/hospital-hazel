"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});

    try {
      const response = await fetch("http://localhost:8080/sign-in.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ email, password }),
        credentials: "include",
      });

      if (response.ok) {
        router.push("/profile");
      } else if (response.status === 401) {
        const data = await response.json();
        setErrors(data.errors);
      } else {
        const data = await response.json();
        setErrors({ general: data.error || "Login failed" });
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrors({ general: "Network error. Please try again." });
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-[#FFF5EE] p-4'>
      <Card className='w-full max-w-md'>
        <CardContent className='p-6'>
          <h1 className='text-2xl font-bold text-center mb-6'>Sign In</h1>
          <form className='space-y-4' onSubmit={handleSubmit}>
            <div>
              <Input
                type='email'
                placeholder='Your Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className='text-red-500 text-sm justify-center mt-1'>
                  {errors.email}
                </p>
              )}
            </div>
            <div>
              <Input
                type='password'
                placeholder='Your Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className='text-red-500 text-sm justify-center mt-1'>
                  {errors.password}
                </p>
              )}
            </div>
            {errors.general && (
              <p className='text-red-500 text-sm justify-center mt-1'>
                {errors.general}
              </p>
            )}
            <Button className='w-full bg-pink-200 hover:bg-pink-300 text-black'>
              Login
            </Button>
          </form>
          <p className='text-center mt-4 text-sm'>
            Don't have an account?{" "}
            <Link href='/sign-up' className='text-blue-600 hover:underline'>
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

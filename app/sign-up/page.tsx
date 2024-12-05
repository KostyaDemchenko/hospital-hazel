"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    setErrors({});

    // Отправляем null, если userPhoto пустое
    const response = await fetch("http://localhost:8080/sign-up.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username,
        email,
        phone,
        password,
        user_photo: userPhoto || "", // Если поле пустое, отправляем пустую строку
      }),
      credentials: "include",
    });

    if (response.ok) {
      router.push("/profile");
    } else if (response.status === 422) {
      const data = await response.json();
      setErrors(data.errors);
    } else {
      alert("Registration failed");
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-[#FFF5EE] p-4'>
      <Card className='w-full max-w-md'>
        <CardContent className='p-6'>
          <h1 className='text-2xl font-bold text-center mb-6'>Sign Up</h1>
          <form className='space-y-4' onSubmit={handleSubmit}>
            <div>
              <Input
                type='text'
                placeholder='Your Name Surname'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && (
                <p className='text-red-500 text-sm justify-center mt-1'>
                  {errors.username}
                </p>
              )}
            </div>
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
                type='text'
                placeholder='Your Phone Number'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {errors.phone && (
                <p className='text-red-500 text-sm justify-center mt-1'>
                  {errors.phone}
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
            <div>
              <Input
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors.confirmPassword && (
                <p className='text-red-500 text-sm justify-center mt-1'>
                  {errors.confirmPassword}
                </p>
              )}
            </div>
            <div>
              <Input
                type='text'
                placeholder='Profile Image URL (optional)'
                value={userPhoto}
                onChange={(e) => setUserPhoto(e.target.value)}
              />
            </div>
            <div className='flex justify-center mt-4'>
              <Button type='submit'>Sign Up</Button>
            </div>
          </form>
          <p className='text-sm mt-4 text-center'>
            Already have an account?{" "}
            <Link href='/login' className='text-blue-500'>
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

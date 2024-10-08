"use client";
import { FormControl } from "@mui/joy";
import InputField from "@/component/shared/form/InputField";
import { FormLabel } from "@mui/joy";
import { Sheet } from "@mui/joy";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Typography } from "@mui/material";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { errorMsg, successMsg } from "@/component/Toastmsg/toaster";
import { routesUrl } from "@/utils/pagesurl";
import { loginvalidation } from "@/component/Validation/loginvalidation";
import { yupResolver } from "@hookform/resolvers/yup";
const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginvalidation) });
  const [error, setError] = useState(null);
  const router = useRouter();

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res.error) {
        return errorMsg("Inavalid credentials");
      } else {
        router.replace(routesUrl.products);
        return successMsg("Login Successfully");
      }
    } catch (error) {
      return errorMsg("Login Error");
    }
  };
  return (
    <>
      <Sheet
        sx={{
          width: 500,
          mx: "auto",
          my: 4,
          py: 3,
          px: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRadius: "sm",
          boxShadow: "md",
        }}
        variant="outlined"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Typography variant="h4">
              <b>Welcome!</b>
            </Typography>
            <Typography variant="h6">
              <b>Email :</b> test@gmail.com
            </Typography>
            <Typography variant="h6">
              <b>Password :</b> 123456zx
            </Typography>
            <Typography variant="body2">Sign in to continue.</Typography>
          </div>

          <div>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <InputField
                control={control}
                name="email"
                type="email"
                placeholder="example123@gmail.com"
                required
              />
              <Typography variant="body2" color="error" gutterBottom>
                {errors?.email?.message}
              </Typography>
            </FormControl>
          </div>
          <div>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <InputField
                control={control}
                name="password"
                type="password"
                required
              />
              <Typography variant="body2" color="error" gutterBottom>
                {errors?.password?.message}
              </Typography>
            </FormControl>
          </div>
          <div>
            <Button
              type="submit"
              className="mt-2 bg-red-600 hover:bg-red-700 text-white font-bold cursor-pointer px-6 py-2 rounded-md transition duration-300"
            >
              Login
            </Button>
          </div>
          <div>
            {error}
            <Typography
              variant="body2"
              sx={{ alignSelf: "center" }}
              className="mt-2"
            >
              {` Don't have an account?`} <Link href="/sign-up">Sign up</Link>
            </Typography>
          </div>
        </form>
      </Sheet>
    </>
  );
};

export default Login;

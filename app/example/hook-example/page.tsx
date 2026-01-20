"use client";

import { useState,useEffect, ChangeEvent } from "react";
import { LoginForm } from "./hooks/login-form";
import { UseRegisterForm } from "./hooks/use-register-form";
import RegisterForm from "./_component/register-form";
export default function HookExample() {
    const form = UseRegisterForm();
  

    return (
        <div>
             <RegisterForm/>
        </div>
    );
}
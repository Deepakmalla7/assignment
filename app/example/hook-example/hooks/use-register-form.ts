import { useState } from "react";

export const UseRegisterForm = () =>{
    const [firstname,setFirstName] = useState("");
    const [lastname,setLastName] = useState("");
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");

// handleFirstName, handleLastName, handleEmail, handleUsername,
// handlepassword, handleConfirmPassword
// handleSubmit function to:
// - validate if fields are empty: Alert All fields are required
// - validate if password and confirm password are same: Alert Passwords do not match
// - if all validations pass: Alert Registration Successful for ‹username>
// return only what is needed from the custom hook, skip exporting setter functions
// use this custom hook in register-form component
// IMPORTANT: hooks/custom hooks import should be client components

    const handleFirstName = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setFirstName(e.target.value);
    }
    const handleLastName = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setLastName(e.target.value);
    }
    const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setUsername(e.target.value);
    }
    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setEmail(e.target.value);
    }
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setPassword(e.target.value);
    }
    const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setConfirmPassword(e.target.value);
    }
    const handleSubmit = () => {
        if (!firstname || !lastname || !email || !password || !confirmPassword) {
            alert("All fields are required");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        alert(`Registration Successful for ${firstname}`);
    }
    return{
        firstname,
        lastname,
        username,
        email,
        password,
        confirmPassword,
        handleFirstName,
        handleLastName,
        handleUsername,
        handleEmail,
        handlePassword,
        handleConfirmPassword,
        handleSubmit
    }
}
import { ChangeEvent, useState } from "react";

export const LoginForm = () => {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
    };

    const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            username: username,
            password: password,
        };
        alert(`Username: ${username}\nPassword: ${password}`);
    };

    return {
        username,
        email,
        password,
        handleUsername,
        handleEmail,
        handlePassword,
        handleSubmit,
    };
};

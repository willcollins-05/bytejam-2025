"use client";
import React, { useState } from "react";
import { users } from "@/types/database-types";
import { hashPassword } from "@/lib/auth/session";
import {
  createNewUser,
  getUserByEmail,
  getUserByUsername,
} from "@/lib/supabase/queries";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation'

export function LoginForm() {
  const router = useRouter();
  const [isSignIn, setIsSignIn] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const addErrorMessage = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    }, 5000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (isSignIn) {
      try {
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (result?.error) {
          addErrorMessage('Invalid email or password.');
        } else {
          router.push('/');
          router.refresh();
        }
      } catch (error) {
        addErrorMessage("Invalid email or password.");
        console.log(error);
      }
    } else {
      try {
        const usernameQuery = await getUserByUsername(username);
        if (usernameQuery.username == username) {
          addErrorMessage("Username already taken.");
          return;
        }
        const emailQuery = await getUserByEmail(email);
        if (emailQuery.email == email) {
          addErrorMessage("Email already in use.");
          return;
        }

        const newUser: users = {
          username: username,
          email: email,
          password_hash: await hashPassword(password),
          created_at: new Date().toISOString(),
          pfp_url: null,
        };

        await createNewUser(newUser);

        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (result?.error) {
          addErrorMessage('Invalid email or password.');
        } else {
          router.push('/');
          router.refresh();
        }
      } catch (error) {
        addErrorMessage("Error creating user.");
        console.log(error);
      }
    }
  };

  return (
    <div className="bg-white dark:bg-black p-8 rounded-lg shadow-xl  dark:border-gray-500 border-[.75px]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {isSignIn ? <h2 className="text-center font-semibold text-[30px]">Sign In</h2> : <h2 className="text-center font-semibold text-[30px]">Sign Up</h2>}
        {errorMessage.length > 0 && (
          <p style={{ color: "red" }} className="text-center">{errorMessage}</p>
        )}
        <div>
          {!isSignIn && (
            <>
              <label htmlFor="username">Username: </label>
              <input
            className="w-full rounded-lg px-2 dark:bg-black dark:border-white border-[.75px]"
                type="text"
                name="username"
                id="username"
                placeholder="Username..."
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </>
          )}
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            className="w-full rounded-lg px-2 dark:bg-black dark:border-white border-[.75px]"
            type="email"
            name="email"
            id="email"
            placeholder="example@email.com"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            className="w-full rounded-lg px-2 dark:bg-black dark:border-white border-[.75px]"
            type="password"
            name="password"
            id="password"
            placeholder="Password..."
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="text-center">
          <button className="bg-gray-200 hover:bg-gray-300 dark:bg-[rgb(33,33,33)] w-[50%] p-2 rounded-lg content-center dark:hover:bg-[rgb(76,76,76)]" type="submit">{isSignIn ? "Sign In" : "Sign Up"}</button>
        </div>
        
        <p className="text-center">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
          <button className="underline" type="button" onClick={() => setIsSignIn(!isSignIn)}>
            {isSignIn ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </form>
    </div>
  );
}

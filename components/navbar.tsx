"use client";
import { ThemeSwitcher } from "@/components/theme-switcher";
import LogoutButton from "@/components/logout-button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (status == "authenticated") {
      setIsLoggedIn(true);
    }
  }, [session, status]);

  const handleToDashboard = (e: any) => {
    router.push(`/`);
    router.refresh();
  };

  const handleNewFestival = (e: any) => {
    router.push("/festival/new");
    router.refresh();
  };

  const toLoginPage = () => {
    router.push("/auth/login");
    router.refresh();
  };

  return (
    <nav
      className={`border-b-2 p-6 flex items-center justify-between dark:bg-gray-900 dark:border-gray-700 bg-white border-gray-300`}
    >
      <h1
        className={`text-3xl font-bold text-gray-900 dark:text-white cursor-pointer`}
        onClick={(e) => handleToDashboard(e)}
      >
        Festival Builder
      </h1>
      <div className="flex flex-row">
        {isLoggedIn ? (
          <>
            <LogoutButton />
            <button
              onClick={(e) => handleNewFestival(e)}
              className={`mx-6 px-6 py-2 rounded-md font-medium bg-blue-500 hover:bg-blue-600 text-white`}
            >
              New Festival
            </button>
          </>
        ) : (
          <>
            <button
              className="mx-6 px-6 py-2 rounded-md font-medium dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 bg-black text-white hover:bg-gray-700"
              onClick={(e) => toLoginPage()}
            >
              Sign Up/Login
            </button>
          </>
        )}

        <div className="flex items-center space-x-6">
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}

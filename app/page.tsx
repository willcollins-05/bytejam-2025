"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    setUsername(session?.user.username || "");
  }, [session, status]);

  const toLoginPage = () => {
    router.push("/auth/login");
    router.refresh();
  };

  const toFestivalList = () => {
    router.push("/festival/list");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}

      {/* Main Content */}
      <main className="py-30 flex justify-center items-center min-h-[80vh]">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
            <div className="w-full md:w-1/2 flex justify-center">
              <Image
                src="/images/festival-logo-new.png"
                width={800}
                height={800}
                alt="Festival Logo"
                className="rounded-lg"
              />
            </div>
            <div className="w-full md:w-1/2 max-w-md">
              {username === "" ? (
                <button
                  className="p-[100px] bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg mb-6 w-full font-semibold"
                  onClick={(e) => toLoginPage()}
                >
                  Sign Up/Login
                </button>
              ) : (
                <>
                  <h2>Welcome to the Festival Builder</h2>
                  <button
                    className="p-[100px] bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg mb-6 w-full font-semibold"
                    onClick={(e) => toFestivalList()}
                  >
                    View Festivals
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import { getAllFestivals, getAllUsers } from "@/lib/supabase/queries";
import { festivalsWithUsers } from "@/types/database-types";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import LogoutButton from "@/components/logout-button";

// Main Page Component
export default function UserListPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [festivals, setFestivals] = useState<festivalsWithUsers[]>([]);
  const [userId, setUserId] = useState<number>();
  const [error, setError] = useState<string>("");

  const addErrorMessage = (message: string) => {
    setError(message);
    setTimeout(() => {
      setError('');
    }, 5000)
  }

  useEffect(() => {
    setUserId((session?.user.id || -1) as number);
  }, [session, status]);

  useEffect(() => {
    const getAllFestivalsFromDB = async () => {
      const festivalsFromDB = await getAllFestivals();
      const festivalList: festivalsWithUsers[] = [];
      const usersFromDB = await getAllUsers();
      festivalsFromDB.forEach((festival) => {
        const userFound = usersFromDB.find(
          (item) => item.id == festival.user_id
        );
        if (userFound) {
          festivalList.push({
            ...festival,
            username: userFound.username,
          });
        }
      });
      setFestivals(festivalList);
    };

    getAllFestivalsFromDB();
  }, []);

  const handleEditFestival = (e: any, id: number) => {
    router.push(`/festival/edit/${id}`);
    router.refresh();
  };

  const handleViewFestival = (e: any, id: number) => {
    router.push(`/festival/view/${id}`);
    router.refresh();
  };

  const handleShowMore = (e: any) => {
    addErrorMessage('No more festivals to show.')
  };

  return (
    <div className={`min-h-screen 'dark:bg-gray-900' 'bg-gray-50'`}>
      {/* Header */}
      

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* User List */}
        <div className={`border-2 mb-6 dark:border-gray-700 border-gray-300`}>
          {festivals.map((festival) => (
            <div
              key={festival.id}
              className={`p-6 flex items-center justify-between dark:bg-gray-800 dark:border-gray-700 bg-white border-gray-300`}
            >
              <div className="flex items-center gap-6">
                <span
                  className={`text-lg font-medium dark:text-white text-gray-900`}
                >
                  {festival.name}
                </span>
                <span className={`text-lg dark:text-gray-400 text-gray-600`}>
                  @{festival.username}
                </span>
              </div>
              <div>
                {festival.user_id == userId && (
                  <button
                    className={`mx-6 px-8 py-2 rounded font-medium bg-gray-600 text-white hover:bg-gray-700 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600`}
                    onClick={(e) =>
                      handleEditFestival(e, festival.id as number)
                    }
                  >
                    Edit
                  </button>
                )}
                <button
                  className={`px-8 py-2 rounded font-medium bg-gray-600 text-white hover:bg-gray-700 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600`}
                  onClick={(e) => handleViewFestival(e, festival.id as number)}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>

        {error.length > 0 && (
          <p style={{ color: "red" }} className="text-center">{error}</p>
        )}

        {/* Show More Button */}
        <div className="flex justify-center">
          <button
            className={`px-10 py-3 rounded font-medium text-lg bg-gray-600 text-white hover:bg-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600`}
            onClick={(e) => handleShowMore(e)}
          >
            Show More
          </button>
        </div>
      </div>
    </div>
  );
}

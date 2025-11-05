// import { DeployButton } from "@/components/deploy-button";
// import { EnvVarWarning } from "@/components/env-var-warning";
// import { AuthButton } from "@/components/auth-button";
// import { Hero } from "@/components/hero";
// import { ThemeSwitcher } from "@/components/theme-switcher";
// import { ConnectSupabaseSteps } from "@/components/tutorial/connect-supabase-steps";
// import { SignUpUserSteps } from "@/components/tutorial/sign-up-user-steps";
// import { hasEnvVars } from "@/lib/utils";
// import Link from "next/link";

// export default function Home() {
//   return (
//     <main className="min-h-screen flex flex-col items-center">
//       <div className="flex-1 w-full flex flex-col gap-20 items-center">
//         <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
//           <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
//             <div className="flex gap-5 items-center font-semibold">
//               <Link href={"/"}>Next.js Supabase Starter</Link>
//               <div className="flex items-center gap-2">
//                 <DeployButton />
//               </div>
//             </div>
//             {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
//           </div>
//         </nav>
//         <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
//           <Hero />
//           <main className="flex-1 flex flex-col gap-6 px-4">
//             <h2 className="font-medium text-xl mb-4">Next steps</h2>
//             {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
//           </main>
//         </div>

//         <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
//           <p>
//             Powered by{" "}
//             <a
//               href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
//               target="_blank"
//               className="font-bold hover:underline"
//               rel="noreferrer"
//             >
//               Supabase
//             </a>
//           </p>
//           <ThemeSwitcher />
//         </footer>
//       </div>
//     </main>
//   );
// }




import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";
import { LoginForm } from "@/components/login-form";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                  ByteJam Festival Builder
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-6">
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="py-30">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
            <div className="w-full md:w-1/2 flex justify-center">
              <Image
                src="/logo.png"
                width={800}
                height={800}
                alt="ByteJam Logo"
                className="rounded-lg"
              />
            </div>
            <div className="w-full md:w-1/2 max-w-md">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl text-center">
                <LoginForm />
              </h2>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}



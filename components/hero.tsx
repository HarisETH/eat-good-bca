import NextLogo from "./next-logo";
import SupabaseLogo from "./supabase-logo";
import Timeline from "./Timeline";
import Link from "next/link";
export default function Header() {
  return (
    <div className="flex flex-col gap-12 items-center">
      <div className="flex  justify-center items-center">
        <h1 className="text-6xl font-black">EatGood</h1>
      </div>
      <h1 className="sr-only">Supabase and Next.js Starter Template</h1>
      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt, obcaecati!
      </p>
      <Link href="/docs" type="button" className="py-2.5 px-5 me-2 mb-2 w-fit text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                Check out the Docs
                </Link>
                
                <div className="px-12 mb-6">
                <Timeline></Timeline>
              </div>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}

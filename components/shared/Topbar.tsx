"use client";
import { OrganizationSwitcher, SignedIn, SignOutButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Image from "next/image";
import Link from "next/link";

function Topbar() {
  return (
    <nav className="topbar flex items-center justify-between bg-black text-light-1 py-4 px-4 md:px-8">
      {/* Logo and title */}
      <Link href="/">
        <div className="flex items-center gap-4">
          <Image
            src="/logo.svg"
            alt="logo"
            width={28}
            height={28}
            className="h-8 w-8 md:h-10 md:w-10" // Use Image props directly
          />
          <p className="text-heading3-bold max-xs:hidden">EthAIAuditHub</p>
        </div>
      </Link>{}

      {/* Navigation links */}
        {/* Navigation links */}
        <div className="flex items-center space-x-12 md:space-x-12">
          {/* Use space-x instead of gap for consistent spacing */}
          <Link href="https://github.com/JayanaGunaweera01/EthAIAuditHub">
            <button className="bg-blue-500 text-white border-2 border-blue-500 px-6 py-3 rounded-full transition duration-300 ease-in-out hover:bg-teal-600">
              Try An Audit
            </button>
          </Link>

          <Link href="/host-a-challenge">
            <button className="bg-blue-500 text-white border-2 border-blue-500 px-6 py-3 rounded-full transition duration-300 ease-in-out hover:bg-teal-700">
              Host A Challenge
            </button>
          </Link>

          <Link href="https://medium.com/@jguwera98">
            <button className="bg-blue-500 text-white border-2 border-blue-500 px-6 py-3 rounded-full transition duration-300 ease-in-out hover:bg-teal-800">
              Read Blogs
            </button>
          </Link>
        </div>



      {/* User actions */}
      <div className="flex items-center gap-4">
        <SignedIn>
          <SignOutButton>
            <div className="flex cursor-pointer">
              <Image
                src="/assets/logout.svg"
                alt="logout"
                width={24}
                height={24}
                className="h-6 w-6" // Use Image props directly
              />
            </div>
          </SignOutButton>
        </SignedIn>

        <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }}
        />
      </div>
    </nav>
  );
}

export default Topbar;

// Custom button component (optional)
const Button = ({ children, className }: { children: React.ReactNode, className: string }) => (
  <Link href="#" className={`text-base font-semibold px-4 py-2 rounded-lg ${className}`}>{children}</Link>
);


// import { Button } from "@/components/ui/button";
// import FileUpload from "@/components/FileUpload";

// export default async function Home() {
//   return (
//     <div className="w-screen min-h-screen bg-gradient-to-r from-gray-900 to-black text-white flex items-center justify-start p-8">
//       <div className="text-left max-w-4xl">
//         <h1 className="text-6xl font-extrabold mb-2 text-teal-400 tracking-tight">EthAIAuditHub</h1>
//         <h2 className="text-4xl font-semibold mb-6 text-teal-200">Audit Your ML Model Output Report</h2>
//         <p className="text-lg leading-relaxed mb-8 text-justify">
//           Your trusted companion for auditing ML model outputs. Ensure accuracy, fairness, and ethics effortlessly.
//           {' '}User-friendly interface for insights and compliance. Trustworthy AI made simple.
//         </p>
//         <Button className="bg-teal-500 hover:bg-teal-600 py-2 px-4 rounded-md font-semibold">See Chats</Button>
//         <div className="w-full mt-4">
//           (
//               <FileUpload />
//             )
//             </div>
//       </div>
//     </div>
//   );
// }

import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import UserCard from "@/components/cards/UserCard";
import Searchbar from "@/components/shared/Searchbar";
import Pagination from "@/components/shared/Pagination";

import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchUsers({
    userId: user.id,
    searchString: searchParams.q,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 25,
  });

  return (
    <section>
      <h1 className='head-text mb-10'>Search</h1>

      <Searchbar routeType='search' />

      <div className='mt-14 flex flex-col gap-9'>
        {result.users.length === 0 ? (
          <p className='no-result'>No Result</p>
        ) : (
          <>
            {result.users.map((person) => (
              <UserCard
                key={person.id}
                id={person.id}
                name={person.name}
                username={person.username}
                imgUrl={person.image}
                personType='User'
              />
            ))}
          </>
        )}
      </div>

      <Pagination
        path='search'
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </section>
  );
}

export default Page;


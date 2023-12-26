import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowRight, LogIn } from "lucide-react";
import FileUpload from "@/components/FileUpload";
import { checkSubscription } from "@/lib/subscription";
import SubscriptionButton from "@/components/SubscriptionButton";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default function Home({ initialUser }: { initialUser: any }) {
  const [isAuth, setIsAuth] = useState(false);
  const [firstChat, setFirstChat] = useState<null | {
    id: number;
    userId: string;
    createdAt: Date;
    pdfName: string;
    pdfUrl: string;
    fileKey: string;
  }>(null);
  const [isPro, setIsPro] = useState(false);
  const user = useUser();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const userId = (user?.id as string) || '';
        const authStatus = !!userId;
        setIsAuth(authStatus);

        if (authStatus) {
          const chatsResult = await db
            .select()
            .from(chats)
            .where(eq(chats.userId, userId));

          if (chatsResult && chatsResult.length > 0) {
            setFirstChat(chatsResult[0]);
          }
        }

        const proStatus = await checkSubscription();
        setIsPro(!!proStatus);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold">Chat with any PDF</h1>
            <UserButton afterSignOutUrl="/" />
          </div>

          <div className="flex mt-2">
            {isAuth && firstChat && (
              <>
                <Link href={`/chat/${firstChat.id}`}>
                  <Button>
                    Go to Chats <ArrowRight className="ml-2" />
                  </Button>
                </Link>
                <div className="ml-3">
                  <SubscriptionButton isPro={isPro} />
                </div>
              </>
            )}
          </div>

          <p className="max-w-xl mt-1 text-lg text-slate-600">
            Join millions of students, researchers, and professionals to instantly
            answer questions and understand research with AI
          </p>

          <div className="w-full mt-4">
            {isAuth ? (
              <FileUpload />
            ) : (
              <Link href="/sign-in">
                <Button>
                  Login to get Started!
                  <LogIn className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// This function runs on the server side before rendering the component
export async function getServerSideProps() {
  const { userId } = await auth();
  const user = userId ? { id: userId } : null;
  return { props: { initialUser: user } };
}

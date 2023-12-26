import { Button } from "@/components/ui/button";
import FileUpload from "@/components/FileUpload";

export default async function Home() {
  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-gray-900 to-black text-white flex items-center justify-start p-8">
      <div className="text-left max-w-4xl">
        <h1 className="text-6xl font-extrabold mb-2 text-teal-400 tracking-tight">EthAIAuditHub</h1>
        <h2 className="text-4xl font-semibold mb-6 text-teal-200">Audit Your ML Model Output Report</h2>
        <p className="text-lg leading-relaxed mb-8 text-justify">
          Your trusted companion for auditing ML model outputs. Ensure accuracy, fairness, and ethics effortlessly.
          {' '}User-friendly interface for insights and compliance. Trustworthy AI made simple.
        </p>
        <Button className="bg-teal-500 hover:bg-teal-600 py-2 px-4 rounded-md font-semibold">See Chats</Button>
        <div className="w-full mt-4">
          (
              <FileUpload />
            )
            </div>
      </div>
    </div>
  );
}

import TabGenerator from "@/components/TabGenerator";

export const metadata = {
  title: "Tabs",
  description: "Build and export accessible HTML for Moodle.",
};

export default function TabsPage() {
  return (
    <main className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto p-8">
        <h1 className="text-5xl font-bold mb-8 text-center dark:text-gray-100 text-gray-900">
          Tabs Generator Page
        </h1>

        <TabGenerator />
      </div>
    </main>
  );
}

import TabGenerator from "@/components/TabGenerator";

export const metadata = {
  title: "Tabs",
  description: "Build and export accessible HTML for Moodle.",
};

export default function TabsPage() {
  return (
    <main className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto p-8">
        <TabGenerator />
      </div>
    </main>
  );
}

export default function Footer({
  studentName,
  studentNumber,
}: {
  studentName: string;
  studentNumber: string;
}) {
  const currentDate = new Date().toLocaleDateString("en-AU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <footer
      className="px-4 py-4 text-sm text-center text-gray-600 dark:text-gray-300 border-t border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900"
      role="contentinfo"
    >
      <p>
        &copy; {new Date().getFullYear()} {studentName} — Student No:{" "}
        {studentNumber}
      </p>
      <p>{currentDate}</p>
    </footer>
  );
}

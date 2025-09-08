"use client";

import Breadcrumbs from "@/components/Breadcrumbs";

export default function AboutContent() {
  return (
    <main
      aria-labelledby="about-heading"
      style={{ padding: "2rem", fontFamily: "sans-serif" }}
    >
      <Breadcrumbs />
      <div className="flex flex-col items-center justify-center text-center min-h-[20vh] px-4 space-y-4">
        <h1 className="big-title">About Page</h1>

        <section
          aria-labelledby="intro-heading"
          style={{ marginBottom: "2rem" }}
        >
          <h2 id="intro-heading">Introduction to the Website</h2>
          <p>Welcome to my CSE3CWA website.</p>
          <p>
            My name is <strong>Steph Newland</strong>, and my student number is{" "}
            <strong>21993608</strong>.
          </p>
        </section>

        <section className="w-full max-w-2xl mx-auto space-y-2">
          <h2 id="video-heading">Watch the Video Tutorial</h2>
          <video
            controls
            className="w-full rounded-lg shadow-md"
            aria-label="Video tutorial on how to use this website"
          >
            <source src="/demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </section>
      </div>
    </main>
  );
}

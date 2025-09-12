"use client";

import Breadcrumbs from "@/components/Breadcrumbs";

export default function AboutContent() {
  return (
    <main role="main" aria-labelledby="about-heading">
      <Breadcrumbs />
      <div className="flex flex-col items-center justify-center text-center min-h-[20vh] px-4 space-y-4">
        <h1 id="about-heading" className="big-title">
          About Page
        </h1>

        <section
          aria-labelledby="intro-heading"
          style={{ marginBottom: "2rem" }}
        >
          <h2 id="intro-heading">Welcome to my CSE3CWA website.</h2>

          <p>
            My name is <strong>Steph Newland</strong>, and my student number is{" "}
            <strong>21993608</strong>.
          </p>
        </section>

        <section
          aria-labelledby="video-heading"
          className="w-full mx-auto space-y-2"
        >
          <h2 id="video-heading">Watch the Video Tutorial</h2>
          <div
            className="w-full rounded-lg shadow-md overflow-hidden mx-auto"
            style={{
              maxWidth: "700px",
              aspectRatio: "16 / 9",
              marginBottom: "2rem",
            }}
          >
            <video
              controls
              className="w-full h-full"
              aria-label="Video tutorial on how to use this website"
            >
              <source src="/demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>
      </div>
    </main>
  );
}

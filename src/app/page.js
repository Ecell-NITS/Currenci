export async function generateMetadata() {
  return {
    title: "Currenci",
    description: "Currenci is a Next.js app",
    openGraph: {
      title: "Currenci",
      description: "Currenci is a Next.js app",
    },
  };
}

export default function Home() {
  return (
    <div>
      <h1>Home page</h1>

      <div className="min-h-screen flex flex-col">
        <main
          className="flex-grow"
          style={{
            height: "500vh",
          }}
        >
          {/* Your main content here */}
        </main>
      </div>
    </div>
  );
}

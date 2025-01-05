import Feedback from "./Feedback";

// Dynamic Metadata
export async function generateMetadata() {
  return {
    title: "Feedback | Share Your Experience",
    description: "We value your feedback! Share your experience with us.",
    openGraph: {
      title: "Feedback | Share Your Experience",
      description: "We value your feedback! Share your experience with us.",
    },
  };
}

export default function FeedbackPage() {
  return <Feedback />;
}

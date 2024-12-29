export default function Modeling() {
  const model = [
    {
      name: "Financial Modeling1",
      data: "This section covers all aspects of financial modeling including forecasting, budgeting, and investment analysis.",
    },
    {
      name: "Data Modeling2",
      data: "Learn how to create data models for analytics, business intelligence, and machine learning applications.",
    },
    {
      name: "Data Modeling3",
      data: "Learn how to create data models for analytics, business intelligence, and machine learning applications.",
    },
    {
      name: "Data Modeling4",
      data: "Learn how to create data models for analytics, business intelligence, and machine learning applications.",
    },
    {
      name: "Data Modeling5",
      data: "Learn how to create data models for analytics, business intelligence, and machine learning applications.",
    },
    {
      name: "Data Modeling6",
      data: "Learn how to create data models for analytics, business intelligence, and machine learning applications.",
    },
    {
      name: "Data Modeling7",
      data: "Learn how to create data models for analytics, business intelligence, and machine learning applications.",
    },

    {
      name: "Business Modeling8",
      data: "Focuses on building business models, understanding market strategies, and optimizing revenue streams.",
    },
  ];

  return (
    <section className="px-4 py-12 lg:px-36">
      <div className="grid grid-cols-1 sm:grid-cols-2  gap-6">
        {model.map((item) => (
          <div
            key={item.name}
            className="border-2 rounded-lg shadow-lg text-center p-4 w-full 
                        sm:h-[150px] lg:h-[200px] 
                        bg-white transition-transform hover:scale-105"
            style={{
              border: "1px solid",
              borderImageSource:
                "linear-gradient(174.18deg, rgba(0, 0, 0, 0) 4.99%, #6F9793 95.79%)",
              borderImageSlice: 1,
              fontFamily: "Sofia Pro Regular",
            }}
          >
            <h2 className="font-bold mb-2 text-base sm:text-lg lg:text-xl">
              {item.name}
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-700">
              {item.data}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

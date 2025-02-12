"use client";

function ErrorBoundary() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold text-red-500">
        Oops! Something went wrong.
      </h2>
      <p className="text-gray-600">Please try again.</p>
    </div>
  );
}

export default ErrorBoundary;

// app/loading.tsx
export default function Loading() {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
        <h1 className="text-white text-3xl animate-pulse">Loading...</h1>
      </div>
    );
  }
  
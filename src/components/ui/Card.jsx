// src/components/ui/Card.jsx
export function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl shadow-md bg-white p-6 ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`px-6 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

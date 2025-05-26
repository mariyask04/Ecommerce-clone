export default function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`px-6 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

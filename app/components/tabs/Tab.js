export default function Tab({ children, onClick, isActive }) {
  return (
    <li
      className={`${
        isActive ? "text-blue-600 font-medium text-base" : "text-gray-900"
      } cursor-pointer`}
      onClick={onClick}
    >
      {children}
    </li>
  );
}

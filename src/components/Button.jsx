function Button({
  name = "Button",
  color = "bg-slate-300",
  className,
  onClick,
}) {
  return (
    <button
      className={`py-3 px-10 text-white ${color} ${className}`}
      onClick={onClick}
    >
      {name}
    </button>
  );
}

export default Button;

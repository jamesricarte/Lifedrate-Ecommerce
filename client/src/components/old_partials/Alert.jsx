function Alert({ children, text = "Click this to Alert", onClose }) {
  const alertMessage = () => {
    const message =
      typeof children === "string" ? children : children.props.children;
    alert(children);
  };
  return (
    <div
      className="bg-cyan-300 px-11 py-3 mt-7 cursor-pointer text-white"
      onClick={alertMessage}
    >
      {text}
      <button
        className="bg-red-500 ml-5 text-xs px-2 py-1 rounded-lg"
        onClick={onClose}
      >
        x
      </button>
    </div>
  );
}

export default Alert;

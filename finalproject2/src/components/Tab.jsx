export default function Tab({ props }) {
  const onGenreClick = () => {
    props.onClick(props.id);
  };

  return (
    <button onClick={() => onGenreClick()} className="text-white">
      <div
        className={`mx-3 inline-flex items-center justify-center p-3 px-6 text-center text-white cursor-pointer rounded-full 
    ${
      props.isSelected
        ? "bg-purple-600 shadow-lg"
        : "bg-gray-600 hover:bg-purple-500"
    } 
    transition-all duration-300 mt-4`} // Added mt-4 for top margin
      >
        {props.text}
      </div>
    </button>
  );
}

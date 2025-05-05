import { Button } from "flowbite-react";

export default function Tab({ data, onGenreClick, disable }) {
  const { id, name } = data;

  return (
    <Button
      onClick={() => onGenreClick(name)}
      disabled={disable}
      className="text-white"
    >
      {name}
    </Button>
  );
}

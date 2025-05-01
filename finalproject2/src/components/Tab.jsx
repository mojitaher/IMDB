import { Button } from "flowbite-react";

export default function Tab({ data, onGenreClick }) {
  const { id, name } = data;

  return (
    <Button onClick={() => onGenreClick(name)} className="text-white">
      {name}
    </Button>
  );
}

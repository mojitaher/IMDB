import { useState } from "react";
import { MagnifyIcon } from "./MagnifyIcon";
import { useTranslation } from "react-i18next";

export default function Searchbar({ handelSubmit }) {
  const [search, setSearch] = useState("");
  const { t } = useTranslation();

  return (
    <>
      <form
        className="max-w-xs mx-32 my-5 bg-transparent border border-zinc-100 rounded-lg"
        onSubmit={(e) => {
          handelSubmit(e, search);
          setSearch("");
        }}
      >
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only"
        ></label>
        <div className=" flex justify-center items-center">
          <button
            className="px-3 inset-y-0 left-1  items-center ps-3 cursor-pointer  "
            type="submit"
          >
            <MagnifyIcon />
          </button>
          <input
            value={search}
            type="search"
            id="default-search"
            className="w-full p-5 text-sm text-white border-0 bg-transparent focus:border-0 focus:ring-0 "
            placeholder={t("search")}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            // required
          />
        </div>
      </form>
    </>
  );
}

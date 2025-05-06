import { Rating } from "flowbite-react";
import getDetailsById from "../../api/detailApi";
import { useLoaderData } from "react-router-dom";

import Header from "../components/Header";
import BackGround from "../components/Background";

export async function Loader({ params }) {
  const detail = await getDetailsById(params.id);
  return { detail };
}
export function DetailsRoot() {
  const { detail } = useLoaderData();

  return (
    <>
      <BackGround />
      <Header />
      <div className=" max-w-7xl m-auto relative h-[480px]">
        <img
          className="rounded-3xl w-full h-full "
          src={detail.images}
          alt={detail.title}
        />
        <div className="bg-bg_card-0 bg-opacity-80 absolute w-1/2  rounded-xl p-10 -bottom-16 left-28 font-poppin">
          <div className="text-primary-0  text-sm px-1 ">
            <span>
              <p>
                <a href="#">MaileHerek</a> / <a href="#">Movie</a>{" "}
              </p>
            </span>
          </div>
          <h2 className="text-4xl text-white">{detail.title}</h2>
        </div>
      </div>

      <div className="mt-20 flex justify-between gap-20 mx-48 py-10 items-stretch ">
        <div className="w-[480px]">
          <img
            className="rounded-3xl h-[720px] w-full"
            src={detail.poster}
            alt={detail.title}
          />
        </div>
        <div className="inline-flex flex-col gap-6 w-1/2">
          <h1 className="text-white font-poppin font-bold  ">{detail.title}</h1>
          <p className="text-gray-300 font-normal leading-8">{detail.plot}</p>
          <span className="w-16 rounded-lg bg-black">
            <Rating>
              <Rating.Star filled={false} />
              <p className="ml-2 text-sm font-bold  text-yellow-300">
                {detail.rated}
              </p>
            </Rating>
          </span>
          <div className="my-2">
            <h3 className="text-gray-400 leading-5  font-normal">type</h3>
            <p className="font-normal text-white size-5 leading-8">
              {detail.type}
            </p>
          </div>
          <div>
            <h3 className="text-gray-400 leading-5  font-normal">
              Release Date:
            </h3>
            <p className="font-normal text-white  leading-8">
              {detail.released}
            </p>
          </div>
          <div>
            <h3 className="text-gray-400 leading-5  font-normal">Run time</h3>
            <p className="font-normal text-white leading-8">{detail.runtime}</p>
          </div>
          <div>
            <h3 className="text-gray-400 leading-5  font-normal">Genres</h3>
            <p className="font-normal text-white size-5 leading-8">
              {detail.genres.join(",")}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

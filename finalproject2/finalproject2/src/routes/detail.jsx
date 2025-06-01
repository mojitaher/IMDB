import { Rating } from "flowbite-react";
import getDetailsById from "../../api/detailApi";
import { useLoaderData } from "react-router-dom";

import Header from "../components/header";
import BackGround from "../components/background";
import { useTranslation } from "react-i18next";
import { Button } from "flowbite-react";

export async function Loader({ params }) {
  const detail = await getDetailsById(params.id);
  return { detail };
}
export function DetailsRoot() {
  const { detail } = useLoaderData();
  const { t, i18n } = useTranslation();
  function handelLang(lang) {
    i18n.changeLanguage(lang);
    if (lang === "fas") document.body.dir = i18n.dir("fa");
    else {
      document.body.dir = i18n.dir("en");
    }
  }

  return (
    <>
      <BackGround />
      <Header />
      <div className="flex my-4 p-3 gap-5">
        <Button onClick={() => handelLang("en")}>english</Button>
        <Button onClick={() => handelLang("fas")}>فارسی</Button>
      </div>
      <div className=" max-w-[1200px] m-auto relative h-[480px] sm:w-[400px] md:w-[600px] lg:w-[800px] xl:w-[1200px]">
        <img
          className="rounded-3xl w-full h-full "
          src={detail.images}
          alt={detail.title}
        />
        <div className="bg-bg_card-0 bg-opacity-80 absolute w-1/2  rounded-xl p-10 -bottom-16 left-28 font-poppin sm:h-18 ">
          <div className="text-primary-0  px-1 sm:text-xs md:text-sm ">
            <span>
              <p>
                <a href="#">{t("movieCenter")}</a> /{" "}
                <a href="#">{t("movie")}</a>{" "}
              </p>
            </span>
          </div>
          {/* text */}
          <h2 className="sm:text-md md:text-lg lg:text-4xl text-white  ">
            {detail.title}
          </h2>
        </div>
      </div>

      <div className="mt-20 flex justify-between gap-20 lg:mx-48 py-10 items-stretch sm:w-[500px] sm:mx-10 md:mx-20 lg:w-[800px] xl:w-[1200px] ">
        <div className="w-[480px]  ">
          <img
            className="rounded-3xl h-[720px] w-full"
            src={detail.poster}
            alt={detail.title}
          />
        </div>
        <div className="inline-flex flex-col gap-6 w-1/2">
          <h1 className="text-white font-poppin font-bold">{detail.title}</h1>
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
            <h3 className="text-gray-400 leading-5  font-normal">
              {t("type")}
            </h3>
            <p className="font-normal text-white size-5 leading-8">
              {detail.type}
            </p>
          </div>
          <div>
            <h3 className="text-gray-400 leading-5  font-normal">
              {t("ReleaseDate")}:
            </h3>
            <p className="font-normal text-white  leading-8">
              {detail.released}
            </p>
          </div>
          <div>
            <h3 className="text-gray-400 leading-5  font-normal">
              {t("Runtime")}
            </h3>
            <p className="font-normal text-white leading-8">{detail.runtime}</p>
          </div>
          <div>
            <h3 className="text-gray-400 leading-5  font-normal">
              {t("Genres")}
            </h3>
            <p className="font-normal text-white size-5 leading-8">
              {detail.genres.join(",")}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

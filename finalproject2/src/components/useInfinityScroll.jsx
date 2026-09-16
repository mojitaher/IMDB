import InfiniteScroll from "react-infinite-scroll-component";
import SkeletonLoader from "../components/skeletonLoader";
import { Link } from "react-router-dom";
export default function InfinityScroll(
  data,
  nextFunction,
  hasMore,
  loader,
  Card
) {
  return (
    <InfiniteScroll
      dataLength={data.length}
      next={nextFunction}
      hasMore={hasMore}
    >
      <ul className="mx-32 inline-flex flex-wrap gap-x-6 gap-y-5 ">
        {data.map((movies, index) => (
          <div className="max-w-72 " key={`${movies.id}-${index}`}>
            <Link to={`/Detail/${movies.id}`}>
              {!loader ? <Card movie={movies} /> : <SkeletonLoader />}
            </Link>
          </div>
        ))}
      </ul>
    </InfiniteScroll>
  );
}

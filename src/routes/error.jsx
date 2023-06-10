import { useNavigate, useRouteError } from "react-router-dom";

export default function Error() {
  let err = useRouteError();
  console.log({ err });
  const navigate = useNavigate();
  return (
    <div className="items-center justify-center m-auto text-center pt-24 ">
      <h1 className="font-medium text-6xl py-24">Oops!</h1>
      <h2 className="font-thin text-3xl pb-12">
        You're not supposed to be here. Please go back{" "}
        <button
          onClick={() => navigate(-1)}
          className=" text-black hover:text-white rounded-md bg-red-300"
        >
          {" "}
          where you're from :(
        </button>
      </h2>
      <p className="font-thin text-3xl">Error Code: {err.status}</p>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import noisLogo from "../public/nois_logo.png";
import twitter from "../public/nois_twitter.png";
import github from "../public/nois_github.png";
import gitbook from "../public/nois_gitbook.png";
import { useDashboardContext } from "../contexts/dashboard";

function Nav() {
  const { tab, switchTab } = useDashboardContext();

  return (
    <div className="flex flex-col justify-between gap-4 h-screen max-h-screen bg-transparent">
      <div className="basis-1/6 w-full pt-2">
        <Image
          unoptimized
          src={noisLogo}
          alt={"nois"}
          width={150}
          height={75}
          className="mx-auto bg-gradient-to-br from-accent"
        />
      </div>
      <div className="basis-4/6 grid grid-rows-6 w-full pl-4 justify-start">
        <Link
          href="/"
          onClick={() => {
            tab === "Randomness" ? {} : switchTab("Randomness");
          }}
        >
          <button
            className={`place-self-start p-2 pr-10 row-span-1 ${
              tab === "Randomness"
                ? "text-white drop-shadow-red"
                : "text-white/60 hover:text-white hover:drop-shadow-red"
            } `}
          >
            Randomness
          </button>
        </Link>
        {/* <Link href="/" onClick={() => {tab === "Toolbox" ? {} : switchTab("Toolbox")}}>
        <button className={`place-self-start p-2 pr-20 row-span-1 ${tab === "Toolbox" ? "text-white drop-shadow-red" : "text-white/60 hover:text-white hover:drop-shadow-red"}`}>
            Toolbox
        </button>
        </Link> */}
      </div>
      <div className="basis-1/6 grid grid-cols-3 justify-between content-end w-full pb-2">
        <div className=" mx-auto">
          <Link
            legacyBehavior
            href={`https://twitter.com/noisnetwork`}
            passHref
          >
            <a
              className="link link-hover text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                unoptimized
                width={30}
                height={30}
                src={twitter}
                alt={"Twitter"}
                className="drop-shadow-redsoft fill-white hover:drop-shadow-red"
              />
            </a>
          </Link>
        </div>
        <div className=" mx-auto">
          <Link legacyBehavior href={`https://github.com/noislabs`} passHref>
            <a
              className="link link-hover text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                unoptimized
                width={30}
                height={30}
                src={github}
                alt={"Twitter"}
                className="drop-shadow-redsoft hover:drop-shadow-red"
              />
            </a>
          </Link>
        </div>
        <div className=" mx-auto">
          <Link legacyBehavior href={`https://docs.nois.network/`} passHref>
            <a
              className="link link-hover text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                unoptimized
                width={30}
                height={30}
                src={gitbook}
                alt={"Gitbook"}
                className="hover:drop-shadow-red"
              />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Nav;

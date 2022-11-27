import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import { IoLogoGithub, IoStar } from "react-icons/io5";

export default function Home() {
  const [stargazers, setStargazers] = useState(0);

  useEffect(() => {
    fetch("https://api.github.com/repos/samiulhsohan/banks-api")
      .then((res) => res.json())
      .then((data) => setStargazers(data.stargazers_count));
  }, []);

  return (
    <div>
      <Head>
        <title>BanksAPI</title>
      </Head>

      <nav className="py-6 container px-4 lg:lx-0 lg:max-w-[900px] mx-auto flex justify-between items-center">
        <Link href="/" className="text-indigo-600 font-bold text-lg">
          BanksAPI
        </Link>

        <div>
          <a
            href="https://github.com/samiulhsohan/banks-api"
            className="inline-flex items-center hover:no-underline gap-1.5 group"
          >
            {stargazers > 0 && (
              <div className="mt-[2px] border border-slate-400 rounded-md flex items-center px-2 py-0.5 gap-1.5 text-slate-500 group-hover:text-indigo-600 group-hover:border-indigo-600 transition">
                <IoStar size={15} />
                <p className="font-medium text-sm">{stargazers}</p>
              </div>
            )}
            <IoLogoGithub size={24} className="text-slate-700" />
          </a>
        </div>
      </nav>

      <div className="bg-indigo-700">
        <div className="container px-4 lg:px-0 lg:max-w-[900px] mx-auto pt-36 pb-40">
          <h1 className="text-[60px] text-indigo-100 font-mono">
            {`{BanksAPI}`}
          </h1>
          <p className="text-2xl mt-3 text-indigo-100">
            APIs for getting Bangladeshi banks and their branch names.
          </p>
        </div>
      </div>

      <div className="container px-4 lg:px-0 lg:max-w-[900px] mx-auto mt-24">
        <div className="space-y-10">
          <Route
            title="Get all banks"
            url="https://banks-api.sohan.dev/api/banks"
          />
          <Route
            title="Get all banks with branches"
            url="https://banks-api.sohan.dev/api/banks?withBranches=true"
          />
          <Route
            title="Get a bank"
            url="https://banks-api.sohan.dev/api/banks/claymybhs002wxbcwihfrotwo"
          />
        </div>

        <div className="mt-24 pb-10">
          <p className="text-slate-700 mb-4">
            Something wrong? Please{" "}
            <a
              href="https://github.com/samiulhsohan/banks-api/issues/new"
              target="_blank"
              rel="noreferrer"
            >
              create an issue on GitHub
            </a>{" "}
            or write me on <a href="mailto:hi@sohan.dev">hi@sohan.dev</a>.
          </p>
          <p className="text-slate-700">Coded and maintained with ❤️</p>
        </div>
      </div>
    </div>
  );
}

function Route({ title, url }: { title: string; url: string }) {
  return (
    <div>
      <h2 className="text-xl font-medium tracking-tight text-slate-900 mb-1.5">
        {title}
      </h2>
      <a
        href={url}
        className="font-mono text-slate-900 hover:underline break-words"
        target="_blank"
        rel="noreferrer"
      >
        {url}
      </a>
    </div>
  );
}

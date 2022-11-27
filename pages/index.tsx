import Head from "next/head";
import Link from "next/link";
import { IoLogoGithub } from "react-icons/io5";

export default function Home() {
  return (
    <div>
      <Head>
        <title>BanksAPI</title>
      </Head>

      <nav className="py-6 container px-4 lg:lx-0 lg:max-w-[900px] mx-auto flex justify-between">
        <Link href="/" className="text-indigo-600 font-bold">
          BanksAPI
        </Link>

        <div>
          <a href="https://github.com/samiulhsohan/banks-api">
            <IoLogoGithub size={20} className="text-slate-700" />
          </a>
        </div>
      </nav>

      <div className="bg-indigo-700">
        <div className="container px-4 lg:px-0 lg:max-w-[900px] mx-auto pt-36 pb-40">
          <h1 className="text-[60px] text-indigo-100 font-mono">
            {`{BanksAPI}`}
          </h1>
          <p className="text-2xl mt-3 text-indigo-100">
            APIs for getting Bangldeshi banks and their branch names.
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
            title="Get a bank"
            url="https://banks-api.sohan.dev/api/banks/{bankId}"
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
        className="font-mono text-slate-900 hover:underline"
        target="_blank"
        rel="noreferrer"
      >
        {url}
      </a>
    </div>
  );
}

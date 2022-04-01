import React from "react";
import Link from "next/link";

const links = [
  { href: "Timesheet", label: "Timesheet" },
  {}
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`;
  return link;
});

const Nav = () => (
  <nav className="text-center">
    <ul className="flex justify-between px-4 py-1 my-4">
      <li className="flex px-2 py-1">
        <Link href="/">
          <a className="no-underline text-md text-black-500">Home</a>
        </Link>
      </li>
      {links.map(({ key, href, label }) => (
        <li key={key} className="flex px-2 py-1">
          <a className="no-underline text-md text-black-500" href={href}>
            {label}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

export default Nav;

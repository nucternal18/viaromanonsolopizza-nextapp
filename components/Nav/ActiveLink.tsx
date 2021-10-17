import { useRouter } from "next/router";
import Link from "next/link";

function ActiveLink({ children, href }) {
  const router = useRouter();
  const style = {
    color: router.asPath === href ? "red" : "lightgray",
  };

  //   const handleClick = (e) => {
  //     e.preventDefault();
  //     router.push(href);
  //   };

  return (
    <Link href={href}>
      <a
        className="flex flex-row py-3 text-xs font-bold text-gray-800 uppercase hover:text-gray-600"
        style={style}
      >
        {children}
      </a>
    </Link>
  );
}

export default ActiveLink;

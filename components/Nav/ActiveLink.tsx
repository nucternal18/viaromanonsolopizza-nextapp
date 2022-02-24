import { useRouter } from "next/router";
import Link from "next/link";

function ActiveLink({ children, href }) {
  const router = useRouter();

  return (
    <Link href={href}>
      <a
        className={`${
          router.asPath === href
            ? "text-red-500"
            : "text-gray-900 dark:text-gray-200"
        } flex flex-row py-3 text-xs font-bold  uppercase gap-2 items-center hover:text-red-600`}
      >
        {children}
      </a>
    </Link>
  );
}

export default ActiveLink;

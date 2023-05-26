import { usePathname } from "next/navigation";
import styles from "./styles.module.css";
import Link from "next/link";
import Image from "next/image";

const Sidebar = () => {
  const pathname = usePathname();

  const links = [
    { label: " Dashboard", path: "/dashboard", targetSegment: "dashboard" },
    { label: " Orders", path: "/orders", targetSegment: "contact" },
  ];
  return (
    <nav className={styles.sidebar}>
      <Image
        className={styles.logo}
        src={
          "https://al-marketplace.s3.amazonaws.com/images/e2WKXeyPOU6W85Ad5A4bG1kKx3YAR2Fn349Pvnai.png"
        }
        alt="logo_alegra"
        width={50}
        height={50}
        priority={true}
      />
      {links.map((l, i) => {
        return (
          <Link
            key={i}
            href={l.path}
            className={pathname == l.path ? styles.active : ""}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default Sidebar;

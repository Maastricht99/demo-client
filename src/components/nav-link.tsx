"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
}

export default function NavLink({ href, children }: NavLinkProps) {
    const pathName = usePathname();
    const isActive = pathName.startsWith(href);

    return (
        <Link href={href} className={`${isActive ? "text-red-500" : "text-black"}`}>
            { children }
        </Link>
    )
}
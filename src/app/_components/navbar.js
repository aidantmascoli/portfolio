'use client'

import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle
} from "@heroui/react";
import {useState} from "react";
import {usePathname} from "next/navigation";
import Link from "next/link";

export default function AMNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    return <Navbar isBlurred={false} isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}  maxWidth="full" classNames={{
        base: ['fixed', 'bg-default-50', 'font-heading', 'border-b', 'border-default-200'],
        menu: ['fixed', 'bg-default-50', 'inset-x-0', 'top-0', 'pt-16', 'px-0', 'gap-0', 'font-heading'],
        menuItem: ['hover:underline', 'hover:bg-default-100', 'px-6', 'py-2'],
    }}>
        <NavbarContent>
            <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="lg:hidden"
            />
            <NavbarBrand>
                <a href={'/'} className="h-full relative font-title text-2xl">Aidan Thomas Mascoli</a>
            </NavbarBrand>
        </NavbarContent>
        <NavbarContent justify="end">
            <NavbarItem className="hidden lg:flex" isActive={pathname === '/'}>
                <Link href={'/'} className="text-foreground hover:underline">
                    Home
                </Link>
            </NavbarItem>
            <NavbarItem className="hidden lg:flex" isActive={pathname === '/about'}>
                <Link href={'/about'} className="text-foreground hover:underline">
                    About
                </Link>
            </NavbarItem>
            <NavbarItem className="hidden lg:flex" isActive={pathname === '/resume'}>
                <Link href={'/resume'} className="text-foreground hover:underline">
                    Resume
                </Link>
            </NavbarItem>
            <NavbarItem className="hidden lg:flex" isActive={pathname === '/projects'}>
                <Link href={'/projects'} className="text-foreground hover:underline">
                    Projects
                </Link>
            </NavbarItem>
            <NavbarItem className="hidden lg:flex" isActive={pathname === '/inquire'}>
                <Link href={'/inquire'} className="text-foreground hover:underline">
                    Inquire
                </Link>
            </NavbarItem>
        </NavbarContent>
        <NavbarMenu motionProps={{animate: { height: isMenuOpen ? '100vh' : '0' }}}>
            <NavbarMenuItem isActive={pathname === '/'}>
                <Link className="w-full text-foreground" href={'/'}>
                    Home
                </Link>
            </NavbarMenuItem>
            <NavbarMenuItem isActive={pathname === '/about'}>
                <Link className="w-full text-foreground" href={'/about'}>
                    About
                </Link>
            </NavbarMenuItem>
            <NavbarMenuItem isActive={pathname === '/resume'}>
                <Link className="w-full text-foreground" href={'/resume'}>
                    Resume
                </Link>
            </NavbarMenuItem>
            <NavbarMenuItem isActive={pathname === '/projects'}>
                <Link className="w-full text-foreground" href={'/projects'}>
                    Projects
                </Link>
            </NavbarMenuItem>
            <NavbarMenuItem isActive={pathname === '/inquire'}>
                <Link className="w-full text-foreground" href={'/inquire'}>
                    Inquire
                </Link>
            </NavbarMenuItem>
        </NavbarMenu>
    </Navbar>
}
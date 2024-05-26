import NavLink from "./nav-link";


export default function NavBar() {
    const routes = [
        {
            name: "Auction",
            href: "/auction"
        },
        {
            name: "My Products",
            href: "/products"
        }
    ];

    return (
        <div className="w-full flex justify-between items-center pt-[30px] pb-[30px] pl-[100px] pr-[100px] bg-black shadow-lg">
            <div>
                <h1 className="text-[35px] font-bold text-white">4Bid</h1>
            </div>
            <nav>
                <ul className="flex gap-[30px]">
                   {
                    routes.map(route => {
                        return (
                            <NavLink key={route.href} href={route.href}>
                                { route.name }
                            </NavLink>
                        )
                    })
                   }
                </ul>
            </nav>
        </div>
    )
}
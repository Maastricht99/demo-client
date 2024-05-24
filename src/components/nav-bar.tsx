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
        <div style={{ 
            width: "100%", 
            paddingTop: 20, 
            paddingBottom: 20,
            paddingLeft: 100,
            paddingRight: 100,
            display: "flex", 
            justifyContent: "space-between",
            border: "2px solid lightgray"
        }}>
            <div>
                <h1>xxx</h1>
            </div>
            <nav>
                <ul style={{ display: "flex", gap: 10}}>
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
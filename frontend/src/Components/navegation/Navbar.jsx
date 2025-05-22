import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Input,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Avatar,
} from "@heroui/react";


const Navegationbar = () => {
    return (
        <Navbar className="fixed top-0 right-0 w-full h-16 bg-white shadow-md pl-64 flex items-center justify-between px-1 z-30 transition-all duration-300 ease-in-out">
            <div className="h-16 w-65 flex items-center justify-between border-b border-gray-100">
                <div className="flex items-center">
                    <div className="h-9 w-9 rounded-lg bg-red-500 text-white flex items-center justify-center font-semibold text-xl">
                        IU
                    </div>
                    <h1 className="ml-2 font-semibold text-xl text-gray-800">Intranet University</h1>
                </div>
                <button
                    className="lg:hidden text-gray-500 hover:text-gray-700"
                    
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <NavbarBrand className="lg:hidden">
                <button className="flex items-center justify-center text-gray-600 hover:text-gray-900">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </NavbarBrand>
            <div className="flex items-center justify-end w-full">
                {/* <NavbarContent className="hidden sm:flex sm:flex-1 max-w-md mx-5">
                    <div className="relative w-full">
                        <div className="w-full flex items-center border border-gray-300 bg-gray-100 rounded-lg px-3 py-1">
                            <SearchIcon className="text-gray-400 w-5 h-5" />
                            <Input
                                type="text"
                                className="w-full bg-transparent border-none outline-none focus:ring-0 pl-3 text-gray-700 text-sm appearance-none"
                                placeholder="Buscar..."
                            />
                        </div>
                    </div>
                </NavbarContent> */}

                <NavbarContent justify="end" className="flex items-center">
                    <NavbarItem className="relative mr-4">
                        <Dropdown>
                            <DropdownTrigger>
                                <button className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none">
                                    <div className="relative">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                        </svg>
                                        <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                                    </div>
                                </button>
                            </DropdownTrigger>
                            <DropdownMenu className="w-80 bg-white rounded-lg shadow-lg py-2 z-50">
                                <div className="px-4 py-2 border-b border-gray-100">
                                    <h3 className="text-sm font-medium">Notificaciones</h3>
                                </div>
                                <div className="max-h-60 overflow-y-auto">
                                    <div className="px-4 py-6 text-center text-gray-500">
                                        No hay notificaciones nuevas
                                    </div>
                                </div>
                                <div className="px-4 py-2 border-t border-gray-100 text-center">
                                    <button className="text-sm text-red-500 hover:text-red-700">Ver todas</button>
                                </div>
                            </DropdownMenu>
                        </Dropdown>
                    </NavbarItem>

                    <NavbarItem>
                        <Dropdown>
                            <DropdownTrigger>
                                <div className="flex items-center cursor-pointer">
                                    <Avatar
                                        className="h-10 w-10 rounded-full bg-red-100 text-red-500 flex items-center justify-center font-medium mr-3"
                                        name="ZD"
                                    />
                                    <div className="hidden md:block">
                                        <h3 className="text-sm font-medium text-gray-800">Zoey Doe</h3>
                                    </div>
                                </div>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="User menu" className="w-56">
                                <DropdownItem isReadOnly key="signed-in" className="h-14 gap-2">
                                    <p className="font-semibold">Signed in as</p>
                                    <p className="font-semibold">zoey@example.com</p>
                                </DropdownItem>
                                <DropdownItem key="settings" className="text-gray-700 hover:bg-gray-50">My Settings</DropdownItem>
                                <DropdownItem key="team" className="text-gray-700 hover:bg-gray-50">Team Settings</DropdownItem>
                                <DropdownItem key="analytics" className="text-gray-700 hover:bg-gray-50">Analytics</DropdownItem>
                                <DropdownItem key="system" className="text-gray-700 hover:bg-gray-50">System</DropdownItem>
                                <DropdownItem key="configurations" className="text-gray-700 hover:bg-gray-50">Configurations</DropdownItem>
                                <DropdownItem key="help" className="text-gray-700 hover:bg-gray-50">Help & Feedback</DropdownItem>
                                <DropdownItem key="logout" className="text-red-500 hover:text-red-700 hover:bg-gray-50">Log Out</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavbarItem>
                </NavbarContent>
            </div>

        </Navbar>
    );
}

export default Navegationbar;
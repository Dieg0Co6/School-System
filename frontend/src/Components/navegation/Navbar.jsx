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


const Navegationbar = ({ usuario }) => {
    /* const [nombreUsuario, setNombreUsuario] = useState(''); */

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
                                    <div className="h-10 w-10 rounded-full bg-red-100 text-red-500 flex items-center justify-center font-medium mr-3">
                                        <h1 className="text-[20px]">
                                            {`${usuario?.nombre?.split(' ')[0][0] || ''}${usuario?.nombre?.split(' ')[1]?.[0] || ''}`.toUpperCase()}
                                        </h1>
                                    </div>
                                    <div className="hidden md:block">
                                        <h3 className="text-sm font-medium text-gray-800">{usuario?.nombre.toUpperCase() || 'Invitado'}</h3>
                                    </div>
                                </div>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Menú de usuario"
                                className="w-64 bg-white/95 backdrop-blur-lg border border-gray-200/50 shadow-xl rounded-2xl p-2 mt-2"
                            >
                                <DropdownItem
                                    isReadOnly
                                    key="signed-in"
                                    className="h-12 px-4 py-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100/80 border border-gray-200/30 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-150 transition-all mb-1"
                                >
                                    <div className="flex flex-col justify-center items-center">
                                        <h3 className="text-[18.5px] p-0 flex justify-center font-semibold text-gray-800 truncate text-center">{usuario?.email}</h3>
                                        <h3 className="text-center ">{usuario?.rol.toUpperCase()}</h3>
                                    </div>
                                </DropdownItem>

                                <DropdownItem
                                    key="configuracion"
                                    className="h-12 px-4 py-2 rounded-xl hover:bg-gray-100/80 transition-all duration-200 cursor-pointer mb-1"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">Configuración</span>
                                    </div>
                                </DropdownItem>

                                <DropdownItem
                                    key="cerrar-sesion"
                                    className="h-12 px-4 py-2 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all duration-200 cursor-pointer"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                                            <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">Cerrar Sesión</span>
                                    </div>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavbarItem>
                </NavbarContent>
            </div>

        </Navbar>
    );
}

export default Navegationbar;
import { Home, AlertCircle, CheckSquare, FolderTree, Settings, HelpCircle, LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"

export default function Sidebar() {
    const { data: session } = useSession()


    return (
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src="https://avatars.githubusercontent.com/u/124599?v=4" />
                        {/* <AvatarFallback>{session ? session.user?. : "Not signed in"}</AvatarFallback> */}
                    </Avatar>
                    <div>
                        <h2 className="font-semibold">
                            {session ? session.user?.name : <button onClick={() => signIn()} className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">Sign In</button>}
                        </h2>
                        <p className="text-xs text-gray-500">{session?.user?.email}</p>
                    </div>
                </div>
            </div>
            <nav className="flex-1 p-4">
                <ul className="space-y-1">
                    <li>
                        <Link href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-[#FF5D5D] text-white">
                            <Home className="h-5 w-5" />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                            <AlertCircle className="h-5 w-5" />
                            <span>Vital Task</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                            <CheckSquare className="h-5 w-5" />
                            <span>My Task</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                            <FolderTree className="h-5 w-5" />
                            <span>Task Categories</span>
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="p-4 border-t border-gray-200">
                <ul className="space-y-1">
                    <li>
                        <Link href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                            <Settings className="h-5 w-5" />
                            <span>Settings</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                            <HelpCircle className="h-5 w-5" />
                            <span>Help</span>
                        </Link>
                    </li>
                    <li>
                        <button onClick={() => signOut()} className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                            <LogOut className="h-5 w-5" />
                            <span>Logout</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

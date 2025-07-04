import Link from "next/link";
import React, { JSX } from "react";
import { MdClose } from "react-icons/md"; // Import close icon

const Sidebar = ({
    isOpen,
    toggle,
}: {
    isOpen: boolean;
    toggle: () => void;
}): JSX.Element => {
    return (
        <>
            <div
                className="sidebar-container fixed w-full h-full overflow-hidden justify-center bg-white grid pt-[120px] left-0 z-10"
                style={{
                    opacity: `${isOpen ? "1" : "0"}`,
                    top: ` ${isOpen ? "0" : "-100%"}`,
                }}
            >
                <button className="absolute right-0 p-5" onClick={toggle}>
                    {/* Close icon */}
                   <MdClose />
                </button>

                <ul className="sidebar-nav text-center leading-relaxed text-xl space-y-10">
                        <Link href="/" onClick={toggle}><p>Explore</p></Link>
                        <Link href="/myapps" onClick={toggle}><p>My Apps</p></Link>
                        <Link href="/joined" onClick={toggle}><p>Joined Tests</p></Link>
                </ul>
            </div>
        </>
    );
};

export default Sidebar;
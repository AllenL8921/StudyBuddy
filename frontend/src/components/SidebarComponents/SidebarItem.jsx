//SidebarItem.jsx

//This component controls how each of the items in the sidebar are rendered

const SidebarItem = ({ name, href, isActive }) => {
    return (
        <li>
            <a
                href={href}
                className={`flex items-center p-2 rounded-lg ${isActive ? 'bg-gray-100 dark:bg-gray-300' : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                aria-label={name}
                title={name}
            >
                <span className="ms-3">{name}</span>
            </a>
        </li>
    );
};

export default SidebarItem;

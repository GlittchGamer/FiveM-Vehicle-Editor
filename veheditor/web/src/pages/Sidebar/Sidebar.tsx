import { UI } from '@/types/global';
import { faFileEdit, faFileSignature } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SideBarOptions: UI.SideBarOptions[] = [
  {
    label: 'Editor',
    icon: faFileEdit,
  },
  {
    label: 'Import/Export',
    icon: faFileSignature,
  },
];
const Sidebar = () => {
  return (
    <div className="bg-[#ff0039] p-2 flex flex-col space-y-2">
      {SideBarOptions.map((sidebar, index) => (
        <div key={index}>
          <FontAwesomeIcon icon={sidebar.icon} className="text-white opacity-60" />
        </div>
      ))}
    </div>
  );
};

export default Sidebar;

import { useEffect, useState, useContext } from 'react';
import { personsImgs } from '../../utils/images';
import { navigationLinks } from '../../data/data';
import "./Sidebar.css";
import { SidebarContext } from '../../context/sidebarContext';
import { Link, useForm } from '@inertiajs/react'; // Import du Link et useForm d'Inertia

const Sidebar = ({ user }) => {
  const [activeLinkIdx] = useState(1);
  const [sidebarClass, setSidebarClass] = useState("");
  const { isSidebarOpen } = useContext(SidebarContext);

  const { post } = useForm(); // Utilisation de useForm pour gérer les requêtes POST

  const handleLogout = () => {
    post('/logout'); // Envoie une requête POST à la route /logout
  };

  useEffect(() => {
    if (isSidebarOpen) {
      setSidebarClass('sidebar-change');
    } else {
      setSidebarClass('');
    }
  }, [isSidebarOpen]);

  return (
    <div className={`sidebar ${sidebarClass}`}>
      <div className="user-info">
        <div className="info-img img-fit-cover">
          <img src={personsImgs.person_two} alt="profile image" />
        </div>
        {user && <span className="info-name">{user.name}</span>}
      </div>

      <nav className="navigation">
        <ul className="nav-list">
          {
            navigationLinks.map((navigationLink) => (
              <li className="nav-item" key={navigationLink.id}>
                {/* Vérifie si l'action est une déconnexion */}
                {navigationLink.actionType === "logout" ? (
                  <button 
                    onClick={handleLogout} 
                    className="nav-link logout-button"
                  >
                    <img src={navigationLink.image} className="nav-link-icon" alt={navigationLink.title} />
                    <span className="nav-link-text">{navigationLink.title}</span>
                  </button>
                ) : (
                  <Link 
                    href={navigationLink.path} 
                    className={`nav-link ${navigationLink.id === activeLinkIdx ? 'active' : ''}`}
                  >
                    <img src={navigationLink.image} className="nav-link-icon" alt={navigationLink.title} />
                    <span className="nav-link-text">{navigationLink.title}</span>
                  </Link>
                )}
              </li>
            ))
          }
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;

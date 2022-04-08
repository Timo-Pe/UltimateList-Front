// == Import
import { useSelector } from 'react-redux';

// == Import style
import Toggle from 'src/assets/icons/toggle-on.svg';
import './list.scss';

// == Import Component
import { Link } from 'react-router-dom';
import Lists from '.';

const List = () => {
  const userItems = useSelector((state) => state.userItems.user_list);

  const convertDate = (dateObject) => {
    const date = new Date(dateObject).toLocaleString('default', { month: 'long', year: 'numeric' });
    const dateUppercase = date.charAt(0).toUpperCase() + date.slice(1);
    return dateUppercase;
  };

  return (
    <div className="list">
      <Lists />
      <div className="list-header-toggle">
        <div className="list-header-toggle-menu active">Ma liste</div>
        <img className="list-header-toggle-icon" src={Toggle} alt="toggle-icon" />
        <div className="list-header-toggle-menu">Recommandations</div>
      </div>

      <div className="list-header-progress">
        <div className="list-header-progress-status">
          <button type="button" className="list-header-progress-status-button-active">Tous</button>
          <button type="button" className="list-header-progress-status-button">À jouer</button>
          <button type="button" className="list-header-progress-status-button">En cours</button>
          <button type="button" className="list-header-progress-status-button">Fini</button>
        </div>
      </div>

      <div className="list-add">
        <Link className="list-add-button-link" to="/jeuxvideo/ajouter">
          <button type="button" className="list-add-button">
            + Ajouter un jeu vidéo
          </button>
        </Link>
      </div>

      <div className="list-items">
        {userItems.map((userItem) => (
          <div className="list-items-content" key={userItem.id}>
            <div className="list-items-content-date">{convertDate(userItem.item_added_at)}</div>
            {userItem.items.map((item) => (
              <div className="list-items-content-details" key={item.id}>
                <div className="list-items-content-details-image">
                  <img src={item.image} alt="miniature-jeu-video" />
                </div>
                <div className="list-items-content-details-title">{item.name}</div>
                <div className="list-items-content-details-status">{userItem.item_status}</div>
              </div>
            ))}
          </div>
        ))}
      </div>

    </div>
  );
};

// == Export
export default List;

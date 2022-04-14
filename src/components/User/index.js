// == Import style
import './user.scss';
import { Link } from 'react-router-dom';

// == Import react hooks
import { useSelector, useDispatch } from 'react-redux';

// == Import actions
import { logOut } from 'src/actions/login';

// eslint-disable-next-line arrow-body-style
const User = () => {
  const isOpen = useSelector((state) => state.login.isSettingsOpen);
  const users = useSelector((state) => state.user.list);
  const currentUser = useSelector((state) => state.login.username);
  const user = users.filter((username) => username.username === currentUser);

  const logged = useSelector((state) => state.login.logged);

  // to settup the disconnection we need to dispatch the action logOut
  const dispatch = useDispatch();

  return (
    <div className="user">
      {isOpen && (
      <div className="user-toggle">
        {logged && (
          <>
            {user.map((userName) => (
              <div className="user-toggle-hello" key={userName.id}>
                <h4>Coucou {userName.username}</h4>
              </div>
            ))}
            <div className="user-toggle-disconnect">
              <Link
                to="/"
                onClick={() => {
                  // when the user logout, his token is removed from local storage
                  localStorage.removeItem('user_token');
                  // and the value of state "logged" change for false
                  dispatch(logOut());
                }}
              >
                Se déconnecter
              </Link>
            </div>
            <div className="user-toggle-delete"><Link to="/">Supprimer définitivement mon profil</Link></div>
          </>
        )}
        {!logged && (
          <>
            <div className="user-toggle-welcome">Bienvenue sur Ultimate List !</div>
            <div className="user-toggle-buttons">
              <button type="button" className="user-toggle-connect"><Link to="/connexion">Se connecter</Link></button>
              <button type="button" className="user-toggle-signup"><Link to="/inscription">S'inscrire</Link></button>
            </div>
          </>
        )}
      </div>
      )}
    </div>
  );
};

// == Export
export default User;

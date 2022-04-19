/* eslint-disable max-len */

// == Import react hooks
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

// == Import functions
import { convertDate } from 'src/functions/items';
import { statusName } from 'src/functions/lists';

// == Import actions
import { closeItemDetails, saveChangeStatus, changeUserItemStatus } from 'src/actions/userItems';

// == Import style
import './itemDetails.scss';

const ItemDetails = () => {
  const currentItemShowed = useSelector((state) => state.userItems.itemCliked);
  const dispatch = useDispatch();
  const { slug } = useParams();

  // var for status's button css
  const cssStatusInactive = 'item-detail-content-left-statusButtons-button';
  const cssStatusActive = `${cssStatusInactive}-active`;

  // function to get the item's infos (dev, editor, host) depending on slug
  const itemInfosMatchingMode = (itemDetails) => {
    switch (slug) {
      case 'jeuxvideo':
        return [
          `Développeur(s) : ${itemDetails.item.developer}`,
          `Editeur : ${itemDetails.item.editor}`,
        ];

      case 'podcasts':
        return [
          `Animateur(s) : ${itemDetails.item.host}`,
        ];

      default:
        return [];
    }
  };

  const currentStatus = useSelector((state) => state.userItems.item_status);

  return (
    <>
      <div className="background-item-detail" />
      <div className="item-detail">

        <img className="item-detail-image" src={currentItemShowed.item.image} alt="" />

        <div className="item-detail-content">
          <div className="item-detail-content-left">

            <h1 className="item-detail-content-left-title">{currentItemShowed.item.name}</h1>
            <p className="item-detail-content-left-date">Ajouté le {convertDate(currentItemShowed.item_added_at)}</p>

            <div className="item-detail-content-left-statusButtons">
              <button
                type="button"
                className={currentStatus === 0 ? cssStatusActive : cssStatusInactive}
                onClick={() => {
                  dispatch(saveChangeStatus(0));
                }}
              >
                {statusName(0, slug)}
              </button>
              <button
                type="button"
                className={currentStatus === 1 ? cssStatusActive : cssStatusInactive}
                onClick={() => {
                  dispatch(saveChangeStatus(1));
                }}
              >
                {statusName(1, slug)}
              </button>
              <button
                type="button"
                className={currentStatus === 2 ? cssStatusActive : cssStatusInactive}
                onClick={() => {
                  dispatch(saveChangeStatus(2));
                }}
              >
                {statusName(2, slug)}
              </button>
            </div>

            <h2 className="item-detail-subtitles">Notes personnelles :</h2>
            <textarea
              className="item-detail-content-left-comment"
              name="Text1"
              cols="30"
              rows="8"
              defaultValue={currentItemShowed.item_comment}
            />
          </div>

          <div className="item-detail-content-right">
            <h2 className="item-detail-subtitles">Genre(s)</h2>
            <div className="item-detail-content-right-tags">
              {currentItemShowed.item.tags.map((tag) => (
                <span
                  className="item-detail-content-right-tags-tag"
                  key={tag.id}
                >
                  {tag.name}
                </span>
              ))}
            </div>

            <h2 className="item-detail-subtitles">Plateforme(s)</h2>
            <div className="item-detail-content-right-tags">
              {currentItemShowed.item.platforms.map((platform) => (
                <span
                  className="item-detail-content-right-tags-tag"
                  key={platform.id}
                >
                  {platform.name}
                </span>
              ))}
            </div>

            <div className="item-detail-content-right-about">
              <h2 className="item-detail-subtitles">À propos...</h2>
              <p className="item-detail-content-right-about-description">{currentItemShowed.item.description}</p>
              <ul className="item-detail-content-right-about-infos">
                <li className="item-detail-content-right-about-infos-info">Date de sortie : {convertDate(currentItemShowed.item.release_date)}</li>
                {itemInfosMatchingMode(currentItemShowed).map((info) => (
                  <li
                    className="item-detail-content-right-about-infos-info"
                    key={info}
                  >
                    {info}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        <div className="item-detail-buttons">
          <button
            className="item-detail-buttons-button"
            type="button"
          >
            Supprimer
          </button>

          <button
            className="item-detail-buttons-button"
            type="button"
            onClick={() => {
              dispatch(changeUserItemStatus(currentItemShowed.id, currentStatus));
              dispatch(closeItemDetails());
            }}
          >
            Enregistrer les modifications
          </button>

          <button
            className="item-detail-buttons-button"
            type="button"
            onClick={() => {
              dispatch(closeItemDetails());
            }}
          >
            Fermer
          </button>
        </div>
      </div>
    </>
  );
};

// == Export
export default ItemDetails;

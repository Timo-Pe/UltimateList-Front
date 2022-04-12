// == Import
import PropTypes from 'prop-types';

const SearchResults = ({ searchResults }) => {
  let subtitle = `${searchResults.length} résultat`;
  if (searchResults.length > 1) {
    subtitle += 's';
  }

  return (
    <div className="add-reco">
      <h2 className="add-modSubtitle">{subtitle}</h2>
      <ul className="add-reco-cards">
        {searchResults.map((item) => (
          <li className="add-reco-cards-card" key={item.id}>
            <img className="card-image" src={item.image} alt="" />
            <div className="card-content">
              <h3 className="card-title">{item.name}</h3>
              <p className="card-description">{item.developer}</p>
              <div className="card-tags">
                {item.tags.map((tag) => (
                  <span className="card-tag" key={tag.id}>{tag.name}</span>
                ))}
              </div>
            </div>
            <button className="card-button" type="button" aria-label="icon plus" />
          </li>
        ))}
      </ul>
    </div>
  );
};

SearchResults.propTypes = {
  searchResults: PropTypes.arrayOf(
    PropTypes.shape().isRequired,
  ).isRequired,
};

export default SearchResults;
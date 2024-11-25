import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const App = () => {
  const SORT_BY_FIELDS = {
    alphabetic: 'alphabet',
    length: 'length',
    none: 'none',
  };

  const [sortType, setSortType] = useState(SORT_BY_FIELDS.none);
  const [isReversed, setIsReversed] = useState(false);

  const getVisibleGoods = () => {
    const sortedGoods = [...goodsFromServer];

    if (sortType === SORT_BY_FIELDS.alphabetic) {
      sortedGoods.sort((a, b) => a.localeCompare(b));
    } else if (sortType === SORT_BY_FIELDS.length) {
      sortedGoods.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      sortedGoods.reverse();
    }

    return sortedGoods;
  };

  const resetGoods = () => {
    setSortType(SORT_BY_FIELDS.none);
    setIsReversed(false);
  };

  const visibleGoods = getVisibleGoods();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortType(SORT_BY_FIELDS.alphabetic)}
          type="button"
          className={`button is-info ${sortType === SORT_BY_FIELDS.alphabetic ? `is-info` : `is-light`}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortType(SORT_BY_FIELDS.length)}
          type="button"
          className={`button is-success ${sortType === SORT_BY_FIELDS.length ? `is-success` : `is-light`}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={`button is-warning ${!isReversed && `is-light`}`}
        >
          Reverse
        </button>

        {sortType !== SORT_BY_FIELDS.none || isReversed ? (
          <button
            onClick={() => resetGoods()}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};

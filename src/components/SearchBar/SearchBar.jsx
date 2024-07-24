import propTypes from 'prop-types';
import css from './SearchBar.module.css';
import { HiSearch } from 'react-icons/hi';
import { DebounceInput } from 'react-debounce-input';

export const SearchBar = ({ onChange, value }) => {
  const handleChange = e => {
    onChange?.(e.target.value);
  };

  return (
    <div className={css.inputWrapper}>
      <DebounceInput
        className={css.input}
        value={value}
        type="text"
        minLength={2}
        debounceTimeout={500}
        placeholder={'Search Movies...'}
        onChange={handleChange}
      />
      <HiSearch className={css.searchIcon} />
    </div>
  );
};

SearchBar.propTypes = {
  value: propTypes.string,
  onChange: propTypes.func.isRequired,
};

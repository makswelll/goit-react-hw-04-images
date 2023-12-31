import { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineSearch } from 'react-icons/ai';
import {
  SearchBarStyled,
  SearchFormStyled,
  SearchBtn,
  SearchFormLabelStyled,
  SearchFormInputStyled,
} from './SearchBar.styled';

export const Searchbar = ({ onFormSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchQueryChange = event => {
    setSearchQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (searchQuery.trim() !== '') {
      onFormSubmit(searchQuery);
      setSearchQuery('');
    } else toast.error('Input field must not be empty');
  };

  return (
    <SearchBarStyled>
      <SearchFormStyled onSubmit={handleSubmit}>
        <SearchBtn type="submit">
          <SearchFormLabelStyled>Search</SearchFormLabelStyled>
          <AiOutlineSearch />
        </SearchBtn>

        <SearchFormInputStyled
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
      </SearchFormStyled>
    </SearchBarStyled>
  );
};

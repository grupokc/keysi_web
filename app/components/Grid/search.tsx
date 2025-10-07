import React from 'react';
import { Input } from '@nextui-org/react';
import { AiOutlineSearch } from 'react-icons/ai';

interface SearchProps {
  filterValue: string;
  setFilterValue: React.Dispatch<React.SetStateAction<string>>;
  onClear: () => void;
}

const Search: React.FC<SearchProps> = ({ filterValue, setFilterValue, onClear }) => {
  const handleSearchChange = (value?: string) => {
    setFilterValue(value || '');
  };

  return (
    <Input
      isClearable
      className="w-full sm:max-w-[44%]"
      placeholder="Buscar..."
      startContent={<AiOutlineSearch />}
      value={filterValue}
      onClear={onClear}
      onValueChange={handleSearchChange}
      variant='faded'
    />
  );
};

export default Search;

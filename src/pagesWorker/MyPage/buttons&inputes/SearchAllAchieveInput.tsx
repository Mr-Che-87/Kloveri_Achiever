interface Props {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function SearchAllAchieveInput({ searchQuery, setSearchQuery }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <input
      value={searchQuery}
      onChange={handleChange}
      placeholder="Найти из полученных"
    />
  );
}

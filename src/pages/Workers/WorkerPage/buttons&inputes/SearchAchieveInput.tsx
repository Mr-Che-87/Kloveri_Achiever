interface Props {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function SearchAchieveInput({ searchQuery, setSearchQuery }: Props) {
  return (
    <input
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Найти по названию"
    />
  );
}

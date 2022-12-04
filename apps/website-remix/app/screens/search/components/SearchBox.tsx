import { SearchBox as SearchBoxComp } from 'react-instantsearch-hooks-web';

export function SearchBox({ placeholder }: { placeholder: string }) {
  return (
    <div className="col-span-full">
      <SearchBoxComp searchAsYouType autoFocus placeholder={placeholder} />
    </div>
  );
}

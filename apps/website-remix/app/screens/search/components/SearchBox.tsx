import { SearchBox as SearchBoxComp } from 'react-instantsearch-hooks-web';

// const messages = defineMessages({
//   input: {
//     id: 'search.input',
//   },
// });

export function SearchBox() {
  return (
    <div className="col-span-full">
      <SearchBoxComp
        searchAsYouType
        autoFocus
        // translations={{ placeholder: <>h1</> }}
      />
    </div>
  );
}

export default function Pages({ totalResults, nextPage }) {
  const pages = [];
  const moviesShown = Math.floor(totalResults / 20)

  for(let i = 1; i <= moviesShown + 1; i++){
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    pages.push(<p key={i} onClick={() => nextPage(i)}><a href="#">{i}</a></p>)
  }

  return (
    <div>
      {totalResults > 20 ? pages : null}
      </div>
  );
}

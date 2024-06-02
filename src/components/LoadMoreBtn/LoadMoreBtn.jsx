import css from "../LoadMoreBtn/LoadMoreBtn.module.css"

export default function LoadMoreBtn({onAdd, onRef}) {
    return (
          <button ref={onRef} className={css.button} onClick={onAdd}>Load More</button>
    )
}
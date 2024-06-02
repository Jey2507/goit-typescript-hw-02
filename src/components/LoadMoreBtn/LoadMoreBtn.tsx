import css from "../LoadMoreBtn/LoadMoreBtn.module.css"

interface More {
    onRef?: React.Ref<HTMLButtonElement>;
    onAdd: () => void,
}

export default function LoadMoreBtn({onAdd, onRef}: More) {
    return (
          <button ref={onRef} className={css.button} onClick={onAdd}>Load More</button>
    )
}
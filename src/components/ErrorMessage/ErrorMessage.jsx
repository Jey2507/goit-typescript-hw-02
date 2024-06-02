import css from "../ErrorMessage/ErrorMessage.module.css"

export default function ErrorMessage() {
    
    return (
       <p className={css.error}>Please reload the page or enter a valid query!!!</p>
    );
}

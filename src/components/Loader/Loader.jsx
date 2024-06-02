import { FidgetSpinner } from "react-loader-spinner"

import css from '../Loader/Loader.module.css'

export default function Loader() {
    return (
      <span className={css.loader}>
        <FidgetSpinner
            visible={true}
            height="80"
            width="80"
            ariaLabel="fidget-spinner-loading"
            wrapperStyle={{
              margin: "0 auto"
            }}
            wrapperClass="fidget-spinner-wrapper"
            />
      </span>
          
    )
}
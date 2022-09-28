import { useState } from "react";

const CommentForm = ({ handleSubmit, submitLabel, hasCancelButton = false, initialText = '', handleCancel }) => {
  const [text, setText] = useState(initialText);
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setText("");
  }
    return(
        <div className="post-comment">
          <div className="post-information-form">
            <img src="images/avatars/image-juliusomo.webp" alt="icon image from juliusomo"/>
          <form onSubmit={onSubmit}>
            <textarea className="input-send-comment" value={text} onChange={(e) => setText(e.target.value)} placeholder="Add a comment..." required/>
            <button className="btns">{submitLabel}</button>
          {hasCancelButton && (
            <button className="btns" onClick={handleCancel}>Cancel</button>
          )}
        </form>
          </div>
      </div>
    )
}
export default CommentForm;
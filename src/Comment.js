import CommentForm from "./CommentForm"

const Comment = ({ comment, replies, currentUserId, deleteComment, updateScore, activeComment, setActiveComment, parentId = null, parentReply = null, addComment, updateComment }) => {
    const fiveMinutes = 300000
    const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes
    const canReply = Boolean(currentUserId)
    const canEdit = currentUserId === comment.userId && !timePassed
    const canDelete = currentUserId === comment.userId && !timePassed
    const createdAt = new Date(comment.createdAt).toDateString()
    const isReplying = activeComment && activeComment.type === 'replying' && activeComment.id === comment.id
    const isEditing = activeComment && activeComment.type === 'editing' && activeComment.id === comment.id
    const replyId = parentId ? parentId : comment.id
    const replyTo = parentReply ? parentReply : comment.username
    return(
        <div className="comment-with-replies">
                <article key={comment.id} className="comment-article">
                    <div className="counter">
                        <button type="button" className="button-counter" onClick={() => updateScore(comment.score + 1, comment.id)}>+</button>
                        <span className="counter-value">{comment.score}</span>
                        <button type="button" className="button-counter" onClick={() => updateScore(comment.score - 1, comment.id)}>-</button>
                    </div>
                <div className="comment-all">
                    <div className="comment-header">
                        <div className="header-user-info">
                            <img src={comment.image} alt={"icon image from "+comment.username}/>
                            <h2>{comment.username}</h2>
                            {canEdit && <h3>you</h3>}
                            <span>{createdAt}</span>
                        </div>
                        <div className="header-user-buttons">
                            {canReply && <button type="button" className="btn-reply-header" onClick={() => setActiveComment({id: comment.id, type:"replying", parentReply: comment.username})}><img src="images/icon-reply.svg" alt="icon reply"></img> Reply</button>}
                            {canEdit && <button type="button" className="btn-reply-header edit" onClick={() => setActiveComment({id: comment.id, type:"editing"})}><img src="images/icon-edit.svg" alt="icon edit"></img> Edit</button>}
                            {canDelete && <button type="button" className="btn-reply-header delete" onClick={() => deleteComment(comment.id)}><img src="images/icon-delete.svg" alt="icon delete"></img> Delete</button>}
                        </div>
                    </div>
                <div className="comment-text">
                    {!isEditing && <p>{comment.parentReply === null && <span className="reply-to">{}</span> || comment.parentReply != null && <span className="reply-to">{"@"+comment.parentReply}</span>} {comment.body}</p>}
                    {isEditing && (<CommentForm submitLabel={"Update"} hasCancelButton initialText={comment.body} handleSubmit={(text) => updateComment(text, comment.id)} handleCancel={() => setActiveComment(null)}/>)}
                </div>
                </div>                 
                </article>
                {isReplying && <CommentForm submitLabel={"Reply"} handleSubmit={(text) => addComment(text, replyId, replyTo)}/>}
                {replies.length > 0 && (
                <article className="replies">
                    <hr className="replies-hr"/>
                    <div className="replies-divs">
                    {replies.map(reply => (
                        <Comment comment={reply} key={reply.id} replies={[]} currentUserId={currentUserId} deleteComment={deleteComment} updateScore={updateScore} activeComment={activeComment} setActiveComment={setActiveComment} parentId={comment.id} parentReply={comment.parentReply} addComment={addComment} updateComment={updateComment}/>
                    ))}
                    </div>
                </article>
                )}
        </div>
    )
}
export default Comment;
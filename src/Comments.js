import { useEffect, useState } from "react"
import {getComments as getCommentsApi, createComment as createCommentApi, deleteComment as deleteCommentApi, updateScore as updateScoreApi, updateComment as updateCommentApi} from "./Api.js"
import Comment from "./Comment"
import CommentForm from "./CommentForm"

const Comments = ({currentUserId}) => {
    const [backEndComments, setBackEndComments] = useState([])
    const [activeComment, setActiveComment] = useState(null)
    const rootComments = backEndComments.filter(backEndComments => backEndComments.parentId === null)
    const getReplies = (commentId) => backEndComments.filter((backEndComments) => backEndComments.parentId === commentId).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    useEffect(() => {
        getCommentsApi().then(data => {
            setBackEndComments(data)
        })
    }, [])

    const addComment = (text, parentId, replyTo) => {
        createCommentApi(text, parentId, replyTo).then((comment => {
            setBackEndComments([comment, ...backEndComments])
            setActiveComment(null)
        }))
    }

    const updateComment = (text, commentId) => {
        updateCommentApi(text, commentId).then(() => {
            const updatedBackEnd = backEndComments.map(backEndComment => {
                if(backEndComment.id === commentId){
                    return {...backEndComment, body: text}
                }
                return backEndComment
            })
            setBackEndComments(updatedBackEnd)
            setActiveComment(null)
        })
    }

    const deleteComment = (commentId) => {
        if(window.confirm("Are you sure you want delete this comment?")){
            deleteCommentApi(commentId).then(() => {
                const updatedBackEnd = backEndComments.filter(backEndComment => backEndComment.id !== commentId);
                setBackEndComments(updatedBackEnd)
            })
        }
    }

    const updateScore = (score, commentId) => {
        updateScoreApi(score, commentId).then(() => {
            const updatedBackEnd = backEndComments.map(backEndComment => {
                if(backEndComment.id === commentId){
                    return {...backEndComment, score: score}
                }
                return backEndComment
            })
            setBackEndComments(updatedBackEnd)
        })
    }

    return(
        <section className="section-comments">
            <div className="comments-div">
                {rootComments.map((rootComment) => (
                <Comment key={rootComment.id} comment={rootComment} replies={getReplies(rootComment.id)} currentUserId={currentUserId} deleteComment={deleteComment} updateScore={updateScore} activeComment={activeComment} setActiveComment={setActiveComment} addComment={addComment} updateComment={updateComment}/>
            ))}
            </div>
            <CommentForm submitLabel="SEND" handleSubmit={addComment}/>
        </section>
    )
}
export default Comments;
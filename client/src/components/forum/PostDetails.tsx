import React, {useEffect, useState} from 'react'
import {Container} from "../../pages/Forum.styles";
import Sidebar from "./Sidebar";
import Searchbar from "./Searchbar";
import {useParams} from "react-router-dom";
import {useMutation, useQuery} from "@apollo/client";
import {DELETE_POST, GET_POST, GET_POSTS, LIKE_POST} from "../../util/graphql";
import {Feed} from './ForumFeed.styles'
import {defaultPostData, PostData} from "../../types";
import {Menu} from "antd";
import UpdateIcon from "@material-ui/icons/Update";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MySkeleton from "./Skeleton";
import * as PS from "./Post.styles";
import {UserOutlined} from "@ant-design/icons";
import moment from "moment";
import CommentSection from "./CommentSection";
import {useLocalStorage} from "../../customHooks/useLocalStorage";

const PostDetails = () => {
    const [post, setPost] = useState<PostData>(defaultPostData)
    const {id}: { id: "" } = useParams()

    const userState = useLocalStorage('profile')
    const userId = userState?.user._id ? userState.user._id : userState?.user.googleId

    const {data, loading} = useQuery(GET_POST, {variables: {id}})

    const [deletePost] = useMutation(DELETE_POST)
    const [likePost] = useMutation(LIKE_POST)
    const [liked, setLiked] = useState<boolean>(post.likes?.includes(userId as string))

    const moreThanOneLike = post.likes?.length > 1

    useEffect(() => {
        if (data) {
            setPost(data.getPost)
        }
    }, [data])

    const removePost = async () => {
        await deletePost({variables: {id: post._id}, refetchQueries: [{query: GET_POSTS}]})
    }

    const like = async () => {
        console.log(post._id)
        await likePost({variables: {id: post._id}, refetchQueries: [{query: GET_POSTS}]})
    }


    const menu = (
        <Menu>
            {userId === post.userId._id ?
                <div>
                    <Menu.Item key="3" icon={<UpdateIcon/>}>Update</Menu.Item>
                    <Menu.Item key="4" onClick={() => removePost()}
                               icon={<DeleteOutlineIcon/>}>Delete</Menu.Item>
                </div> :
                <div>
                    <Menu.Item key="2" icon={<PersonAddIcon/>}>
                        Follow <span style={{fontWeight: 'bolder'}}>{post.username}</span>
                    </Menu.Item>
                    <Menu.Item key="1" onClick={() => {
                        setLiked(!liked)
                        like()
                    }} icon={<FavoriteBorderIcon/>}>
                        {liked ? 'unlike' : 'like'}
                    </Menu.Item>
                </div>}
        </Menu>
    );

    const CommentProps = {
        comments: [...post.comments].reverse(),
        postId: post._id,
    }

    return (
        <Container>
            <Sidebar/>
            <Feed>
                {loading ? <MySkeleton/> :
                    <PS.Post
                    >
                        <PS.PostHeaderContainer>
                            <PS.InfoContainer>
                                <PS.Avatar src={post.userId.profilePicture ? post.userId.profilePicture : null}
                                           icon={!post.profilePicture ? <UserOutlined/> : null}/>
                                <PS.Text bold='yes'>
                                    @{post.userId.username}
                                </PS.Text>
                                <PS.Text time='yes'>
                                    {moment(post.createdAt).fromNow()}
                                </PS.Text>
                            </PS.InfoContainer>
                            <PS.Dropdown overlay={menu} placement="bottomCenter" icon={<PS.Ellipsis/>}>
                            </PS.Dropdown>
                        </PS.PostHeaderContainer>
                        <PS.Text message='yes'>
                            {post.message}
                        </PS.Text>
                        <PS.ImageContainer>
                            <PS.Image src={post.selectedFile}/>
                        </PS.ImageContainer>
                        <PS.LikeContainer>{post.likes.length}{moreThanOneLike ? ' likes' : ' like'}</PS.LikeContainer>
                        <CommentSection {...CommentProps}/>
                    </PS.Post>
                }
            </Feed>
            <Searchbar/>
        </Container>
    )
}

export default PostDetails;
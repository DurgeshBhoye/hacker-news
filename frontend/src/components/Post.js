import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from "moment";

const Post = () => {

    // state variables
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [dataChilds, setDataChilds] = useState([]);

    // getting id from URL
    const { id } = useParams();

    // get single news details
    const getPostData = async () => {

        try {
            if (id) {
                const response = await axios.get(`http://hn.algolia.com/api/v1/items/${id}`);
                setData(response.data);
                setDataChilds(response.data.children)
                setLoading(false);
            }
            else {
                return
            }
        }
        catch (err) {
            console.log(err);
        }

    };

    useEffect(() => {
        getPostData();
    }, [id]);

    // console.log(dataChilds);

    // loading animation while fetching data
    if (loading) {
        return (
            <div className='w-100 loading d-flex justify-content-center align-items-center'>
                <div className="postsLoading"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
        )
    }

    else {
        return (
            <div className='container p-3'>

                <h1 className="my-4 text-white border-bottom border-light border-3">Search Hacker News</h1>

                {/* news details */}
                <div style={{ borderRadius: "20px 20px 0 0" }} className='shadow-sm container-fluid p-4 postItemsngl'>
                    <h2 className='text-white' style={{ fontSize: "45px" }}>{data.title}</h2>
                    <em className='text-secondary fw-bold text-uppercase'> — {data.author}</em>
                    <h6 className="my-3 text-success">Points : {data.points}</h6>
                </div>

                <h5 className='text-white text-center m-4'>Comments</h5>

                {/* mapping comments */}
                <ul className="list-group list-group-flush p-2">

                    {dataChilds.map((child) => {
                        return (
                            <li className="list-group-item comment text-light rounded-3 m-1 shadow-sm" key={child.id}>
                                <div className='mb-3'>
                                    <img src="https://static.vecteezy.com/system/resources/previews/019/879/186/original/user-icon-on-transparent-background-free-png.png" alt="" width="50" />
                                    <span className='fw-semibold'>{child.author}</span>
                                </div>
                                <h6 className='text-secondary'>{child.text}</h6>
                                <p>{child.points}</p>
                                <p className='float-end text-light'>{moment(child.created_at).fromNow()}</p>
                            </li>
                        )
                    })}

                </ul>

            </div>
        )
    }
}

export default Post;
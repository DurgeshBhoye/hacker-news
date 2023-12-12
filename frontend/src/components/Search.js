import { useState, useEffect } from "react"
import moment from "moment";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Search = () => {

    // state variables
    const [posts, setPosts] = useState([]);
    const [text, setText] = useState(localStorage.getItem("searchText") || '');
    const [largeTitle, setLargeTitle] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // for navigating and single news details page
    const navigate = useNavigate();

    // get all news with provided keywords
    useEffect(() => {

        const fetchNews = async () => {
            const url = `https://hn.algolia.com/api/v1/search?query=${text}`
            const response = await axios.get(url);
            setPosts(response.data.hits);
            setLargeTitle(response.data.hits[0]);  // getting first news from news data
        }
        // storing text input string to local storage every time changes
        localStorage.setItem("searchText", text);

        fetchNews();
        setIsLoading(false);
    }, [text]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!text) {
            console.log("Input is empty");
        } else {
            localStorage.setItem("searchText", text);
        }
    }

    return (
        <main>
            <div className="d-flex align-items-center justify-content-center flex-column m-2">

                <h1 className="my-4 text-white border-bottom border-light border-3">Search Hacker News</h1>

                {/* search form */}
                <form onSubmit={handleSubmit} className="d-flex justify-content-center mx-auto mt-5 mb-3 px-5 align-items-center searchform">

                    <input
                        className="form-control me-2 fs-5 p-2 bg-light searchbar"
                        type="search"
                        placeholder="Search by keyword or phrase..."
                        aria-label="Search"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        required
                    />

                    <button
                        className="btn btn-outline-light me-2 fs-5 p-2"
                        type="submit"
                    >
                        Search
                    </button>

                </form>

                {/* first news as banner */}
                <div className="my-5 d-flex container flex-column align-items-center justify-content-center container mx-auto px-5 text-white">
                    <h1 className="fw-bold text-center " style={{ fontSize: "45px" }}>
                        {largeTitle.title}
                    </h1>

                    <a
                        href={largeTitle.url}
                        target="_blank"
                        className="fs-5"
                    >
                        Read Full Story
                    </a>
                </div>


                {/* mapping news */}
                {isLoading || !posts ? (
                    <div className='w-100 loading d-flex justify-content-center '>
                        <div className="homeloading"><div></div><div></div><div></div></div>
                    </div>
                ) : (
                    <section className="row container p-1 m-1 d-flex align-items-center justify-content-evenly">
                        {posts.map((item) => {
                            const { author, created_at, objectID, title, url } = item

                            return (
                                <div
                                    onClick={() => navigate(`/post/${item.objectID}`)}
                                    key={objectID}
                                    className="col-12 col-md-5 p-2 m-2 shadow-sm m-2 rounded-2 postItem"
                                    style={{ cursor: 'pointer' }}
                                >
                                    <h3 className="fw-bold text-white mb-3">{title}</h3>
                                    <div className="flex items-center justify-between">
                                        <p className="text-secondary fw-semibold"> — <em>{author}</em></p>
                                        <a href={url} target="_blank" className="fs-6 text-primary">Read More</a>
                                    </div>
                                    <p className="float-end text-light">{moment(created_at).fromNow()}</p>
                                </div>
                            )
                        })}
                    </section>
                )}
            </div>
        </main>
    )
}

export default Search;







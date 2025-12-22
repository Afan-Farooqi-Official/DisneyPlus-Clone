import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import Viewers from "./Viewers";
import Recommends from "./Recommends";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Trending from "./Trending";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMovies } from "../features/movie/movieSlice";
import db from "./Firebase";
import { selectUserName } from "../features/user/userSlice";

const Home = (props) => {

    const dispatch = useDispatch();
    const userName = useSelector(selectUserName);
    let recommends = [];
    let newDisneys = [];
    let originals = [];
    let trendings = [];

    useEffect(() => {
        db.collection('movies').onSnapshot((snapshot) => {
            snapshot.docs.map((doc) => {
                switch (doc.data().type) {
                    case "recommend":
                        recommends.push({ id: doc.id, ...doc.data() });
                        break;
                    case "original":
                        originals.push({ id: doc.id, ...doc.data() });
                        break;
                    case "new":
                        newDisneys.push({ id: doc.id, ...doc.data() });
                        break;
                    case "trending":
                        trendings.push({ id: doc.id, ...doc.data() });
                        break;
                }
                
            })
            dispatch(setMovies({
                recommend: recommends,
                newDisney: newDisneys,
                original: originals,
                trending: trendings,
            }))
        })

    }, [userName])

    return (
        <Container>
            <ImgSlider />
            <Viewers />
            <Recommends />
            <NewDisney />
            <Originals />
            <Trending />
            <BgImg src="/images/home-background.png" />
        </Container>
    )
}

const Container = styled.div`
    position: relative;
    height: calc(100vh - 70px);
    overflow-x: hidden;
    display: block;
    padding: 0 calc(3.5vw + 5px);
`

const BgImg = styled.img`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    object-fit: cover;
`

export default Home;
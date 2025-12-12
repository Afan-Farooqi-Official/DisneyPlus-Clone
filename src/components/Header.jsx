import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { 
    selectUserName, 
    setUserLoginDetails,
    selectUserPhoto, 
    setSignOutState
} from "../features/user/userSlice";
import { auth, provider } from "./firebase";

const Header = (props) => {

    const dispatch = useDispatch();
    const history = useNavigate();
    const userName = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if(user) {
                setUser(user);
                history('/home');
            }
        })
    }, [userName]);

    const handleAuth = () => {
        if (!userName) {
            auth.signInWithPopup(provider).then((result) => {
                setUser(result.user);
                }).catch((error)  => {
                toast.error(error.message)
            })
        } else if (userName) {
            auth.signOut().then(() => {
                dispatch(setSignOutState(
                ));
                history('/');
            }).catch((error) => toast.error(error.message));
        }
    }

    const setUser = (user) => {
        dispatch(setUserLoginDetails({
            name: user.displayName,
            email: user.email,
            photo: user.photo,
        }));
    }

    return (
        <Nav>
            <Logo src="/images/logo.svg" alt="Disney+ Logo" />
            <Hamburger onClick={() => setMenuOpen(!menuOpen)}>
                <span />
                <span />
                <span />
            </Hamburger>
            {
                !userName ? <Login onClick={handleAuth}>Login</Login>
                :
                <>
                    <NavMenu open={menuOpen}>
                        <a href="/home">
                            <img src="/images/home-icon.svg" alt="HOME" />
                            <span>HOME</span>
                        </a>
                        <a href="/search">
                            <img src="/images/search-icon.svg" alt="SEARCH" />
                            <span>SEARCH</span>
                        </a>
                        <a href="/watchlist">
                            <img src="/images/watchlist-icon.svg" alt="WATCHLIST" />
                            <span>WATCHLIST</span>
                        </a>
                        <a href="/originals">
                            <img src="/images/original-icon.svg" alt="ORIGINALS" />
                            <span>ORIGINALS</span>
                        </a>
                        <a href="/movies">
                            <img src="/images/movie-icon.svg" alt="MOVIES" />
                            <span>MOVIES</span>
                        </a>
                        <a href="/series">
                            <img src="/images/series-icon.svg" alt="SERIES" />
                            <span>SERIES</span>
                        </a>
                    </NavMenu>
                    <SignOut onClick={handleAuth}>
                        <UserImg src={userPhoto} alt={userName} />
                        <DropDown>Sign out</DropDown>
                    </SignOut>
                </>
            }
        </Nav>
    )
}

const Nav = styled.nav`
    height: 70px;
    background: #090b13;
    display: flex;
    align-items: center;
    padding: 0 36px;
    overflow: visible;
`

const Logo = styled.img`
    width: 80px;
`

const NavMenu = styled.div`
    display: flex;
    align-items: center;
    margin-left: 25px;
    a {
        display: flex;
        align-items: center;
        padding: 0 12px;
        cursor: pointer;
        img {
            height: 20px;
        }
        span {
            font-size: 13px;
            letter-spacing: 1.42px;
            position: relative;
            &:after {
                content: "";
                height: 2px;
                background: white;
                position: absolute;
                left: 0;
                right: 0;
                bottom: -6px;
                opacity: 0;
                transform: scaleX(0);
                transform-origin: left center;
                transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
            }
        }
        &:hover {
            span:after {
                transform: scaleX(1);
                opacity: 1;
            }
        }
    }

    @media (max-width: 768px) {
      position: absolute;
      top: 70px;               
      left: 0;
      right: 0;
      background: rgba(9, 11, 19, 0.9); 
      flex-direction: column;
      align-items: flex-start;
      padding: 15px;            
      z-index: 999;
      width: 80%;               
      margin: 0 auto;           
      border-radius: 6px;       
      display: ${({ open }) => (open ? "flex" : "none")};
      transition: all 0.3s ease; 

      a {
        width: 100%;
        padding: 12px 0;
      }
    }
`

const Login = styled.a`
    margin-left: auto;
    background-color: rgba(0, 0, 0, 0.6);
    padding: 8px 16px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    border: 1px solid #f9f9f9;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease 0s;
    &:hover {
        background-color: #f9f9f9;
        color: #000;
    }
`

const UserImg = styled.img`
    height: 40px;
    width: 40px;
    border-radius: 50%;
    margin-left: auto;
    cursor: pointer;
`

const DropDown = styled.div`
    position: absolute;
    top: 48px;
    right: 0px;
    background: rgb(19, 19, 19);
    border: 1px solid rgba(151, 151, 151, 0.34);
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
    padding: 10px;
    font-size: 14px;
    letter-spacing: 3px;
    width: 100px;
    opacity: 0;
`

const SignOut = styled.div`
    position: relative;
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-left: auto;

    &{UserImg} {
        border-radius: 50%;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    &:hover {
        ${DropDown} {
            opacity: 1;
            transition-duration: 1s;
        }
    }
`

const Hamburger = styled.div`
    display: none;
    flex-direction: column;
    justify-content: space-around;
    width: 25px;
    height: 20px;
    cursor: pointer;
    margin-left: auto;

    span {
      height: 3px;
      background: #fff;
      border-radius: 2px;
    }

    @media (max-width: 768px) {
      display: flex;
    }
`

export default Header;
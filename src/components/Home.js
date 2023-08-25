import React, {useState,useEffect} from "react"
import "../styles/Home.css"
import axios from "axios";

const Home = () => {
    const [search, setSearch] = useState("");
    const [clicked, setClicked] = useState(false);
    const [secondClick, setSecondClick] = useState(true);
    const [menuClick, setMenuClick]= useState(false);
    const [close, setClose]= useState(false);
    const [pairs, setPairs] = useState([]); // Initialize pairs state as an empty array
    // let arr=[];

    const handleMenuClick=()=>{
        setMenuClick(true);
        setClose(false);
    }
    const handleClose=()=>{
        setMenuClick(false);
        setClose(true);
    }

    useEffect(() => {
        // setSearch("eth");
        searchPairs("eth");
      }, []);
  
    const handleClick = () => {
      setClicked(true);
      setSecondClick(false);
    };
  
    const handle = () => {
      setSecondClick(true);
      setClicked(false);
    };
  
    const searchQuery = () => {
      searchPairs(search);
    };
  
    const searchPairs = async (query) => {
        try {
          const response = await axios.get(
            `https://api.dexscreener.com/latest/dex/search/?q=${query}`
          );
        //   console.log("Pairs API Response:", response.data); // Log the API response
          if (response.data.pairs && response.data.pairs.length > 0) {
            const baseTokenAddress = response.data.pairs[0].baseToken.address;
            searchToken(baseTokenAddress);
          } else {
            setPairs([]); // Clear the pairs if no data found
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
      const searchToken = async (token) => {
        try {
          const response = await axios.get(
            `https://api.dexscreener.com/latest/dex/tokens/${token}`
          );
        //   console.log("Token API Response:", response.data); // Log the API response
          if (response.data) {
            setPairs(response.data.pairs); // Set pairs as an array with the fetched token data
            // arr=response.data.pairs;
            // console.log(response.data.pairs);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      const connect = async () => {
        
      };


    return(
        <div className="main">
            <div className={`menu-btn ${menuClick?'menuClick':''} ${close?"menuOpen":''}`} onClick={handleMenuClick}>
                <img src={require("../Images/menu.png")} alt="search"/>
            </div>
        <div className={`navbar ${menuClick?"open":"close"} ${close?"menuClose":''}`} >
            <div className={`close-menu ${menuClick?"close-me":'closed'} ${close?"close-now":''}`} onClick={handleClose}>
                <img src={require("../Images/1024px-Multiplication_Sign.svg.png")} alt="clone menu"/>
            </div>
            <div className="navbar-top">
                <div className="first">
                <img src={require("../Images/Vector.png")} alt="vector"/>
                    <h1>NFTify</h1>
                </div>
                <div className={`second ${secondClick ? 'active' : ''}`} onClick={handle}>
                <img src={require("../Images/Vector (1).png")} alt="vector1"/>
                <p>Token Address</p>
                </div>
                <div className={`third ${clicked ? 'clicked' : ''}`} onClick={handleClick}>
                <img src={require("../Images/fluent_pair-24-filled.png")} alt="fluent_pair-24-filled"/>
                <p>Pair Address</p>
                </div>
            </div>
            <div className="navbar-bottom">
                <div className="social-icons">
                <img src={require("../Images/facebook's.png")} alt="facebook's logo"/>
                <img src={require("../Images/linkedin's.png")} alt="linkedin's logo"/>
                <img src={require("../Images/twitter's.png")} alt="twitter's logo"/>
                </div>
            </div>
        </div>
        <div className="main-body">
            <div className="main-body-search-bar">
                <div className="search-input">
                <input type="text" onChange={(event)=>setSearch(event.target.value)} value={search}  placeholder="Search">
                </input>
                <button onClick={searchQuery} className="search-btn"><img src={require("../Images/search's.png")}/></button>
                </div>
                
                <button onClick={connect} className="connect-btn">Connect</button>
            </div>
            <div className="main-container">
                <h2> {secondClick===true?"Token":"Pair"} Search Results</h2>
                { pairs
                .sort((a, b) => b.priceUsd - a.priceUsd) // Sort in descending order of price in USD
              .slice(0, 10) // Display at most 10 pairs
                .map((pair)=>(
                    <div className="container">
                            <div key={pair.id} className="card">
                                <div className="card-details">
                                <h3>Basic Info</h3>
                                <div className="details">
                                    <div className="key">
                                        <p>PairCreatedAt</p>
                                        <p>Symbol</p>
                                        <p>Dex Id</p>
                                        <p>Pair Address</p>
                                        </div>
                                     <div className="value">
                                        <p>{pair.pairCreatedAt?pair.pairCreatedAt:0}</p>
                                        <p>{pair.baseToken.symbol}</p>
                                        <p>{pair.dexId}</p>
                                        <p>{pair.pairAddress}</p>
                                     </div>
                                </div>
                                </div>
                                <div className="first-symbol">
                                    <img src={require("../Images/material-symbols_token-outline.png")} alt="symbol"/>
                               </div>
                            </div>
                            <div key={pair.id} className="card">
                            <div className="card-details">
                                <h3>Base Token</h3>
                                <div className="details">
                                <div className="key">
                                    <p>Name</p>
                                    <p>Symbol</p>
                                    <p>Address</p>
                                </div>
                                <div className="value">
                                <p>{pair.baseToken.name}</p>
                                    <p>{pair.baseToken.symbol}</p>
                                    <p>{pair.baseToken.address}</p>
                                </div>
                                </div>
                                </div>
                                <div className="second-symbol">
                                    <img src={require("../Images/material-symbols_token-outline.png")} alt="symbol"/>
                               </div>
                            </div> 
                            <div key={pair.id} className="card">
                            <div className="card-details">
                                <h3>Quote Token</h3>
                                <div className="details">
                                <div className="key">
                                    <p>Name</p>    
                                    <p>Symbol</p>   
                                    <p>Address</p>
                                </div>
                                <div className="value">
                                <p>{pair.quoteToken.name}</p>
                                    <p>{pair.quoteToken.symbol}</p>
                                    <p>{pair.quoteToken.address}</p>
                                </div>
                                </div>
                                </div>
                                <div className="third-symbol">
                                    <img src={require("../Images/material-symbols_token-outline.png")} alt="symbol"/>
                               </div>
                            </div> 
                            <div key={pair.id}  className="card">
                                <div className="card-details">
                                <h3>Price</h3>
                                <div className="details">
                                <div className="key">
                                    <p>Price Native</p>
                                    <p>Price USD</p>
                                </div>
                                <div className="value">
                                <p>{pair.priceNative}</p>
                                    <p>{pair.priceUsd}</p>
                                </div>
                                </div>
                                </div>
                                <div className="four-symbol">
                                    <img src={require("../Images/pepicons-pop_dollar.png")} alt="doller's symbol"/>
                               </div>
                                </div> 
                    </div>
                                )) 
                        }
                  {/* </div> */}
            </div>
        </div>
        </div>
    )
}

export default Home;

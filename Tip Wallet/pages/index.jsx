import abi from '../utils/buyTip.json';
import { ethers } from "ethers";
import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState } from "react";
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import descImg from '../public/desc_defi.png';
import 'bootstrap/dist/css/bootstrap.css';
import LilyImg from '../assets/Lily.jpg'
import RachelImg from '../assets/Rachel.jpg'
import RohitImg from '../assets/Rohit.jpg'
import SampleImg from '../assets/sample.jpg'






export default function Home() {
  // Contract Address & ABI
  const contractAddress = "0xDBa03676a2fBb6711CB652beF5B7416A53c1421D";
  const contractABI = abi.abi;

  // Component state
  const [currentAccount, setCurrentAccount] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [memos, setMemos] = useState([]);

  const onNameChange = (event) => {
    setName(event.target.value);
  }

  const onMessageChange = (event) => {
    setMessage(event.target.value);
  }

  // Wallet connection logic
  const isWalletConnected = async () => {
    try {
      const { ethereum } = window;

      const accounts = await ethereum.request({method: 'eth_accounts'})
      console.log("accounts: ", accounts);

      if (accounts.length > 0) {
        const account = accounts[0];
        console.log("wallet is connected! " + account);
      } else {
        console.log("make sure MetaMask is connected");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }

  const connectWallet = async () => {
    try {
      const {ethereum} = window;

      if (!ethereum) {
        console.log("please install MetaMask");
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts'
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  }

  const buyTip = async () => {
    try {
      const {ethereum} = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const signer = provider.getSigner();
        const buyTip = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        console.log("Sending Tip..")
        const coffeeTxn = await buyTip.buyTip(
          name ? name : "anon",
          message ? message : "Enjoy your Tip!",
          {value: ethers.utils.parseEther("0.001")}
        );

        await coffeeTxn.wait();

        console.log("mined ", coffeeTxn.hash);

        console.log("coffee purchased!");

        // Clear the form fields.
        setName("");
        setMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to fetch all memos stored on-chain.
  const getMemos = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const buyTip = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        
        console.log("fetching memos from the blockchain..");
        const memos = await buyTip.getMemos();
        console.log("fetched!");
        setMemos(memos);
      } else {
        console.log("Metamask is not connected");
      }
      
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    let buyTip;
    isWalletConnected();
    getMemos();

  

    // Create an event handler function for when someone sends
    // us a new memo.
    const onNewMemo = (from, timestamp, name, message) => {
      console.log("Memo received: ", from, timestamp, name, message);
      setMemos((prevState) => [
        ...prevState,
        {
          address: from,
          timestamp: new Date(timestamp * 1000),
          message,
          name
        }
      ]);
    };

    const {ethereum} = window;

    // Listen for new memo events.
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum, "any");
      const signer = provider.getSigner();
      buyTip = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      buyTip.on("NewMemo", onNewMemo);
    }

    return () => {
      if (buyTip) {
        buyTip.off("NewMemo", onNewMemo);
      }
    }
  }, []);

  
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Tip Wallet</title>
        <meta name="description" content="Tipping site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.landingPage}>
      <div  className={styles.overlay}>
        <h1 className={styles.para}>
          Futuristic way to <br></br>Send Tips <span>!!</span>
          </h1>
       
      </div>
    </div>
    <div className={styles.row}>
      <div className={styles.column}>
        <button  onClick={connectWallet} className={styles.connectWallet}>Connect Your Wallet</button>
        </div>
      <div className={styles.column2}><Image
                    src={descImg}
                    alt="main img"
                    height="880"
                    width="1080"
                /></div>
    </div>
{/* lskjdlfjsd */}
<div className={styles.contain}>
  <div className={styles.card}>
    <div className={styles.card_image}><Image
                    src={LilyImg}
                    alt='Lily Robert Profile'
                /></div>
    
    <p className={styles.card__name}>Lily Robert</p>
    <div className={styles.grid_contain}>
      <div className={styles.grid_child_posts}>
        Dancer
      </div>
    </div> 
    <button onClick={connectWallet} className={styles.btn}>Send Tip</button>
  </div>

  <div className={styles.card}>
    <div className={styles.card_image}><Image
                    src={RohitImg}
                    alt='Rohit Profile'
                /></div>
    
    <p className={styles.card__name}>Jose Murphy</p>
    <div className={styles.grid_contain}>
      <div className={styles.grid_child_posts}>
        Painter
      </div>
    </div> 
    <button onClick={connectWallet} className={styles.btn}>Send Tip</button>
  </div>

  <div className={styles.card}>
    <div className={styles.card_image}><Image
                    src={SampleImg}
                    alt='Rohit Profile'
                /></div>
    
    <p className={styles.card__name}>Venkatesh Negi</p>
    <div className={styles.grid_contain}>
      <div className={styles.grid_child_posts}>
        Coach
      </div>
    </div> 
    <button onClick={connectWallet} className={styles.btn}>Send Tip</button>
  </div>
  

  <div className={styles.card}>
    <div className={styles.card_image}><Image
                    src={RachelImg}
                    alt='Rachel Profile'
                /></div>
    
    <p className={styles.card__name}>Dr. Rachel Shah</p>
    <div className={styles.grid_contain}>
      <div className={styles.grid_child_posts}>
        Professor
      </div>
    </div> 
    <button  onClick={connectWallet} className={styles.btn}>Send Tip</button>
  </div>
  </div>

{/* lksjdlfjslkl */}

      <main className={styles.main}>
        {/* <h1 className={styles.title}>
          Buy Albert a Coffee!
        </h1> */}
        
        {currentAccount ? (
          <div>
            <form>
              <div>
                <label className={styles.textLabel}>
                  Your Name
                </label>
                
                <input
                  id="name"
                  type="text"
                  placeholder="Anonymous.."
                  onChange={onNameChange}
                  className={styles.textArea}
                  
                  />
              </div>
              <br/>
              <div>
                <label className={styles.textLabel}>
                  Send a<br/> Message....
                </label>
                

                <textarea
                  rows={3}
                  placeholder="Great Going!! Enjoy your Tip.."
                  id="message"
                  onChange={onMessageChange}
                  required
                  className={styles.textAreaMsg}
                >
                </textarea>
              </div>
              <div>
                <button
                  type="button"
                  onClick={buyTip}
                  className={styles.sendTip}
                >
                  Send Tip
                </button>
              </div>
            </form>
          </div>
        ) 
        : 
        (
          <br></br>
          // <button onClick={connectWallet}> Connect your wallet </button>
        )
        }
      </main>

      {currentAccount && (<div className="msgBox"><h1 className={styles.successMsg}>&ldquo;Memos Received&ldquo;</h1></div>)}

      {currentAccount && (memos.map((memo, idx) => {
        return (
          <div key={idx} style={{border:"2px solid", "borderRadius":"5px", padding: "5px", margin: "5px"}}>
            <p style={{"fontWeight":"bold"}}>{memo.message}</p>
            <p>From: {memo.name} at {memo.timestamp.toString()}</p>
          </div>
        )
      }))}

      {/* Footer */}

      <footer className={styles.footer}>
      <div className={styles.columns}>
        <div className={styles.column_footer}>
        <a className={styles.link} href="/contact">Contact Us</a>          
        </div>
        <div className={styles.column_footer}>
        <a className={styles.link}  href="/contact">Want to receive Tip? (Get Featured)</a>
        </div>
      </div>
      <hr className={styles.lineBreak} /> 
      <div className={styles.lastFooter}>
          A DeFi based tipping system — [4th Year - Group 39]
        </div>
    </footer>
    </div>
  )
}

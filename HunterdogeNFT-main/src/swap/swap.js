import React, {useState, useEffect} from "react";
import './swap.css';
import logo from './logo.png'
import {
    contractAddress,
    abi,
    abi_migration,
    migrationAddress
} from "../utils/constant";
import Web3 from 'web3'

function Swap() {
    let accountAd;
    const [account, setAccount] = useState("Connect to Wallet")
    const [balance, setbalance] = useState(0);
    const [id_num, setID] = useState(0);
    var imagelink = {};
    var URIImage = new Image(300, 300);
    var div = document.getElementById('NFT_img');

    const getData = async () => {
        try {
            const web3 = window.web3;
            let contract = new web3.eth.Contract(abi, contractAddress);
            let count_nft = await contract.methods.balanceOf(accountAd).call();
            console.log("This Account has so many NFTs", accountAd, count_nft);
            console.log("URI is", imagelink.image);
            setbalance(count_nft)
        } catch (error) {
            console.log("data", error);
        }
    };
    const loadNFT = async () => {
        try {
            const web3 = window.web3;
            let contract = new web3.eth.Contract(abi, contractAddress);
            let custom_abi = await contract.methods.tokenURI(id_num).call();
            div.appendChild(URIImage);
            URIImage.src = JSON.parse(atob(custom_abi.substring(29))).image;
            console.log("URI is", URIImage);
        } catch (error) {
            console.log("data", error);
        }
    }


    const getAccounts = async () => {
        const web3 = window.web3;
        try {
            let accounts = await web3.eth.getAccounts();
            setAccount(accounts[0])
            console.log(accounts);
            return accounts;
        } catch (error) {
            console.log("Error while fetching acounts: ", error);
            return null;
        }
    };

    const loadWeb3 = async () => {
        let isConnected = false;
        try {
            if (window.ethereum) {
                window.web3 = new Web3(window.ethereum);
                await window.ethereum.enable();
                isConnected = true;
            } else if (window.web3) {
                window.web3 = new Web3(window.web3.currentProvider);
                isConnected = true;
            } else {
                isConnected = false;
                console.log("Metamask is not installed, please install it on your browser to connect.");
                // alert("Metamask is not installed, please install it on your browser to connect.");
            }
            if (isConnected === true) {
                let accounts = await getAccounts();
                let accountDetails = null;
                setAccount(accounts[0]);
                accountAd = accounts[0];
                window.ethereum.on("accountsChanged", function (accounts) {
                });
                setAccount(accounts[0]);
                accountAd = accounts[0];
                console.log(accounts);
            }
            getData();
        } catch (error) {
            console.log("Error while connecting metamask", error);
            // alert("Error while connecting metamask");
        }
    };
    const getReward = async (e) => {
            try {
                const web3 = window.web3;
                let contract = new web3.eth.Contract(abi, contractAddress);
                let letMigration = new web3.eth.Contract(abi_migration, migrationAddress);
                await contract.methods.approve(migrationAddress, id_num).send({
                    from: account,
                    value: 0
                }).on('receipt', (receipt) => {
                    letMigration.methods.collectReward(id_num).send({from: account})
                });
            } catch
                (error) {
                console.log("Error while checking locked account", error);
            }
        }
    ;


    //   useEffect(() => {
    //        setInterval(() => {
    //          loadWeb3();
    //         getData();
    //      }, 1000);
    //  }, []);

    return (
        <div className="container-fluid">

            <div className="Header">
                <div className="container">
                    <div className="row">
                        {/* <div className="col-lg  headerimg"> */}
                        <div className="col-md-2 headerimg1">
                            <img src={logo} width="100px" alt="logo"/>
                        </div>
                        <div className="col-md-2 headerimg1">
                            <h3 className="h3"><b>HunterDoge NFT</b></h3>
                        </div>
                        <div className="col-md-3 offset-md-4 headerbtn">
                            <button className="connect" onClick={loadWeb3}>{account}</button>
                        </div>
                        {/* </div> */}
                    </div>

                </div>
            </div>

            <div className="headerbar">
                <div className="container">
                    <div className="row-cols-auto">
                        <h4 className="h6"><b>Load your NFT ID and collect your Reward :)</b>
                        </h4>
                        <p></p>
                        <input className="text-sm-center" type="text" name="" id="" onChange={(e) => {
                            setID(e.target.value)
                        }}/>
                        <button className="btns btn-success" onClick={loadNFT}>Load NFT</button>
                        <div className="text-sm-center" id='NFT_img'>
                            <p></p>
                        </div>
                        <div className="col-sm">
                            <p></p>
                            <button href="https://t.me/hunterdogeofficial"
                                    className="btn btn-warning my-xl-5 py-3 text-black"
                                    onClick={getReward}>Collect Reward
                            </button>
                            <h4 className="h4">You are owning {balance} NFTs </h4>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}

export default Swap;

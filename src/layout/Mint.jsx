import React, { useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import Increment from "../components/Increment";
import Payment from "../components/Payment";
import Header from "../imgs/banner.png";
import { ReactComponent as ETH } from "../assets/img/icons/ETH.svg";
import { Link, ETHTokenType } from "@imtbl/imx-sdk";
import Web3 from "web3";
import axios from "axios";

const { ethereum } = window;

const Form = () => {
  let web3 = new Web3(window.ethereum);
  const [value, setValue] = useState(10);
  const eth = process.env.REACT_APP_PRICE * value;
  const [eligable, setEligable] = useState(false);
  const [loggedIn, setLogged] = useState(false);
  const [currentAddress, setCurrentAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentType, setType] = useState("ETH");
  const [msg, changeMsg] = useState("");
  const [msgState, msgChange] = useState(false);
  const [counter, setCounter] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();
  }


  const counterRequest = () => {
    return new Promise(async (resolve, reject) => {
      const count = await axios.get(
        `${process.env.REACT_APP_URL}/api/v1/count`
      );
      setCounter(count.data.count);
      resolve("Done");
    });
  };

  counterRequest();
  const accountRegistered = async (address) => {
    //This will check if the user is registered with IMX.. If not prompt them to register
    return new Promise(async (resolve, reject) => {
      try {
        await axios.get(
          `https://api.x.immutable.com/v1/users/${address.toLowerCase()}`
        );
        resolve(true);
      } catch {
        resolve(false);
      }
    });
  };

  const disconnectWallet = () => {
    localStorage.removeItem("address");
    setLogged(false);
    setEligable(false);
    msgChange(false);
  };

  const connectWallet = async () => {
    console.log(currentAddress);
 
    //This is a very messy method.... But this will connect the user to metamask
    await window.ethereum.request({
      method: "wallet_requestPermissions",
      params: [
        {
          eth_accounts: {},
        },
      ],
    });
    const account = await ethereum.request({ method: "eth_requestAccounts" });
    localStorage.setItem("address", account[0]);

    //Check if wallet is registered with IMX

    const registered = await accountRegistered(account[0].toLowerCase());
    console.log(registered);

    if (registered) {
      try {
        await axios.get(
          `${process.env.REACT_APP_URL}/api/v1/sale/${localStorage.getItem("address")}`
        );
        setEligable(true);
        setLogged(true);
      } catch {
        setLogged(true);
        setEligable(false);
        msgChange(true);
        changeMsg(
          `${localStorage.getItem("address")} is not on the whitelist!`
        );
        console.log("Unauthorized");
      }
    } else {
      try {
        const address = await link.setup({});
        setCurrentAddress(address.address);
        const eligable = await axios.get(
          `${process.env.REACT_APP_URL}/api/v1/sale/${currentAddress}`
        );
        console.log(eligable);
        setEligable(true);
        setCurrentAddress(address[0]);
        setLogged(true);
        localStorage.setItem("address", account[0]);
      } catch {
        setLogged(true);
        setEligable(false);
        msgChange(true);
        changeMsg(
          `${localStorage.getItem("address")} is not on the whitelist!`
        );
        console.log("Unauthorized");
      }
    }
  };

  const link = new Link("https://link.x.immutable.com");

  const handlePayment = async () => {
    try {
      if (paymentType === "ETH") {
        const accounts = await web3.eth.getAccounts();
        var receiver = process.env.REACT_APP_TREASUREY;
        web3.eth.sendTransaction(
          {
            to: receiver,
            from: accounts[0],
            //value:web3.toWei("0.5", "ether")}
            value: web3.utils.toWei(eth.toString(), "ether"),
          },
          async function (err, res) {
            if (res) {
              console.log(res);
              const body_data = {
                address: localStorage.getItem("address"),
                hash: res,
                type: "ETH",
                quantity: value,
              };
              setEligable(false);
              setLoading(true);
              try {
                const response = await axios.post(
                  `${process.env.REACT_APP_URL}/api/v1/mint`,
                  body_data
                );
                console.log(response);
                setLoading(false);
                setEligable(true);
                console.log(response);
              } catch (err) {
                console.log(err);
                setLoading(false);
                setEligable(true);
              }
            }
          }
        );
      }

      if (paymentType === "IMX") {
        await link.setup({});
         await link
          .transfer([
            {
              amount: eth.toString(),
              type: ETHTokenType.ETH,
              toAddress: process.env.REACT_APP_TREASUREY,
            },
          ])
          .then(async (data) => {
            const body_data = {
              address: localStorage.getItem("address"),
              hash: data.result[0].txId,
              type: "IMX",
              quantity: value,
            };
            setEligable(false);
            setLoading(true);
            await axios.post(
              `${process.env.REACT_APP_URL}/api/v1/mint`,
              body_data
            );
          });
        setEligable(true);
        setLoading(false);
      }
    } catch {
      console.log("There was an issue");
    }
  };

  return (
    <FormStyle onSubmit={handleSubmit}>
      <div>
        <div>
          <label>Payment Method</label>
          <div>
            <Payment value={paymentType} change={setType} />
          </div>
        </div>
        <div>
          <label>mint</label>
          <Increment value={value} change={setValue} />
        </div>
        <div className="total">
          <label>Total</label>
          <div>
            <ETH />
            <span>{eth} ETH</span>
          </div>
        </div>
      </div>

      <div className="center">
        {eligable && (
          <div className="mint-container">
            <div className="counter"></div>
            <Button onClick={handlePayment} type="submit">
              MINT NOW{" "}
            </Button>
            <div className="counter">{counter}/7331 Remaining</div>
          </div>
        )}

        {!loggedIn && (
          <Button onClick={connectWallet} type="submit">
            Connect Wallet
          </Button>
        )}

        {loading && (
          <div className="loading">
            Your Mint Request Is Currently Being Processed...
          </div>
        )}

        {msgState && (
          <div className="box-msg">
            <p> {msg}</p>
          </div>
        )}
      </div>

      {loggedIn && (
        <div className="disconnect-wallet-container">
          <Button
            variant="secondary"
            className="disconnect"
            onClick={disconnectWallet}
            type="submit"
          >
            Disconnect Wallet
          </Button>
        </div>
      )}
    </FormStyle>
  );
};
const FormStyle = styled.form`
  .mint-container {
    margin-bottom: 1rem;
    justify-content: center;
    text-align: center;
    align-items: center;
    min-width: 100vw;
  }

  .counter {
    text-align: center;
    margin-top: 1rem;
    font-size: 1.5rem;
    color: white;
  }

  .box-msg {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;

    min-width: 100rem;
  }

  .box-msg p {
    font-size: 0.9rem;
  }

  .loading {
    color: white;
  }
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  > div {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 42px 0 35px;
    padding-bottom: 42px;
    border-bottom: 1px solid #483b8e;
    > * {
      flex: 1;
      max-width: 271px;
      min-width: 190px;
      :first-child {
        margin-right: 15px;
      }
      @media (max-width: 992px) {
        max-width: 100%;
        margin-bottom: 30px;
        :first-child {
          margin-right: 0px;
        }
      }
    }
  }

  label {
    display: block;
    text-transform: uppercase;
    margin-bottom: 20px;
  }

  .total {
    > div {
      display: flex;
      align-items: center;
      background: #433395;
      border-radius: 16px;
      padding: 17px 30px;
      font-family: "Montserrat Bold";
      font-weight: bold;
      font-size: 16px;
      line-height: 30px;
      span {
        margin-left: 15px;
      }
    }
  }
`;

const Mint = () => {
  return (
    <Style>
      <div className="bg">
        <Holder>
          <img src={Header} alt="" />

          <Content>
            <h2>YOUR SUPER COOL PROJECT HERE!</h2>
            <p>Your super cool project description here!</p>

            <Form />
          </Content>
        </Holder>
      </div>
    </Style>
  );
};

export default Mint;

const Style = styled.header`
  .counter-container {
    color: #f2f3f5;
    margin-top: 2rem;
    font-size: 1rem;
    width: 100vw;
    text-align: center;
    justify-content: flex-start;
    padding: 1rem;
    display: flex;
  }
  .bg {
    background: linear-gradient(180deg, #1e1552 0%, rgba(30, 21, 82, 0) 100%);
    border-radius: 10px;
    padding-left: 135px;
    padding-right: 135px;
    margin-top: 80px;
    margin-bottom: 160px;
    @media (max-width: 768px) {
      margin-bottom: 70px;
      padding-left: 40px;
      padding-right: 40px;
    }
    @media (max-width: 576px) {
      padding-left: 20px;
      padding-right: 20px;
    }
  }
`;
const Holder = styled.div`
  .disconnect-wallet-container {
    display: flex;
    padding: 0.9rem;
    justify-content: center !important;
    text-align: center;
  }
  position: relative;
  bottom: 80px;
  img {
    border-radius: 10px;
    width: 100%;
    margin-bottom: 60px;
  }
  @media (max-width: 768px) {
    bottom: 60px;

    img {
      margin-bottom: 40px;
    }
  }
`;

const Content = styled.div`
  background: linear-gradient(180deg, #7361e3 0%, rgba(30, 21, 82, 0) 100%);
  border-radius: 10px;
  width: 85%;
  margin: 0 auto;
  padding: 47px 65px;
  text-align: center;

  h2 {
    color: white;
    margin-bottom: 30px;
    text-align: left;
  }

  h4 {
    color: gray;
    margin-bottom: 30px;
    text-align: center;
  }
  p {
    text-align: left;
  }

  @media (max-width: 768px) {
    padding: 40px 20px;
    width: 100%;
  }
`;

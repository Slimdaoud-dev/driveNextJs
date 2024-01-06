"use client";
// Import necessary dependencies
import { useState, useEffect } from "react";
import { ethers } from "ethers"; // Import ethers from the correct path
import Upload from "./artifacts/contracts/Upload.sol/Upload";
import FileUpload from "./components/UploadFile";
import Display from "./components/Display";

// Define the Home component
export default function Home() {
  // State variables to store account, contract, and provider
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // useEffect to initialize the Ethereum provider and contract
  useEffect(() => {
    const loadProvider = async () => {
      try {
        if (window.ethereum) {
          const ethereumProvider = new ethers.providers.Web3Provider(
            window.ethereum
          );
          setProvider(ethereumProvider);

          // Event listeners for account and chain changes
          window.ethereum.on("chainChanged", () => window.location.reload());
          window.ethereum.on("accountsChanged", () => window.location.reload());

          // Request user accounts
          const [userAccount] = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setAccount(userAccount);

          // Define contract address and initialize contract
          const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
          const signer = ethereumProvider.getSigner();
          const deployedContract = new ethers.Contract(
            contractAddress,
            Upload.abi,
            signer
          );

          setContract(deployedContract);
        } else {
          console.error("MetaMask is not installed");
        }
      } catch (error) {
        console.error("Error loading provider:", error.message);
      }
    };

    loadProvider();
  }, []); // eslint-disable-next-line react-hooks/exhaustive-deps

  const sharing = async () => {
    const address = document.querySelector(".addresssharing").value;
    await contract.allow(address);
    setModalOpen(false);
  };
  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.shareAccess();
      let select = document.querySelector("#selectNumber");
      const options = addressList;

      for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    };
    contract && accessList();
  }, [contract]);
  return (
    <>
      <div className="container my-24 mx-auto md:px-6 xl:px-96">
        <section
          className="mb-32"
          style={{ backgroundColor: "#5DADE2", padding: 15, borderRadius: 30 }}
        >
          <button
            className="btn"
            onClick={() => document.getElementById("my_modal_4").showModal()}
          >
            Share
          </button>
          <dialog id="my_modal_4" className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
              <h3 className="font-bold text-lg">Share your data </h3>
              <div className="title">Share with</div>
              <div className="body">
                <input
                  type="text"
                  placeholder="Enter Address"
                  
                  
                  
                  className="addresssharing bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                  style={{ marginBottom: 10 }}
                />
              </div>
              <form id="myForm">
                <select id="selectNumber">
                  <option className="address">People With Access</option>
                </select>
              </form>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button, it will close the modal */}
                  <button
                    className="btn"
                    style={{ marginRight: 20, color: "red" }}
                  >
                    Close
                  </button>
                  <button
                    className="btn"
                    onClick={() => sharing()}
                    style={{ color: "green" }}
                  >
                    Share
                  </button>
                </form>
              </div>
            </div>
          </dialog>
          <h1
            className="mb-10 text-center text-xl font-semibold"
            style={{ textSizeAdjust: 500 }}
          >
            Next Drive
          </h1>
          <p className="mb-10 text-center text-xl font-semibold">
            Account: {account ? account : "Not connected"}
          </p>
          {/* FileUpload and Display components */}
          <FileUpload account={account} contract={contract} />
          <Display contract={contract} account={account} />
        </section>
      </div>
    </>
  );
}

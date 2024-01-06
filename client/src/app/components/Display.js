import { useState } from "react";

const Display = ({ contract, account }) => {
  const [data, setData] = useState([]);
  const [inputAddress, setInputAddress] = useState("");

  const getdata = async () => {
    try {
      const targetAddress = inputAddress || account;
      const dataArray = await contract.display(targetAddress);

      if (dataArray.length > 0) {
        const images = dataArray.map((item, i) => (
          <a href={item} key={i} target="_blank" rel="noopener noreferrer">
            <img key={i} src={item} alt="new" className="image-list" />
          </a>
        ));
        setData(images);
      } else {
        setData([]);
        alert("No image to display");
      }
    } catch (e) {
      console.error(e);
      alert("Error fetching data");
    }
  };

  return (
    <>
      <div className="image-list">{data}</div>
      
       <div>
  <label
    htmlFor="website"
    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  >
    Load Data
  </label>
  <input
  type="text"
  placeholder="Enter Address"
  value={inputAddress}
  onChange={(e) => setInputAddress(e.target.value)}
  id="address"
   
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
   style={{marginBottom:10}}
    
  />
</div>

       <button
      
          type="submit"
          onClick={getdata}
          data-te-ripple-init=""
          data-te-ripple-color="light"
          className="mb-6 inline-block w-full rounded-full bg-black px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        >
          Get Data
        </button>
      
    </>
  );
};

export default Display;

import React, { useEffect, useState } from 'react'
import axios from 'axios'

const User_Cards = () => {

    const [data, setData]=useState([])
    const[profileImg, setProfileImg]=useState([])
    const [loading, setLoading]=useState(true)

  useEffect(() => {

    // async function used to fetch data from the API of both users and profile images at the same time 
    // and set the data to the state variables, setData and setProfileImg. Each API call is awaited using the await keyword.
    const fetchData = async () => {
      try {
        const userResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
        setData(userResponse.data);

        const profileResponse = await axios.get('https://randomuser.me/api/?results=9');
        setProfileImg(profileResponse.data.results);

        setLoading(false); // Set loading to false only after both API calls are completed
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <>
    <div className="container mx-auto">
        <h3 className="text-center text-2xl m-4">Loading....</h3>
        <div className="lg:ml-2 xl:ml-15 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="max-w-sm rounded overflow-hidden shadow-lg border p-2 animate-pulse"
            >
              <div className="w-full h-48 bg-gray-300 rounded"></div>
              <div className="px-6 py-4">
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
  </>
  )}
  else
  {
    return (
      <div className="container mx-auto">
      <h3 className="text-center text-2xl m-4">Alumni of Law College</h3>
      <div className="lg:ml-2 xl:ml-15 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {data.slice(0,9).map((user, index) => (
          <div
            className="max-w-sm rounded overflow-hidden shadow-lg border p-2"
            key={user.id}
          >
              <img
                src={profileImg[index]?.picture.large || "https://via.placeholder.com/150"}
                alt={profileImg[index]?.gender || "placeholder"}
                className="w-full border"
                style={{ height: "200px" }}
              />
            <div className="px-6 py-4">
            <h1 className="font-bold text-xl mb-2">{user.name}</h1>
              <h1 className="font-bold text-gray-700 mb-1">Email: <span className="font-normal">{user.email}</span></h1>
              <p className="font-bold text-gray-700 mb-1">Phone: <span className="font-normal">{user.phone}</span></p>
              <p className="font-bold text-gray-700 mb-1">Address: <span className="font-normal">{user.address?.street}</span></p>
              <p className="font-bold text-gray-700">Company Name: <span className="font-normal">{user.company?.name}</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  } 
}

export default User_Cards
import React, { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import queryString from 'query-string'
import axios from 'axios'
import { API } from '../../urlConfig'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../Actions/auth.actions'
import { nanoid } from 'nanoid'

const Login = () => {
  // const location = useLocation()
  // const navigate = useNavigate()
  // const [tableId, setTableId] = useState(null)
  const [name, setName] = useState('')
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { tableId } = useParams();

  // console.log(tableId);
  // useEffect(() => {
  //   const parsed = queryString.parse(location.search)
  //   if (location.search == '') {
  //     navigate('/page-not-found')
  //   }
  //   if (parsed.tableId === '') {
  //     console.log('error')
  //     navigate('/page-not-found')
  //   }
  //   setTableId(parsed.tableId)
  //   // console.log(parsed);
  // }, [location.search])

  // const handleLogin = async (e) => {
  //   e.preventDefault()
  //   try {
  //     // const token = jwt.sign({ tableId }, "secret");
  //     // localStorage.setItem("token", token);
  //     await axios.post(API + '/login', { tableId, name })
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }

  const deviceId = nanoid();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = {
      name,
      tableId,
      deviceId,
    };
    dispatch(login(user));
  };

  if (auth.authenticate) {
    return <Navigate to={`/`} />;
  }




  return (
    // <div className=" flex justify-center items-center bg-zinc-500 h-screen">
    //   {/* <h1>Table ID: {tableId}</h1>
    //     <button onClick={handleLogin}>Login</button> */}
    <div className="flex  items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <form className="space-y-4 md:space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block mb-2 pb-4 text-left text-sm font-medium text-gray-900 dark:text-white"
              >
                Enter your Name :
              </label>
              <input
                type="text"
                name="username"
                id="username"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </div>

            <button
              type="submit"
              onClick={handleLogin}
              className="w-full text-white bg-rose-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
    // </div>
  )
}

export default Login

import React, { useEffect } from 'react'
import { useState } from 'react'
import httpService from './httpService'
import { Form, Modal, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../register.css'
import { fontSize } from '@mui/system'

function MyProfile() {
  const [myProfile, setMyProfile] = useState({
  id: 0,
  fname: '',
  lname: '',
  phone: '',
  address: '',
  email: '',
  })
  const [error, setError] = useState({
    titleerr: '',
    submitErr: '',
  })

  const [success, setSuccess] = useState('')

  useEffect(() => {
    const sign = JSON.parse(localStorage.getItem('data1'))
    httpService
      .get(process.env.REACT_APP_BASE_URL + '/user/' + sign.id)
      .then((res) => {
        console.log(JSON.stringify(res))
        setMyProfile(res.data)
        localStorage.setItem('data1', JSON.stringify(res.data))
      })
  }, [error,success])

  const handleChange = (a) => {
    const input = a.target
    const name = input.name
    const val = input.value
    if (val.length === 0) {
      error[name + 'Err'] = input.placeholder
    } else {
      error[name + 'Err'] = ''
    }
    setError(error)
    setMyProfile({ ...myProfile, [name]: val })
  }

  const submitForm = async (e) => {
    e.preventDefault()
    let data = {
      id: myProfile.id,
      fname: myProfile.fname,
      lname: myProfile.lname,
      phone: myProfile.phone,
      address: myProfile.address,
      email: myProfile.email,
    }

    await httpService
      .put(process.env.REACT_APP_BASE_URL + '/user', data)
      .then((res) => {
        console.log(res)
        localStorage.setItem('data1', JSON.stringify(res.data))
        setMyProfile(res.data)
        setSuccess('Successfully Updated')
        window.location.href = '/profile'
      })
      .catch((err) => {
        error['submitErr'] = err.message
        setError(prevError => ({...prevError,...error}))
      })
  }

  return (
    <div className="register">
      <h2>My Profile</h2>
      <div className="register_container">
        <Form.Group className="mb-2" controlId="formBasicEmail">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter First Name"
            name="fname"
            value={myProfile.fname}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicEmail">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Last Name"
            name="lname"
            value={myProfile.lname}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicEmail">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Phone"
            name="phone"
            value={myProfile.phone}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicEmail">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Address"
            name="address"
            value={myProfile.address}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Email"
            name="email"
            value={myProfile.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Link to="/profile">
          {' '}
          <button
            className="innerbutton"
            type="submit"
            value="Submit"
            onClick={submitForm}
          >
            Update User Information
          </button>
        </Link>
        <br />
        <div style={{ fontSize: 'small', color: 'red' }}>
          {Object.values(error).map((a) => (
            <div>{a ? a : null}</div>
          ))}
        </div>
        <div style={{ fontSize: 'small', color: 'green' }}>{success}</div>
      </div>
    </div>
  )
}

export default MyProfile

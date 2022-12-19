import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store/store'
import { addAddress } from '../../store/UserSlice'
import style from './checkout.module.css'

const AddressForm = ({setEnableAddressEditForm, enableAddressEditForm, initialData}:any) => {
    const [name,setName] = useState<any>(initialData ? initialData.name : '')
  const [mobileNumber, setMobileNumber] = useState<any>(initialData ? initialData.mobileNumber : '')
  const [address, setAddress] = useState<any>(initialData ? initialData.address : '')
  const [locality, setLocality] = useState<any>(initialData ? initialData.locality : '')
  const [cityDistrictTown, setCityDistrictTown] = useState<any>(initialData ? initialData.cityDistrictTown : '')
  const [pinCode, setPinCode] = useState<any>(initialData ? initialData.pinCode : '')
  const [state, setState] = useState<any>(initialData ? initialData.state : '')
  const [id, setId] = useState<any>(initialData ? initialData._id : "");
  const [addressType, setAddressType] = useState<any>(initialData ? initialData.addressType : "");
  const dispatch = useDispatch<AppDispatch>()

  console.log(initialData)
  const handleSubmitForm = () => {
    let payload:any = {
        address: {
            name,
            mobileNumber,
            address,
            locality,
            cityDistrictTown,
            pinCode,
            state,
            addressType,
        }
    }
    if(id){
        payload.address._id = id
    }
    dispatch(addAddress(payload))
    // let address {

    // }   
    setEnableAddressEditForm(!enableAddressEditForm)
  }
  return (
    <div>
        <form>
            <div className={style.formRow}>
                <div className={style.formColumn}>
                    <label htmlFor="name">Name</label>
                    <input className={style.formControl} type="text" name='name' value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className={style.formColumn}>
                    <label htmlFor="mobileNumber">Phone number</label>
                    <input className={style.formControl} type='text' name='mobileNumber' value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
                </div>
            </div>
            <div className={style.formRow}>
                <div className={style.formColumn}>
                    <label htmlFor="address">Address</label>
                    <textarea className={style.textArea} name='address' value={address} onChange={(e) => setAddress(e.target.value)} ></textarea>
                </div>
            </div>
            <div className={style.formRow}> 
                <div className={style.formColumn}>
                    <label htmlFor="locality">Locality</label>
                    <input className={style.formControl} type='text' name='locality' value={locality} onChange={(e) => setLocality(e.target.value)}/>
                </div>
                <div className={style.formColumn}>
                    <label htmlFor="cityDistrictTown">City</label>
                    <input className={style.formControl} type='text' name='cityDistrictTown' value={cityDistrictTown} onChange={(e) => setCityDistrictTown(e.target.value)}/>
                </div>
            </div>
            <div className={style.formRow}>
                <div className={style.formColumn}>
                    <label htmlFor="pinCode">Pin code</label>
                    <input className={style.formControl} type='text' name='pinCode' value={pinCode} onChange={(e) => setPinCode(e.target.value)}/>
                </div>
                <div className={style.formColumn}>
                    <label htmlFor="state">State</label>
                    <input className={style.formControl} type='text' name='state' value={state} onChange={(e) => setState(e.target.value)} />
                </div>
            </div>
            <div>
          <label>Address Type</label>
          <div className={style.formRow}>
            <div>
              <input
                type="radio"
                onClick={() => setAddressType("home")}
                name="addressType"
                value="home"
              />
              <span>Home</span>
            </div>
            <div>
              <input
                type="radio"
                onClick={() => setAddressType("work")}
                name="addressType"
                value="work"
              />
              <span>Work</span>
            </div>
          </div>
        </div>
            <button onClick={handleSubmitForm} className={style.cmnbtn}>Deliver here</button>
        </form>
    </div>
  )
}

export default AddressForm
import React, { useEffect, useState } from 'react'

const FrontPage = () => {
  const iniData = {
    rollNo:"",
    name:"",
    checkIn:"12:00",
    checkOut:"17:00"
  }
  const [data,setData] = useState(iniData)
  const [studentData,setStudentData] = useState([])
  const [message,setMessage] = useState("")
  const [count,setCount] = useState(-1)
  useEffect(()=>{
    setTimeout(() => {
      setCount(-1)
    }, 3000);
  },[count])
  useEffect(()=>{
    setTimeout(() => {
      setMessage("")
    }, 3000);
  },[message])
  useEffect(()=>{
    if(sessionStorage.getItem('studentData'))
      setStudentData(JSON.parse(sessionStorage.getItem('studentData')))
  },[])
  const EnterDetail =(e)=>{
    const {name,value} = e.target
    setData(prev=>({...prev,[name]:value}))
  }
  const markAttendence =(e)=>{
    e.preventDefault()
    setStudentData(prev=>{
      const temp = prev.filter(e=>e.rollNo===data.rollNo)
      if(temp.length){
        setMessage("Today's attendence already marked")
        return(prev)
      }
      else{
        setMessage("Attendence has been marked")
        setData(iniData)
        sessionStorage.setItem('studentData',JSON.stringify([...prev,data]));
        return([...prev,data])
      }
    })
  }
  const getStudentinSchool =()=>{
    const date = new Date()
    let hour = Math.floor(date.getHours()/10)?date.getHours():'0'+date.getHours()
    let minute = Math.floor(date.getMinutes()/10)?date.getMinutes():'0'+date.getMinutes()
    const CurruntTime = hour+":"+minute;
    let tcount = 0;
    studentData.forEach(element => {
      if(element.checkIn <= CurruntTime && element.checkOut >= CurruntTime)
        tcount++;
    });
    setCount(tcount)
  }
  return (
    <div className='main'>
        {
          message.length > 0 && <div>{message}</div>
        }
        <div>
          Mark Attendance
        </div>
        <form onSubmit={markAttendence}>
          <div>
            <span>Roll No: </span>
            <input type="text" required autoFocus value = {data.rollNo} onChange = {EnterDetail} name="rollNo" placeholder='Enter RollNo'/>
          </div>
          <div>
            <span>Name: </span>
            <input type="text" required value = {data.name} onChange = {EnterDetail} name="name" placeholder='Enter Name'/>
          </div>
          <div>
            <span>check In: </span>
            <input type="time" required value={data.checkIn} onChange = {EnterDetail} name="checkIn" />
          </div>
          <div>
            <span>check Out: </span>
            <input type="time" required value={data.checkOut} onChange = {EnterDetail} name="checkOut" />
          </div>
          <button type="submit">Mark Attendence</button>
        </form>
        <button onClick={getStudentinSchool}>No of student in school right now</button>
        {
          count!==-1 && <div>Total no of student in school right now = {count}</div>
        }
    </div>
  )
}

export default FrontPage
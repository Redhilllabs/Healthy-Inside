import React, { useState,useEffect } from 'react'
import {getitemlist} from '../../utils/ApiCall'

const ItemmanufacPlaner = () => {

const [ItemName ,setItemName] = useState('')
const [table,settable] = useState(false);
const [viewform ,setviewform] = useState(false);
const [selectday ,setselectday] = useState('')
const [TimeSlot_From ,setTimeSlot_From] = useState('')
const [TimeSlot_To,setTimeSlot_To] = useState('')
const [task,settask] = useState('')
const [section, setsection] = useState('')
const [tableList,settableList] = useState([])
const [assign,setassign] = useState('')
const [data, setData] = useState("");



const options = [];
for(let i=0; i<4; i++){
  options.push(<option value={`Day${i}`}>Day{i}</option>);
}

const handleItemNameChange = (e)=>{
    setItemName(e.target.value)
}
const handeladdmore = () =>{
  if(ItemName ){
    setviewform(true)
  }else{
    alert("choose Item Name")
  }
  
    
}
const handeladdtoplanner =()=>{
 const newitem = {
    selectday:selectday,
    Time:{
      TimeSlot_From:TimeSlot_From,
      TimeSlot_To,TimeSlot_To
    },
    Task:task,
    section:section,
    assigned: assign

  }
  if (task && selectday && TimeSlot_From && TimeSlot_To && section) {
    settableList((previtem) => [...previtem, newitem]);
    settable(true);
    settask('');
    setselectday('');
    setTimeSlot_From('');
    setTimeSlot_To('');
    setsection('');
    setassign('');
  } else {
    alert('fill all field');
  }

}

useEffect(() => {
  const fetchData = async () => {
    const response = await getitemlist();
    setData(response);
  };
  fetchData();
}, []);


  return (
    <>
<div className="formcontains">
            <form class="form" id="recipe-designing">
              <div>
                <label for="Receipe Name">Item Name</label>
                <select name="" id="" value={ItemName} onChange={handleItemNameChange}>

                  <option value="">Select Option</option>
                  {data && data.data && data.data.map((item, index) => (
  <option key={index} value={item.ItemName}>
    {item.ItemName}
  </option>
))}

                </select>
              
              </div>

              <div id="addmoreingredients" onClick={handeladdmore}>
                Plan
              </div>
            </form>
        </div>

{viewform &&(
  <form  id="viewform">
  
<div   id="viewformtask" >
<div  className='containee'>
                  <label htmlFor="">Section</label>
                  <select name="" value={section} onChange={(e)=>setsection(e.target.value)} id="">
<option value="">Select Option</option>
                    <option value="inventory">Inventory</option>
                    <option value="master">Master</option>
                    <option value="seed">Seed</option>
                    <option value="opk">OPK</option>
                  </select>
                </div>
                <div className='containee'>
                  <label htmlFor="">Assigned To</label>
                  <input type="text" value={assign} onChange={(e)=>{setassign(e.target.value)}} />
                </div>
<label htmlFor="">Task</label>
<textarea name="" value={task} onChange={(e)=>settask(e.target.value)} id="" ></textarea>
<div className='contain' >
<div className='containee' >
                  <label for="saleplanItemname">Select Day</label>
                  <select
                    name="saleplanItemname"
                    id="saleplanItemname"
                    value={selectday}
                    onChange={(e)=>setselectday(e.target.value)}
                  >
                  <option value="">Select Option</option>
{options}
                  </select>
                </div>

                <div  id='timeitem'>
                
                <label htmlFor="">Time Slot</label>
                  <div id='timeslot'>

                      <label htmlFor="salesForcast">
                        From
                      </label>
                      
                      <input
                        type="time"
                        name="salesForcast"
                        id="salesForcast"
                        value={TimeSlot_From}
                        onChange={(e)=>setTimeSlot_From(e.target.value)}
                        required
                      />
                   <br />

                    
                      <label htmlFor="salesplandate">
                      To
                      </label>
                      

                      <input
                        type="time"
                        value={TimeSlot_To}
                        onChange={(e)=>setTimeSlot_To(e.target.value)}
                        required
                      />
                    
                  </div>
                </div>
                
</div>
</div>


                <center>

                <div id="addtoplaner" onClick={handeladdtoplanner}>
                  Add To Planner
                </div>

                </center>

              </form>
)}

        {table&&(
            <div className="table-container"   id='yourrecipetale'>
            <h2>Item Manufacturing</h2>
            <br />
            <table className="recipe_table">
  <thead>
    <tr>
      <th>Day</th>
      <th>Time</th>
      <th>Task</th>
      <th>Section</th>
      <th> Assigned To </th>

    </tr>
  </thead>
  <tbody>
  {tableList.sort((a, b) => {
    const dayComparison = a.selectday.localeCompare(b.selectday);
    if (dayComparison !== 0) {
      return dayComparison;
    } else {
      return a.Time.TimeSlot_From.localeCompare(b.Time.TimeSlot_From);
    }
  }).map((service, index) => (
    <tr key={index}>
      <td>{service.selectday}</td>
      <td>
      {service.Time.TimeSlot_From} - {service.Time.TimeSlot_To}
      </td>
      <td>{service.Task}</td>
      <td>{service.section}</td>
      <td>{service.assigned}</td>
    </tr>
  ))}

  </tbody>
</table>

            <div id="tabel_controllers">
              <div id="recipebutton_close" onClick={() => settable(false)}>
                cancel
              </div>
              <div id="recipebutton_save" onClick={(e)=>alert("Not Sving To Db")}  >Submit</div>
            </div>
          </div>
        )}

    </>
  )
}

export default ItemmanufacPlaner
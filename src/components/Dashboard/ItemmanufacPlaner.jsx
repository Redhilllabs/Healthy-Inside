import React, { useState, useEffect } from "react";
import { getitemlist ,AddToJobFlow ,GetAllJobFlow} from "../../utils/ApiCall";

const ItemmanufacPlaner = () => {
  const [ItemName, setItemName] = useState("");
  const [table, settable] = useState(false);
  // const [viewform, setviewform] = useState(false);
  const [selectday, setselectday] = useState("");
  const [TimeSlot_From, setTimeSlot_From] = useState("");
  const [TimeSlot_To, setTimeSlot_To] = useState("");
  const [task, settask] = useState("");
  const [section, setsection] = useState("");
  const [tableList, settableList] = useState([]);
  const [assign, setassign] = useState("");
  const [data, setData] = useState("");

  const [IngredientsFlow,setIngredientsFlow] = useState(false);
  const [ProcessFlow,setProcessFlow] = useState(false);
  const [EquipmentFlow,setEquipmentFlow] = useState(false);
  const [LabFlow ,setLabFlow ] = useState(false);
  const [JobFlow,setJobFlow] = useState(false);
  const [JobFlowform,setJobFlowform] = useState(false);
  const [LabFlowform,setLabFlowform] = useState(false);
  const [EquipmentFlowform,setEquipmentFlowform] = useState(false);
  const [ProcessFlowform,setProcessFlowform] = useState(false);
  const [IngredientsFlowform,setIngredientsFlowform] = useState(false);
  const [jobflowtable,setjobflowtable] = useState(false);
  const [ProcessCode,setProcessCode]  = useState("");
  const [EquipmentFlowtable,setEquipmentFlowtable] = useState(false);
  const [jobflowData,setJobFlowData] = useState([]);


  const options = [];
  for (let i = 0; i < 4; i++) {
    options.push(<option value={`Day${i}`}>Day{i}</option>);
  }
  const equipment = [];
  for (let i = 0; i < 4; i++) {
    equipment.push(<option value={`Equipment${i}`}>Equipment{i}</option>);
  }

  const handleItemNameChange = (e) => {
    setItemName(e.target.value);
  };
  const handelJobFlow= () => {
    if (ItemName) {
      setJobFlowform(true);
    } else {
      alert("choose Item Name");
    }
  };
  const handelIngredientsFlow = () => {
    if (ItemName) {
      setIngredientsFlowform(true);
    } else {
      alert("choose Item Name");
    }
  };
  const handelProcessFlow = () => {
    if (ItemName) {
      setProcessFlowform(true);
    } else {
      alert("choose Item Name");
    }
  };
  const handelEquipmentFlow = () => {
    if (ItemName) {
      setEquipmentFlowtable(true);
    } else {
      alert("choose Item Name");
    }
  };
  const handelLabFlow = () => {
    if (ItemName) {
      setLabFlowform(true);
    } else {
      alert("choose Item Name");
    }
  };
  const handeladdtoplanner = () => {
    // const newitem = {
    //   selectday: selectday,
    //   Time: {
    //     TimeSlot_From: TimeSlot_From,
    //     TimeSlot_To,
    //     TimeSlot_To,
    //   },
    //   Task: task,
    //   section: section,
    //   assigned: assign,
    // };
    // if (task && selectday && TimeSlot_From && TimeSlot_To && section) {
    //   settableList((previtem) => [...previtem, newitem]);
    //   settable(true);
    //   settask("");
    //   setselectday("");
    //   setTimeSlot_From("");
    //   setTimeSlot_To("");
    //   setsection("");
    //   setassign("");
    // } else {
    //   alert("fill all field");
    // }
  };
  const handeljobflowtable = (e) =>{
    e.preventDefault()

    const newitem = {
      selectday: selectday,
      Time: {
        TimeSlot_From: TimeSlot_From,
        TimeSlot_To: TimeSlot_To,
      },
      Task: task,
      section: section,
      assigned: assign,
    };
    if (task && selectday && TimeSlot_From && TimeSlot_To && section) {
      settableList((previtem) => [...previtem, newitem]);
      setjobflowtable(true)
      settask("");
      setselectday("");
      setTimeSlot_From("");
      setTimeSlot_To("");
      setsection("");
      setassign("");
    } else {
      alert("fill all field");
    }
    
  }
  const handelsubmitjobflow = async()=>{

    let bodyContent = JSON.stringify({
      "ItemName":ItemName,
      "JobFlow": tableList
    });

    const response = await AddToJobFlow(bodyContent)
    console.log(response)
    if(response.status === 401){
      alert(response.message)
      
    }else{
      alert(response.operation)
      settableList([])
      setJobFlow(false);
      setjobflowtable(false)
      setJobFlowform(false)
        settask("");
        setselectday("");
        setTimeSlot_From("");
        setTimeSlot_To("");
        setsection("");
        setassign("");
        setItemName("")
      
    }

   

  }

  const handeltoggelbutton = (formName)=>{
    setJobFlow(formName==="JobFlow"?!JobFlow:false);
    setProcessFlow(formName==="ProcessFlow"?!ProcessFlow:false)
    setEquipmentFlow(formName==="EquipmentFlow"?!EquipmentFlow:false)
    setLabFlow(formName==="LabFlow"?!LabFlow:false)
    setIngredientsFlow(formName==="IngredientsFlow"?!IngredientsFlow:false)
    setJobFlowform(false)
    setProcessFlowform(false)
    setEquipmentFlowform(false)
    setLabFlowform(false)
    setIngredientsFlowform(false)
    setItemName("")


  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemListResponse = await getitemlist();
        setData(itemListResponse);
        
        const jobFlowResponse = await GetAllJobFlow();
        setJobFlowData(jobFlowResponse.data);
      } catch (error) {
        console.error(error);
        // Handle error state
      }
    };
    fetchData();
  }, []);
  
  

  return (
    <>



      <div className="formcontains">


      <div className="recipeform_buttons_options">
              <button  id={JobFlow ? "active" : ""}  onClick={() => handeltoggelbutton("JobFlow")}>Job Flow</button>
              <button id={ProcessFlow ? "active" : ""}  onClick={() => handeltoggelbutton("ProcessFlow")} >Process Flow</button>
              <button id={EquipmentFlow ? "active" : ""}  onClick={() => handeltoggelbutton("EquipmentFlow")} >Equipment Flow</button>
              <button id={LabFlow ? "active" : ""}  onClick={() => handeltoggelbutton("LabFlow")} >Lab Flow</button>
              <button id={IngredientsFlow ? "active" : ""}  onClick={() => handeltoggelbutton("IngredientsFlow")} >Ingredients Flow</button>
            </div>

{JobFlow?
<form class="form" id="recipe-designing">
          <div>
            <label for="Receipe Name">Item Name</label>
            <select
              name=""
              id=""
              value={ItemName}
              onChange={handleItemNameChange}
            >
              <option value="">Select Option</option>
              {data &&
                data.data &&
                data.data.map((item, index) => (
                  <option key={index} value={item.ItemName}>
                    {item.ItemName}
                  </option>
                ))}
            </select>
          </div>

          <div id="addmoreingredients" onClick={handelJobFlow}>
            Plan
          </div>
        </form>
        :<></>}
        {ProcessFlow?
<form class="form" id="recipe-designing">
          <div>
            <label for="Receipe Name">Item Name</label>
            <select
              name=""
              id=""
              value={ItemName}
              onChange={handleItemNameChange}
            >
              <option value="">Select Option</option>
              {data &&
                data.data &&
                data.data.map((item, index) => (
                  <option key={index} value={item.ItemName}>
                    {item.ItemName}
                  </option>
                ))}
            </select>
          </div>

          <div id="addmoreingredients" onClick={handelProcessFlow}>
            Plan
          </div>
        </form>
        :<></>}
        {EquipmentFlow?
<form class="form" id="recipe-designing">
          <div>
            <label for="Receipe Name">Item Name</label>
            <select
              name=""
              id=""
              value={ItemName}
              onChange={handleItemNameChange}
            >
              <option value="">Select Option</option>
              {data &&
                data.data &&
                data.data.map((item, index) => (
                  <option key={index} value={item.ItemName}>
                    {item.ItemName}
                  </option>
                ))}
            </select>
          </div>

          <div id="addmoreingredients" onClick={handelEquipmentFlow}>
            Plan
          </div>
        </form>
        :<></>}
        {LabFlow?
<form class="form" id="recipe-designing">
          <div>
            <label for="Receipe Name">Item Name</label>
            <select
              name=""
              id=""
              value={ItemName}
              onChange={handleItemNameChange}
            >
              <option value="">Select Option</option>
              {data &&
                data.data &&
                data.data.map((item, index) => (
                  <option key={index} value={item.ItemName}>
                    {item.ItemName}
                  </option>
                ))}
            </select>
          </div>

          <div id="addmoreingredients" onClick={handelLabFlow}>
            Plan
          </div>
        </form>
        :<></>}
        {IngredientsFlow?
<form class="form" id="recipe-designing">
          <div>
            <label for="Receipe Name">Item Name</label>
            <select
              name=""
              id=""
              value={ItemName}
              onChange={handleItemNameChange}
            >
              <option value="">Select Option</option>
              {data &&
                data.data &&
                data.data.map((item, index) => (
                  <option key={index} value={item.ItemName}>
                    {item.ItemName}
                  </option>
                ))}
            </select>
          </div>

          <div id="addmoreingredients" onClick={handelIngredientsFlow}>
            Plan
          </div>
        </form>
        :<></>}

      </div>

      {JobFlowform && (
        <form id="viewform" onSubmit={handeljobflowtable}>
          <div id="viewformtask">
          
              <div className="containee">
                <label for="saleplanItemname">Select Day</label>
                <select
                  name="saleplanItemname"
                  id="saleplanItemname"
                  value={selectday}
                  onChange={(e) => setselectday(e.target.value)}
                >
                  <option value="">Select Option</option>
                  {options}
                </select>
              </div>
              <div className="containee">
              <label htmlFor="">Time</label>
                <div id="timeslot">
                  <label htmlFor="salesForcast">From</label>

                  <input
                    type="time"
                    name="salesForcast"
                    id="salesForcast"
                    value={TimeSlot_From}
                    onChange={(e) => setTimeSlot_From(e.target.value)}
                    required
                  />
                  
                  <br />

                  <label htmlFor="salesplandate">To</label>
<br />
                  <input
                    type="time"
                    value={TimeSlot_To}
                    onChange={(e) => setTimeSlot_To(e.target.value)}
                    required
                  />

                </div>
              </div>
              
<div className="containee">
<label htmlFor="">Job</label>
            <textarea
              name=""
              value={task}
              onChange={(e) => settask(e.target.value)}
              id=""
              required
            ></textarea>
</div>
            

            <div className="containee">
              <label htmlFor="">Section</label>
              <select
                name=""
                value={section}
                onChange={(e) => setsection(e.target.value)}
                id=""
                required
              >
                <option value="">Select Option</option>
                <option value="inventory">Inventory</option>
                <option value="master">Master</option>
                <option value="seed">Seed</option>
                <option value="opk">OPK</option>
              </select>
            </div>
            <div className="containee">
              <label htmlFor="">Assigned To</label>
              <input
                type="text"
                value={assign}
                required
                onChange={(e) => {
                  setassign(e.target.value);
                }}
              />
            </div>
          </div>

          
          <div id="addtoplaner">

          <input  id="add_planerbtn" type="submit" value={"Add To Planner"}>
              
            </input>
          </div>
            
          
        </form>
      )}
      {ProcessFlowform && (
        <form id="viewform" onSubmit={handeljobflowtable}>
          <div id="viewformtask">
          
              <div className="containee">
                <label for="saleplanItemname">Select Day</label>
                <select
                  name="saleplanItemname"
                  id="saleplanItemname"
                  value={selectday}
                  onChange={(e) => setselectday(e.target.value)}
                >
                  <option value="">Select Option</option>
                  {options}
                </select>
              </div>
              <div >
              <label htmlFor="">Process Code</label>
                <input type="text" value={ProcessCode} onChange={(e)=> setProcessCode(e.target.value)} />
              </div>
              
<div >
<label htmlFor="">Process description</label>
            <textarea
              name=""
              value={task}
              onChange={(e) => settask(e.target.value)}
              id=""
              required
            ></textarea>
</div>
            

            <div >
              <label htmlFor="">Section</label>
              <select
                name=""
                value={section}
                onChange={(e) => setsection(e.target.value)}
                id=""
                required
              >
                <option value="">Select Option</option>
                <option value="inventory">Inventory</option>
                <option value="master">Master</option>
                <option value="seed">Seed</option>
                <option value="opk">OPK</option>
              </select>
            </div>
            {/* <div className="containee">
              <label htmlFor="">Assigned To</label>
              <input
                type="text"
                value={assign}
                required
                onChange={(e) => {
                  setassign(e.target.value);
                }}
              />
            </div> */}
          </div>

          
          <div id="addtoplaner">

          <input  id="add_planerbtn" type="submit" value={"Add To Planner"}>
              
            </input>
          </div>
            
          
        </form>
      )}

      {/* {EquipmentFlowform && (
        <form id="viewform">
          <div id="viewformtask">
          
              <div className="containee">
                <label for="saleplanItemname">Select Day</label>
                <select
                  name="saleplanItemname"
                  id="saleplanItemname"
                  value={selectday}
                  onChange={(e) => setselectday(e.target.value)}
                >
                  <option value="">Select Option</option>
                  {options}
                </select>
              </div>
              <div className="containee">
              <label htmlFor="">Time</label>
                <div id="timeslot">
                  <label htmlFor="salesForcast">From</label>

                  <input
                    type="time"
                    name="salesForcast"
                    id="salesForcast"
                    value={TimeSlot_From}
                    onChange={(e) => setTimeSlot_From(e.target.value)}
                    required
                  />
                  
                  <br />

                  <label htmlFor="salesplandate">To</label>
<br />
                  <input
                    type="time"
                    value={TimeSlot_To}
                    onChange={(e) => setTimeSlot_To(e.target.value)}
                    required
                  />

                </div>
              </div>
              
<div className="containee">
<label htmlFor="">Task</label>
            <textarea
              name=""
              value={task}
              onChange={(e) => settask(e.target.value)}
              id=""
            ></textarea>
</div>
            

            <div className="containee">
              <label htmlFor="">Section</label>
              <select
                name=""
                value={section}
                onChange={(e) => setsection(e.target.value)}
                id=""
              >
                <option value="">Select Option</option>
                <option value="inventory">Inventory</option>
                <option value="master">Master</option>
                <option value="seed">Seed</option>
                <option value="opk">OPK</option>
              </select>
            </div>
            <div className="containee">
              <label htmlFor="">Assigned To</label>
              <input
                type="text"
                value={assign}
                onChange={(e) => {
                  setassign(e.target.value);
                }}
              />
            </div>
          </div>

          <div id="addtoplaner">

<div id="add_planerbtn" onClick={handeladdtoplanner}>
    Add To Planner
  </div>
</div>
        </form>
      )} */}
      {LabFlowform && (
        <form id="viewform">
          <div id="viewformtask">
          
              <div className="containee">
                <label for="saleplanItemname">Select Day</label>
                <select
                  name="saleplanItemname"
                  id="saleplanItemname"
                  value={selectday}
                  onChange={(e) => setselectday(e.target.value)}
                >
                  <option value="">Select Option</option>
                  {options}
                </select>
              </div>
              <div className="containee">
              <label htmlFor="">Time</label>
                <div id="timeslot">
                  <label htmlFor="salesForcast">From</label>

                  <input
                    type="time"
                    name="salesForcast"
                    id="salesForcast"
                    value={TimeSlot_From}
                    onChange={(e) => setTimeSlot_From(e.target.value)}
                    required
                  />
                  
                  <br />

                  <label htmlFor="salesplandate">To</label>
<br />
                  <input
                    type="time"
                    value={TimeSlot_To}
                    onChange={(e) => setTimeSlot_To(e.target.value)}
                    required
                  />

                </div>
              </div>
              
<div className="containee">
<label htmlFor="">Task</label>
            <textarea
              name=""
              value={task}
              onChange={(e) => settask(e.target.value)}
              id=""
            ></textarea>
</div>
            

            <div className="containee">
              <label htmlFor="">Section</label>
              <select
                name=""
                value={section}
                onChange={(e) => setsection(e.target.value)}
                id=""
              >
                <option value="">Select Option</option>
                <option value="inventory">Inventory</option>
                <option value="master">Master</option>
                <option value="seed">Seed</option>
                <option value="opk">OPK</option>
              </select>
            </div>
            <div className="containee">
              <label htmlFor="">Assigned To</label>
              <input
                type="text"
                value={assign}
                onChange={(e) => {
                  setassign(e.target.value);
                }}
              />
            </div>
          </div>

          <div id="addtoplaner">

<div id="add_planerbtn" onClick={handeladdtoplanner}>
    Add To Planner
  </div>
</div>
        </form>
      )}
      {IngredientsFlowform && (
        <form id="viewform">
          <div id="viewformtask">
          
              <div className="containee">
                <label for="saleplanItemname">Select Day</label>
                <select
                  name="saleplanItemname"
                  id="saleplanItemname"
                  value={selectday}
                  onChange={(e) => setselectday(e.target.value)}
                >
                  <option value="">Select Option</option>
                  {options}
                </select>
              </div>
              <div className="containee">
              <label htmlFor="">Time</label>
                <div id="timeslot">
                  <label htmlFor="salesForcast">From</label>

                  <input
                    type="time"
                    name="salesForcast"
                    id="salesForcast"
                    value={TimeSlot_From}
                    onChange={(e) => setTimeSlot_From(e.target.value)}
                    required
                  />
                  
                  <br />

                  <label htmlFor="salesplandate">To</label>
<br />
                  <input
                    type="time"
                    value={TimeSlot_To}
                    onChange={(e) => setTimeSlot_To(e.target.value)}
                    required
                  />

                </div>
              </div>
              
<div className="containee">
<label htmlFor="">Task</label>
            <textarea
              name=""
              value={task}
              onChange={(e) => settask(e.target.value)}
              id=""
            ></textarea>
</div>
            

            <div className="containee">
              <label htmlFor="">Section</label>
              <select
                name=""
                value={section}
                onChange={(e) => setsection(e.target.value)}
                id=""
              >
                <option value="">Select Option</option>
                <option value="inventory">Inventory</option>
                <option value="master">Master</option>
                <option value="seed">Seed</option>
                <option value="opk">OPK</option>
              </select>
            </div>
            <div className="containee">
              <label htmlFor="">Assigned To</label>
              <input
                type="text"
                value={assign}
                onChange={(e) => {
                  setassign(e.target.value);
                }}
              />
            </div>
          </div>
          <div id="addtoplaner">

<div id="add_planerbtn" onClick={handeladdtoplanner}>
    Add To Planner
  </div>
</div>
        </form>
      )}

      {jobflowtable && (
        <div className="table-container" id="yourrecipetale">
          <h2>Job Flow</h2>
          <br />
          <table className="recipe_table">
            <thead>
              <tr>
              <th>Item Name</th>
                <th>Day</th>
                <th>Time</th>
                <th>Job</th>
                <th>Section</th>
                <th>Assigned To</th>
              </tr>
            </thead>
            <tbody>
              {tableList
                .sort((a, b) => {
                  const dayComparison = a.selectday.localeCompare(b.selectday);
                  if (dayComparison !== 0) {
                    return dayComparison;
                  } else {
                    return a.Time.TimeSlot_From.localeCompare(
                      b.Time.TimeSlot_From
                    );
                  }
                })
                .map((service, index) => (
                  
                  <tr key={index}>
                  {index === 0 && (
                  <td rowSpan={tableList.length}>{ItemName}</td>
                )}
                  {/* <td>{ItemName}</td> */}
                
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
            <div
              id="recipebutton_save"
              onClick={handelsubmitjobflow}
            >
              Submit
            </div>
          </div>
        </div>
      )}
      {EquipmentFlowtable && (
        <div className="table-container" id="yourrecipetale">
          <h2>Equipment Flow</h2>
          <br />
          <table className="recipe_table">
            <thead>
              <tr>
              <th>Item Name</th>
                <th>Day</th>
                <th>Time</th>
                <th>Job</th>
                <th>Section</th>
                <th>Assigned To</th>
                <th>Assigned Equipment</th>
              </tr>
            </thead>
            <tbody>
            {jobflowData.map((service, index) => (
  <React.Fragment key={index}>
    {service.ItemName === ItemName && (
      <>
        {service.JobFlow.map((job, jobIndex) => (
          <tr key={`${index}-${jobIndex}`}>
            {jobIndex === 0 && (
              <td rowSpan={service.JobFlow.length}>{ItemName}</td>
            )}
            <td>{job.selectday}</td>
            <td>{job.Time.TimeSlot_From} - {job.Time.TimeSlot_To}</td>
            <td>{job.Task}</td>
            <td>{job.section}</td>
            <td>{job.assigned}</td>
            {jobIndex === 0 && (
              <td rowSpan={service.JobFlow.length}>
              <select
                  name="saleplanItemname"
                  id="saleplanItemname"
                  // value={selectday}
                  // onChange={(e) => setselectday(e.target.value)}
                >
                  <option value="">Select Option</option>
                  {equipment}
                </select></td>
            )}
          </tr>
        ))}
      </>
    )}
  </React.Fragment>
))}


            </tbody>
          </table>

          {/* <div id="tabel_controllers">
            <div id="recipebutton_close" onClick={() => settable(false)}>
              cancel
            </div>
            <div
              id="recipebutton_save"
              onClick={handelsubmitjobflow}
            >
              Submit
            </div>
          </div> */}
        </div>
      )}

    </>
  );
};

export default ItemmanufacPlaner;

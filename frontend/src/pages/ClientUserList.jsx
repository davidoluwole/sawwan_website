import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Back from '../components/Back';
import Error from './Error';
import InfoCard from '../components/InfoCard';
import Map from '../components/Map';


export default function UserList(){
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [branchName, setBranchName] = useState('');
    const [newBranchName, setNewBranchName] = useState('');
    const [editing, setEditing] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));


    const getUsers = async () => {
        const response = await fetch(`https://mbp-server.onrender.com/api/users/${id}`);
        const json = await response.json();
        const filteredData = json.filter(item => item.role === 'Client');
        setData(filteredData);
    }

    // const getUsers = async () => {
    //     const response = await fetch(`http://localhost:3001/api/users/${id}`);
    //     const json = await response.json();
    //     setData(json);
    // }

    const getBranchName = async () => {
        
        const response = await fetch(`https://mbp-server.onrender.com/api/branches/${id}`);
        const json = await response.json();
        setBranchName(json.name);
    }

    // const getBranchName = async () => {
    //     const response = await fetch(`http://localhost:3001/api/branches/${id}`);
    //     const json = await response.json();
    //     setBranchName(json.name);
    // }
    
   
    
        
    const changeBranchName = async () => {
        if(!newBranchName || newBranchName[0] == ' '){
          return;
        }
        
        const response = await fetch(`https://mbp-server.onrender.com/api/branches/${id}`, {
             method: 'PUT',
             body: JSON.stringify({name: newBranchName}),
             headers: {
                 'Content-Type': 'application/json'
             }
         });
        setBranchName(newBranchName);
        setEditing(false);
    }

    useEffect(() => {
        getUsers();
        getBranchName();
    }, []);
    
    

    if(data.length == 0){
        return(

            <>
              <div className="container">
                <div className='info_buttons'>
                  <Back />
                  <div className='info_hover'> 
                    <Map location='Branch User List Screen'/>
                  </div>
                </div>
            
                <div className='no_users'>
                    <h3>No users have been created yet.</h3>
                   
                </div>
               </div>
            </>
        )
    }

    return(
        <div>
           <div className='container'>
             <div className='info_buttons'>
               <Back />
               <div className='info_hover'> 
                  <Map location='Branch User List Screen'/>
               </div>
             </div>
             <h3 className='user_list_header'>{branchName} Branch</h3>
             <div className='user_list'>
               {data.map((user) => {
                 return(
                    <>
                      <div key={user._id} className='flex align user_list_container'>
                        <p className='user_list_name'>{ user.name }</p>
                         <div className='user_list_buttons'>
                           <Link to={`/users/${user._id}`}><button className='button radius user_list_button'>More Info</button></Link>
                         </div>
                      </div>
                     </>
                   )
                })}

            </div>
           </div>
        </div>
    )
} 

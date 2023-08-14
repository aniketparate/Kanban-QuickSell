import './App.css';
import Card from './Components/Card';
import Dropdown from './Components/Dropdown';

import { useEffect, useState } from 'react';

let groupby = ['User', 'Status', 'Priority']
let sortby = ['priority', 'title'];

const PRIORITY_LIST = [{ id: 0, name: 'No priority' }, { id: 1, name: 'Low' }, { id: 2, name: 'Medium' }, { id: 3, name: 'High' }, { id: 4, name: 'Urgent' }];
const STATUS_LIST = [{ id: 'Backlog', name: 'Backlog' }, { id: 'Todo', name: 'Todo' }, { id: 'In progress', name: 'In progress' }, { id: 'Done', name: 'Done' }, { id: 'Cancelled', name: 'Cancelled' }];

function GroupBy(key, cardList, keyList, sortby) {
  const headerHash = {};
  const arrayHash = {};
  keyList.forEach(x => {
    headerHash[x.id] = x.name;
    arrayHash[x.id] = [];
  });
  cardList.forEach(x => {
    arrayHash[x[key]]?.push(x);
  });
  return Object.entries(arrayHash).map((val) => ({ id: val[0], header: headerHash[val[0]], tickets: val[1].sort((t1, t2) => String(t2[sortby]).localeCompare(String(t1[sortby]))) }));
}

function App() {
  const [userData, setUserData] = useState({});
  const [data, setData] = useState({});
  const [groupStateVar, setGroupStateVar] = useState('User');
  const [sortStateVar, setSortStateVar] = useState('priority');


  useEffect(() => {
    fetch("https://apimocha.com/quicksell/data")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setUserData(data.users.reduce((y, x) => {
          y[x.id] = x.name;
          return y;
        }, {}));
      })
  }, []);

  function GroupNsort(group, sort, tickets, user) {
    let key = 'userId';
    let keyList = user;
    if (group === 'Priority') {
      key = 'priority';
      keyList = PRIORITY_LIST;
    }
    if (group === 'Status') {
      key = 'status';
      keyList = STATUS_LIST;
    }
    if (group === 'User') {
      key = 'userId';
      keyList = user;
    }
    return GroupBy(key, tickets, keyList, sort);
  }

  return (

    <div className="App">
      <div className="dropdown">
        <div className="drop-Button"><Dropdown value={groupStateVar} List={groupby} name={'Grouping'} setfunc={setGroupStateVar} /></div>
        <div className="drop-Button"><Dropdown value={sortStateVar} List={sortby} name={'Sorting'} setfunc={setSortStateVar} /></div>
      </div>
      <div className="tickets-container">
        {!!Object.keys(data).length && GroupNsort(groupStateVar, sortStateVar, data.tickets, data.users)?.map(x =>
          <div style={{ flexBasis: '100%' }}>
            <div className='header'>{x.header}<div style={{
              marginLeft: '10px',
              color: 'gray'
            }}>{x.tickets.length}</div></div>
            {x.tickets.map(y =>
              <Card userData={userData} cardData={y} key={y.id} />)}
          </div>
        )}
      </div>

    </div>
  );
}

export default App;



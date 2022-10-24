import React, { useState, useEffect } from "react";
import {
  initIPFS,
  initOrbitDB,
  createDatabase,
} from "./database";

function App() {
  const [alldb, setalldb] = useState([]);
  const [selectedDB, setSelectedDB] = useState(null);
  const [dbaddress, setdbaddress] = useState("");
  const [addRemoteDB, setAddRemoteDB] = useState("");
  const [data, setData] = useState([]);
  const [createDBName, setCreateDBName] = useState("");

  // useEffect(() => {
  //   initIPFS().then(async (ipfs) => {
  //     initOrbitDB(ipfs).then(async (databases) => {
  //       const programs = await getAllDatabases();
  //       // setalldb(programs);
  //       // console.log(alldb, "all dbs");
  //     });
  //   });
  // }, []);

  // const allDBData = async () => {
  //   const programs = await getAllDatabases();
  //   setalldb(programs);
  //   console.log(alldb, "all dbs");
  // };

  // const getSpecificDB = async () => {
  //   const db = await getDB(dbaddress);
  //   setSelectedDB(db);
  //   console.log(db, "===========");
  // };

  const createDB = async () => {
    const ipfs = await initIPFS()
    const orbitdb = await initOrbitDB(ipfs)
    
    // Create / Open a database
    const docstore = await orbitdb.docstore(createDBName)
    await docstore.load()

    console.log(docstore.address.toString())

    // Listen for updates from peers
    docstore.events.on("replicated", address => {
      docstore.get('')
    })
    // Add an entry
    docstore.put({ _id: 'hello world', doc: 'all the things' })
    .then(() => docstore.put({ _id: 'sup world', doc: 'other things' }))
    .then(() => docstore.get('hello'))
    .then((value) => console.log(value))
    // [{ _id: 'hello world', doc: 'all the things'}]

    // Query
    // const result = docstore.iterator({ limit: -1 }).collect()
    // console.log(JSON.stringify(result, null, 2))
  };

  // // add RemoteDb section
  // const addDB = (address) => {
  //   console.log("Add database...");
  //   addDatabase(address).then(async (hash) => {
  //     console.log("Added", address);
  //     const db = await getDB(address);
  //     setSelectedDB(db);
  //   });
  // };

  return (
    <div style={{ align: "center", justify: "center" }}>
  
        <br />
        <button onClick={createDB}>Create DB</button>
        <input
          onChange={(e) => setCreateDBName(e.target.value)}
          value={createDBName}
        />
      
    </div>
  );
}


export default App;

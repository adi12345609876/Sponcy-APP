# Get Data from CurrentUser
export const Data = () => {
  const currentuser = getAuthInfo();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (currentuser) {
      const collectionRef = collection(db, "Users", currentuser?.uid, "Notes");
      const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
        const results = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(results);
      });
      return () => {
        unsubscribe();
      };
    }
  }, [currentuser]);
  return data;
  // useEffect(() => {
  //   // const collectionRef = collection(db, "Users", "userid", "Notes");
  //   // const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
  //   //   const results = snapshot.docs.map((doc) => ({
  //   //     id: doc.id,
  //   //     ...doc.data(),
  //   //   }));
  //   //   setData(results);
  //   // });
  //   // return () => {
  //   //   unsubscribe();
  //   };
  // }, []);
};


 {data.map((item) => ())}

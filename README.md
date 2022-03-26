# BUGS

---

1)<Promise>{Pending}:
because you use direct "CONST or LET or VAR" instead use "USESTATE"
and ".THEN"

# EXAMPLE

export async function getUserDetailsCollection(otheruser) {
const [Comments, setComments] = useState();
const Doclocation_array = doc(db, "Users", otheruser, "Details", "EventsDoc");
await getDoc(Doclocation_array).then((doc) => {
setComments(doc.data());
});
console.log("Details", Comments);
return Comments;

}

import 'firebase/firestore'
import { initializeApp } from "firebase/app";
import { getFirestore, doc } from "firebase/firestore";
// import { setDoc } from "firebase/firestore";//測試用

const firebaseConfig = {
  apiKey: "AIzaSyDsucbp56WD3echCUFYqtlal6juGLqjpWY",
  authDomain: "testdatabase-249e7.firebaseapp.com",
  projectId: "testdatabase-249e7",
  appId: "1:744831125499:web:6b784c4fe95c5eb5b3ed5e"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const TodoListDoc = doc(db,'TodoList','list');
// async function testList(){
//   await setDoc(TodoListDoc,{
//       'listItemData':[{'content':'list test','date':'test','checked':false,'edit':false,'disabled':false}],
//       'saveItemData':[{'content':'save test','date':'2020-8-17','checked':false,'edit':false,'disabled':false,'saveDate':'2022-8-5'}]
//   })
//   .then(()=>{console.log('testList success')})
//   .catch(err => console.log(err));
// }
  
// testList();//測試firebase是否連接上用

export {db,TodoListDoc};
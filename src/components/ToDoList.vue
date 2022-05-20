<template>
  <div class="wrap">
    <div class="title">
      <span></span>
      <h1>ToDoList</h1>
    </div>
    <div class="change-btn-wrap">
      <button :class="{'on':on==='btn1'}" @click="on='btn1'">代辦事項<i class="bi bi-pencil-fill"></i></button>
      <button :class="{'on':on==='btn2'}" @click="on='btn2'">封存項目<i class="bi bi-archive-fill"></i></button>
      <button v-show="on==='btn1'" class="addnew" @click="addNewItem()"><i class="bi bi-plus-square"></i>新增代辦</button>
    </div> 
    <div class="list-table-wrap">
      <ToDoContent
        v-show="on==='btn1'"
        :listItems="listItems"
        @setDeleteItem="deleteItem"
        @setEditItem="editItem"
        @editFinish="editFinish"
        @updateContent="updateContent"
        @setSaveItem="saveItem"
        @setCheckedSwitch="checkedSwitch"/>
      <SaveContent
        v-show="on==='btn2'"
        :saveItems="saveItems"
        @setDeleteItem="deleteItem"
        @openSaveItem="openSaveItem"/>
    </div> 
  </div>
</template>

<script>
import { TodoListDoc } from "@/db"
import { getDoc, updateDoc} from "firebase/firestore";

import ToDoContent from "@/components/ToDoContent.vue"
import SaveContent from "@/components/SaveContent.vue"
export default {
  name: 'ToDoList',
  components: {ToDoContent,SaveContent},
  data(){
    return{
      on:'btn1',
      addNew:false,
      listItems:[{'content':'default message','date':'2020-8-17','checked':false,'edit':false,'disabled':false},],
      saveItems:[{'content':'default message','date':'2020-8-17','checked':false,'edit':false,'disabled':false,'saveDate':'2022-8-5'},]
    }
  },
  created(){
    this.getFirebaseData();
  },
  methods: {
    async getFirebaseData(){
      await getDoc(TodoListDoc)
      .then((data)=>{
        console.log('getFirebaseData success',data.data());
        let dataList = data.data();
        this.listItems = dataList.listItemData;
        this.saveItems = dataList.saveItemData;
      })
      .catch(err => console.log('error message:',err));
    },
    addNewItem(){
      let spaceItem ={
        'content':'',
        'date':'',
        'checked':false,
        'edit':true,
        'disabled':true
      }
      spaceItem.date = new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate();
      this.listItems.push(spaceItem);
      this.addNew=true;
    },
    deleteItem(data){
      let list = data.listName;
      list === 'listItems' ? this.listItems.splice(data.index,1) : this.saveItems.splice(data.index,1);
      this.updateFirebaseListItem();
      this.updateFirebaseSaveItem();
    },
    editItem(data){
      this.listItems[data].edit = true;
      this.listItems[data].disabled = true;
    },
    editFinish(data){
      let input = document.querySelector("input[type='text']");
      if(this.listItems[data].content.trim() ===""){
        alert("請輸入代辦內容!");
        input.focus();
        return
      }
      this.listItems[data].edit = false;
      this.listItems[data].disabled = false;
      this.updateFirebaseListItem();
    },
    updateContent(data){
      this.listItems[data.index].content = data.content;
    },
    saveItem(data){
      let item = this.listItems[data];
      this.listItems[data]['saveDate'] = new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate();
      this.saveItems.push(item);
      this.listItems.splice(data,1)
      this.updateFirebaseListItem();
      this.updateFirebaseSaveItem();
    },
    openSaveItem(data){
      let item = this.saveItems[data];
      this.listItems.push(item);
      this.saveItems.splice(data,1);
      this.updateFirebaseListItem();
      this.updateFirebaseSaveItem();
    },
    checkedSwitch(data){
      let item = this.listItems[data];
      item.checked ? item.checked = false : item.checked = true;
      this.updateFirebaseListItem();
    },
    async updateFirebaseListItem(){
      await updateDoc(TodoListDoc,{
        'listItemData':this.listItems
      }).then(()=>{console.log('updateFLI success')})
    },
    async updateFirebaseSaveItem(){
      await updateDoc(TodoListDoc,{
        'saveItemData':this.saveItems
      }).then(()=>{console.log('updateFSI success')})
    }
  },
  updated() {
    if(this.addNew){
      let input = document.querySelector("input[type='text']");
      input.focus();
      this.addNew = false;
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title{
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}
.title h1{
  width: 220px;
  color: var(--main-color);
  text-align: right;
  font-size: 40px;
  font-weight: 800;
}
.title span{
  display: inline-block;
  text-align: left;
  width: calc(100% - 220px);
  background: var(--main-color);
  height: 4px;
}
/* 切換按鈕 */
.change-btn-wrap{
  display: flex;
  position: relative;
  width: 100%;
  text-align: left;
  margin: 16px 0;
}
.change-btn-wrap button{
  width: 160px;
  color: var(--main-color);
  font-size: 20px;
  font-weight: bold;
  padding: 8px;
  border: 2px solid var(--main-color);
  border-radius:10px;
  margin-right: 16px;
  background: #fff;
  cursor: pointer;
}
.change-btn-wrap button i.bi{
  font-size: 18px;
  margin: 0 5px;
}
.change-btn-wrap button.on{
  color: #fff;
  background: var(--main-color);
  cursor: auto;
}
.change-btn-wrap button:not(.on):hover{
  background: var(--background-color);
}
.change-btn-wrap button.addnew{
  position: absolute;
  right: 0px;
  top: 0px;
  border: none;
  margin-right: 0;
}
</style>

<template>
  <div class="list-table-wrap">
    <div class="list-head">
      <div class="item content">代辦內容</div>
      <div class="item date">修改時間</div>
      <div class="item tool">操作</div>
    </div>
    <div class='list-table'>
      <div v-for="(item,index) in listItems" :class="{'item':true,'on':item.checked}" :key="index">
        <label>
          <input type='checkbox' 
          :checked="item.checked" 
          :disabled="item.disabled" 
          @click="setCheckedSwitch(index)"
          >
          <template v-if="item.edit">
            <button class="ok" @click="editFinish(index)">
              <i class="bi bi-check"></i>
            </button>
            <input type="text" 
            placeholder="請輸入文字"
            maxlength="40" 
            :value="item.content"
            @input="updateContent($event,index)"
            @keydown.enter="editFinish(index)"
            >
          </template>
          <template v-else>
            <button class="edit"  @click="setEditItem(index)" :disabled="item.checked">
            <i class="bi bi-pencil-fill"></i>
            </button>
            {{ item.content }}
          </template>
        </label>
        <div class="date">{{ item.date }}</div>
        <div class="tool">
          <button class="delete" 
          @click="setDeleteItem(index)"
          :disabled="item.disabled"
          >
            <i class="bi bi-trash3-fill"></i>
          </button> | 
          <button class="save"
          @click="setSaveItem(index)"
          :disabled="item.disabled"
          >
            <i class="bi bi-archive-fill"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToDoContent',
  data(){
    return{
     
    }
  },
  props:['listItems'],
  methods: {
    setDeleteItem(index){
      let data = {
        'listName':'listItems',
        'index': index
      }
      this.$emit('setDeleteItem',data);
    },
    setEditItem(index){
      this.$emit('setEditItem',index);
    },
    editFinish(index){
      this.$emit('editFinish',index);
    },
    updateContent(e,index){
      // console.log(e);
      let data = {
        'content':e.target.value,
        'index':index
      }
      this.$emit('updateContent',data);
    },
    setSaveItem(index){
      this.$emit('setSaveItem',index);
    },
    setCheckedSwitch(index){
      this.$emit('setCheckedSwitch',index)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-table-wrap{
  padding: 20px 0;
}
.list-head{
  display: flex;
  justify-content: center;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--main-color);
}
.list-head .item{
  display: inline-block;
  color: var(--main-color);
  font-size: 18px;
  font-weight: bold;
}
.list-head .item:nth-child(1),.list-table .item label{
  width: 60%;
}
.list-head .item:nth-child(2),.list-table .item .date{
  width: 20%;
}
.list-head .item:nth-child(3),.list-table .item .tool{
  width: 20%;
}
.list-table{
  height: calc(60vh - 60px);
  overflow-y: auto;
}
.list-table .item{
  display: flex;
  padding: 12px 0;
  align-items: center;
  border-bottom: 1px solid var(--black-color);
}
.list-table .item.on label{
  text-decoration: line-through;
}
.list-table .item label{
  text-align: left;
  color: var(--black-color);
  line-height: 1.2;
}
.list-table .item .ok{
  color: var(--main-color);
  margin: 0 6px;
}
.list-table .item .edit{
  margin: 0 6px;
  opacity: 0.2;
}
.list-table .item .edit:hover{
  opacity: 1;
}
.list-table .item .edit:disabled{
  cursor: auto;
}
.list-table .item.on .edit {
  opacity: 0;
}
.list-table .item .date{
  text-align: center;
  color: var(--black-color);
}
.list-table .item .tool{
  text-align: center;
  color: var(--grey-color);
}
.list-table .item .tool button{
  width: 40px;
  color: var(--grey-color);
}
.list-table .item .tool button:not(:disabled):hover .bi-trash3-fill{
  color: var(--delete-color);
}
.list-table .item .tool button:not(:disabled):hover .bi-archive-fill{
  color: var(--main-color);
}
input[type=text]{
  width: 80%;
}
::-webkit-scrollbar-thumb{
  background: var(--main-color);
}
::-webkit-scrollbar-track{
  width: 5px;
}
@media (max-width:768px){
  .list-table .item{
    flex-wrap:wrap;
  }
}
@media (max-width:426px){
  .list-head .item.content{
    width: 100%;
  }
  .list-head .item.date{
    display: none;
  }
  .list-head .item.tool{
    display: none;
  }
  .list-table .item{
    justify-content: right;
  }
  .list-table .item label{
    width: 100%;
    font-size: 18px;
    margin-bottom: 10px;
  }
  .list-table .item .date{
    font-size: 18px;
    width: 100px;
    color: var(--grey-color);
  }
  .list-table .item .tool{
    width: 100px;
  }
  .list-table .item .tool i.bi{
    font-size: 18px;
  }
}
</style>

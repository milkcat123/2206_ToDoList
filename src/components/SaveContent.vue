<template>
  <div class="list-table-wrap">
    <div class="list-head">
      <div class="item">狀態</div>
      <div class="item">代辦內容</div>
      <div class="item">最後修改時間</div>
      <div class="item">封存時間</div>
      <div class="item">操作</div>
    </div>
    <div class='list-table'>
      <div v-for="(item,index) in saveItems" class="item" :key="index">
        <div :class="{'status':true,'on':item.checked}">{{ item.checked ? "已完成" : "未完成" }}</div>
        <div class="content">{{ item.content }}</div>
        <div class="date">{{ item.date }}</div>
        <div class="saveDate">{{ item.saveDate }}</div>
        <div class="tool">
          <button class="delete" 
          @click="setDeleteItem(index)"
          :disabled="item.disabled"
          >
            <i class="bi bi-trash3-fill"></i>
          </button> | 
          <button class="save"
          @click="openSaveItem(index)"
          :disabled="item.disabled"
          >
            <i class="bi bi-pencil-fill"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SaveContent',
  data(){
    return{
     
    }
  },
  props:['saveItems'],
  methods: {
    setDeleteItem(index){
      let data = {
        'listName':'saveItems',
        'index': index
      }
      this.$emit('setDeleteItem',data);
    },
    openSaveItem(index){
      this.$emit('openSaveItem',index);
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
.list-head .item:nth-child(1),.list-table .item .status{
  width: 10%;
}
.list-head .item:nth-child(2),.list-table .item .content{
  width: 50%;
}
.list-head .item:nth-child(3),.list-table .item .date{
  width: 15%;
}
.list-head .item:nth-child(4),.list-table .item .saveDate{
  width: 15%;
}
.list-head .item:nth-child(5),.list-table .item .tool{
  width: 10%;
}
.list-table{
  height: 60vh;
  overflow-y: auto;
}
.list-table .item{
  display: flex;
  padding: 12px 0;
  align-items: center;
  justify-content: center;
  color: var(--black-color);
  border-bottom: 1px solid var(--black-color);
}
.list-table .item.on{
  background: var(--background-color);
}
.list-table .item .status{
  color: var(--grey-color);
  font-weight: bold;
}
.list-table .item .status.on{
  color: var(--main-color);
}
.list-table .item .date{
  text-align: center;
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
.list-table .item .tool button:not(:disabled):hover .bi-pencil-fill{
  color: var(--main-color);
}
@media (max-width:768px){
  .list-head .item:nth-child(1),.list-table .item .status{
    width: 60px;
  }
  .list-head .item:nth-child(2),.list-table .item .content{
    width: 40%;
  }
  .list-head .item:nth-child(3),.list-table .item .date{
    width: 115px;
  }
  .list-head .item:nth-child(4),.list-table .item .saveDate{
    width: 100px;
  }
  .list-head .item:nth-child(5),.list-table .item .tool{
    width: 100px;
  }
}
@media (max-width:426px){
  .list-table .item{
    width: 100%;
    flex-wrap:wrap;
    justify-content: right;
    padding: 12px 0;
  }
  .list-table .item .status{
    width: 80px;
  }
  .list-head .item:nth-child(2){
    width: calc(100% - 80px);
  }
  .list-table .item .content{
    width: calc(100% - 80px);
    line-height: 1.2;
    text-align: left;
  }
  .list-head .item:nth-child(3){
    display: none;
  }
  .list-table .item .date{
    display: none;
  }
  .list-head .item:nth-child(4){
    display: none;
  }
  .list-head .item:nth-child(5){
    display: none;
  }
  
  .list-table .item .saveDate{
    font-size: 18px;
    width: 100px;
    color: var(--grey-color);
    margin-top: 10px;
  }
  .list-table .item .tool{
    width: 100px;
    margin-top: 10px;
  }
  .list-table .item .tool i.bi{
    font-size: 18px;
  }
}
</style>

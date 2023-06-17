<script setup lang="ts">
import { reactive } from 'vue'
import AddNewTask from './AddNewTask.vue'

const boards = reactive([
  {
    id: crypto.randomUUID(),
    name: 'first board',
    items: [
      {
        id: crypto.randomUUID(),
        title: 'feature 1'
      },
      {
        id: crypto.randomUUID(),
        title: 'feature 2'
      }
    ]
  },
  {
    id: crypto.randomUUID(),
    name: 'Second board',
    items: [
      {
        id: crypto.randomUUID(),
        title: 'report 1'
      },
      {
        id: crypto.randomUUID(),
        title: 'report 2'
      }
    ]
  }
])

const onNewItemHandler = (text: string, boardId: string) => {
  console.log('onNewItemHandler', text, boardId)
  const newItem = {
    id: crypto.randomUUID(),
    title: text
  }

  const board = boards.find(({ id }) => id === boardId)
  if (board) {
    board.items.push(newItem)
  }
}

const createBoardHandler = () => {
  const name = prompt('Create new board, please type a name')
  if (name) {
    boards.push({
      id: crypto.randomUUID(),
      name,
      items: []
    })
  }
}
const startDragHandler = (event: DragEvent, boardId: string, item: Record<'id', string>) => {
  event.dataTransfer?.setData(
    'text/plain',
    JSON.stringify({
      boardId,
      itemId: item.id
    })
  )
}

const onDropHandler = (event: DragEvent, destinationBoardId: string) => {
  if (event.dataTransfer) {
    const { boardId, itemId } = JSON.parse(event.dataTransfer.getData('text/plain')) as {
      boardId: string
      itemId: string
    }
    
    const originBoardIndex = boards.findIndex((board) => board.id === boardId)
    const originBoard = boards[originBoardIndex]
    const originItem = originBoard?.items.find((item) => item.id === itemId)
    const destBoardIndex = boards.findIndex((board) => board.id === destinationBoardId)

    if (originItem && originBoard) {
      boards[destBoardIndex].items.push(originItem)
      boards[originBoardIndex].items = [...originBoard.items.filter((i) => i.id !== itemId)]
      console.log("originBoard", JSON.stringify(boards[originBoardIndex], null, 2))
    }
  }
}
</script>

<template>
  <nav>
    <ul>
      <li><a href="#" @click="createBoardHandler">+ Create new board</a></li>
    </ul>
  </nav>
  <small>Drag and drop supported</small>
  <div class="boards-container">
    <div
      class="board"
      v-for="board in boards"
      :key="board.id"
      @drop="onDropHandler($event, board.id)"
      @dragover.prevent
      @dragenter.prevent
    >
      <AddNewTask @on-new-item="onNewItemHandler" :board="board" />
      <div class="items">
        <div
          class="item"
          v-for="item in board.items"
          :key="item.id"
          draggable="true"
          @dragstart="startDragHandler($event, board.id, item)"
        >
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.boards-container {
  margin-top: 16px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
.items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.item {
  border-radius: 5px;
  border: 1px solid #333;
  padding: 5px;
  min-height: 50px;
  background-color: rgb(60, 182, 186);
  cursor: pointer;
}
.item:hover {
  filter: brightness(120%) saturate(120%);
  transition: filter 0.4s ease-in;
}
.board {
  flex: 260px;
  border-radius: 5px;
  background-color: azure;
  color: #333;
  padding: 10px 5px;
  min-width: 200px;
  max-width: 260px;
  min-height: 350px;
}
</style>

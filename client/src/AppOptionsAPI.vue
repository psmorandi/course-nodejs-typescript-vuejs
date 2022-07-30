<script>
import axios from "axios";
export default {
  data() {
    return {
      board: {
        name: "Project A",
        columns: [
          {
            name: "Todo",
            cards: [
              { title: "A", estimative: 3 },
              { title: "B", estimative: 3 },
              { title: "C", estimative: 3 },
            ],
          },
          { name: "Doing", cards: [] },
          { name: "Done", cards: [] },
        ],
      },
      columnName: "",
      cardTitle: ""
    };
  },
  async mounted() {
    console.log("chamado quando o módulo é construído");
    const response = await axios({
      url: "http://localhost:3001/boards/1",
      method: "get"
    });
    this.board = response.data;
  },
  methods: {
    addColumn(columnName) {
      this.board.columns.push({name: columnName, cards: []});
    },
    addCard(column, cardTitle) {
      column.cards.push({title: cardTitle, estimative: 3});
    },
    increaseEstimative(card) {
      card.estimative++;
    }
  },
  computed:{
    boardEstimative() {
      return this.board.columns.reduce((total, column)=>{
        total += column.estimative;
        return total;
      },0);
    }
  }
};
</script>

<template>
  <h3>{{ board.name }} {{ boardEstimative() }}</h3>
  <div class="columns">
    <div class="column" v-for="column in board.columns">
      <h3>{{ column.name }} {{ column.estimative }}</h3>
      <div class="card" v-for="card in column.card">
        {{ card.title }} {{ card.estimative }}
        <br />
        <button @click="increaseEstimative(card)">+</button><button>-</button>
      </div>
      <div class="new-card">
        <input type="text" v-model="cardTitle" />
        <button v-on:click="addCard(cardTitle)">Add</button>
      </div>
    </div>
    <div class="column new-column">
      <input type="text" v-model="columnName" />
      <button v-on:click="addColumn(columnName)">Add</button>
    </div>
  </div>
</template>

<style scoped>
.columns {
  display: flex;
  flex-direction: row;
}
.column {
  width: 200px;
  text-align: center;
  background-color: #ccc;
  margin-right: 5px;
  padding: 10px;
  border: 1px solid #000;
}
.new-column {
  background-color: #eee;
  border: 1px dashed #ccc;
}
.card {
  text-align: center;
  width: 100%;
  height: 80px;
  background-color: #f3e779;
  border: 1px solid #000;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.new-card {
  background-color: #eee;
  border: 1px dashed #ccc;
}
</style>
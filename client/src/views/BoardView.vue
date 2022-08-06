<script setup lang="ts">
import { inject, onMounted, reactive } from "vue";
import Board from "../entities/Board.js";
import DomainEvent from "../events/DomainEvent.js";
import BoardComponent from "../components/BoardComponent.vue";
import BoardService, { AddColumnInput } from "../services/BoardService.js";

const data: { board: Board | undefined } = reactive({ board: undefined });

onMounted(async () => {
  const boardService = inject("boardService") as BoardService;
  const board = await boardService.getBoard(4);
  board.on("addColumn", async function (event: DomainEvent) {
    const addColumnInput: AddColumnInput = {
      boardId: event.data.boardId,
      column: {
        name: event.data.columnName,
        hasEstimative: event.data.hasEstimative,
      },
    };
    await boardService.addColumn(addColumnInput);
  });
  data.board = board;
});
</script>

<template>
	<BoardComponent :board="data.board"></BoardComponent>
</template>

<style scoped>
</style>

import { createSlice } from '@reduxjs/toolkit';

import { TEvents } from '../types/types';

const cleanEvents: TEvents = {
  modalIsOpen: false,
  modalTodoId: '',
  todoEditIsOpen: false,
  todoEditTodoId: '',
  todoEditTodoName: '',
};

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    events: <TEvents>cleanEvents,
  },
  reducers: {
    modalOpen(state, action) {
      const newEvent = {
        modalIsOpen: true,
        modalTodoId: action.payload.id,
      };
      state.events = { ...state.events, ...newEvent };
    },
    modalClose(state) {
      const newEvent = {
        modalIsOpen: false,
        modalTodoId: '',
      };
      state.events = { ...state.events, ...newEvent };
    },
    todoEditOpen(state, action) {
      const newEvent = {
        todoEditIsOpen: true,
        todoEditTodoId: action.payload.id,
        todoEditTodoName: action.payload.todoName,
      };
      state.events = { ...state.events, ...newEvent };
    },
    todoEditClose(state) {
      const newEvent = {
        todoEditIsOpen: false,
        todoEditTodoId: '',
        todoEditTodoName: '',
      };
      state.events = { ...state.events, ...newEvent };
    },
  },
});

export const { modalOpen, modalClose, todoEditOpen, todoEditClose } = eventsSlice.actions;
export default eventsSlice.reducer;

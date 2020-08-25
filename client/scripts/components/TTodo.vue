<template lang="pug">
.todo
  .functions
    .procedure {{ procedureName }}
    .icons
      svg.save(@click="save()")
        use(xlink:href='/images/icon/save.svg#save')
      svg.escape(@click="modalEscVisible = true")
        use(xlink:href='/images/icon/escape.svg#escape')
      transition(name="modal")
        t-modal(v-if="modalEscVisible"
          modalTitle="Отмена редактирования"
          @closeAction="modalEscVisible = false"
          @okBtnAction="escape()")
          p Вы уверены, что хотите отменить редактирование заметки?
      svg.remove(@click="modalDelVisible = true")
        use(xlink:href='/images/icon/remove.svg#remove')
      transition(name="modal")
        t-modal(v-if="modalDelVisible"
          modalTitle="Удаление заметки"
          @closeAction="modalDelVisible = false"
          @okBtnAction="remove()")
          p Вы уверены, что хотите удалить заметку?
      svg.cancel(@click="cancel()")
        use(xlink:href='/images/icon/cancel.svg#cancel')
      svg.retry(@click="retry()")
        use(xlink:href='/images/icon/retry.svg#retry')
  form.format(@submit.prevent="save()")
    .title Заголовок
    t-input.narrow(:value="title"
      :invalid="titleStatus"
      @input="title = $event.target.value"
      @change="title = $event.target.value") Название заметки
    .tasks Задачи
    transition-group.taskgroup(name="tasklist" mode="out-in")
      t-task.task(v-for="task in tasks"
        class="tasklist-item"
        :task="task"
        :key="task.id"
        @changeTaskText="changeTaskText"
        @removeTask="removeTask")
      svg.plus.tasklist-item(key="plus" @click="addTask()")
        use(xlink:href='/images/icon/add.svg#add')
</template>

<script>
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';

import TInput from '@vuecomps/TInput';
import TModal from '@vuecomps/TModal';
import TTask from '@vuecomps/TTask';

const procedureName = function() {
  return this.tdnum === "new" ?
    "Создание новой заметки" : "Редактирование заметки"
};

const dataInitialize = function() {
  if (this.tdnum === "new") return;

  const todo = this.todos[this.tdnum - 1];
  
  this.id = todo.id;
  this.title = todo.title;
  this.tasks = deepClone(todo.tasks);
};

const titleStatus = function() {
  return (this.$v.title.$dirty && !this.$v.title.required)
};

const deepClone = function(original) {
  return JSON.parse(JSON.stringify(original));
}

const isDeepEqual = function(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

const save = function() {
  this.$v.$touch();

  if (this.$v.$invalid) {
    return
  }

  if (this.tdnum === "new") {
    const todo = {
      id: +new Date,
      title: deepClone(this.title),
      tasks: deepClone(this.tasks),
    }

    this.createTodo(todo);

    const tdnum = this.todos.indexOf(todo) + 1;
    this.$router.push(`/todo/${tdnum}`);
    return;
  };

  const updtodo = {
    id: this.id,
    title: deepClone(this.title),
    tasks: deepClone(this.tasks),
  }

  this.updateTodo(updtodo);
};

const escape = function() {
  this.modalEscVisible = false;
  this.removeStash();
  this.$router.push('/todos');
};

const remove = function() {
  if (this.tdnum === "new") {
    this.modalDelVisible = false;
    this.$router.push('/todos');

    return;
  }

  this.modalDelVisible = false;
  this.removeTodo(this.id);
  this.$router.push('/todos');
};

const cancel = function() {
  const storedTodo = this.todos[this.tdnum - 1];
  const updtodo = {
    id: this.id,
    title: this.title,
    tasks: this.tasks,
  };

  if (isDeepEqual(updtodo, storedTodo)) {
    return;
  };

  // Отмена изменений и возврат представления к сохраненным значениям
  this.title = storedTodo.title;
  this.tasks = deepClone(storedTodo.tasks);
  this.createStash(updtodo);
};

const retry = function() {
  const storedStash = this.stash;
  const currentTodo = {
    id: this.id,
    title: this.title,
    tasks: this.tasks,
  }

  if (storedStash == null) {
    return;
  };

  if (isDeepEqual(currentTodo, storedStash)) {
    return;
  };

  // Возврат представления к состоянию сохраненного стэша
  this.title = storedStash.title;
  this.tasks = deepClone(storedStash.tasks);
  this.removeStash();
};

const addTask = function() {
  const tasksLen = this.tasks.length;
  const lastTask = this.tasks[tasksLen - 1];
  
  if (tasksLen > 0 && lastTask.text === '') {
    return;
  };

  const task = {
    id: +new Date,
    text: '',
    completed: false,
  }

  this.tasks.push(task);
};

const changeTaskText = function(task, value) {
  const position = this.tasks.findIndex(t => t.id === task.id)
  this.tasks[position].text = value;

  // Изменения очищают стеш
  this.removeStash();
};

const removeTask = function(task) {
  this.tasks = this.tasks.filter(t => t.id !== task.id);
  
  // Изменения очищают стеш
  this.removeStash();
};

const props = {
  tdnum: { type: String, default: 'new'},
};

export default Vue.extend({
  name: 'TTodo',
  data() {
    return {
      id: '',
      title: '',
      tasks: [],
      modalEscVisible: false,
      modalDelVisible: false,
    };
  },
  props,
  validations: {
    title: { required },
  },
  computed: {
    ...mapState([
      'todos',
      'stash',
    ]),
    titleStatus,
    procedureName,
  },
  methods: {
    ...mapActions([
      'createTodo',
      'updateTodo',
      'removeTodo',
      'createStash',
      'removeStash',
    ]),
    dataInitialize,
    save,
    escape,
    remove,
    cancel,
    retry,
    addTask,
    changeTaskText,
    removeTask,
  },
  created() {
    this.dataInitialize()
  },
  components: {
    TInput,
    TModal,
    TTask,
  },
  metaInfo: {
    title: 'Редактирование заметки',
  },
});
</script>

<style lang="scss" scoped>
@import '@styles/app';
@import '@styles/todo';
</style>
<template lang="pug">
.container
  .procedure Создание заметки {{tdnum}}
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
  form.format(@submit.prevent="submitHandler")
    .title
      t-input(:value="title"
        :invalid="titleStatus"
        :fuckups="errcounter"
        @input="title = $event.target.value"
        @change="title = $event.target.value") Название заметки
    .tasks Задачи
      transition-group(name="tasklist" mode="out-in")
        t-task(v-for="task in tasks"
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

const dataInitialize = function() {
  // console.log('Инициализация данных')
  if (this.tdnum === "new") return;
  const todo = this.todos[this.tdnum - 1];
  this.id = todo.id;
  this.title = todo.title;
  this.tasks = todo.tasks;
  // console.log(JSON.stringify(todo.tasks))
  // console.log('Инициализация данных')
};

const titleStatus = function() {
  return (this.$v.title.$dirty && !this.$v.title.required)
};

const formerr = function() {
  this.errcounter++;
};

const isDeepEqual = function(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

const submitHandler = function() {
  this.$v.$touch();

  if (this.$v.$invalid) {
    this.formerr();
    return
  }

  if (this.tdnum === "new") {
    const todo = {
      id: +new Date,
      title: this.title,
      tasks: this.tasks,
      completed: false,
    }

    this.createTodo(todo);
    this.$router.push('/todos');
    return;
  };

  const updtodo = {
    id: this.id,
    title: this.title,
    tasks: this.tasks,
    completed: false,
  }

  this.updateTodo(updtodo);
  this.$router.push('/todos');
};

const save = function() {
  this.$v.$touch();

  if (this.$v.$invalid) {
    this.formerr();
    return
  }

  if (this.tdnum === "new") {
    const todo = {
      id: +new Date,
      title: this.title,
      tasks: this.tasks,
      completed: false,
    }

    this.createTodo(todo);
    return;
  };

  const updtodo = {
    id: this.id,
    title: this.title,
    tasks: this.tasks,
    completed: false,
  }

  this.updateTodo(updtodo);
};

const escape = function() {
  this.modalEscVisible = false;
  this.removeStash(this.id);
  this.$router.push('/todos');
};

const remove = function() {
  if (this.tdnum === "new") {
    this.modalDelVisible = false;
    this.$router.push('/todos');
    return;
  };
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
    completed: false,
  };

  console.log(JSON.stringify(storedTodo))
  console.log(JSON.stringify(updtodo))
  if (isDeepEqual(updtodo, storedTodo)) {
    console.log('equal')
    return;
  };

  // Отмена изменений и возврат представления к сохраненным значениям
  this.title = storedTodo.title;
  this.tasks = storedTodo.tasks;
  this.updateStash(updtodo);
};

const retry = function() {
  const storedStash = this.stashes[this.tdnum - 1];
  const currentTodo = {
    id: this.id,
    title: this.title,
    tasks: this.tasks,
    completed: false,
  }

  if (storedStash == undefined) {
    console.log('no stash')
    return;
  };

  if (isDeepEqual(currentTodo, storedStash)) {
    console.log('no changes')
    return;
  };

  // Возврат представления к состоянию сохраненного стэша
  this.title = storedStash.title;
  this.tasks = storedStash.tasks;
  this.removeStash(this.id);
};

const addTask = function() {
  const tasksLen = this.tasks.length;
  const lastTask = this.tasks[tasksLen - 1];
  console.log(tasksLen)
  // console.log(lastTask.text)
  if (tasksLen > 0 && lastTask.text === '') {
    console.log('fill previous task')
    return;
  };

  const task = {
    id: +new Date,
    text: '',
    completed: false,
  }

  this.tasks.push(task);
  // Возврат представления к состоянию сохраненного стэша
  // this.title = storedStash.title;
  // this.removeStash(this.id);
};

const changeTaskText = function(task, value) {
  console.log('меняю таску');
  // console.log(this.tasks);
  // console.log(value);
  const position = this.tasks.findIndex(t => t.id === task.id)
  // console.log(this.tasks[position].text);
  this.tasks[position].text = value;
};

const removeTask = function(task) {
  console.log('удаляю таску');
  this.tasks = this.tasks.filter(t => t.id !== task.id);
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
      errcounter: 0,
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
      'stashes',
    ]),
    titleStatus,
  },
  methods: {
    ...mapActions([
      'createTodo',
      'updateTodo',
      'removeTodo',
      'updateStash',
      'removeStash',
    ]),
    dataInitialize,
    submitHandler,
    formerr,
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
// 할일 등록
import Header from '../../layout/Header.js';
import Footer from '../../layout/Footer.js';
import TodoList from '../list/TodoList.js';

const TodoRegist = function() {
  const BASE_URL = 'http://localhost:33088';
  const page = document.createElement('div');
  page.setAttribute('id', 'page');

  const sumbmitForm = document.createElement('form');
  const todoTitle = document.createElement('input');
  const todoContent = document.createElement('textarea');
  const submitRegisterButton = document.createElement('button');
  const buttonText = document.createTextNode('할일 추가');

  todoTitle.setAttribute('type', 'text');
  todoTitle.setAttribute('placeholder', '할일 제목');
  todoContent.setAttribute('placeholder', '할일 내용');

  sumbmitForm.addEventListener('submit' , (e) => {
    e.preventDefault();
    onSubmitTodoRegister();
  });

  sumbmitForm.appendChild(todoTitle);
  sumbmitForm.appendChild(todoContent);
  sumbmitForm.appendChild(submitRegisterButton);
  submitRegisterButton.appendChild(buttonText);
  

  const onSubmitTodoRegister = async () => {

    if (todoTitle.value === '' || todoContent.value === '') {
        alert("할일을 입력하세요^^");
        return;
    }

    const body = {
      title: todoTitle.value,
      content: todoContent.value,
      done: false
    }

    try {
      await axios.post(`${ BASE_URL }/api/todolist`, body);

      todoTitle.value = "";
      todoContent.value = "";

      const todoPage = await TodoList();
      document.querySelector('#page').replaceWith(todoPage);
    }
    catch (err) {
      console.log(err);
    }
}


  page.appendChild(Header('TODO App 등록'));
  page.appendChild(sumbmitForm);
  page.appendChild(Footer());

  return page;
};

export default TodoRegist;
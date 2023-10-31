// / 할일 등록
import Header from "../../layout/Header.js";
import Footer from "../../layout/Footer.js";
import ToDoList from "../list/TodoList.js";

const TodoInfo = async function ({ _id } = {}) {
  const page = document.createElement("div");
  page.setAttribute("id", "page");
  const BASE_URL = "http://localhost:33088";

  let response;
  let data;
  let newText;
  let newText2;

  const getData = async () => {
    try {
      response = await axios(`${BASE_URL}/api/todolist/${_id}`);
      data = response.data.item;
      return data;
    } catch (e) {
      console.error(error);
    }
  };

  const toDoDetailRender = async (data) => {
    ul1.innerHTML = "";
    ul2.innerHTML = "";

    const substituteKeyNames = {
      _id: "아이디",
      title: "제목",
      content: "내용",
      createdAt: "생성일",
      updatedAt: "수정일",
    };
    for (const [key, item] of Object.entries(data)) {
      if (substituteKeyNames[key]) {
        const substituteKeyName = substituteKeyNames[key];
        const li1 = document.createElement("div");
        const text1 = document.createTextNode(`${substituteKeyName}`);
        li1.appendChild(text1);
        ul1.appendChild(li1);

        const li2 = document.createElement("div");
        const li2Child = document.createElement("span");
        const text2 = document.createTextNode(`${item}`);

        li2Child.appendChild(text2);
        li2.appendChild(li2Child);
        ul2.appendChild(li2);

        if (substituteKeyName === "제목" || substituteKeyName === "내용") {
          li2Child.addEventListener("click", (e) => {
            const inputElem = document.createElement("input");
            inputElem.setAttribute("class", "editInput");
            inputElem.setAttribute("maxlength", "34");
            const inputText = e.target.innerText;
            inputElem.value = inputText;
            li2.innerHTML = "";
            li2.appendChild(inputElem);
            inputElem.focus();

            if (substituteKeyName === "제목") {
              inputElem.addEventListener("change", () => {
                newText = inputElem.value;
                const textNode = document.createTextNode(newText);
              });
            } else {
              inputElem.addEventListener("change", () => {
                newText2 = inputElem.value;
                const textNode = document.createTextNode(newText2);
              });
            }
          });
        }
      }
    }
  };

  const content = document.createElement("div");
  const container = document.createElement("div");
  const ul1 = document.createElement("div");
  const ul2 = document.createElement("div");

  container.appendChild(ul1);
  container.appendChild(ul2);
  content.appendChild(container);

  data = await getData();
  await toDoDetailRender(data);

  // css class 지정
  ul1.setAttribute("class", "todolistLabel");
  ul2.setAttribute("class", "todolistContent");
  container.setAttribute("class", "todolistContainer");
  content.setAttribute("class", "todolistDetailContainer");

  //뒤로가기 버튼
  const btnContainer = document.createElement("div");
  const btnHome = document.createElement("button");
  const btnHomeTitle = document.createTextNode("뒤로가기");

  btnHome.addEventListener("click", async () => {
    const toDoListPage = await ToDoList();
    document.querySelector("#page").replaceWith(toDoListPage);
  });

  btnHome.appendChild(btnHomeTitle);
  btnContainer.appendChild(btnHome);

  //수정 버튼
  const btnTodoEdit = document.createElement("button");
  const btnTodoEditTitle = document.createTextNode("수정하기");

  btnTodoEdit.addEventListener("click", async () => {
    const body = { title: newText, content: newText2 };
    let res = await axios.patch(`${BASE_URL}/api/todolist/${_id}`, body);
    let data = await getData();
    await toDoDetailRender(data);
  });

  btnTodoEdit.appendChild(btnTodoEditTitle);
  btnContainer.appendChild(btnTodoEdit);

  //삭제버튼
  const btnDelete = document.createElement("button");
  const btnDeleteTitle = document.createTextNode("삭제");

  btnDelete.appendChild(btnDeleteTitle);
  btnContainer.appendChild(btnDelete);

  btnDelete.addEventListener("click", async () => {
    try {
      let res = await axios.delete(`${BASE_URL}/api/todolist/${_id}`);
      const toDoListPage = await ToDoList();
      console.log(toDoListPage);
      document.querySelector("#page").replaceWith(toDoListPage);
      content.append(btnContainer);
    } catch (e) {
      console.error(error);
    }
  });

  content.append(btnContainer);

  btnHome.setAttribute("class", "btnHome");
  btnDelete.setAttribute("class", "btnDelete");
  btnTodoEdit.setAttribute("class", "btnHome");
  btnContainer.setAttribute("class", "btnContainer");

  page.appendChild(Header("TodoList"));
  page.appendChild(content);
  page.appendChild(Footer());

  return page;
};

export default TodoInfo;

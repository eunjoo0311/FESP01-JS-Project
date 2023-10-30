// 할일 등록
import Header from "../../layout/Header.js";
import Footer from "../../layout/Footer.js";
import ToDoList from "../list/TodoList.js";

const TodoInfo = async function ({ _id } = {}) {
  const page = document.createElement("div");
  page.setAttribute("id", "page");

  const BASE_URL = "http://localhost:33088";
  let response;
  let data;
  try {
    response = await axios(`${BASE_URL}/api/todolist/${_id}`);
    data = response.data.item;
    console.log("1", data);
  } catch (e) {
    console.error(error);
  }
  // console.log("2", data);
  const content = document.createElement("div");

  const container = document.createElement("div");
  const ul1 = document.createElement("div");
  const ul2 = document.createElement("div");

  ul1.setAttribute("class", "todolistLabel");
  ul2.setAttribute("class", "todolistContent");
  container.setAttribute("class", "todolistContainer");
  content.setAttribute("class", "todolistDetailContainer");

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
      const text2 = document.createTextNode(`${item}`);

      li2.appendChild(text2);
      ul2.appendChild(li2);
    }
  }

  container.appendChild(ul1);
  container.appendChild(ul2);

  content.appendChild(container);

  //뒤로가기 버튼
  const btnContainer = document.createElement("div");
  const btnHome = document.createElement("button");
  const btnHomeTitle = document.createTextNode("뒤로가기");

  btnHome.appendChild(btnHomeTitle);
  btnContainer.appendChild(btnHome);

  btnHome.addEventListener("click", async () => {
    const toDoListPage = await ToDoList();
    console.log(toDoListPage);
    document.querySelector("#page").replaceWith(toDoListPage);
  });

  btnContainer.appendChild(btnHome);

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
  btnContainer.setAttribute("class", "btnContainer");

  page.appendChild(Header("TODO App 상세 조회"));
  page.appendChild(content);
  page.appendChild(Footer());

  return page;
};

export default TodoInfo;

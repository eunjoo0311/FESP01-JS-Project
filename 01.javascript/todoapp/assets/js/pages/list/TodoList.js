// 할일 목록
import Header from '../../layout/Header.js';
import Footer from '../../layout/Footer.js';
import TodoRegist from '../regist/TodoRegist.js';
import TodoInfo from '../info/TodoInfo.js';

const TodoList = async () => {
  //NOTE -base url 상수로 지정
  const BASE_URL = 'http://localhost:33088';

  //NOTE - 투두 컨테이너
  const page = document.createElement('div');
  page.setAttribute('id', 'page');

  //NOTE - 버튼 담는 박스
  const registButtonBox = document.createElement('div');
  
  //NOTE - 투두 내용 담는 박스 
  const content = document.createElement('div');
  content.setAttribute('id', 'content');
  
  try {
    //NOTE - 서버에서 데이터 받아 오기 
    const response = await axios(`${ BASE_URL }/api/todolist`);
    
    const ul = document.createElement('ul');
    ul.setAttribute('class', 'todolist');

    //NOTE - 받아온 데이터 뿌려주기 
    response.data?.items.forEach(item => {
      const li = document.createElement('li');
      li.setAttribute('id', `list_${ item._id }`);

      const checkbox = document.createElement('input');
      const checkboxLable = document.createElement('label');
      checkboxLable.setAttribute('for', `checkbox_${ item._id }`);
      checkbox.setAttribute('type', 'checkbox');
      checkbox.setAttribute('id', `checkbox_${ item._id }`);
      checkbox.checked = item.done;

      if (item.done) {
        li.style.textDecoration = 'line-through';
      }

      
      /**
       * //NOTE - 채크 박스 체크 할때 이벤트 
       * //NOTE - 체크 박스 누르면 완료 표시 되도록 patch로 요청 보내고
       * //NOTE - 게시물의 done 프로퍼티의 값이 true 거나 false일때 완료 표시 혹은 표시 x
       */
      checkbox.addEventListener('change', async (event) => {
        const isChecked = checkbox.checked;

        try {
          // API 업데이트 요청 보내기
          await axios.patch(
            `${ BASE_URL }/api/todolist/${item._id}`, { done: isChecked });

          item.done = isChecked;

          if (isChecked) {
            item.done = false;
            event.target.parentNode.style.textDecoration = 'line-through';
          } 
          else {
            item.done = true;
            event.target.parentNode.style.textDecoration = 'none';
          }
        } 
        catch (error) {
          console.error('API 업데이트에 실패했습니다:', error);
        }
      });

      //NOTE - 투두 제목 
      const titleArea = document.createElement('div');
      const title = document.createTextNode(item.title);
      titleArea.setAttribute('id', 'titleArea');
      titleArea.appendChild(title);

      //NOTE - 체크박스와 title li에 삽입 
      li.appendChild(checkbox);
      li.appendChild(checkboxLable);
      li.appendChild(titleArea);
      ul.appendChild(li);

      //NOTE - title 영역을 누르면 상세 페이지로 이동 
      titleArea.addEventListener('click', async () => {
          const infoPage = await TodoInfo({ _id: item._id });
          document.querySelector('#page').replaceWith(infoPage);
      });
    });

    content.appendChild(ul);

    //NOTE - 글 등록페이지 이동 버튼 
    const btnRegist = document.createElement('button');
    const btnTitle = document.createTextNode('+');
    btnRegist.appendChild(btnTitle);
    registButtonBox.appendChild(btnRegist);

    //NOTE - 버튼 클릭 하면 글 등록 페이지로 이동
    btnRegist.addEventListener('click', () => {
      const registPage = TodoRegist();
      document.querySelector('#page').replaceWith(registPage);
    });
  } catch (err) {
    const error = document.createTextNode('일시적인 오류 발생');
    content.appendChild(error);
  }

  page.appendChild(Header('TodoList'));
  page.appendChild(registButtonBox);
  page.appendChild(content);
  page.appendChild(Footer());

  return page;
};

export default TodoList;

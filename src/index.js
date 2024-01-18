let date = new Date();

const createDivWithClass = (className) => {
  const div = document.createElement('div');
  div.className = className;
  return div;
};

const appendToParent = (parent, children) => {
  children.forEach(child => parent.appendChild(child));
};

const resetSelectedDate = () => {
  const targetId = date.getDate();
  const targetDate = document.getElementById(`${targetId}`);
  targetDate.style.boxShadow = '';
  targetDate.querySelector('img').src = '../src/assets/icons/icon.svg';

}

const selectedDate = () => {
  const targetId = date.getDate();
  const targetDate = document.getElementById(`${targetId}`);

  targetDate.style.boxShadow = '1px 1px 1px 1px rgb(198, 198, 198)';
  targetDate.querySelector('img').src = '../src/assets/icons/icon__active.svg';

  console.log(date);
}

const selectDate = (event) => {
  resetSelectedDate();
  const targetDate = event.target.closest('.date');
  if (targetDate.id === 'empty') {
    return;
  }
  date.setDate(targetDate.id);
  selectedDate();
}

const renderCalender = () => {
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();

  const calenderTitle = document.querySelector('.calender__title');
  calenderTitle.innerHTML = `${currentYear}년 ${currentMonth + 1}월`

  const firstDate = new Date(currentYear, currentMonth, 1);
  const firstDay = firstDate.getDay();

  const dateBoard = document.querySelector('.calender__dateBoard');

  while (dateBoard.firstChild) {
    dateBoard.removeChild(dateBoard.firstChild);
  }

  if (firstDay == 0) {
    for (let i = 0; i < 7; i++) {
      const emptyDate = createDivWithClass('date');
      emptyDate.id = 'empty';
      dateBoard.appendChild(emptyDate);
    }
  } else {
    for (let i = 0; i < firstDay - 1; i++) {
      const emptyDate = createDivWithClass('date');
      emptyDate.id = 'empty';
      dateBoard.appendChild(emptyDate);
    }
  }

  for (let i = 1; i <= new Date(currentYear, currentMonth + 1, 0).getDate(); i++) {
    const dateDiv = createDivWithClass('date');
    const dateIcon = createDivWithClass('common__icon');
    const img = document.createElement('img');
    const dateNum = createDivWithClass('date__num');

    dateDiv.id = `${i}`;

    img.id = 'icon';
    img.src = '../src/assets/icons/icon.svg';

    dateNum.textContent = i;

    appendToParent(dateIcon, [img]);
    appendToParent(dateDiv, [dateIcon, dateNum]);

    dateBoard.appendChild(dateDiv);
  }

  document.querySelectorAll('.date').forEach(date => {
    date.addEventListener('click', selectDate);
  });

  resetSelectedDate();
  selectedDate();
}

const nextMonth = () => {
  date.setMonth(date.getMonth() + 1);
  renderCalender();
  resetSelectedDate();
}

const prevMonth = () => {
  date.setMonth(date.getMonth() - 1);
  renderCalender();
  resetSelectedDate();
}

renderCalender();

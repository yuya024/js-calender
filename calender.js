const weekdayLine = () => {
  const weekday = ["日", "月", "火", "水", "木", "金", "土"]
  process.stdout.write(` ${weekday.join(' ')}\n`);
}

const blankFirstLine = (day) => {
  // 1日が日曜日なら空白なし
  if (!day) return;

  const blankSpace = '   ';
  for(let i = 0; i < day; i++) {
    process.stdout.write(blankSpace);
  }
}

const dateDisplay = (firstDay, lastDate) => {
  let newLineCounter = firstDay;

  for(let i = 1; i <= lastDate; i++) {
    process.stdout.write(String(i).padStart(3, ' '));

    // カウンターが７になったら改行、リセット
    newLineCounter++;
    if (newLineCounter === 7) {
      newLineCounter = 0;
      process.stdout.write('\n');
    }
  }
}

const commandArgCheck = (argCommand, argMonth) => {
  if (argCommand) {
    if (!(1 <= argMonth && argMonth < 13)) {
      throw new Error(`${argMonth} is neither a month number (1..12) nor a name`);
    }
  }
}

const calender = () => {
  const today = new Date();
  const year = today.getFullYear();
  const argMonth = process.argv[3];
  try {
    commandArgCheck(process.argv[2], argMonth);
  } catch (error) {
    console.log(error.message);
    return;
  }
  // 引数がなければ今月を取得
  const month = argMonth || today.getMonth() + 1;
  const lastMonth = month - 1;
  const firstDate = new Date(year, lastMonth, 1);
  const lastDate = new Date(year, month, 0);

  process.stdout.write(`       ${month}月 ${year}\n`)
  weekdayLine();
  blankFirstLine(firstDate.getDay());
  dateDisplay(firstDate.getDay(), lastDate.getDate());
  process.stdout.write('\n')
}

calender();
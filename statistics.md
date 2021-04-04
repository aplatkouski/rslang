# Статистика

## Предыстория

Изучаемое и изученное слово в контексте ТЗ это одно и то же (См. ответ в канале задания)

## Виды изучаемых слов:

1. Изучаем слово (1) - которое в принципе было добавлено в изучаемые (каждое слово
   считается только один раз)
2. Изучаем слово (2) - которое в определённую дату было использовано в мини-игре

## Все статистики:

1. Кол-во изучаемых слов в разбивке по:

- страницам и группам учебника (1)
- мини-играм (2): `selectWordCountByGames`

  ```ts
  interface report {
    [gameId: string]: number;
  }
  ```

  Пример использования:

  ```tsx
  import { useAppSelector } from 'common/hooks';
  import {
    selectWordCountByGames
  } from 'features/word-statistics/wordStatisticSlice';

  const MyComponent = () => {
    const stats = useAppSelector(selectWordCountByGames),
    )
    return (
      <ul>
        {Object.entries(stats).map(([gameId, wordCount]) =>
          <li key={gameId}>`${gameId}: ${wordCount}`</li>
        )}
      </ul>
    )
  }
  ```

2. Результат изучения (кол-во правильных и неправильных ответов) в разбивке по:

```ts
interface report {
  correctAnswerTotal: number;
  wrongAnswerTotal: number;
}
```

- для слова

  ```tsx
  import { useAppSelector, useDate } from 'common/hooks';
  import { selectCorrectVsWrongByWordId } from 'features/word-statistics/wordStatisticSlice';

  const MyComponent = ({ wordId }) => {
    const stat = useAppSelector((state) =>
      selectCorrectVsWrongByWordId(state, { wordId })
    );
    return <div>{`${stat.correctAnswerTotal} / ${stat.wrongAnswerTotal}`}</div>;
  };
  ```

- суммарно для всех слов в группе учебника (за всё время — для авторизованного
  пользователя)

  ```tsx
  import { useAppSelector } from 'common/hooks';
  import { selectCorrectVsWrongByGroup } from 'features/word-statistics/wordStatisticSlice';

  const MyComponent = ({ group }) => {
    const stat = useAppSelector((state) => selectCorrectVsWrongByGroup(state, { group }));
    return <div>{`${stat.correctAnswerTotal} / ${stat.wrongAnswerTotal}`}</div>;
  };
  ```

- суммарно для всех слов в группе учебника (за текущий день — для не авторизованного
  пользователя)

  ```tsx
  import { useAppSelector, useDate } from 'common/hooks';
  import { selectCorrectVsWrongByGroupAndDate } from 'features/word-statistics/wordStatisticSlice';

  const MyComponent = ({ group }) => {
    const studiedAt = useDate();

    const stat = useAppSelector((state) =>
      selectCorrectVsWrongByGroupAndDate(state, { group, studiedAt })
    );
    return <div>{`${stat.correctAnswerTotal} / ${stat.wrongAnswerTotal}`}</div>;
  };
  ```

- суммарно для всех слов на странице учебника (за всё время — для авторизованного
  пользователя)

  ```tsx
  import { useAppSelector } from 'common/hooks';
  import { selectCorrectVsWrongByPage } from 'features/word-statistics/wordStatisticSlice';

  const MyComponent = ({ group, page }) => {
    const stat = useAppSelector((state) =>
      selectCorrectVsWrongByPage(state, { group, page })
    );
    return <div>{`${stat.correctAnswerTotal} / ${stat.wrongAnswerTotal}`}</div>;
  };
  ```

- суммарно для всех слов на странице учебника (за текущий день — для не
  авторизованного пользователя)

  ```tsx
  import { useAppSelector, useDate } from 'common/hooks';
  import { selectCorrectVsWrongByPageAndDate } from 'features/word-statistics/wordStatisticSlice';

  const MyComponent = ({ group, page }) => {
    const studiedAt = useDate();

    const stat = useAppSelector((state) =>
      selectCorrectVsWrongByPageAndDate(state, { group, page, studiedAt })
    );
    return <div>{`${stat.correctAnswerTotal} / ${stat.wrongAnswerTotal}`}</div>;
  };
  ```

3. Результат изучения (кол-во правильных и неправильных ответов) в разбивке по:

- дням и по мини-играм (`selectCorrectVsWrongGroupByGameAndDate`) результатом
  будет `type report` (см. ниже)

  ```ts
  interface GroupByGameAndDate {
    gameId: string;
    studiedAt: string;
    correctAnswerTotal: number;
    wrongAnswerTotal: number;
  }

  type report = Array<GroupByGameAndDate>;
  ```

  Пример использования:

  ```tsx
  import { useAppSelector } from 'common/hooks';
  import {
    selectCorrectVsWrongGroupByGameAndDate
  } from 'features/word-statistics/wordStatisticSlice';

  const MyComponent = () => {
    const stats = useAppSelector(selectCorrectVsWrongGroupByGameAndDate),
    )
    return (
      <div>
        {`Game Id: ${stats[0].gameId}; Date: ${stats[0].studiedAt};`}
        {`${stats[0].correctAnswerTotal} / ${stats[0].wrongAnswerTotal}`}
      </div>
    )
  }
  ```

- по мини-играм (за всё время). Пример использование см. выше, но
  использовать необходимо селектор `selectCorrectVsWrongGroupByGame`

4. Самая длинная серия правильных ответов в разбивке по:

- дням и по мини-играм

## Виды графиков:

- кол-во изучаемых слов (2) в разбивке по
  - дням `selectWordCountByDate` - пример использования см. выше
- кол-во (уникальных) изучаемых слов (1) в разбивке по
  - дням

## Пользовательские данные, которые нужно хранить:

### для слова:

- группа к которой относится слово
- страница к которой относится слово
- когда пользователь добавил впервые его в "Изучаемые"
- фиксировать дни, в которые слово было использовано в мини-играх с доп. информацией:
  - тип игры
  - сколько раз правильно угадано (в частном случае здесь будет 0 или 1 - если пользователь запускал игру один раз)
  - сколько раз неправильно угадано (в частном случае здесь будет 1 или 0)
  - дата игры

### для мини-игры

- самая длинная серия правильных ответов:
  - мини-игра
  - дата
  - длина серии

## Вопросы

### Действие при добавлении слова в "Удалённые"

Когда слово удалено, статистика по нему не выводится и тут есть два решения

1. Удалять статистику слова, когда оно отмечено, как удалённое. Т.о. после
   "восстановления" статистика для слова будет собираться по новой.
2. Добавить доп. поле isDeleted и исключать данное слово из запросов, но при
   "восстановлении" слова — пользователь продолжит с места, где остановился

Аналогичный вопрос при **удалении** слова из группы "Изучаемых"?

**Aplatkouski**: я склоняюсь к тому, что статистика "между удалениями" слова буду
сохраняться.

## Предлагаемое решение

/user/{id}/statistics

### userWords схему необходимо расширить

- group: number;
- page: number;
- isDeleted: boolean;
- isDifficult: boolean;
- addedAt: string;

### wordStatistic

- wordId
- gameId: string; // необходимо добавить схему `Game`
- group: number;
- page: number;
- correctAnswerTotal: number;
- wrongAnswerTotal: number;
- studiedAt: string; // (new Date()).toISOString().substring(0, 10)

### gameStatistic

- gameId: string;
- bestSeries: number;
- date: string; // (new Date()).toISOString().substring(0, 10)

import { useEffect, useState } from 'react';
import { Diary } from './types';
import diaryService from './diaryService';
import { Content } from './components/Content';
import axios from 'axios';
import { Message } from './utils/Message';

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    diaryService.getAllNotes().then((data) => setDiaries(data));
  }, []);

  return (
    <div>
      <Form setDiaries={setDiaries} />
      <Content diaries={diaries} />
    </div>
  );
}

export default App;

const Form = ({
  setDiaries,
}: {
  setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>;
}) => {
  const [date, setDate] = useState('');
  const [visibility, setVisiblity] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const addEntry = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newEntry = { date, visibility, weather, comment };

    diaryService
      .createDiary(newEntry)
      .then((data) => {
        setDiaries((diaries) => diaries.concat(data));
      })
      .catch((err) => {
        setErrorMessage(err.response.data);
        setTimeout(() => setErrorMessage(null), 5000);
      });

    setVisiblity('');
    setWeather('');
    setDate('');
    setComment('');
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <Message message={errorMessage} />
      <form onSubmit={addEntry}>
        <div>
          date
          <input
            type='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <span>visibility </span>
          great{' '}
          <input
            type='radio'
            name='visibility'
            value='great'
            onChange={(e) => setVisiblity(e.target.value)}
          />
          good{' '}
          <input
            type='radio'
            name='visibility'
            value='good'
            onChange={(e) => setVisiblity(e.target.value)}
          />
          ok{' '}
          <input
            type='radio'
            name='visibility'
            value='ok'
            onChange={(e) => setVisiblity(e.target.value)}
          />
          poor{' '}
          <input
            type='radio'
            name='visibility'
            value='poor'
            onChange={(e) => setVisiblity(e.target.value)}
          />
        </div>
        <div>
          <span>weather </span>
          sunny{' '}
          <input
            type='radio'
            name='weather'
            value='sunny'
            onChange={(e) => setWeather(e.target.value)}
          />
          rainy{' '}
          <input
            type='radio'
            name='weather'
            value='rainy'
            onChange={(e) => setWeather(e.target.value)}
          />
          cloudy{' '}
          <input
            type='radio'
            name='weather'
            value='cloudy'
            onChange={(e) => setWeather(e.target.value)}
          />
          stormy{' '}
          <input
            type='radio'
            name='weather'
            value='stormy'
            onChange={(e) => setWeather(e.target.value)}
          />
          windy{' '}
          <input
            type='radio'
            name='weather'
            value='windy'
            onChange={(e) => setWeather(e.target.value)}
          />
        </div>
        <div>
          comment
          <input
            type='text'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button type='submit'>add</button>
      </form>
    </div>
  );
};


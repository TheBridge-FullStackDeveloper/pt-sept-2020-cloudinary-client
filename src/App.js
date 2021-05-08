import axios from 'axios';
import { useForm } from 'react-hook-form';

import './App.css';
import { getFormData } from './utils/form';

function App() {
  const { register, handleSubmit } = useForm();

  function onFormSubmit(values) {
    const { picture, ...restValues } = values;
    const formData = getFormData('picture', picture, restValues);

    // const formData = new FormData();

    // // Adjunto la imagen al formData
    // const file = picture[0];
    // if (file) {
    //   formData.append('picture', file); // Se tiene que llamar igual que el nombre que espera multer en el back: uploader.single('picture')
    // }

    // // Adjunto el resto de información a formData
    // Object.entries(restValues).forEach(([key, value]) => {
    //   formData.append(key, value);
    // });

    axios
      .post('http://localhost:4000/api/tweet', formData, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then((res) => {
        // Muestro el .data del JSON de mi server que axios mete en res.data
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <div className="App">
      <h1>Sube tu tweet con imagen al server 🦄</h1>

      <form onSubmit={handleSubmit(onFormSubmit)}>
        <label>Tweet text</label>
        <br />
        <textarea
          {...register('text', {
            required: true,
            minLength: 0,
            maxLength: 240,
          })}
        />

        <br />
        <br />

        <label>Tweet picture</label>
        <br />
        <input type="file" {...register('picture')} />

        <br />
        <br />
        <button type="submit">Send tweet</button>
      </form>
    </div>
  );
}

export default App;

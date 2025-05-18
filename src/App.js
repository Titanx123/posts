// import logo from './logo.svg';
// import './App.css';
import { useState, useEffect } from 'react';


function App() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: '', body: '' });
  const [messaage, setMessage] = useState('');
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    


    fetch('https://jsonplaceholder.typicode.com/posts').then((res => res.json())).then((data) => {
      setPosts(data);
    }).catch(((error) => console.error('Error Getting the Records',error)))
  
    
  }, [])
  console.log(posts)


  const handleChange = (e) => {
    
    setForm({ ...form, [e.target.name]: e.target.value });
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.body.trim()) {
      setMessage('Title and Body are required');
      return;
    }

    setLoading(true);

    if(form.title.length < 0) alert('Please Enter the Title')
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    }).then((res => res.json())).then((data => {
      setPosts([data, ...posts]);
      setMessage('Post Added Succesfully');
      setForm({ title: '', body: '' });
      setLoading(false);
      setTimeout(() => {
                  setMessage('')

      }, 2000);

    })).catch((e) => {
      setMessage('Error in Submitting the post');
      setLoading(false);
    })
  }

  return (
    <div >
      <div>
        <div style={{marginLeft:'45%'}}>
          <h1>Posts</h1>
          </div>
        <div style={{marginLeft:'35%'}}>
          <form onSubmit={handleSubmit}>
            {messaage && <p>{messaage}</p>}
            <section>
            <input name='title' placeholder='Title' value={form.title} onChange={handleChange} style={{ width: '45.5%', marginBottom: '10px' ,padding:'15px'}}></input>
            </section>
                
            <textarea name='body' placeholder=' Place your contents Here' value={form.body} onChange={handleChange} rows={14} cols={50} style={{ padding: '20px' }}></textarea>
            <section>
            <button type='submit' disabled={loading} style={{ width: '10em', height: '2em', background: '#fff',marginLeft:'12em',marginTop:'3em' }}>{loading ? 'Submitting...' : 'Add Post'}</button>
            </section>
          </form>
          </div>
      </div>
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',border:'2px solid black',margin:'2em'}}>
        <ul>
          {posts.map((post) => (
            <li>
              <strong>{post.title}</strong>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

export default App;

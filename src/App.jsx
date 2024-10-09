import React, { useEffect, useState } from 'react';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import 'bootstrap/dist/css/bootstrap.min.css';
import user from "./imges/user.jpg";

function App() {
  const [page, setPage] = useState(1);
  const [limits, setLimit] = useState(10);
  const [comments, setComments] = useState([]);
  const [filterMajor, setFilterMajor] = useState(''); // Major filter
  const [filterGender, setFilterGender] = useState(''); // Gender filter

  useEffect(() => {
    fetch(`https://json-api.uz/api/project/11-dars/developers?skip=${(page - 1) * limits}&limit=${limits}`)
      .then(res => res.json())
      .then((data) => {
        console.log(data.data);
        setComments(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page, limits]);

  // Filter comments based on major and gender
  const filteredComments = comments.filter(comment => 
    (filterMajor === '' || comment.major.toLowerCase().includes(filterMajor.toLowerCase())) &&
    (filterGender === '' || comment.gender === filterGender)
  );

  return (
    <div className='container p-5 border-2 border-black rounded-xl'>
      <header>
        <nav>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter major..."
              className="form-control mb-3"
              value={filterMajor}
              onChange={(e) => setFilterMajor(e.target.value)}
            />
            <select
              className="form-control mb-3"
              value={filterGender}
              onChange={(e) => setFilterGender(e.target.value)}
            >
              <option value="">Enter gender...</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </nav>
      </header>

      <div className='row mt-4 gap-10'>
        {
          filteredComments.length > 0 ? filteredComments.map((comment) => (
            <div key={comment.id} className="col-md-4 mb-4 border p-2 rounded-xl max-w-64">
              <img src={user} alt="user img" className='rounded-xl p-2'/>
              <div className="p-3 shadow-sm">
                <h3 className="text-primary"><b>Age:</b> <span className="text-dark">{comment.age}</span></h3>
                <h3 className="text-primary"><b>Major:</b> <span className="text-dark">{comment.major}</span></h3>
                <h3 className="text-primary"><b>Gender:</b> <span className="text-dark">{comment.gender}</span></h3>
                <h3 className="text-primary"><b>ID:</b> <span className="text-dark">{comment.id}</span></h3>
              </div>
            </div>
          )) : (
            <p className='flex mx-auto justify-center mb-4'>No comments found.</p>
          )
        }
      </div>

      <div className='container'>
        <PaginationControl
          page={page}
          between={4}
          total={630}
          limit={20}
          changePage={(page) => {
            setPage(page);
          }}
          ellipsis={1}
        />
      </div>
    </div>
  );
}

export default App;

import React, { useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import Pagination from 'react-paginate';

export const App = () => {
    const url = 'https://reqres.in/api/users?page=';
    const [state, setState] = useState({
        data: [],
        per_page: 6,
        page: 1,
        pages: 0,
    });
 
    const makeHttpRequest = async(pageNumber) => {
    const res = await axios.get(`${url}${pageNumber}`)
                                                      .catch(err => console.log(err));
    const {data: {data, page, per_page, total}} = res;
    setState({
          data,
          page,
          per_page,
          pages: Math.floor( total / per_page)
      });
    };
 
    const handlePageClick = (e) => {
        const page = e.selected;
        setState({...state})
        makeHttpRequest(page + 1);
    }

    const {page, pages, data} = state;
    const info = data.map(item => {
        const { id, first_name, last_name, email, avatar } = item;
        return (
          <tr key={id}>
            <td>{id}</td>
            <td>{first_name}</td>
            <td>{last_name}</td>
            <td>{email}</td>
            <td className="imageTd"><img src={avatar} alt={avatar} /></td>
          </tr>
        ) || '';
    });
    useEffect(()=>{
      makeHttpRequest(page);
    }, []);
 
    return (
      <>
        <div>
        <table className='Table'>
          <thead>
            <tr>
              <th>Id</th>
              <th>First-Name</th>
              <th>Last-Name</th>
              <th>Email</th>
              <th>Avtar</th>
            </tr>
          </thead>
          <tbody>
            {info}
          </tbody>
        </table>
        </div>
        <Pagination 
            previousLabel={'<<'}
            nextLabel={'>>'}
            pageCount={pages}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            activeClassName={'active'}
        />
      </>
    )
  }


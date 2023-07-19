import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import Menu from '../layout/Menu';
import FutbolistaService from '../services/FutbolistaService';

const TableFutbolistas = React.memo(() => {

  const [openDelete, setOpenDelete] = useState(false);
  const [optionDelete, setOptionDelete] = useState(false);
  const [idDelete, setIdDelete] = useState();
  const [search, setSearch] = useState('');
  const [futbolistaEdit, setFutbolistaEdit] = useState(0);
  const [futbolistas, setFutbolistas] = useState([]);
  const [estateModal, setEstateModal] = useState(false);



  const handlerClick = () => {
    setEstateModal(!estateModal);
  };

  const searcher = (e) => {
    setSearch(e.target.value);
  };

  const filteredFutbolistas = useMemo(
    () =>
      search
        ? futbolistas.filter((data) =>
            data.nombres.toLowerCase().includes(search.toLowerCase())
          )
        : futbolistas,
    [search, futbolistas]
  );
  
  const acctions = () => {
    if (estateModal && futbolistaEdit !== 0) {
      return (
        <div id="tables-acctions show">
          <button className="modificar">
            <Link to={`/editfutbolista/${futbolistaEdit}`}>
              <span className="material-symbols-outlined edit">edit</span>
              &nbsp;&nbsp;
            </Link>
          </button>
          <button
            className="eliminar"
            onClick={() => {
              setIdDelete(futbolistaEdit);
              setOpenDelete(true);
            }}
          >
            <span className="material-symbols-outlined delete">
              delete_forever
            </span>
          </button>
          <button className="email">
            <a href="/futbolista/:id">
              <span className="material-symbols-outlined mail">mail</span>
            </a>
          </button>
        </div>
      );
    }
    if (!estateModal) {
      return null;
    }
  };

  const deletePersona = () => {
    if (optionDelete) {
      FutbolistaService.deleteFutbolista(idDelete)
        .then((response) => {
          setOptionDelete(false);
        })
        .catch((error) => {
          console.log(error);
          setOptionDelete(false);
        });
    }
  };

  const confirmation = () => {
    deletePersona();
    if (openDelete) {
      return (
        <div className="alert show">
          <span className="msg">¿Quiere eliminar este registro?</span>
          <div className="alert-options-delete">
            <button
              className="btn confirmation"
              onClick={() => {
                setOptionDelete(true);
                setOpenDelete(false);
              }}
            >
              <span className="material-symbols-outlined check">check</span>
              <p>Yes</p>
            </button>
            <button className="btn close" onClick={() => setOpenDelete(false)}>
              <span className="material-symbols-outlined btn-close-delete">
                close
              </span>
              <p>Cancel</p>
            </button>
          </div>
        </div>
      );
    }
  };

  const renderTable = () => (
    <div className="data-table">
      <nav className="table-options">
        <ul className="btn-options">
          <li className="input-busqueda">
            <input
              type="text"
              name="busqueda"
              id="search"
              placeholder="Buscar"
              value={search}
              onChange={searcher}
            />
          </li>
          <li>
            <button className="btn-new">
              <Link to="/createfutbolista">
                <span className="material-symbols-outlined add">add</span>
                ADD
              </Link>
            </button>
          </li>
          <li>
            <CSVLink className="btn-csv" data={futbolistas} filename="Crud.csv">
              <span className="material-symbols-outlined download">download</span>
              <p>CSV</p>
            </CSVLink>
          </li>
        </ul>
      </nav>
      <table className="table" id="table-inf">
        <thead>
          <tr>
            <th>ID</th>
            <th>NOMBRES</th>
            <th>APELLIDOS</th>
            <th>NACIMIENTO</th>
            <th>EMAIL</th>
            <th>TELEFONO</th>
            <th>POSICION</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {filteredFutbolistas.map((futbolista) => (
            <tr key={futbolista.id}>
              <td>{futbolista.id}</td>
              <td>{futbolista.nombres}</td>
              <td>{futbolista.apellidos}</td>
              <td>{futbolista.fechaNacimiento}</td>
              <td>{futbolista.email}</td>
              <td>{futbolista.telefono}</td>
              <td>{futbolista.posicion}</td>
              <td>
                <span
                  className="material-symbols-outlined btn-expand"
                  onClick={() => {
                    setFutbolistaEdit(futbolista.id);
                    handlerClick();
                  }}
                >
                  expand_more
                </span>
                {acctions()}
              </td>
            </tr>
          ))}
        </tbody>
        {confirmation()}
      </table>
    </div>
  );

      const tokenExpired=()=>{                   
        setInterval(()=>{              
            let isLogged=localStorage.getItem("Token");        
            if(isLogged && futbolistas.length === 0){                
                    localStorage.removeItem("token"); 
                    localStorage.removeItem("Token");
                }
            },300000);
    }

    const findAllFutbolistas = async () => {           
            try {                        
                const response = await FutbolistaService.findAllFutbolistas();
                setFutbolistas(response.data);
              } catch (error) {
                console.log(error);                     
              }
        }

    useEffect(()=>{
        confirmation();       
        tokenExpired();
    })
    useEffect(()=>{
        findAllFutbolistas();
    },[])

  return (
    <div>
      <Menu />
      {renderTable()}
    </div>
  );
});

export default TableFutbolistas;

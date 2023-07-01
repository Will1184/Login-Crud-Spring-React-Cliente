import React from 'react'

function Modal({closeModal}) {
    return(
        <ul className="options-filter show">
            <div className="btn close-filter" onClick={()=> closeModal(false)}>
                <span className="material-symbols-outlined btn-close-filter">close</span>
            </div>  
            <form className="form-filter" action="" method="POST">
                <li>
                    <p>NOMBRE</p> 
                    <button className="btn-filter-action" name="filterValue" value="1">
                        <span className="material-symbols-outlined arrow-up">
                            keyboard_arrow_up
                        </span>
                    </button>
                    <button className="btn-filter-action" name="filterValue" value="2">
                        <span className="material-symbols-outlined arrow-down">
                        keyboard_arrow_down
                        </span>
                    </button>                                                                                      
                </li>
                <li>
                    <p>APELLIDO</p> 
                    <button className="btn-filter-action" name="filterValue" value="3">
                        <span className="material-symbols-outlined arrow-up">
                            keyboard_arrow_up
                         </span>
                    </button>
                    <button className="btn-filter-action" name="filterValue" value="4">
                        <span className="material-symbols-outlined arrow-down">
                            keyboard_arrow_down
                        </span>
                    </button>  
                </li>
                <li>
                    <p>EDAD</p>                                
                    <button className="btn-filter-action" name="filterValue" value="5">
                        <span className="material-symbols-outlined arrow-up">
                            keyboard_arrow_up
                            </span>
                    </button>
                    <button className="btn-filter-action" name="filterValue" value="6">
                        <span className="material-symbols-outlined arrow-down">
                            keyboard_arrow_down
                            </span>
                    </button>                                  
                </li>
                <li>
                    <p>ID</p>
                    <button className="btn-filter-action" name="filterValue" value="7">
                        <span className="material-symbols-outlined arrow-up">
                            keyboard_arrow_up
                            </span>
                    </button>
                    <button className="btn-filter-action" name="filterValue" value="8">
                        <span className="material-symbols-outlined arrow-down">
                            keyboard_arrow_down
                            </span>
                    </button>                                                                                           
                </li>
                <li>
                    <p>POSICION</p> 
                    <button className="btn-filter-action" name="filterValue" value="9">
                        <span className="material-symbols-outlined arrow-up">
                            keyboard_arrow_up
                            </span>
                    </button>
                    <button className="btn-filter-action" name="filterValue" value="10">
                        <span className="material-symbols-outlined arrow-down">
                            keyboard_arrow_down</span>
                    </button>                                                                                       
                </li>
            </form>
        </ul>   
    )
}
export default Modal;
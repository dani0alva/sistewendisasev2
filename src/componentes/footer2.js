import React from 'react';

const Piepagina = (props) => {
    return (
        

        <div className="py-4 bg-dark mt-auto">
                   <div className="container-fluid px-12">
                        <div className="d-flex align-items-center justify-content-between small">
                        {/*<div className="text-muted">Copyright &copy; Your Website 2022</div>*/}
                            <div className="container">
                                <h3 className="text-center font-weight-light my-4 text-muted fst-italic">{props.empresa_rs}</h3>
                                </div>
                        </div>
                    </div>
        </div>

    ) }
export default Piepagina;
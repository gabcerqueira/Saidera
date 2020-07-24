import React from 'react'
import './footer.css'



import { MDBCol, MDBContainer, MDBRow, MDBFooter } from 'mdbreact';

const Footer = () => {
  return (
    <MDBFooter  className="footer-main font-small pt-4 mt-4  fixed-bottom">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title">Saidera</h5>
            <p>
              This website was developed using React + FireBase + Bootstrap
            </p>
          </MDBCol>
          <MDBCol md="6" className="social-media" >
            <h5 className="title">Contact us</h5>
            <ul>
              <li className="list-unstyled">
                <a href="#!"><i className="fab fa-facebook fa-2x"></i></a>
              </li>
              <li className="list-unstyled">
                <a href="#!"><i className="fab fa-instagram fa-2x"></i></a>
              </li>
              <li className="list-unstyled">
                <a href="#!"><i className="fab fa-linkedin fa-2x"></i></a>
              </li>
              <li className="list-unstyled">
                <a href="#!"><i className="fab fa-github fa-2x"></i></a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3 bg-dark">
        <MDBContainer fluid >
          &copy; {new Date().getFullYear()} Copyright: <a href="https://www.mdbootstrap.com"> MDBootstrap.com </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default Footer;
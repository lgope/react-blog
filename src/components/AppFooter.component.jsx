import React from 'react';
import github from '../img/github.png';
import linkedin from '../img/linkedin.png';
import twitter from '../img/twitter.png';

const AppFooter = () => {
  return (
    <footer className='footer font-small white mt-4 pt-4 text-info'>
      <div className='container text-center text-md-left'>
        <div className='row d-flex align-items-center'>
          <div className='col-md-7 col-lg-8'>
            <p className='text-center text-md-left text-info'>
              © {new Date().getFullYear()} Copyright:
              <a
                href='https://lgope.github.io/'
                aria-label='Website'
                target='_blank'
                rel='noopener noreferrer'
              >
                <strong className='text-success'> Lakshman</strong>
              </a>
            </p>
          </div>

          <div className='col-md-5 col-lg-4 ml-lg-0'>
            <div className='text-center text-md-right'>
              <ul className='list-unstyled list-inline'>
                {/* GitHub */}
                <li className='list-inline-item'>
                  <a
                    className='btn-floating btn-sm rgba-white-slight mx-1'
                    aria-label='Github'
                    href='https://github.com/lgope'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <img src={github} alt='github' />
                  </a>
                </li>
                {/* twitter */}
                <li className='list-inline-item'>
                  <a
                    href='https://twitter.com/LakshmanGope'
                    className='btn-floating btn-sm rgba-white-slight mx-1'
                    aria-label='Twitter'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <img src={twitter} alt='twitter' />
                  </a>
                </li>

                {/* linkedin */}
                <li className='list-inline-item'>
                  <a
                    className='btn-floating btn-sm rgba-white-slight mx-1'
                    aria-label='LinkedIn'
                    href='https://www.linkedin.com/in/lakshman-gope-ba8847154'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <img src={linkedin} alt='linkedin' />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;

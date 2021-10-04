import React, { Component } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from '@fortawesome/free-brands-svg-icons';



export class Navbar extends Component {
    render() {
        return (
            <nav className='navbar bg-primary'>
                <h1>
                    <FontAwesomeIcon icon={faGithub} />
                    Navbar
                </h1>
          </nav>
        )
    }
}

export default Navbar
